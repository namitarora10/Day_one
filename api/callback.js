const twilio = require('twilio');

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const ownerPhoneNumber = process.env.OWNER_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, preferredTime, message } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !preferredTime) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields'
      });
    }

    // Create SMS message
    const smsMessage = `🔔 New Callback Request from Day One Gym Website!

👤 Name: ${name}
📞 Phone: ${phone}
📧 Email: ${email}
⏰ Preferred Time: ${preferredTime}
📝 Message: ${message || 'No additional message'}

Please contact them within 24 hours.`;

    // Send SMS
    const smsResponse = await client.messages.create({
      body: smsMessage,
      from: twilioPhoneNumber,
      to: ownerPhoneNumber
    });

    console.log('SMS sent successfully:', smsResponse.sid);

    return res.status(200).json({
      success: true,
      message: 'Callback request submitted successfully! We will contact you soon.',
      smsSid: smsResponse.sid
    });

  } catch (error) {
    console.error('=== SMS ERROR DETAILS ===');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Error status:', error.status);

    let errorMessage = 'Failed to send notification. Please try again later.';

    if (error.code === 21211) {
      errorMessage = 'Invalid phone number. Please check the phone number format.';
    } else if (error.code === 21608) {
      errorMessage = 'This phone number is not verified in your Twilio trial account.';
    } else if (error.code === 21606) {
      errorMessage = 'Cannot send SMS to this number. Please verify it in Twilio console.';
    } else if (error.code === 20003) {
      errorMessage = 'Authentication failed. Please check Twilio credentials.';
    } else if (error.code === 21602) {
      errorMessage = 'Message body is too long or invalid.';
    }

    return res.status(500).json({
      success: false,
      error: errorMessage,
      twilioError: error.message,
      errorCode: error.code
    });
  }
}

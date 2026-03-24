const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Debug: Log environment variables (remove in production)
console.log('Environment variables loaded:');
console.log('TWILIO_ACCOUNT_SID:', process.env.TWILIO_ACCOUNT_SID ? 'Set (starts with: ' + process.env.TWILIO_ACCOUNT_SID.substring(0, 5) + '...)' : 'NOT SET');
console.log('TWILIO_PHONE_NUMBER:', process.env.TWILIO_PHONE_NUMBER);
console.log('OWNER_PHONE_NUMBER:', process.env.OWNER_PHONE_NUMBER);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const ownerPhoneNumber = process.env.OWNER_PHONE_NUMBER;

// Validate configuration
if (!accountSid || !authToken || !twilioPhoneNumber || !ownerPhoneNumber) {
    console.error('Missing required environment variables!');
    console.error('Please check your .env file has all required values.');
    process.exit(1);
}

if (!accountSid.startsWith('AC')) {
    console.error('Invalid TWILIO_ACCOUNT_SID. It must start with "AC"');
    process.exit(1);
}

const client = twilio(accountSid, authToken);

console.log('Twilio client initialized successfully');

// API endpoint to handle callback requests
app.post('/api/callback-request', async (req, res) => {
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

        // Send SMS to Ranjot
        const smsResponse = await client.messages.create({
            body: smsMessage,
            from: twilioPhoneNumber,
            to: ownerPhoneNumber
        });
        
        console.log('SMS sent successfully:', smsResponse.sid);
        
        // Also send confirmation email (optional)
        // You can add email service here if needed
        
        res.json({ 
            success: true, 
            message: 'Callback request submitted successfully! We will contact you soon.',
            smsSid: smsResponse.sid
        });
        
    } catch (error) {
        console.error('=== SMS ERROR DETAILS ===');
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Error status:', error.status);
        console.error('Full error:', JSON.stringify(error, null, 2));
        console.error('=== END ERROR ===');
        
        let errorMessage = 'Failed to send notification. Please try again later.';
        
        // Specific error messages for common issues
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
        
        res.status(500).json({ 
            success: false, 
            error: errorMessage,
            twilioError: error.message,
            errorCode: error.code
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', service: 'Day One Gym SMS Service' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`SMS notifications will be sent to: ${ownerPhoneNumber}`);
});

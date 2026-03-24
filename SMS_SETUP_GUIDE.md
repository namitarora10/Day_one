# SMS Notification Setup Guide

This guide will help you set up the SMS notification system so that when someone fills out the callback form on your website, Ranjot Singh receives an instant text message with the customer's details.

## 📋 Prerequisites

1. **Node.js** installed (version 18 or higher)
2. **Twilio Account** (for sending SMS)
3. **Backend server** running (to handle form submissions)

## 🚀 Quick Setup

### Step 1: Install Dependencies

Open terminal in the project folder and run:

```bash
cd "/Users/namitarora/Desktop/Namit_Job/Dayone website /CascadeProjects/2048"
npm install
```

### Step 2: Set Up Twilio Account

1. Go to https://www.twilio.com/try-twilio
2. Sign up for a free account
3. Get your Account SID and Auth Token from the console
4. Get a Twilio phone number (this will be your "from" number)

### Step 3: Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit the `.env` file and add your details:

```env
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_actual_twilio_account_sid
TWILIO_AUTH_TOKEN=your_actual_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890  # Your Twilio phone number

# Owner's Phone Number (Ranjot Singh)
OWNER_PHONE_NUMBER=+919996563127  # Already set to Ranjot's number

# Server Configuration
PORT=3000
```

### Step 4: Start the Server

Run the backend server:

```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

You should see:
```
Server running on port 3000
SMS notifications will be sent to: +919996563127
```

### Step 5: Test the Form

1. Open your website at http://localhost:8000
2. Go to the "Request Callback" section
3. Fill out the form with test data
4. Submit the form
5. Ranjot should receive an SMS immediately!

## 📱 SMS Format

When someone submits the form, Ranjot will receive an SMS like this:

```
🔔 New Callback Request from Day One Gym Website!

👤 Name: John Doe
📞 Phone: 9876543210
📧 Email: john@example.com
⏰ Preferred Time: Morning (9AM - 12PM)
📝 Message: I'm interested in the 6 months membership plan

Please contact them within 24 hours.
```

## 🌐 Production Deployment

For production deployment, you need to:

### Option 1: Deploy to a Cloud Server (Recommended)

Deploy the backend to services like:
- **Heroku**: https://heroku.com
- **Railway**: https://railway.app
- **Render**: https://render.com

Then update the JavaScript fetch URL in `script.js`:
```javascript
const response = await fetch('https://your-backend-url.com/api/callback-request', {
```

### Option 2: Use Netlify Functions

If deploying to Netlify, you can use Netlify Functions for the backend.

### Option 3: Use Vercel Serverless Functions

If deploying to Vercel, use their API routes feature.

## 🔧 Troubleshooting

### Issue: SMS not being received

**Check:**
1. Is the server running? (`npm start`)
2. Are Twilio credentials correct in `.env`?
3. Is the Twilio phone number verified?
4. Check Twilio console for any errors

### Issue: CORS errors

If you see CORS errors in browser console, the backend is not running or the URL is wrong.

### Issue: Form submits but no SMS

Check browser console and server logs for errors.

## 💰 Costs

- **Twilio**: Free trial includes $15.50 credit. After that, SMS to India costs ~$0.04 per message.
- **Hosting**: Free tiers available on Heroku, Railway, or Render.

## 🔒 Security Notes

1. **Never commit `.env` file** to git (it's in .gitignore)
2. **Use HTTPS** in production
3. **Validate phone numbers** before sending SMS
4. **Rate limit** submissions to prevent abuse

## 📞 Support

If you need help:
1. Check Twilio documentation: https://www.twilio.com/docs
2. Check server logs for errors
3. Test with Twilio test credentials first

## ✅ Testing Checklist

- [ ] Server starts without errors
- [ ] Form validation works
- [ ] SMS received on Ranjot's phone
- [ ] Success modal shows after submission
- [ ] Data stored in localStorage (backup)
- [ ] Error handling works (test with wrong credentials)

---

**Ready to go!** Once set up, every callback request will instantly notify Ranjot via SMS.

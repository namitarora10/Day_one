# Day One Gym Website

A modern, responsive gym website built with HTML, CSS, and JavaScript. Features include landing page, pricing plans, callback request functionality, and complete contact information.

## Features

- **Modern Design**: Clean, professional layout with gradient backgrounds and smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Callback Request**: Functional form with validation and local storage
- **Pricing Plans**: Three-tier membership structure (Basic, Premium, Elite)
- **Contact Information**: Complete contact details with owner information
- **Smooth Navigation**: Smooth scrolling and mobile-friendly menu
- **Interactive Elements**: Hover effects, animations, and loading states

## Website Structure

```
Day One Gym/
├── index.html          # Main HTML file
├── styles.css          # Complete styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Customization

### Brand Information
- **Gym Name**: Day One Gym
- **Tagline**: YOUR HEALTH MILESTONE
- **Owner**: Ranjot Singh
- **Phone**: +91 99965 63127
- **Email**: info@dayonegym.com

### Updating Content
1. **Contact Information**: Update in `index.html` at multiple locations
2. **Pricing**: Modify pricing cards in the pricing section
3. **Features**: Update feature cards in the features section
4. **Colors**: Main brand color is `#ff6b35` (orange)

## Deployment Options

### 1. GitHub Pages (Free)
```bash
# Create a new repository
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/dayone-gym.git
git push -u origin main

# Enable GitHub Pages in repository settings
# Select source: Deploy from a branch -> main
```

### 2. Netlify (Free)
1. Drag and drop the folder to netlify.com
2. Or connect to GitHub repository
3. Get instant deployment with custom domain

### 3. Vercel (Free)
1. Sign up at vercel.com
2. Import project from GitHub
3. Deploy with one click

### 4. Traditional Hosting
Upload files to any web hosting service that supports static websites.

## Domain Setup

### Custom Domain Configuration
1. Purchase a domain (e.g., dayonegym.com)
2. Update DNS settings:
   - **A Record**: Point to hosting provider IP
   - **CNAME**: For subdomains (www)

### Example DNS Settings
```
Type: A Record
Name: @
Value: 192.168.1.1 (Your hosting IP)

Type: CNAME
Name: www
Value: dayonegym.com
```

## Callback Request System

The callback form currently:
- Validates input fields
- Stores requests in browser localStorage
- Shows success confirmation
- Logs to console for development

### Production Setup
For production deployment, you'll need:
1. Backend server to handle form submissions
2. Email service integration (SendGrid, AWS SES)
3. Database to store requests
4. SMS integration for immediate notifications

### Example Backend Endpoint
```javascript
// Example Node.js/Express endpoint
app.post('/api/callback-request', (req, res) => {
    const { name, phone, email, preferredTime, message } = req.body;
    
    // Send email notification
    sendEmail({
        to: 'info@dayonegym.com',
        subject: 'New Callback Request',
        body: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nTime: ${preferredTime}\nMessage: ${message}`
    });
    
    // Send SMS to owner
    sendSMS('+91 99965 63127', `New callback request from ${name}: ${phone}`);
    
    res.json({ success: true });
});
```

## Performance Optimization

### Image Optimization
- Compress images before uploading
- Use WebP format for better compression
- Implement lazy loading for images

### SEO Optimization
- Meta tags are already included
- Add structured data for business information
- Create sitemap.xml
- Set up Google Analytics

### Security
- Implement HTTPS (SSL certificate)
- Add CSRF protection for forms
- Rate limiting for callback requests
- Input sanitization

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Support and Maintenance

### Regular Updates
- Update pricing information
- Add new classes/services
- Refresh testimonials
- Update contact information

### Monitoring
- Set up Google Analytics
- Monitor form submissions
- Track website performance
- Check for broken links

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For any questions or support regarding the website:
- **Owner**: Ranjot Singh
- **Phone**: +91 99965 63127
- **Email**: info@dayonegym.com

---

**Note**: This is a static website. For dynamic functionality like real-time booking, member management, or payment processing, additional backend development will be required.

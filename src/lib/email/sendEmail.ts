import nodemailer from 'nodemailer';

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

// Configure email transport
const getEmailTransporter = () => {
  // For Gmail
  if (process.env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.GMAIL_EMAIL || 'thanakrit03b@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  // For development, use Ethereal (fake SMTP service)
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: process.env.ETHEREAL_EMAIL || 'ethereal.user@ethereal.email',
      pass: process.env.ETHEREAL_PASSWORD || 'ethereal_pass',
    },
  });
};

// Create a test account on Ethereal for development
const createTestAccount = async () => {
  try {
    const testAccount = await nodemailer.createTestAccount();
    console.log('Test account created:', testAccount);
    return testAccount;
  } catch (error) {
    console.error('Failed to create test account:', error);
    return null;
  }
};

export const sendEmail = async ({ to, subject, html }: EmailPayload) => {
  let transporter;
  
  // If we have Gmail credentials, use them
  if (process.env.GMAIL_APP_PASSWORD) {
    transporter = getEmailTransporter();
  } else {
    // Otherwise create a test account for development
    const testAccount = await createTestAccount();
    
    if (testAccount) {
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } else {
      // Fallback to the default transporter
      transporter = getEmailTransporter();
    }
  }

  const fromEmail = process.env.GMAIL_EMAIL || 'thanakrit03b@gmail.com';
  const fromName = process.env.EMAIL_FROM_NAME || 'Thanakrit Portfolio';

  try {
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to,
      subject,
      html,
    });

    console.log('Message sent: %s', info.messageId);
    
    // If using Ethereal, log the URL where the message can be viewed
    if (info.messageId && info.messageId.includes('ethereal')) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Create HTML template for contact form emails
export const createContactFormEmailHtml = (name: string, email: string, message: string) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #5e3023;
            color: #fff;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            padding: 20px;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 5px 5px;
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
            text-align: center;
          }
          .label {
            font-weight: bold;
            margin-bottom: 5px;
          }
          .message {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin-top: 10px;
            white-space: pre-wrap;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>New Contact Form Submission</h1>
        </div>
        <div class="content">
          <p>You have received a new message from your portfolio website contact form.</p>
          
          <p class="label">Name:</p>
          <p>${name}</p>
          
          <p class="label">Email:</p>
          <p>${email}</p>
          
          <p class="label">Message:</p>
          <div class="message">${message}</div>
        </div>
        <div class="footer">
          <p>This email was sent from your Western Style Portfolio website.</p>
        </div>
      </body>
    </html>
  `;
};

// Create HTML template for confirmation emails to the sender
export const createConfirmationEmailHtml = (name: string) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Thank You for Your Message</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #5e3023;
            color: #fff;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            padding: 20px;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 5px 5px;
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
            text-align: center;
          }
          .button {
            display: inline-block;
            background-color: #d35400;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Thank You for Your Message</h1>
        </div>
        <div class="content">
          <p>Hello ${name},</p>
          
          <p>Thank you for reaching out through my portfolio website. I have received your message and will get back to you as soon as possible.</p>
          
          <p>In the meantime, feel free to explore more of my work and projects.</p>
          
          <p>Best regards,<br>Thanakrit Pongtanawannagon</p>
        </div>
        <div class="footer">
          <p>This is an automated response. Please do not reply to this email.</p>
        </div>
      </body>
    </html>
  `;
}; 
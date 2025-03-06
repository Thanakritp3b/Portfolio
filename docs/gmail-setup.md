# Setting Up Gmail for Your Contact Form

To use your Gmail account (`thanakrit03b@gmail.com`) with the contact form, you'll need to create an "App Password". This is a special password that allows your application to send emails through your Gmail account without compromising your main password.

## Step 1: Enable 2-Step Verification

Before you can create an App Password, you need to enable 2-Step Verification on your Google Account:

1. Go to your [Google Account](https://myaccount.google.com/)
2. Select **Security** from the left navigation panel
3. Under "Signing in to Google," select **2-Step Verification**
4. Follow the on-screen steps to turn on 2-Step Verification

## Step 2: Create an App Password

Once 2-Step Verification is enabled:

1. Go to your [Google Account](https://myaccount.google.com/)
2. Select **Security** from the left navigation panel
3. Under "Signing in to Google," select **App passwords**
4. At the bottom, select **Select app** and choose **Other (Custom name)**
5. Enter "Western Portfolio" or any name you prefer
6. Click **Generate**
7. The app password will be displayed. **Copy this password** (it's a 16-character code with no spaces)
8. Click **Done**

## Step 3: Add the App Password to Your .env File

Create a `.env` file in the root directory of your project (if it doesn't exist already) and add the following:

```
GMAIL_EMAIL="thanakrit03b@gmail.com"
GMAIL_APP_PASSWORD="your-16-character-app-password"
EMAIL_FROM_NAME="Thanakrit Portfolio"
```

Replace `your-16-character-app-password` with the password you copied in Step 2.

## Step 4: Test Your Contact Form

After setting up the App Password and updating your `.env` file, restart your development server and test your contact form. You should now be able to:

1. Receive notification emails at `thanakrit03b@gmail.com` when someone submits the contact form
2. Send confirmation emails to form submitters from your Gmail account

## Troubleshooting

If you encounter issues:

### "Username and Password not accepted" Error

This is the most common error and usually means one of the following:

1. **2-Step Verification is not enabled**: Make sure you've enabled 2-Step Verification on your Google Account.
2. **Incorrect App Password**: Double-check that you've copied the App Password correctly (it should be 16 characters without spaces).
3. **Less Secure App Access**: If you're not using an App Password, you might need to enable "Less secure app access" in your Google Account settings, but this is not recommended for security reasons.

### Other Common Issues

- **Gmail Blocking**: Gmail might block the login attempt if it detects unusual activity. Check your Gmail inbox for any security alerts.
- **Environment Variables**: Make sure your `.env` file is in the root directory and has the correct format.
- **Restart Required**: After updating your `.env` file, restart your development server.

### Testing with Ethereal

If you're having trouble with Gmail, you can test with Ethereal (a fake SMTP service) by removing the Gmail app password from your `.env` file. The system will automatically create a test account and provide a URL where you can view the sent emails in the console.

## Security Notes

- Never commit your `.env` file to version control
- Keep your App Password secure
- If you suspect your App Password has been compromised, you can revoke it from your Google Account security settings
- Consider using environment variables in your deployment platform rather than hardcoding credentials 
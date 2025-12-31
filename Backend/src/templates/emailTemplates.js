const getBaseTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #ffffff;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .content {
      padding: 40px 30px;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #ffffff;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 600;
      margin-top: 20px;
      box-shadow: 0 4px 15px rgba(118, 75, 162, 0.4);
    }
    .footer {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>SetUp</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} SetUp. All rights reserved.</p>
      <p>MIT Academy of Engineering, Alandi, Pune.</p>
    </div>
  </div>
</body>
</html>
`;

exports.getVerificationEmail = (url) => {
    const content = `
    <h2>Verify Your Email Address</h2>
    <p>Welcome to SetUp! We're excited to have you on board.</p>
    <p>Please confirm your email address to get full access to all features. Just click the button below:</p>
    <div style="text-align: center;">
      <a href="${url}" class="button">Verify Email</a>
    </div>
    <p style="margin-top: 30px; font-size: 14px; color: #666;">
      If the button doesn't work, you can copy and paste this link into your browser:<br>
      <a href="${url}" style="color: #667eea;">${url}</a>
    </p>
    <p>This link will expire in 24 hours.</p>
  `;
    return getBaseTemplate(content);
};

exports.getResetPasswordEmail = (url) => {
    const content = `
    <h2>Reset Your Password</h2>
    <p>We received a request to reset your password for your SetUp account.</p>
    <p>Don't worry, it happens to the best of us. Click the button below to choose a new password:</p>
    <div style="text-align: center;">
      <a href="${url}" class="button">Reset Password</a>
    </div>
    <p style="margin-top: 30px; font-size: 14px; color: #666;">
      If you didn't request a password reset, you can safely ignore this email.
    </p>
    <p>This link will expire in 10 minutes.</p>
  `;
    return getBaseTemplate(content);
};

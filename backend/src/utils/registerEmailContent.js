const registerSuccessEmail = (fullname, appName, dashboardUrl) => {
  return `
  <html>
    <body style="font-family: Arial, sans-serif; padding:20px; background:#f5f5f5;">
      <table width="100%" style="max-width:600px; background:#fff; margin:auto; padding:20px; border-radius:8px;">
        <tr>
          <td style="text-align:center;">
            <h2 style="color:#333;">🎉 Welcome to ${appName}!</h2>
            <p>Hello <strong>${fullname}</strong>, your account has been successfully created.</p>

            <p style="color:#555; margin-top:15px;">
              You now have access to premium-level features.  
              Click below to get started.
            </p>

            <a href="${dashboardUrl}"
               style="display:inline-block; margin-top:20px; padding:10px 18px; background:#4c6ef5; color:#fff; text-decoration:none; border-radius:5px; font-weight:bold;">
               Go to Dashboard
            </a>

            <p style="margin-top:25px; font-size:12px; color:#888;">
              © ${new Date().getFullYear()} ${appName}. All rights reserved.
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};

module.exports = registerSuccessEmail;

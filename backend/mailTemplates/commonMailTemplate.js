exports.sendEmailMessage = ({ title, message, highlightText, footerNote }) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
    <tr>
      <td align="center">
        
        <!-- Main Container -->
        <table width="500px" style="background:#ffffff; border-radius:10px; padding:20px; text-align:center;">
          
          <!-- Logo -->
          <tr>
            <td>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_1vHDp8IZAcao_xFbz7s-wxUQmDW6Lu7XIA&s" alt="HostelBite Logo" width="120" />
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td>
              <h2 style="color:#333;">${title}</h2>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td>
              <p style="color:#555; font-size:14px;">
                ${message}
              </p>
            </td>
          </tr>

          ${
            highlightText
              ? `
          <!-- Highlight Box -->
          <tr>
            <td>
              <div style="
                font-size:20px;
                font-weight:bold;
                letter-spacing:2px;
                background:#f0f0f0;
                padding:12px;
                border-radius:8px;
                display:inline-block;
                margin:20px 0;
              ">
                ${highlightText}
              </div>
            </td>
          </tr>
          `
              : ""
          }

          <!-- Footer -->
          <tr>
            <td>
              <p style="color:#777; font-size:12px; margin-top:20px;">
                ${footerNote || "If you didn’t request this, you can safely ignore this email."}
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
};
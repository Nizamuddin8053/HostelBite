exports.passwordUpdateTemplate = (password) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Updated</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
    <tr>
      <td align="center">
        
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
              <h2 style="color:#333;">Password Updated Successfully</h2>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td>
              <p style="color:#555; font-size:14px;">
                Hello 👋,<br/><br/>
                Your <b>HostelBite</b> account password has been successfully updated.
              </p>
            </td>
          </tr>

          <!-- Password Box -->
          <tr>
            <td>
              <div style="
                font-size:20px;
                font-weight:bold;
                letter-spacing:2px;
                background:#f0f0f0;
                padding:15px;
                border-radius:8px;
                display:inline-block;
                margin:20px 0;
                color:#333;
              ">
                ${password}
              </div>
            </td>
          </tr>

          <!-- Warning -->
          <tr>
            <td>
              <p style="color:#d9534f; font-size:13px;">
                ⚠️ For security reasons, please change this password after logging in.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td>
              <p style="color:#777; font-size:12px; margin-top:20px;">
                If you did not request this change, please contact support immediately.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
};

exports.body = (otp)=>{ 
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>OTP Verification</title>
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
              <h2 style="color:#333;">Email Verification</h2>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td>
              <p style="color:#555; font-size:14px;">
                Hello 👋,<br/><br/>
                Thank you for signing up with <b>HostelBite</b>.  
                Use the OTP below to verify your email address.
              </p>
            </td>
          </tr>

          <!-- OTP Box -->
          <tr>
            <td>
              <div style="
                font-size:24px;
                font-weight:bold;
                letter-spacing:5px;
                background:#f0f0f0;
                padding:15px;
                border-radius:8px;
                display:inline-block;
                margin:20px 0;
              ">
                ${otp}
              </div>
            </td>
          </tr>

          <!-- Expiry Info -->
          <tr>
            <td>
              <p style="color:#999; font-size:12px;">
                This OTP is valid for 5 minutes.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td>
              <p style="color:#777; font-size:12px; margin-top:20px;">
                If you didn’t request this, you can safely ignore this email.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`
}
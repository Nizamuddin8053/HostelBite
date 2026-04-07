exports.paymentSuccessTemplate = ({
  razorpay_payment_id,
  email,
  name,
  amount,
}) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Payment Successful</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
    <tr>
      <td align="center">
        
        <!-- Main Container -->
        <table width="520px" style="background:#ffffff; border-radius:12px; padding:25px; text-align:center;">
          
          <!-- Logo -->
          <tr>
            <td>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_1vHDp8IZAcao_xFbz7s-wxUQmDW6Lu7XIA&s" alt="HostelBite Logo" width="120" />
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td>
              <h2 style="color:#28a745; margin-top:10px;">✅ Payment Successful</h2>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td>
              <p style="color:#555; font-size:14px;">
                Hello <b>${name}</b>,<br/><br/>
                Your payment has been successfully processed. Thank you for using <b>HostelBite</b> 🎉
              </p>
            </td>
          </tr>

          <!-- Amount Highlight -->
          <tr>
            <td>
              <div style="
                font-size:22px;
                font-weight:bold;
                background:#eaf7ee;
                color:#28a745;
                padding:15px;
                border-radius:8px;
                display:inline-block;
                margin:20px 0;
              ">
                ₹ ${amount}
              </div>
            </td>
          </tr>

          <!-- Payment Details Table -->
          <tr>
            <td>
              <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse; margin-top:10px; text-align:left;">
                
                

                <tr>
                  <td style="border-bottom:1px solid #eee;"><b>Payment ID</b></td>
                  <td style="border-bottom:1px solid #eee;">${razorpay_payment_id}</td>
                </tr>

    

                <tr>
                  <td style="border-bottom:1px solid #eee;"><b>Email</b></td>
                  <td style="border-bottom:1px solid #eee;">${email}</td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td>
              <p style="color:#777; font-size:12px; margin-top:20px;">
                If you have any questions, feel free to contact our support team.
              </p>
              <p style="color:#aaa; font-size:11px;">
                © ${new Date().getFullYear()} HostelBite. All rights reserved.
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
const nodemailer = require("nodemailer");

exports.mailSender = async (title,email,body)=>{
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }

        })

        // console.log("transporter is", transporter)

        const info = await transporter.sendMail({
            from: `"HostelBite" <${process.env.MAIL_USER}>`,
            to:`${email}`,
            subject:`${title}`,
            html: `${body}`
        })

        console.log("info about mail ",info);

        return info;
    }catch(error){
        console.log("error while sending emali , error is :" , error)
        return res.status(500).json({
            success: false,
            message: "errro while sending mail"
        })

    }
}



// BREVO API USED TO SEND EMAIL BECAUSE SMTP BLOCKED BY RENDER EVERY TIME

// import axios from "axios";

// export const mailSender = async (title, email, body) => {
//   try {
//     const response = await axios.post(
//       "https://api.brevo.com/v3/smtp/email",
//       {
//         sender: {
//           name: "HostelBite",
//           email: "khannizamuddinkhan078@gmail.com", // verified sender
//         },
//         to: [
//           {
//             email: email,
//           },
//         ],
//         subject: title,
//         htmlContent: body,
//       },
//       {
//         headers: {
//           "api-key": process.env.BREVO_API_KEY,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log(" Email sent:", response.data);
//     return response.data;

//   } catch (error) {
//     console.log(" Email error:", error.response?.data || error.message);
//     throw error;
//   }
// };


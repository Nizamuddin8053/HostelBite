// const nodemailer = require("nodemailer");

// exports.mailSender = async (title,email,body)=>{
//     try{
//         let transporter = nodemailer.createTransport({
//             host: process.env.MAIL_HOST,
//             port: 587,
//             secure: false,
//             auth:{
//                 user: process.env.MAIL_USER,
//                 pass: process.env.MAIL_PASSWORD
//             }

//         })

//         // console.log("transporter is", transporter)

//         const info = await transporter.sendMail({
//             from: `"HostelBite" <${process.env.MAIL_USER}>`,
//             to:`${email}`,
//             subject:`${title}`,
//             html: `${body}`
//         })

//         console.log("info about mail ",info);

//         return info;
//     }catch(error){
//         console.log("error while sending emali , error is :" , error)
//         return res.status(500).json({
//             success: false,
//             message: "errro while sending mail"
//         })

//     }
// }



// using resend to send email(go to resend website get a api key)  npm i resend

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

export const mailSender = async (title, email, body) => {
  try {
    const info = await transporter.sendMail({
      from: `"HostelBite" <${process.env.BREVO_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log(" Email sent:", info.messageId);
    return info;

  } catch (error) {
    console.log("Email error:", error);
    throw error;
  }
};


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

    }
}


const Staff = require("../../models/Staff");
const Student = require("../../models/Student");
const { sendEmailMessage } = require("../../mailTemplates/commonMailTemplate");
const { mailSender } = require("../../utils/mailSender.js");


// check student and staff are approved

exports.checkApprove = async (req, res) => {
    try {

        const { email, role } = req.body;

        let user;
        if (role === "staff") {
            user = await Staff.findOne({ email, approved: true });

        } else {
            user = await Student.findOne({ email, approved: true });
        }

        if (!user) {
            return res.status(400).json({
                message: false
            })

        }

        res.status(200).json({
            message: true
        })


    } catch (error) {

        res.status(500).json({
            message: "error while approving user",
            error
        })

    }
}

// fetch unapproved staff 
exports.getUnapprovedUser = async (req, res) => {
    try {

        const { role } = req.query;

        let users;
        if (role === "staff") {
            users = await Staff.find({ approved: false })
                .sort({ createdAt: -1 })
                .select("-password");
        } else if (role === "student") {
            users = await Student.find({ approved: false })
                .sort({ createdAt: -1 })
                .select("-password");
        } else {
            return res.status(400).json({ success: false, message: "Role must be staff or student" });
        }

        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });

    } catch (err) {
        console.error("Error fetching unapproved user:", err);

        res.status(500).json({
            success: false,
            error: "Server error while fetching unapproved user",
        });
    }
};


// approve user

exports.approveUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!["staff", "student"].includes(role)) {
            return res.status(400).json({ message: "Role must be staff or student" });
        }

        let user;
        if (role === "staff") {
            user = await Staff.findByIdAndUpdate(
                id,
                { approved: true },
                { new: true, runValidators: true }
            ).select("-password");

        } else {
            user = await Student.findByIdAndUpdate(
                id,
                { approved: true },
                { new: true, runValidators: true }
            ).select("-password");
        }


        if (!user) {
            return res.status(404).json({ error: " user not found" });
        }


        const htmlBody = sendEmailMessage({
            title: "Welcome to HostelBite 🎉",
            message: `
    Hello, ${user.name}

    We’re pleased to inform you that your account has been successfully approved by the management.

    You can now access your account and start using HostelBite services.
    Please click the link below to log in:
  `,
            highlightText: `${process.env.FRONTEND_URL}/login`,
            footerNote: "If you have any questions, feel free to contact the HostelBite team."
        });

        let notificationSent = true;
        try {
            await mailSender(
                "Your HostelBite Account Has Been Approved",
                user.email,
                htmlBody
            );
        } catch (emailError) {
            notificationSent = false;
            console.error("Account approved, but notification email failed:", emailError);
        }

        res.status(200).json({
            message: notificationSent
                ? "User approved successfully"
                : "User approved, but the notification email could not be sent",
            notificationSent,
            user,
        });
    } catch (err) {
        console.error("Error approving user:", err);
        res.status(500).json({ error: " error while approving user" });
    }
};

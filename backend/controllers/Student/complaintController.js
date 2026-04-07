const Student = require("../../models/Student");
const Complaint = require("../../models/Complaint");
const { sendEmailMessage } = require("../../mailTemplates/commonMailTemplate");
const { mailSender } = require("../../utils/mailSender");
const { formatComplaintId } = require("../../utils/complaintIdFormat");

// create complaint

exports.createComplaint = async (req, res) => {
  try {
    const { student_id, title, description } = req.body;

    if (!student_id || !title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const student = await Student.findById(student_id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }



    const complaint = await Complaint.create({
      title,
      description,
      status: "Pending",
      submittedAt: new Date(),
      student_id,
    });

    const formattedComplaint = formatComplaintId(complaint._id);

    const htmlBody = sendEmailMessage({
      title: `Your complaint , [ ${title}] Submitted Successfully`,
      message: "Your complaint has been successfully submitted. Our team will review it shortly.",
      highlightText: `complaintID: ${formattedComplaint}`
    });

    const email = student.email;

    mailSender(
      "Message from HostelBite",
      email,
      htmlBody,
    )



    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// get all complaints
exports.getAllComplaints = async (req, res) => {
  try {

    // Step 1: Delete feedbacks where student_id is null
    await Complaint.deleteMany({ student_id: null });

    // Step 2: Get all valid student IDs
    const students = await Student.find({}, "_id");
    const validStudentIds = students.map(s => s._id);

    // Step 3: Delete feedbacks with invalid student_id
    await Complaint.deleteMany({
      student_id: { $nin: validStudentIds }
    });

    const complaints = await Complaint.find()
      .populate("student_id", "name course roomNumber")
      .sort({ submittedAt: -1 });

    const formatted = complaints.map((c) => ({
      complaint_id: c._id,
      studentId: c.student_id?._id,
      studentName: c.student_id?.name,
      course: c.student_id?.course,
      roomNumber: c.student_id?.roomNumber,
      title: c.title,
      description: c.description,
      status: c.status,
      submittedAt: c.submittedAt,
      response: c.response,
      respondedAt: c.respondedAt,
    }));

    res.status(200).json(formatted);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get complaints of a perticular student

exports.getComplaintById = async (req, res) => {
  try {
    const { id } = req.params; // studentId

    const complaints = await Complaint.find({ student_id: id })
      .sort({ submittedAt: -1 });

    res.status(200).json({ complaints });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// resolve complaint

exports.updateComplaintStatus = async (req, res) => {
  try {
    const { complaint_id, response, admin_id } = req.body;

    if (!response) {
      return res.status(400).json({ message: "Response is required" });
    }

    const complaint = await Complaint.findById(complaint_id).populate("student_id");

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    //  Update complaint
    complaint.status = "Resolved";
    complaint.response = response;
    complaint.respondedAt = new Date();
    complaint.admin_id = admin_id;

    await complaint.save();

    const formattedComplaint = formatComplaintId(complaint._id);

    // email content

    const htmlBody = sendEmailMessage({
      title: "Your Complaint Has Been Resolved ",
      message: `
        Hello ${complaint.student_id.name},

        We are pleased to inform you that your complaint has been successfully reviewed and resolved by our management team.

        Below are the details:
        
        • Complaint ID: ${formattedComplaint}  
        • Resolution: ${response}

        If you have any further concerns or require additional assistance, please feel free to reach out to us.

        Thank you for your patience and for using HostelBite.
      `,
      highlightText: `Complaint ID: ${formattedComplaint}`,
      footerNote: "HostelBite Support Team"
    });

    const email = complaint.student_id.email;

    await mailSender(
      "Complaint Resolved - HostelBite",
      email,
      htmlBody
    );

    res.status(200).json({
      message: "Complaint resolved successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete complaint

exports.deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await Complaint.findByIdAndDelete(id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json({
      message: "Complaint deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
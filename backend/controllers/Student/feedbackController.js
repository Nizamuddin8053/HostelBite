const Student = require("../../models/Student");
const Feedback = require("../../models/Feedback");

const { sendEmailMessage } = require("../../mailTemplates/commonMailTemplate");
const { mailSender } = require("../../utils/mailSender");


// give feedback

exports.createFeedback = async (req, res) => {
  try {
    const { student_id, message, rating } = req.body;

    if (!student_id || !message) {
      return res.status(400).json({
        error: "Student ID and message are required"
      });
    }

    const student = await Student.findById(student_id);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const feedback = await Feedback.create({
      message,
      rating: rating || null,
      submittedAt: Date.now(),
      student_id,

    })

    const htmlBody = sendEmailMessage({
      title: "Feedback Received",
      message: "Thank you for your valuable feedback. We appreciate your effort to help us improve."
    });


    const email = student.email;

    mailSender(
      "Message from HostelBite",
      email,
      htmlBody,
    )

    return res.status(201).json({
      message: `feedback given by ${student_id}`,
    })

  } catch (error) {
    console.error("Error inserting feedback:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// get all feedback

exports.getAllFeedback = async (req, res) => {
  try {

    // Step 1: Delete feedbacks where student_id is null
    await Feedback.deleteMany({ student_id: null });

    // Step 2: Get all valid student IDs
    const students = await Student.find({}, "_id");
    const validStudentIds = students.map(s => s._id);

    // Step 3: Delete feedbacks with invalid student_id
    await Feedback.deleteMany({
      student_id: { $nin: validStudentIds }
    });


    const feedbacks = await Feedback.find().populate("student_id", "name course");

    const allFeedback = feedbacks.map((f) => {

      const date = new Date(f.submittedAt);

      const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");

      return {
        studentName: f.student_id?.name,
        course: f.student_id?.course,
        message: f.message,
        rating: f.rating,
        submittedAt: formattedDate,

      }
    });

    // Sort DESC like SQL
    allFeedback.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    res.status(200).json(allFeedback);

  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// get feedback by student 

exports.getFeedbackByStudent = async (req, res) => {
  try {
    const { student_id } = req.params;

    const student = await Student.findById(student_id);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const feedbacks = await Feedback.find({ student_id: student_id }).populate("student_id", "name course").
      sort({ submittedAt: -1 });


    const result = feedbacks.map((f) => ({
      studentName: f.student_id?.name,
      course: f.student_id?.course,
      message: f.message,
      rating: f.rating,
      submittedAt: f.submittedAt,
    }));

    res.status(200).json(result);

  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// delete feedback

// exports.deleteFeedback = async (req, res) => {
//   try {
//     const { id } = req.params; // feedbackId

//     const student = await Student.findOne({
//       "feedbacks._id": id
//     });

//     if (!student) {
//       return res.status(404).json({ error: "Feedback not found" });
//     }

//     student.feedbacks = student.feedbacks.filter(
//       (f) => f._id.toString() !== id
//     );

//     await student.save();

//     res.status(200).json({
//       message: "Feedback deleted successfully"
//     });

//   } catch (error) {
//     console.error("Error deleting feedback:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };


const Student = require("../../models/Student");

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

    student.feedbacks.push({
      message,
      rating: rating || null,
      submittedAt: new Date()
    });

    await student.save();

    res.status(201).json({
      message: "Feedback submitted successfully"
    });

  } catch (error) {
    console.error("Error inserting feedback:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// get all feedback

exports.getAllFeedback = async (req, res) => {
  try {
    const students = await Student.find();

    let allFeedback = [];

    students.forEach((student) => {
      student.feedbacks.forEach((f) => {
        allFeedback.push({
          feedbackId: f._id,
          studentId: student._id,
          studentName: student.name,
          message: f.message,
          rating: f.rating,
          submittedAt: f.submittedAt
        });
      });
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
    const { studentId } = req.params;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Sort DESC
    const feedback = student.feedbacks.sort(
      (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
    );

    res.status(200).json(feedback);

  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// delete feedback

exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params; // feedbackId

    const student = await Student.findOne({
      "feedbacks._id": id
    });

    if (!student) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    student.feedbacks = student.feedbacks.filter(
      (f) => f._id.toString() !== id
    );

    await student.save();

    res.status(200).json({
      message: "Feedback deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ error: "Server error" });
  }
};


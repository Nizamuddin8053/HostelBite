const Student = require("../../models/Student");

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

    student.complaints.push({
      title,
      description,
      status: "Pending",
      submittedAt: new Date()
    });

    await student.save();

    res.status(201).json({
      message: "Complaint submitted successfully",
      student_id
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all complaints

exports.getAllComplaints = async (req, res) => {
  try {
    const students = await Student.find();

    let allComplaints = [];

    students.forEach((student) => {
      student.complaints.forEach((c) => {
        allComplaints.push({
          complaintId: c._id,
          studentId: student._id,
          studentName: student.name,
          title: c.title,
          description: c.description,
          status: c.status,
          submittedAt: c.submittedAt,
          response: c.response,
          respondedAt: c.respondedAt
        });
      });
    });

    // sort like SQL ORDER BY DESC
    allComplaints.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    res.status(200).json(allComplaints);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get complaint by student id

exports.getComplaintById = async (req, res) => {
  try {
    const { id } = req.params; // studentId

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      complaints: student.complaints
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update complaint status

exports.updateComplaintStatus = async (req, res) => {
  try {
    const { complaint_id, response } = req.body;

    if (!response) {
      return res.status(400).json({ message: "Response is required" });
    }

    // Find student containing this complaint
    const student = await Student.findOne({
      "complaints._id": complaint_id
    });

    if (!student) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const complaint = student.complaints.id(complaint_id);

    complaint.status = "Resolved";
    complaint.response = response;
    complaint.respondedAt = new Date();

    await student.save();

    res.status(200).json({
      message: "Complaint status updated successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete complaint

exports.deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params; // complaintId

    const student = await Student.findOne({
      "complaints._id": id
    });

    if (!student) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    student.complaints = student.complaints.filter(
      (c) => c._id.toString() !== id
    );

    await student.save();

    res.status(200).json({
      message: "Complaint deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
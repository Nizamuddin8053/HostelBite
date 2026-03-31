const SalarySlip = require("../../models/SalarySlip");

// Create salary record
exports.createSalary = async (req, res) => {
  try {
    const { staff_id, amount, month, status } = req.body;

    if (!staff_id || !amount || !month) {
      return res.status(400).json({
        error: "Staff ID, amount, and month are required",
      });
    }

    const salary = await SalarySlip.create({
      staffId: staff_id,
      amount,
      forMonth: new Date(month),
      status: status || "pending",
    });

    res.status(201).json({
      message: "Salary record created successfully",
      salaryId: salary._id,
    });

  } catch (err) {
    console.error("Error inserting salary:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// Get all salaries
exports.getAllSalaries = async (req, res) => {
  try {
    const salaries = await SalarySlip.find()
      .populate("staffId", "name role") 
      .sort({ createdAt: -1 });

    res.status(200).json(salaries);

  } catch (err) {
    console.error("Error fetching salaries:", err);
    res.status(500).json({ error: "Database error" });
  }
};


// Get salary by ID
exports.getSalaryById = async (req, res) => {
  try {
    const { id } = req.params;

    const salary = await SalarySlip.findById(id)
      .populate("staffId", "name role email");

    if (!salary) {
      return res.status(404).json({
        error: "Salary record not found",
      });
    }

    res.status(200).json(salary);

  } catch (err) {
    console.error("Error fetching salary:", err);
    res.status(500).json({ error: "Database error" });
  }
};


// Get salaries by staff
exports.getSalariesByStaff = async (req, res) => {
  try {
    const { staffId } = req.params;

    const salaries = await SalarySlip.find({ staffId })
      .sort({ createdAt: -1 });

    res.status(200).json(salaries);

  } catch (err) {
    console.error("Error fetching staff salaries:", err);
    res.status(500).json({ error: "Database error" });
  }
};


// Update salary status
exports.updateSalaryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        error: "Status is required",
      });
    }

    const updatedSalary = await SalarySlip.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedSalary) {
      return res.status(404).json({
        error: "Salary record not found",
      });
    }

    res.status(200).json({
      message: "Salary status updated successfully",
      data: updatedSalary,
    });

  } catch (err) {
    console.error("Error updating salary:", err);
    res.status(500).json({ error: "Database error" });
  }
};


// Delete salary record
exports.deleteSalary = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSalary = await SalarySlip.findByIdAndDelete(id);

    if (!deletedSalary) {
      return res.status(404).json({
        error: "Salary record not found",
      });
    }

    res.status(200).json({
      message: "Salary record deleted successfully",
    });

  } catch (err) {
    console.error("Error deleting salary:", err);
    res.status(500).json({ error: "Database error" });
  }
};

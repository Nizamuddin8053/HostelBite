const SalarySlip = require("../../models/SalarySlip");
const Staff = require("../../models/Staff");
const mongoose = require("mongoose");

// Create salary record
exports.createSalary = async (req, res) => {
  try {
    const { staff_id, amount, month } = req.body;

    const salaryAmount = Number(amount);
    if (
      !staff_id ||
      !mongoose.isValidObjectId(staff_id) ||
      !Number.isFinite(salaryAmount) ||
      salaryAmount <= 0 ||
      typeof month !== "string" ||
      !/^\d{4}-\d{2}$/.test(month)
    ) {
      return res.status(400).json({
        error: "A staff member, valid month, and positive salary amount are required",
      });
    }

    const forMonth = new Date(`${month}-01T00:00:00.000Z`);
    const [year, monthNumber] = month.split("-").map(Number);
    if (
      Number.isNaN(forMonth.getTime()) ||
      monthNumber < 1 ||
      monthNumber > 12 ||
      forMonth.getUTCFullYear() !== year ||
      forMonth.getUTCMonth() !== monthNumber - 1
    ) {
      return res.status(400).json({ error: "Enter a valid salary month" });
    }

    const staff = await Staff.findOne({ _id: staff_id, approved: true }).select("_id");
    if (!staff) {
      return res.status(404).json({ error: "Approved staff member not found" });
    }

    const existingSlip = await SalarySlip.findOne({ staffId: staff._id, forMonth });
    if (existingSlip) {
      return res.status(409).json({ error: "A salary slip already exists for this staff member and month" });
    }

    const salary = await SalarySlip.create({
      staffId: staff._id,
      amount: salaryAmount,
      forMonth,
    });

    res.status(201).json({
      message: "Salary slip generated successfully",
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
      .populate("staffId", "name role email")
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

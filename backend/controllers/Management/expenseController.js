const Expense = require("../../models/Expense");


exports.createExpense = async (req, res) => {
  try {
    const { title, category, date, description, qty, rateKg, managementId } = req.body;

    if (!title || !qty || !rateKg || !category || !date) {
      return res.status(400).json({
        error: "Title, quantity, rateKg, category, and date are required"
      });
    }

    const amount = qty * rateKg;

    const newExpense = await Expense.create({
      title,
      category,
      date,
      description,
      qty,
      rateKg,
      amount,
      managementId
    });

    res.status(201).json({
      message: "Expense added successfully",
      expenseId: newExpense._id
    });

  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.getAllExpenses = async (req, res) => {
  try {
    // 1. Get all expenses
    const expenses = await Expense.find().sort({ date: -1 });

    // 2. Total Amount
    const totalResult = await Expense.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);

    // 3. Category Breakdown
    const categoryBreakdown = await Expense.aggregate([
      {
        $group: {
          _id: "$category",
          categoryTotal: { $sum: "$amount" }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          categoryTotal: 1
        }
      }
    ]);

    res.status(200).json({
      expenses,
      totalAmount: totalResult[0]?.totalAmount || 0,
      categoryBreakdown
    });

  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.status(200).json(expense);

  } catch (error) {
    console.error("Error fetching expense:", error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.updateExpense = async (req, res) => {
  try {
    const { title, category, date, description, qty, rateKg } = req.body;

    let updateData = { title, category, date, description };

    // If qty or rateKg updated → recalculate amount
    if (qty && rateKg) {
      updateData.qty = qty;
      updateData.rateKg = rateKg;
      updateData.amount = qty * rateKg;
    }

    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.status(200).json({
      message: "Expense updated successfully",
      data: updated
    });

  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });

  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ error: "Server error" });
  }
};


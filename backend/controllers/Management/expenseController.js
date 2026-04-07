const Expense = require("../../models/Expense");


exports.createExpense = async (req, res) => {
  try {
    const { item, category, date, description, qty, rateKg, managementId , amount} = req.body;

    if (!item || !qty || !rateKg || !category || !date || !amount) {
      return res.status(400).json({
        error: "item, quantity, rateKg, category, and date are required"
      });
    }

    

    const newExpense = await Expense.create({
      item,
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


exports.getMonthlyCategoryExpenses = async (req, res) => {
  try {
    const { year } = req.query;

    let matchStage = {};

    if (year) {
      matchStage = {
        date: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      };
    }

    const data = await Expense.aggregate([
      { $match: matchStage },

      // Step 1: Group by month + category
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            category: "$category"
          },
          totalSpent: { $sum: "$amount" }
        }
      },

      // Step 2: Group again by month
      {
        $group: {
          _id: "$_id.month",
          categories: {
            $push: {
              category: "$_id.category",
              totalSpent: "$totalSpent"
            }
          },
          monthlyTotal: { $sum: "$totalSpent" }
        }
      },

      // Step 3: Add month name
      {
        $addFields: {
          month: {
            $arrayElemAt: [
              [
                "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
              ],
              "$_id"
            ]
          }
        }
      },

      // Step 4: Clean response
      {
        $project: {
          _id: 0,
          month: 1,
          monthlyTotal: 1,
          categories: 1
        }
      },

      { $sort: { _id: 1 } }
    ]);


    console.log(data);

    res.status(200).json({
      success: true,
      data: data,
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


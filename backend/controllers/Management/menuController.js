const WeeklyMenu = require("../../models/Menu");
const {sendEmailMessage} = require("../../mailTemplates/commonMailTemplate");
const {mailSender} = require("../../utils/mailSender");
const Student = require("../../models/Student");
const Staff = require("../../models/Staff");

// Add new menu (weekly)

exports.createMenu = async (req, res) => {
  try {
    const {
      weekStartDate,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      managementId
    } = req.body;

    //  validation
    if (!weekStartDate || !managementId) {
      return res.status(400).json({
        error: "weekStartDate and managementId are required"
      });
    }

    const startOfDay = new Date(weekStartDate);
    startOfDay.setHours(0, 0, 0, 0);

    //Check if menu already exists for that week
    const existingMenu = await WeeklyMenu.findOne({ weekStartDate });

    if (existingMenu) {
      return res.status(400).json({
        error: "Menu for this week already exists"
      });
    }

    // 
    const newMenu = await WeeklyMenu.create({
      weekStartDate,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      managementId
    });



    res.status(201).json({
      message: "Weekly menu created successfully",
      data: newMenu
    });

  } catch (error) {
    console.error("Error creating weekly menu:", error);
    res.status(500).json({ error: "Server error" });
  }
};




// get latest menu

exports.getLatestMenu = async (req, res) => {
  try {
    const menu = await WeeklyMenu.findOne().sort({ createdAt: -1 });

    if (!menu) {
      return res.status(404).json({
        message: "No menu found"
      });
    }

    res.status(200).json(menu);

  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({
      error: "Server error"
    });
  }
};


// update menu

exports.updateMenu = async (req, res) => {
  try {
    let updateData = req.body;

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        error: "No update data provided"
      });
    }

    // Normalize arrays (important for safety)
    const normalizeMeals = (dayObj) => {
      if (!dayObj) return dayObj;

      ["breakfast", "lunch", "snacks", "dinner"].forEach((meal) => {
        if (dayObj[meal] && !Array.isArray(dayObj[meal])) {
          dayObj[meal] = [dayObj[meal]];
        }
      });

      return dayObj;
    };

    // Handle full day updates
    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ];

    days.forEach((day) => {
      if (updateData[day]) {
        updateData[day] = normalizeMeals(updateData[day]);
      }
    });

    // Update OR Create (only one doc in DB)
    const updatedMenu = await WeeklyMenu.findOneAndUpdate(
      {},                         // always target single doc
      { $set: updateData },       // partial update supported
      {
        new: true,
        upsert: true,             // create if not exists
        runValidators: true
      }
    );


    // send email to all students and all staff(updation notification)

    const students = await Student.find().select("email");
    const staffs = await Staff.find().select("email");

    // extract emails

    const studentEmails = students.map((s)=> s.email);
    const staffEmails = staffs.map((st)=> st.email);

    // merge all mails

    const allEmails = [...studentEmails, ...staffEmails];

    // unique emails

    const uniqueEmails = [...new  Set(allEmails)];


    const htmlBody = sendEmailMessage({
      title: "Menu updated",
      message:"your mess menu is updated on the basis of reviews and feedbacks",
      highlightText: `${process.env.FRONTEND_URL}/api/menu/latest-menu`
    })


    // send emails 

    for (const email of uniqueEmails) {
  try {
    await mailSender(
      "Menu update from HostelBite",
      email,
      htmlBody
    );
  } catch (err) {
    console.log("Failed for:", email);
  }
}




    



    res.status(200).json({
      message: "Menu updated successfully",
      data: updatedMenu
    });

  } catch (error) {
    console.error("Error updating menu:", error);
    res.status(500).json({
      error: "Server error"
    });
  }
};




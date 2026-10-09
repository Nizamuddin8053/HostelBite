require("dotenv").config({ path: require("path").join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const connectDB= require("./config/Database");



// routes
const authRoutes = require("./routes/LoginSignupRoute");
const studentRoutes = require("./routes/studentRoute");
const attendanceRoutes = require("./routes/attendanceRoute");
const complaintRoutes = require("./routes/complaintRoute");
const expenseRoutes = require("./routes/expenseRoute");
const feedbackRoutes = require("./routes/feedbackRoute");
const invoiceRoutes = require("./routes/invoiceRoute");
const managementRoutes = require("./routes/managementRoute");
const menuRoutes = require("./routes/menuRoute");
const notificationRoutes = require("./routes/notificationRoute");
const salaryRoutes = require("./routes/salaryRoute");
const staffRoutes = require("./routes/staffRoute");
const paymentRoutes = require("./routes/paymentRoutes");
const userApproveRoutes = require("./routes/approveUserRoutes");
const commonRoutes = require("./routes/commonRoutes");
const { auth } = require("./middlewares/auth");

// const qrRoutes = require("./routes/qrRoutes");


const app = express();
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  credentials: true
}));



app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", auth);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/management", managementRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/userApprove", userApproveRoutes);
app.use("/api/common", commonRoutes);
// app.use("/api/qr", qrRoutes);


// to check backend 
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

if (require.main === module) {
  startServer().catch((error) => {
    console.error("Server startup failed:", error);
    process.exitCode = 1;
  });
}

module.exports = app;

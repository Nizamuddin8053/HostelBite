const express = require("express");
const cors = require("cors");
const dbConnection= require("./config/Database");



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






require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/management", managementRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 5000;

dbConnection.connect(err=> {
  if(err){
    console.log("DB connection error",err);
  }else{
    console.log(`db connection successfull`);
  }
});

// server is running or not 

app.listen(PORT, ()=>{
  console.log(`server is running on ${PORT}`);
})

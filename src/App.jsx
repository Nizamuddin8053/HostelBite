import React from "react";
import {Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "./components/common/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Services from "./components/pages/Services";
import Contact from "./components/pages/Contact";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import UserNotifications from "./components/common/UserNotifications";


// import student components
import StudentLayout from "./components/dashboard/StudentLayout";
import StudentDashboard from "./components/dashboard/StudentDashboard";

import ComplaintSection from "./components/student/ComplaintSection";
import FeedbackSection from "./components/student/FeedbackSection";
import NotificationSection from "./components/student/NotificationSection";
import PaymentSection from "./components/student/PaymentSection";
import MenuSection from "./components/common/Menu";
import MarkAttendance from "./components/student/MarkAttendance";


import SubmitComplaint from "./components/student/studentFunctions/SubmitComplaint";
import SubmitFeedback from "./components/student/studentFunctions/GiveFeedback"
import GetAllComplaintsByStudent from "./components/student/studentFunctions/GetAllComplaints";  
import ViewMenu from "./components/management/manageFunctions/menuFunctions/ViewMenu";
import MessPayment from "./components/student/studentFunctions/MessPayment";
import ScanQR from "./components/student/studentFunctions/ScanQR";

// import admin components
import AdminDashboard from "./components/dashboard/AdminDashboard";
import AdminLayout from "./components/dashboard/AdminLayout";

import ManageFeedbackAttendance from "./components/management/ManageFeedbackAttendance";
import ManageMenuExpenses from "./components/management/ManageMenuExpenses";
import ManagePaymentInvoice from "./components/management/ManagePaymentInvoice";
import ManageStaffSalary from "./components/management/ManageStaffSalary";
import ManageComplaintNotification from "./components/management/MangeComplaintNotification";
import UserManagement from "./components/management/UserManagement";

import FeedbackList from "./components/common/FeedbackList";
import MenuItems from "./components/management/manageFunctions/MenuItems";
import CreateMenu from "./components/management/manageFunctions/menuFunctions/CreateMenu";
import UpdateMenu from "./components/management/manageFunctions/menuFunctions/UpdateMenu";
import DeleteMenu from "./components/management/manageFunctions/menuFunctions/DeleteMenu";
import AddExpense from "./components/management/manageFunctions/expenseFunctions/AddExpense";
import ExpenseItems from "./components/management/manageFunctions/ExpenseItems";
import ViewExpenses from "./components/management/manageFunctions/expenseFunctions/ViewExpenses";
import AllComplaints from "./components/management/manageFunctions/complaintFunctions/AllComplaints";
import QRDisplay from "./components/management/manageFunctions/attendance/QRDisplay";
import RemoveStudents from "./components/management/manageFunctions/userManagement/RemoveStudents";
import SendNotification from "./components/management/manageFunctions/notification/SendNotification";


// import staff components
import StaffDashboard from "./components/dashboard/StaffDashboard";
import StaffLayout from "./components/dashboard/StaffLayout";
import ComplaintNotification from "./components/staff/ComplaintNotification";
import FeedbackAttendance from "./components/staff/FeedbackAttendance";
import SalarySection from "./components/staff/SalarySection";




function App() {

  
  // const token = localStorage.getItem("token");
  // const decoded = jwtDecode(token);
  // const role = decoded.role;
  // const userId = decoded.id;


 

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      <Navbar />
      <div className="p-8">
        <Routes>


          {/* common routes */}

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/userNotification" element={<UserNotifications />}/>


          {/* Student Routes */}


          <Route path="/student-dashboard" element={<StudentLayout />}>

             {/* Default dashboard */}
            <Route index element={<StudentDashboard />} />
            <Route path="complaint-section" element={<ComplaintSection />}/>
            <Route path="feedback-section" element={<FeedbackSection />}/>
            <Route path="menu-section" element={<MenuSection />}/>
            <Route path="notification-section" element={<NotificationSection />}/>
            <Route path="payment-section" element={<PaymentSection />}/>
          </Route>

              

          {/* admin routes */}

          <Route path="/admin-dashboard" element={<AdminLayout/>}>
            <Route index element={<AdminDashboard />} />
            <Route path="feedback-section" element={<ManageFeedbackAttendance />}/>
            <Route path="menu-section" element={<ManageMenuExpenses />}/>
            <Route path="payments-section" element={<ManagePaymentInvoice />}/>
            <Route path="salary-section" element={<ManageStaffSalary/>}/>
            <Route path="complaints-section" element={<ManageComplaintNotification />}/>
            <Route path="users-section" element={<UserManagement />}/>
          </Route>


          {/* staff routes */}

          <Route path="/staff-dashboard" element={<StaffLayout/>}>
            <Route index element={<StaffDashboard/>}/>
            <Route path="complaints-section" element={<ComplaintNotification/>}/>
            <Route path="feedback-section" element={<FeedbackAttendance/>}/>
            <Route path="salary-section" element={<SalarySection/>}/>
            <Route path="menu-section" element={<MenuSection/>}/>
          </Route>
          

          {/* student action routes */}
          <Route path="submit-complaint" element={<SubmitComplaint />} />
          <Route path="submit-feedback" element={<SubmitFeedback />} />
          <Route path="view-menu" element={<ViewMenu />} />
          <Route path="complaints" element={<GetAllComplaintsByStudent />} /> 
          <Route path="/student/make-payment" element={<MessPayment />} />
          <Route path="/mark-attendance" element={<ScanQR />} />
          <Route path="/mark-attendance" element={<MarkAttendance />} />

    

          {/* <Route path="/student-dashboard" element={<StudentDashboard />} /> */}
          {/* <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/staff-dashboard" element={<StaffDashboard />} /> */}



          {/* admin action routes */}
          <Route path="/add-menu" element={<CreateMenu />} />
          <Route path="/update-menu" element={<UpdateMenu />} />
          <Route path="/management/menu/menu-items" element={<MenuItems />} />
          <Route path="/delete-menu" element={<DeleteMenu />} />
          <Route path="feedback-list" element={<FeedbackList />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/view-expenses" element={<ViewExpenses />} />
          <Route path="/management/expense/expense-items" element={<ExpenseItems />} />
          {/* Complaints  */}
          <Route path="all-complaints" element={<AllComplaints />} />
          <Route path="get-attendance-qr" element={<QRDisplay />} />
          <Route path ="/remove-students" element={<RemoveStudents/>}/>
          <Route path= "/send-notification" element={<SendNotification/>}/>

          
    

        </Routes>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";
import Error from "./components/common/Error";
import { ACCOUNT_TYPE } from "./utils/constants";


//  ****************************************common folder import*************************************************

import Navbar from "./components/common/Navbar";
import UserNotifications from "./components/common/UserNotifications";
import MenuSection from "./components/common/MenuSection";
import FeedbackList from "./components/common/FeedbackList";
import Footer from "./components/common/Footer";


// ******************************************page folder import***************************************************

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Services from "./components/pages/Services";
import Contact from "./components/pages/Contact";




// *******************************************auth folder import****************************************************

import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import UpdatePassword from "./components/auth/UpdatePassword";

// *********************************************dashboard folder******************************************************


//   **********************************************8dashboard folder import(student)*************************************

import StudentLayout from "./components/dashboard/StudentLayout";
import StudentDashboard from "./components/dashboard/StudentDashboard";



//   ****************************************************dashboard folder import(admin)**********************************

import AdminDashboard from "./components/dashboard/AdminDashboard";
import AdminLayout from "./components/dashboard/AdminLayout";




//   ********************************************************dashboard folder import(staff)********************************

import StaffDashboard from "./components/dashboard/StaffDashboard";
import StaffLayout from "./components/dashboard/StaffLayout";



// *****************************************************************student folder import******************************************

// *****************************************************************student sections(cards)*************************************


import ComplaintSection from "./components/student/ComplaintSection";
import FeedbackSection from "./components/student/FeedbackSection";
import NotificationSection from "./components/student/NotificationSection";
import PaymentSection from "./components/student/PaymentSection";



// *************************************************************student card functions*****************************************

import MarkAttendance from "./components/student/studentFunctions/MarkAttendance";
import SubmitComplaint from "./components/student/studentFunctions/SubmitComplaint";
import SubmitFeedback from "./components/student/studentFunctions/GiveFeedback"
import GetAllComplaintsByStudent from "./components/student/studentFunctions/GetAllComplaints";
import MessPayment from "./components/student/studentFunctions/MessPayment";
import ViewInvoices from "./components/student/studentFunctions/ViewInvoices";



//  ***************************************************************admin sections (cards)***************************************

//  ***********************************************************there are 6 cards**************************************************

import ManageFeedbackAttendance from "./components/management/ManageFeedbackAttendance";
import ManageMenuExpenses from "./components/management/ManageMenuExpenses";
import ManagePaymentInvoice from "./components/management/ManagePaymentInvoice";
import ManageStaffSalary from "./components/management/ManageStaffSalary";
import ManageComplaintNotification from "./components/management/MangeComplaintNotification";
import UserManagement from "./components/management/UserManagement";

// ***********************************************************admin card menu functions****************************************** 

import MenuItems from "./components/management/manageFunctions/MenuItems";
import UpdateMenu from "./components/management/manageFunctions/menuFunctions/UpdateMenu";
import ViewMenu from "./components/management/manageFunctions/menuFunctions/ViewMenu";


// **************************************************************admin card expense functions*******************************************8

import ExpenseItems from "./components/management/manageFunctions/ExpenseItems";
import AddExpense from "./components/management/manageFunctions/expenseFunctions/AddExpense";
import ViewExpenses from "./components/management/manageFunctions/expenseFunctions/ViewExpenses";
import ViewMonthlyExpenses from "./components/management/manageFunctions/expenseFunctions/ViewMonthlyExpenses"

// ***********************************************************admin card complaint functions******************************************

import AllComplaints from "./components/management/manageFunctions/complaintFunctions/AllComplaints";


// ****************************************************admin card attendance functions*************************************************

// import QRDisplay from "./components/management/manageFunctions/attendance/QRDisplay";

// **************************************************admin user management functions*********************************************

import RemoveStudents from "./components/management/manageFunctions/userManagement/RemoveStudents";
import RemoveStaff from "./components/management/manageFunctions/userManagement/RemoveStaff";

// ****************************************************admin notification card functions**********************************************

import SendNotification from "./components/management/manageFunctions/notification/SendNotification";

// *********************************************************admin payment and invoice card functions****************************

import GenerateInvoice from "./components/management/manageFunctions/paymentAndInvoice/GenerateInvoice";

// ********************************************admin staff salary functions*****************************

import ApproveStaff from "./components/management/manageFunctions/staffSalaryFunctions/ApproveStaff";
import AllStaff from "./components/management/manageFunctions/staffSalaryFunctions/AllStaff";
import UpdateStaffSalary from "./components/management/manageFunctions/staffSalaryFunctions/UpdateStaffSalary";




// ****************************************************staff folder************************************************

// ********************************************************staff card sections****************************************************


import ComplaintNotification from "./components/staff/ComplaintNotification";
import FeedbackAttendance from "./components/staff/FeedbackAttendance";
import SalarySection from "./components/staff/SalarySection";





function App() {


  const token = localStorage.getItem("token");

  let role = null;
  let userId = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
      userId = decoded.id;
    } catch (error) {
      console.log("Invalid token");
    }
  }


  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overflow-x-hidden">
      <Navbar />
      <div className="flex-grow ">
        <Routes>


          {/* common routes */}

          <Route path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            } />

          <Route path="/about" element={
            <PublicRoute>
              <About />
            </PublicRoute>
          } />

          <Route path="/services"
            element={
              <PublicRoute>
                <Services />
              </PublicRoute>
            } />

          <Route path="/contact"
            element={
              <PublicRoute>
                <Contact />
              </PublicRoute>
            } />

          <Route path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            } />

          <Route path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />

          <Route path="/update-password"
            element={
              <PublicRoute>
                <UpdatePassword />
              </PublicRoute>
            } />

          <Route path="*"
            element={
              <PublicRoute>
                <Navigate to="/" />
              </PublicRoute>
            } />

          <Route path="/latest-menu" element={
            <PrivateRoute allowedRoles={[ACCOUNT_TYPE.ADMIN, ACCOUNT_TYPE.STAFF, ACCOUNT_TYPE.STUDENT]}>
              <ViewMenu />
            </PrivateRoute>
          } />
          <Route path="/userNotification"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.STUDENT]}>
                <UserNotifications userId={userId} role={role} />
              </PrivateRoute>
            } />


          {/* unauthorize access page */}
          <Route path="/unauthorized" element={<Error />} />





          {/* protected route for student dashboard */}

          <Route
            path="/student-dashboard"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.STUDENT]}>
                <StudentLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<StudentDashboard />} />
            <Route path="complaint-section" element={<ComplaintSection />} />
            <Route path="feedback-section" element={<FeedbackSection />} />
            <Route path="menu-section" element={<MenuSection />} />
            <Route path="notification-section" element={<NotificationSection />} />
            <Route path="payment-section" element={<PaymentSection />} />
          </Route>



          {/* protected route for admin dashboard */}

          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.ADMIN]}>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="feedback-section" element={<ManageFeedbackAttendance />} />
            <Route path="payments-section" element={<ManagePaymentInvoice />} />
            <Route path="menu-expense-section" element={<ManageMenuExpenses />} />
            <Route path="salary-section" element={<ManageStaffSalary />} />
            <Route path="complaints-section" element={<ManageComplaintNotification />} />
            <Route path="users-section" element={<UserManagement />} />
          </Route>



          {/* protected route for staff dashboard */}



          <Route
            path="/staff-dashboard"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.STAFF]}>
                <StaffLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<StaffDashboard />} />
            <Route path="menu-section" element={<MenuSection />} />
            <Route path="complaints-section" element={<ComplaintNotification />} />
            <Route path="feedback-section" element={<FeedbackAttendance />} />
            <Route path="salary-section" element={<SalarySection />} />
          </Route>




          {/* student action routes */}

          <Route path="/submit-complaint"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.STUDENT]}>
                <SubmitComplaint />
              </PrivateRoute>}
          />


          <Route path="/submit-feedback"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.STUDENT]}>
                <SubmitFeedback />
              </PrivateRoute>
            }
          />

          <Route path="/complaints"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.ADMIN, ACCOUNT_TYPE.STAFF, ACCOUNT_TYPE.STUDENT]}>
                <GetAllComplaintsByStudent />
              </PrivateRoute>
            } />

          <Route path="student/make-payment"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.STUDENT]}>
                <MessPayment />
              </PrivateRoute>
            } />

          <Route path="/mark-attendance"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.STUDENT]}>
                <MarkAttendance />
              </PrivateRoute>
            } />

          <Route path="/view-invoice-history"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.STUDENT]}>
                <ViewInvoices student_id={userId} />
              </PrivateRoute>
            } />







          {/* admin action routes */}

          <Route path="/update-menu"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.ADMIN]}>
                <UpdateMenu />
              </PrivateRoute>
            } />

          <Route path="/management/menu/menu-items"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.ADMIN]}>
                <MenuItems />
              </PrivateRoute>
            } />

          <Route path="/feedback-list"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.ADMIN, ACCOUNT_TYPE.STAFF]}>
                <FeedbackList />
              </PrivateRoute>
            } />

          <Route path="/add-expense"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.ADMIN]}>
                <AddExpense />
              </PrivateRoute>
            } />

          <Route path="/view-expenses"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.ADMIN]}>
                <ViewExpenses />
              </PrivateRoute>
            } />

          <Route path="/view-monthly-expenses"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.ADMIN]}>
                <ViewMonthlyExpenses />
              </PrivateRoute>

            } />

          <Route path="/management/expense/expense-items"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.ADMIN]}>
                <ExpenseItems />
              </PrivateRoute>
            } />

          {/* Complaints  */}
          <Route path="/all-complaints"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.ADMIN]}>
                <AllComplaints />
              </PrivateRoute>
            } />

          {/* <Route path="/get-attendance-qr"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.ADMIN]}>
                <QRDisplay />
              </PrivateRoute>
            } /> */}

          <Route path="/remove-students"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.ADMIN]}>
                <RemoveStudents />
              </PrivateRoute>
            } />

          <Route path="/remove-staff"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.ADMIN]}>
                <RemoveStaff />
              </PrivateRoute>
            } />



          <Route path="/send-notification"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.ADMIN]}>
                <SendNotification />
              </PrivateRoute>
            } />
          {/* payment and invoice */}

          <Route
            path="/generate-invoice"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.ADMIN]}>
                <GenerateInvoice />
              </PrivateRoute>
            }
          />


          {/* staff salary  */}

          <Route path="/approve-staff"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.ADMIN]}>
                <ApproveStaff />
              </PrivateRoute>
            } />

          <Route path="/get-all-staff"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.ADMIN]}>
                <AllStaff />
              </PrivateRoute>
            } />
          <Route path="/update-staff-salary"
            element={
              <PrivateRoute allowedRoles={[ACCOUNT_TYPE.ADMIN]}>
                <UpdateStaffSalary />
              </PrivateRoute>
            } />




        </Routes>
      </div>


      <Footer/>


    </div>
  );
}

export default App;

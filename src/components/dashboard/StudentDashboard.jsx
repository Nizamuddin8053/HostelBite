

import React from "react";
// import Navbar from "../common/Navbar";
import ComplaintSection from "../student/ComplaintSection";
import FeedbackSection from "../student/FeedbackSection";
import MenuSection from "../common/Menu";
import NotificationSection from "../student/NotificationSection";
import PaymentSection from "../student/PaymentSection";
import Sidebar from "../common/Sidebar";


const StudentDashboard =()=>{
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="student" />
      <div className="flex-1 flex flex-col">
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <ComplaintSection />
          <FeedbackSection />
          <MenuSection />
          <PaymentSection />
          <NotificationSection />
          
        </div>
      </div>

      

    </div>
  );
}

export default StudentDashboard;


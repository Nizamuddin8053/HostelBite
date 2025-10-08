import React from "react";
import {Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Services from "./components/pages/Services";
import Contact from "./components/pages/Contact";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import StudentDashboard from "./components/dashboard/StudentDashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import StaffDashboard from "./components/dashboard/StaffDashboard";


function App() {

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      <Navbar />
      <div className="p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/staff-dashboard" element={<StaffDashboard />} />


        </Routes>
      </div>
    </div>
  );
}

export default App;

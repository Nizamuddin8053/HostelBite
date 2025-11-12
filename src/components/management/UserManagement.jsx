import React from "react";
import { User, ClipboardList } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
    const navigate = useNavigate();

    const removeHandler = ()=>{
        navigate("/remove-students");

    }


    return (
        <div className="bg-white p-5 rounded-2xl shadow-md">
            <div className="flex items-center mb-3">
                <User className="text-indigo-600 mr-2" />
                <h2 className="text-lg font-semibold">User Management</h2>
            </div>

            <p className="text-gray-600 mb-3">
                Manage Students and Staff
            </p>

            <div className="flex gap-3 flex-wrap">

                <button onClick={removeHandler} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                    Remove Student
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    Remove Staff
                </button>
            </div>
        </div>
    );
}
export default UserManagement;

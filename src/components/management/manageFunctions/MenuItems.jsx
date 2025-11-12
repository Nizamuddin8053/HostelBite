import React from "react";
import { useNavigate } from "react-router-dom";

const MenuItems = () => {
    const navigate = useNavigate();

    const addMenuHandler = () => {
        navigate("/add-menu");
    }
    const updateMenuHandler = () => {
        navigate("/update-menu");
    }
    const deleteMenuHandler = () => {
        navigate("/delete-menu");
    }
    const viewMenuHandler = () => {
        navigate("/view-menu");
    }

    return (
        <div className="flex flex-wrap justify-center gap-4 mt-10">
            <button
                onClick={addMenuHandler}
                
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                add menu
            </button>

            <button
                onClick={updateMenuHandler}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
                update menu
            </button>

            <button
                onClick={deleteMenuHandler}
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
                delete menu
            </button>

            <button
                onClick={viewMenuHandler}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
                view menu
            </button>
        </div>
    );
};

export default MenuItems;

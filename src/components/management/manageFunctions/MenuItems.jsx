
import { useNavigate } from "react-router-dom";

const MenuItems = () => {
    const navigate = useNavigate();

    const updateMenuHandler = () => {
        navigate("/update-menu");
    }
    
    const viewMenuHandler = () => {
        navigate("/latest-menu");
    }

    return (
        <div className="flex flex-wrap justify-center gap-4 mt-10">
            

            <button
                onClick={updateMenuHandler}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
                update menu
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

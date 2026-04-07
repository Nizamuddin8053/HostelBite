import { Utensils } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MenuSection = () => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate("/latest-menu");
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">
      
      <div className="flex items-center mb-3">
        <Utensils className="text-green-600 mr-2" />
        <h2 className="text-lg font-semibold">Weekly Menu</h2>
      </div>

      <p className="text-gray-600 mb-3">
        Check the latest weekly menu for all meals including breakfast, lunch, snacks, and dinner.
      </p>

      <button
        onClick={handleMenuClick}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        View Menu
      </button>

    </div>
  );
};

export default MenuSection;
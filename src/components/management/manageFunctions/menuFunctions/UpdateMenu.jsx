import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Spinner from "../../../common/Spinner";
import { useNavigate } from "react-router-dom";
import showToast from "../../../../utils/showToast";
import { TOAST_TYPE } from "../../../../utils/constants";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const meals = ["breakfast", "lunch", "snacks", "dinner"];

const UpdateMenu = () => {

  const navigate = useNavigate();




  const [menu, setMenu] = useState({});
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [loading, setLoading] = useState(false);


  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const management_id = decoded.id;

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/menu/latest-menu`
      );

      if (res.data) {
        setMenu(res.data);
        setIsFirstTime(false);
        setLoading(false);
      }
    } catch (err) {
      console.log("No menu found → first time create");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleChange = (day, meal, value) => {
    setMenu((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: value.split(",").map((i) => i.trim()),
      },
    }));
  };

  const isComplete = days.every((day) =>
    meals.every((meal) => menu?.[day]?.[meal]?.length)
  );

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (isFirstTime) {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/menu/create-menu`,
          {
            weekStartDate: new Date().toISOString().split("T")[0],
            ...menu,
            managementId: management_id,
          }
        );

        showToast("Menu created successfully!", TOAST_TYPE.SUCCESS);


        navigate("/admin-dashboard");

      } else {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/api/menu/update-menu`,
          {
            weekStartDate: new Date().toISOString().split("T")[0],
            ...menu,
            managementId: management_id,

          }
        );
        setLoading(false);


        showToast("Menu updated successfully!", TOAST_TYPE.SUCCESS);

        

        navigate("/admin-dashboard");
      }
    } catch (err) {
      console.error("Error:", err);

      showToast("failed to update", TOAST_TYPE.ERROR);
      

    } finally {
      setLoading(false);
    }
  };

  return (

    loading ?
      <div className="flex flex-col gap-2 justify-center items-center h-[calc(100vh-64px)]">
        <Spinner />
        <h3>updating.......</h3>
      </div>
      :
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-2xl">

        <h2 className="text-2xl font-bold mb-6 text-center">
          {isFirstTime ? "Create Weekly Menu" : "Update Weekly Menu"}
        </h2>

        {days.map((day) => (
          <div key={day} className="mb-6 border-b pb-4">

            <h3 className="text-lg font-semibold capitalize mb-3 text-blue-600">
              {day}
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {meals.map((meal) => (
                <div key={meal} className="flex flex-col">

                  <label className="capitalize text-sm font-medium mb-1">
                    {meal}
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Poha, Jalebi"
                    defaultValue={menu?.[day]?.[meal]?.join(", ") || ""}
                    onChange={(e) =>
                      handleChange(day, meal, e.target.value)
                    }
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}
            </div>

          </div>
        ))}

        <div className="text-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={isFirstTime && !isComplete}
            className={`px-6 py-2 rounded-xl font-semibold text-white transition 
            ${isFirstTime && !isComplete
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            Update Menu
          </button>
        </div>

      </div>
  );
};

export default UpdateMenu;
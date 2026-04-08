import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast,Bounce } from "react-toastify";
import Spinner from "../common/Spinner";

const UpdatePassword = ()=>{

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e)=>{
        setFormData(
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        )

    }


    const handleSubmit = async (e)=>{
        e.preventDefault();


        if(!formData.email){
            toast.error("enter your email", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
            });
            return;

        }

        setLoading(true);

        try{
            await axios.put(`${process.env.REACT_APP_API_URL}/api/auth/forgot-password`,{
                email: formData.email,
            });

            toast.success('🦄 password update email sent successfully ', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
            });
            setLoading(false);

            navigate("/login"); 
        }catch(error){

            toast.error(error.response?.data?.message|| "account not exist!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
            });
            setLoading(false);
            navigate("/signup");

        }
    }







    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            {
                loading ? <Spinner/>: 
                <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-5"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                    Update Password
                </h2>

                {/* Email */}
                <div>
                    <label className="block mb-1 text-gray-600 font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email.toLowerCase().trim()}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Update Password
                </button>

            </form>
            }    


        </div>

    )
}


export default UpdatePassword;
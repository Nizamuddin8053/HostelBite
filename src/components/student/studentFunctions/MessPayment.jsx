import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";



const MessPayment = () => {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const token = localStorage.getItem("token");

    
    const amount = 2;

    useEffect(() => {
        const fetchStudentDetails = async () => {
           
            const decoded = jwtDecode(token);
            const id = decoded.id;
           
            try {
                // Fetch student details using token
                const res = await axios.get(`http://localhost:4000/api/students/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
               
                setStudent(res.data);
            } catch (err) {
                console.error("Error fetching student details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStudentDetails();
    }, [token]);

    const loadRazorpayScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        if (!student) return;
        setPaymentProcessing(true);

        const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Razorpay SDK failed to load. Check your internet connection.");
            setPaymentProcessing(false);
            return;
        }

        try {
            //  Create order on backend
            const orderRes = await axios.post("http://localhost:4000/api/payments/create-order", {
                amount,
                name: student.name,
                email: student.email,
            });

            
            const { order } = orderRes.data;

            
            // Configure Razorpay Checkout
            // Use razorpay API key
            const options = {  
                key: "rzp_test_ReQ4Bym2jP3in9" || "rzp_test_xxxxxxxxxxx", // fallback for dev
                amount: order.amount,
                currency: "INR",
                name: "Mess Fees Payment",
                description: "Pay your monthly mess fees",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        // Verify payment on backend
                        await axios.post("http://localhost:4000/api/payments/verify-payment", {
                            ...response,
                            email: student.email,
                            name: student.name,
                            amount,
                        });
                        alert("✅ Payment successful! Confirmation email sent.");
                    } catch (error) {
                        alert("Payment verification failed!");
                    }
                },
                prefill: {
                    name: student.name,
                    email: student.email,
                },
                theme: {
                    color: "#0d6efd",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error("Payment error:", err);
            alert("Error starting payment.");
        } finally {
            setPaymentProcessing(false);
        }
    };

    if (loading) return <p className="text-center">Loading student details...</p>;

    return (
        <div className="flex flex-col items-center mt-10">
            <h2 className="text-2xl font-semibold mb-4">Mess Fees Payment</h2>
            {student ? (
                <div className="bg-white shadow-md rounded-2xl p-6 w-[350px] text-center">
                    <p className="text-lg mb-2"><b>Name:</b> {student.name}</p>
                    <p className="text-lg mb-4"><b>Email:</b> {student.email}</p>
                    <p className="text-lg mb-6"><b>Amount:</b> ₹{amount}</p>

                    <button
                        onClick={handlePayment}
                        disabled={paymentProcessing}
                        className={`px-6 py-2 rounded-xl text-white font-medium ${paymentProcessing ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {paymentProcessing ? "Processing..." : "Pay Now"}
                    </button>
                </div>
            ) : (
                <p className="text-red-500">Could not fetch student details.</p>
            )}
        </div>
    );
};

export default MessPayment;

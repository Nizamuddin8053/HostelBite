import { useEffect, useState } from "react";
import axios from "axios";
import showToast from "../../../../utils/showToast";
import { TOAST_TYPE } from "../../../../utils/constants";

const currentMonth = new Date().toISOString().slice(0, 7);

const GenerateSalarySlip = () => {
    const [staff, setStaff] = useState([]);
    const [staffId, setStaffId] = useState("");
    const [amount, setAmount] = useState("");
    const [month, setMonth] = useState(currentMonth);
    const [loadingStaff, setLoadingStaff] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        const fetchStaff = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/staff/getAllStaff`
                );
                if (active) setStaff(response.data);
            } catch (requestError) {
                console.error("Unable to load staff for salary slips:", requestError);
                if (active) setError(requestError.response?.data?.error || "Unable to load staff.");
            } finally {
                if (active) setLoadingStaff(false);
            }
        };

        fetchStaff();
        return () => {
            active = false;
        };
    }, []);

    const handleStaffChange = (event) => {
        const selectedStaffId = event.target.value;
        const selectedStaff = staff.find((member) => member._id === selectedStaffId);
        setStaffId(selectedStaffId);
        setAmount(selectedStaff?.salaryAmount > 0 ? String(selectedStaff.salaryAmount) : "");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/salary`, {
                staff_id: staffId,
                amount: Number(amount),
                month,
            });
            showToast(response.data.message || "Salary slip generated successfully.", TOAST_TYPE.SUCCESS);
        } catch (requestError) {
            console.error("Unable to generate salary slip:", requestError);
            showToast(
                requestError.response?.data?.error || "Unable to generate salary slip.",
                TOAST_TYPE.ERROR
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="mx-auto mt-8 max-w-xl rounded-xl bg-white p-6 shadow">
            <h1 className="mb-5 text-center text-2xl font-bold text-indigo-700">Generate Salary Slip</h1>
            {loadingStaff ? (
                <p className="text-center text-gray-500">Loading staff...</p>
            ) : error ? (
                <p role="alert" className="text-center text-red-600">{error}</p>
            ) : staff.length === 0 ? (
                <p className="text-center text-gray-500">No approved staff members found.</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="salary-staff" className="mb-1 block font-medium">Staff member</label>
                        <select
                            id="salary-staff"
                            value={staffId}
                            onChange={handleStaffChange}
                            required
                            className="w-full rounded border p-2"
                        >
                            <option value="">Select staff</option>
                            {staff.map((member) => (
                                <option key={member._id} value={member._id}>
                                    {member.name} ({member.email})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="salary-month" className="mb-1 block font-medium">Salary month</label>
                        <input
                            id="salary-month"
                            type="month"
                            value={month}
                            onChange={(event) => setMonth(event.target.value)}
                            required
                            className="w-full rounded border p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="salary-amount" className="mb-1 block font-medium">Amount (₹)</label>
                        <input
                            id="salary-amount"
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                            required
                            className="w-full rounded border p-2"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded bg-green-600 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
                    >
                        {submitting ? "Generating..." : "Generate Salary Slip"}
                    </button>
                </form>
            )}
        </section>
    );
};

export default GenerateSalarySlip;

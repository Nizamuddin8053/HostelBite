import { useEffect, useState } from "react";
import axios from "axios";

const StaffAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        const fetchAttendance = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/attendance`
                );
                if (active) setAttendance(response.data);
            } catch (requestError) {
                console.error("Unable to load student attendance:", requestError);
                if (active) {
                    setError(requestError.response?.data?.message || "Unable to load student attendance.");
                }
            } finally {
                if (active) setLoading(false);
            }
        };

        fetchAttendance();
        return () => {
            active = false;
        };
    }, []);

    return (
        <section className="rounded-xl bg-white p-6 shadow">
            <h1 className="mb-4 text-2xl font-bold">Students Attendance</h1>
            {loading ? (
                <p className="text-gray-500">Loading attendance...</p>
            ) : error ? (
                <p role="alert" className="text-red-600">{error}</p>
            ) : attendance.length === 0 ? (
                <p className="text-gray-500">No student attendance records found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3">Student</th>
                                <th className="p-3">Course / Year</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Meal</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendance.map((record, index) => (
                                <tr key={`${record.email}-${record.date}-${record.mealType}-${index}`} className="border-t">
                                    <td className="p-3">
                                        <div className="font-medium">{record.studentName}</div>
                                        <div className="text-sm text-gray-500">{record.email}</div>
                                    </td>
                                    <td className="p-3">{record.course} / {record.year}</td>
                                    <td className="p-3">
                                        {record.date === "N/A"
                                            ? "N/A"
                                            : new Date(record.date).toLocaleDateString()}
                                        {record.day && record.day !== "N/A" ? ` (${record.day})` : ""}
                                    </td>
                                    <td className="p-3 capitalize">{record.mealType}</td>
                                    <td className="p-3 capitalize">{record.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

export default StaffAttendance;

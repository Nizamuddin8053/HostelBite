
import { useCallback, useState } from "react";
import axios from "axios";
import { FileSpreadsheet } from "lucide-react";

const escapeHtml = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    })[character]);

const SalarySection = ({ staffId }) => {
    const [salarySlips, setSalarySlips] = useState([]);
    const [staffProfile, setStaffProfile] = useState(null);
    const [activeView, setActiveView] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const openView = useCallback(async (view) => {
        setActiveView(view);
        setError("");

        if (!staffId) {
            setError("Unable to identify your staff account.");
            return;
        }

        if (
            (view === "salary" && staffProfile) ||
            (view === "slips" && salarySlips.length > 0)
        ) {
            return;
        }

        try {
            setLoading(true);
            if (view === "salary") {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/staff/me`);
                setStaffProfile(response.data);
            } else {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/salary/staff/${staffId}`
                );
                setSalarySlips(response.data);
            }
        } catch (requestError) {
            console.error("Unable to load staff salary information:", requestError);
            setError(requestError.response?.data?.error || "Unable to load salary information.");
        } finally {
            setLoading(false);
        }
    }, [salarySlips.length, staffId, staffProfile]);

    const downloadSalarySlip = (slip) => {
        const month = new Date(slip.forMonth).toLocaleDateString(undefined, {
            month: "long",
            year: "numeric",
        });
        const staff = slip.staffId || {};
        const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Salary Slip - ${escapeHtml(month)}</title>
  <style>
    body { font: 16px Arial, sans-serif; color: #1f2937; margin: 40px auto; max-width: 700px; }
    h1 { color: #4338ca; } table { border-collapse: collapse; width: 100%; margin-top: 24px; }
    th, td { border: 1px solid #d1d5db; padding: 12px; text-align: left; }
    th { background: #f3f4f6; width: 35%; }
    button { margin-top: 24px; padding: 10px 16px; cursor: pointer; }
    @media print { button { display: none; } body { margin: 0; } }
  </style>
</head>
<body>
  <h1>HostelBite Salary Slip</h1>
  <p>Salary for ${escapeHtml(month)}</p>
  <table>
    <tr><th>Staff member</th><td>${escapeHtml(staff.name || "Staff")}</td></tr>
    <tr><th>Email</th><td>${escapeHtml(staff.email || "")}</td></tr>
    <tr><th>Month</th><td>${escapeHtml(month)}</td></tr>
    <tr><th>Salary amount</th><td>₹${escapeHtml(Number(slip.amount).toLocaleString("en-IN"))}</td></tr>
    <tr><th>Payment status</th><td>${escapeHtml(slip.status)}</td></tr>
    <tr><th>Generated</th><td>${escapeHtml(new Date(slip.generatedAt).toLocaleDateString())}</td></tr>
  </table>
  <button onclick="window.print()">Print / Save as PDF</button>
</body>
</html>`;
        const file = new Blob([html], { type: "text/html;charset=utf-8" });
        const url = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = url;
        link.download = `salary-slip-${slip.forMonth.slice(0, 7)}.html`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-white p-5 rounded-2xl shadow-md">
            
            <div className="mb-3 flex items-center">
                <FileSpreadsheet className="mr-2 text-indigo-600" />
                <h1 className="text-lg font-semibold">Salary</h1>
            </div>
            <p className="mb-4 text-gray-600">Choose what you want to view.</p>
            <div className="mb-5 flex flex-wrap gap-3">
                <button
                    type="button"
                    onClick={() => openView("salary")}
                    disabled={loading}
                    aria-pressed={activeView === "salary"}
                    className={`rounded-lg px-4 py-2 text-white ${activeView === "salary" ? "bg-indigo-800" : "bg-indigo-600 hover:bg-indigo-700"}`}
                >
                    View Salary
                </button>
                <button
                    type="button"
                    onClick={() => openView("slips")}
                    disabled={loading}
                    aria-pressed={activeView === "slips"}
                    className={`rounded-lg px-4 py-2 text-white ${activeView === "slips" ? "bg-green-800" : "bg-green-600 hover:bg-green-700"}`}
                >
                    Salary Slip
                </button>
            </div>
            {loading && <p className="text-gray-500">Loading...</p>}
            {!loading && error && <p role="alert" className="text-red-600">{error}</p>}
            {!loading && !error && activeView === "salary" && staffProfile && (
                <div className="rounded-lg bg-indigo-50 p-4">
                    <h2 className="font-semibold text-gray-800">Current salary</h2>
                    <p className="mt-1 text-xl font-bold text-indigo-700">
                        ₹{Number(staffProfile.salaryAmount || 0).toLocaleString("en-IN")}
                    </p>
                </div>
            )}
            {!loading && !error && activeView === "slips" && (
                salarySlips.length === 0 ? (
                    <p className="text-gray-500">No salary slips have been generated for you yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3">Month</th>
                                    <th className="p-3">Amount</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salarySlips.map((slip) => (
                                    <tr key={slip._id} className="border-t">
                                        <td className="p-3">
                                            {new Date(slip.forMonth).toLocaleDateString(undefined, {
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td className="p-3">₹{Number(slip.amount).toLocaleString("en-IN")}</td>
                                        <td className="p-3 capitalize">{slip.status}</td>
                                        <td className="p-3">
                                            <button
                                                type="button"
                                                onClick={() => downloadSalarySlip(slip)}
                                                className="rounded bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700"
                                            >
                                                Download slip
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="mt-2 text-sm text-gray-500">
                            Open the downloaded slip and choose Print / Save as PDF to keep a PDF copy.
                        </p>
                    </div>
                )
            )}
        </div>
    );
};

export default SalarySection;
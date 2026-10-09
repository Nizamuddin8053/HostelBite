import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

const AdminInvoiceHistory = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchParams] = useSearchParams();
  const isStatusView = searchParams.get("view") === "status";

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/invoice`);
        setInvoices(response.data);
      } catch (requestError) {
        console.error("Could not fetch invoice history:", requestError);
        setError(requestError.response?.data?.error || "Could not load invoices. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const visibleInvoices = useMemo(
    () => invoices.filter((invoice) => statusFilter === "all" || invoice.status === statusFilter),
    [invoices, statusFilter]
  );

  return (
    <main className="max-w-6xl mx-auto mt-8 bg-white shadow-lg rounded-xl p-6">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">
            {isStatusView ? "Track Payment Status" : "Invoice History"}
          </h1>
          <p className="text-gray-600 mt-1">Review invoices and payment details for all students.</p>
        </div>
        <Link to="/admin-dashboard/payments-section" className="text-blue-700 hover:underline">
          Back to Payment &amp; Invoice
        </Link>
      </div>

      <div className="flex gap-2 flex-wrap mb-5">
        {["all", "unpaid", "paid"].map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg capitalize ${
              statusFilter === status ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            {status === "unpaid" ? "Pending" : status === "all" ? "All invoices" : "Paid"}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center py-8">Loading invoices...</p>
      ) : error ? (
        <p role="alert" className="text-center py-8 text-red-600">{error}</p>
      ) : visibleInvoices.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No invoices found for this status.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-sm text-gray-500">
                <th className="p-3">Student</th>
                <th className="p-3">Email</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Due date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Payment ID</th>
                <th className="p-3">Paid at</th>
              </tr>
            </thead>
            <tbody>
              {visibleInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b last:border-0">
                  <td className="p-3">{invoice.student_name || "Student account unavailable"}</td>
                  <td className="p-3">{invoice.student_email || "—"}</td>
                  <td className="p-3">₹{invoice.amount}</td>
                  <td className="p-3">{new Date(invoice.due_date).toLocaleDateString()}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      invoice.status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {invoice.status === "paid" ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td className="p-3 break-all">{invoice.payment_id || "—"}</td>
                  <td className="p-3">
                    {invoice.paid_at ? new Date(invoice.paid_at).toLocaleString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default AdminInvoiceHistory;

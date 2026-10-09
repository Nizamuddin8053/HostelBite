import { useEffect, useState } from "react";
import axios from "axios";

const ViewInvoices = ({ student_id }) => {
  const [invoices, setInvoices] = useState([]);
  const [totalUnpaid, setTotalUnpaid] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const downloadReceipt = (invoice) => {
    const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[character]);
    const content = `<!doctype html>
      <html><head><meta charset="utf-8"><title>HostelBite payment receipt</title>
      <style>body{font:16px Arial,sans-serif;max-width:640px;margin:48px auto;color:#1f2937}
      h1{color:#166534}p{padding:10px 0;border-bottom:1px solid #e5e7eb}</style></head>
      <body><h1>Payment receipt</h1><p><strong>Invoice:</strong> ${escapeHtml(invoice._id)}</p>
      <p><strong>Amount:</strong> ₹${escapeHtml(invoice.amount)}</p>
      <p><strong>Status:</strong> Paid</p><p><strong>Payment ID:</strong> ${escapeHtml(invoice.payment_id)}</p>
      <p><strong>Paid at:</strong> ${escapeHtml(invoice.paid_at ? new Date(invoice.paid_at).toLocaleString() : "—")}</p>
      </body></html>`;
    const receiptUrl = URL.createObjectURL(new Blob([content], { type: "text/html;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = receiptUrl;
    link.download = `hostelbite-receipt-${invoice._id}.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(receiptUrl), 1000);
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/invoice/student/${student_id}`
        );

        setInvoices(res.data.invoices);
        setTotalUnpaid(res.data.totalUnpaid);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || "Could not load invoice history. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (student_id) {
      fetchInvoices();
    } else {
      setError("Could not identify the signed-in student.");
      setLoading(false);
    }
  }, [student_id]);

  if (loading) {
    return <div className="text-center mt-10">Loading invoices...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-bold text-center text-blue-600 mb-4">
        📄 My Invoices
      </h2>

      {error && <p role="alert" className="text-center text-red-600 mb-4">{error}</p>}

      <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center font-semibold">
        Total Pending: ₹{totalUnpaid}
      </div>

      <div className="space-y-3">
        {invoices.length === 0 ? (
          <div className="text-center text-gray-500">
            No invoices found
          </div>
        ) : (
          invoices.map((inv) => (
            <div key={inv._id} className="flex flex-wrap justify-between items-center gap-3 border p-3 rounded">
              <div>
                <p className="font-medium">₹{inv.amount}</p>
                <p className="text-sm text-gray-500">
                  Due: {new Date(inv.due_date).toLocaleDateString()}
                </p>
                {inv.status === "paid" && inv.payment_id && (
                  <p className="text-xs text-gray-500 mt-1">Payment ID: {inv.payment_id}</p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 text-sm rounded ${inv.status === "paid"
                    ? "bg-green-200 text-green-700"
                    : "bg-yellow-200 text-yellow-700"
                    }`}
                >
                  {inv.status === "paid" ? "Paid" : "Pending"}
                </span>
                {inv.status === "paid" && (
                  <button
                    type="button"
                    onClick={() => downloadReceipt(inv)}
                    className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                  >
                    Download Receipt
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default ViewInvoices;
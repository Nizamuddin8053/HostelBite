import { useEffect, useState } from "react";
import axios from "axios";

const ViewInvoices = ({ student_id }) => {
  const [invoices, setInvoices] = useState([]);
  const [totalUnpaid, setTotalUnpaid] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/invoice/student/${student_id}`
      );

      setInvoices(res.data.invoices);
      setTotalUnpaid(res.data.totalUnpaid);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    
    if (student_id) {
      fetchInvoices();
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

      {/* Total Unpaid */}
      <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center font-semibold">
        Total Pending: ₹{totalUnpaid}
      </div>

      {/* Invoice List */}
      <div className="space-y-3">
        {invoices.length === 0 ? (
          <div className="text-center text-gray-500">
            No invoices found
          </div>
        ) : (
          invoices.map((inv) => (
            <div
              key={inv._id}
              className="flex justify-between items-center border p-3 rounded"
            >
              <div>
                <p className="font-medium">₹{inv.amount}</p>
                <p className="text-sm text-gray-500">
                  Due: {new Date(inv.due_date).toLocaleDateString()}
                </p>
              </div>

              <div>
                <span
                  className={`px-3 py-1 text-sm rounded ${
                    inv.status === "paid"
                      ? "bg-green-200 text-green-700"
                      : "bg-yellow-200 text-yellow-700"
                  }`}
                >
                  {inv.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pay Button */}
      {totalUnpaid > 0 && (
        <button className="mt-5 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          💳 Pay Now
        </button>
      )}
    </div>
  );
};

export default ViewInvoices;
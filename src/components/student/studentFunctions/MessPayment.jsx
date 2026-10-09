import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import showToast from "../../../utils/showToast";
import { TOAST_TYPE } from "../../../utils/constants";

const MessPayment = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [payingInvoiceId, setPayingInvoiceId] = useState(null);
  const [error, setError] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");

  const fetchInvoices = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Your session has expired. Please sign in again.");
      setLoading(false);
      return;
    }

    try {
      const { id } = jwtDecode(token);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/invoice/student/${id}`
      );
      setInvoices(response.data.invoices || []);
      setError("");
    } catch (requestError) {
      console.error("Could not fetch pending invoices:", requestError);
      setError(requestError.response?.data?.error || "Could not load pending payments.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const loadRazorpayScript = () => new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  const handlePayment = async (invoice) => {
    setPaymentProcessing(true);
    setPayingInvoiceId(invoice._id);
    setPaymentMessage("");

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Razorpay could not load. Check your internet connection and try again.");
      }

      const orderResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/payments/invoice/create-order`,
        { invoice_id: invoice._id }
      );
      const { order, keyId } = orderResponse.data;
      if (!keyId) {
        throw new Error("Razorpay is not configured on the server.");
      }

      const checkout = new window.Razorpay({
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "HostelBite",
        description: `Invoice payment`,
        order_id: order.id,
        method: { upi: true, card: true },
        theme: { color: "#4f46e5" },
        handler: async (paymentResponse) => {
          try {
            const verification = await axios.post(
              `${process.env.REACT_APP_API_URL}/api/payments/invoice/verify-payment`,
              { ...paymentResponse, invoice_id: invoice._id }
            );
            setInvoices((currentInvoices) =>
              currentInvoices.map((currentInvoice) =>
                currentInvoice._id === invoice._id
                  ? verification.data.invoice
                  : currentInvoice
              )
            );
            setPaymentMessage(verification.data.message);
            showToast(
              verification.data.emailSent === false
                ? "Payment completed, but the confirmation email could not be sent."
                : "Payment completed. A confirmation email has been sent.",
              verification.data.emailSent === false ? TOAST_TYPE.INFO : TOAST_TYPE.SUCCESS
            );
          } catch (verificationError) {
            console.error("Invoice payment could not be verified:", verificationError);
            showToast(
              verificationError.response?.data?.message || "Payment verification failed.",
              TOAST_TYPE.ERROR
            );
          } finally {
            setPaymentProcessing(false);
            setPayingInvoiceId(null);
          }
        },
        modal: {
          ondismiss: () => {
            setPaymentProcessing(false);
            setPayingInvoiceId(null);
          },
        },
      });

      checkout.on("payment.failed", (paymentError) => {
        console.error("Razorpay payment failed:", paymentError.error);
        showToast(paymentError.error?.description || "Payment failed. Please try again.", TOAST_TYPE.ERROR);
        setPaymentProcessing(false);
        setPayingInvoiceId(null);
      });
      checkout.open();
    } catch (requestError) {
      console.error("Could not start invoice payment:", requestError);
      showToast(
        requestError.response?.data?.message || requestError.message || "Could not start payment.",
        TOAST_TYPE.ERROR
      );
      setPaymentProcessing(false);
      setPayingInvoiceId(null);
    }
  };

  const pendingInvoices = invoices.filter((invoice) => invoice.status !== "paid");

  if (loading) return <p className="text-center mt-10">Loading pending payments...</p>;

  return (
    <main className="max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-2">Make a Payment</h1>
      <p className="text-center text-gray-600 mb-6">Pay an outstanding invoice by UPI/QR code or card.</p>

      {error && <p role="alert" className="text-center text-red-600 mb-4">{error}</p>}
      {paymentMessage && <p role="status" className="text-center text-green-700 bg-green-50 p-3 rounded mb-4">{paymentMessage}</p>}

      {pendingInvoices.length === 0 ? (
        <p className="text-center text-gray-600 bg-gray-50 p-6 rounded">
          No payment pending.
        </p>
      ) : (
        <div className="space-y-4">
          {pendingInvoices.map((invoice) => (
            <article key={invoice._id} className="flex flex-wrap items-center justify-between gap-4 border rounded-lg p-4">
              <div>
                <p className="font-semibold">Invoice amount: ₹{invoice.amount}</p>
                <p className="text-sm text-gray-500">
                  Due: {new Date(invoice.due_date).toLocaleDateString()}
                </p>
                <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </div>
              <button
                type="button"
                onClick={() => handlePayment(invoice)}
                disabled={paymentProcessing}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
              >
                {payingInvoiceId === invoice._id ? "Processing..." : `Pay ₹${invoice.amount}`}
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default MessPayment;

import React from "react";
import { CreditCard, FileText, Clock } from "lucide-react";

const ManagePaymentInvoice = () => {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-md">
            <div className="flex items-center mb-3">
                <CreditCard className="text-indigo-600 mr-2" />
                <h2 className="text-lg font-semibold">Payment & Invoice</h2>
            </div>

            <p className="text-gray-600 mb-3">
                Manage Student payments, track invoice status, and view history.
            </p>

            <div className="flex gap-3 flex-wrap">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                    Generate Invoice
                </button>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                    View Invoice History
                </button>
                <button className="bg-green-600 text-whitepx-4 py-2 rounded-lg hover:bg-indigo-700">
                    Track Payment Status
                </button>
               
            </div>

        </div>
    );
}

export default ManagePaymentInvoice;
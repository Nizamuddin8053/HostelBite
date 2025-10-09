import React from "react";
import { CreditCard, FileText, Clock } from "lucide-react";

const PaymentSection =()=> {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-md">
            <div className="flex items-center mb-3">
                <CreditCard className="text-indigo-600 mr-2" />
                <h2 className="text-lg font-semibold">Payment & Invoice</h2>
            </div>

            <p className="text-gray-600 mb-3">
                Manage your payments, track invoice status, and view history.
            </p>

            <div className="flex gap-3 flex-wrap">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                    View Invoice History
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                    Track Payment Status
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    Make Payment
                </button>
            </div>

            <div className="mt-4 flex gap-2 text-sm text-gray-600">
                <Clock className="text-indigo-500" size={18} />
                Supports <span className="font-semibold text-indigo-700 mx-1">UPI</span>
                and <span className="font-semibold text-indigo-700 mx-1">Credit/Debit Cards</span>
            </div>
        </div>
    );
}

export default PaymentSection;
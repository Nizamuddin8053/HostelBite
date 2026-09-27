import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import showToast from "../../../utils/showToast";
import { TOAST_TYPE } from "../../../utils/constants";

const MarkAttendance = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [state, setState] = useState({ loading: false, message: "" });
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    let current = true;
    axios.get(`${process.env.REACT_APP_API_URL}/api/attendance/me`)
      .then((response) => {
        if (current) setHistory(response.data);
      })
      .catch((error) => {
        console.error("Unable to load attendance history:", error);
        showToast(
          error.response?.data?.message || "Unable to load attendance history",
          TOAST_TYPE.ERROR
        );
      })
      .finally(() => {
        if (current) setHistoryLoading(false);
      });

    return () => {
      current = false;
    };
  }, []);

  useEffect(() => {
    if (!token) {
      setState({ loading: false, message: "Scan the current meal attendance QR code to continue." });
      return undefined;
    }

    let timer;
    setState({ loading: true, message: "Verifying the QR code and recording attendance..." });
    timer = window.setTimeout(async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/attendance/mark`,
          { token }
        );
        setState({ loading: false, message: response.data.message });
        setHistory((previous) => [response.data.attendance, ...previous]);
        window.history.replaceState(window.history.state, "", window.location.pathname);
        showToast(response.data.message, TOAST_TYPE.SUCCESS);
      } catch (error) {
        const message = error.response?.data?.message || "Unable to mark attendance";
        setState({ loading: false, message });
        showToast(message, TOAST_TYPE.ERROR);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [token]);

  return (
    <main className="mx-auto max-w-xl p-6">
      <section className="rounded-2xl bg-white p-6 text-center shadow-md">
        <h1 className="text-2xl font-semibold text-gray-900">Mess attendance</h1>
        <p className="mt-4 text-gray-700" role="status" aria-live="polite">
          {state.loading && (
            <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
          )}
          {state.message}
        </p>
      </section>
      <section className="mt-6 rounded-2xl bg-white p-6 shadow-md">
        <h2 className="text-lg font-semibold text-gray-900">Your recent attendance</h2>
        {historyLoading ? (
          <p className="mt-3 text-gray-500">Loading your attendance history...</p>
        ) : history.length === 0 ? (
          <p className="mt-3 text-gray-500">No attendance records yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-gray-200">
            {history.map((record) => (
              <li key={record._id || `${record.date}-${record.mealType}`} className="flex justify-between gap-4 py-3">
                <span className="capitalize">{record.mealType}</span>
                <span className="text-gray-600">
                  {record.date ? new Date(record.date).toLocaleDateString() : "N/A"}
                </span>
                <span className="capitalize text-green-700">{record.status}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default MarkAttendance;

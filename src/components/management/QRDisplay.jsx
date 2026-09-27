import { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import showToast from "../../utils/showToast";
import { TOAST_TYPE } from "../../utils/constants";

const MEAL_TYPES = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "snacks", label: "Snacks" },
  { value: "dinner", label: "Dinner" },
];

const QRDisplay = () => {
  const [mealType, setMealType] = useState("");
  const [session, setSession] = useState(null);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [attendanceLoading, setAttendanceLoading] = useState(true);

  useEffect(() => {
    let current = true;
    axios.get(`${process.env.REACT_APP_API_URL}/api/attendance`)
      .then((response) => {
        if (current) setAttendance(response.data);
      })
      .catch((error) => {
        console.error("Unable to load attendance records:", error);
        showToast(
          error.response?.data?.message || "Unable to load attendance records",
          TOAST_TYPE.ERROR
        );
      })
      .finally(() => {
        if (current) setAttendanceLoading(false);
      });

    return () => {
      current = false;
    };
  }, []);

  useEffect(() => {
    if (!session) return undefined;

    const updateRemainingTime = () => {
      const remaining = Math.max(0, Math.ceil((new Date(session.expiresAt).getTime() - Date.now()) / 1000));
      setSecondsRemaining(remaining);
      if (remaining === 0) setSession(null);
    };

    updateRemainingTime();
    const timer = window.setInterval(updateRemainingTime, 1000);
    return () => window.clearInterval(timer);
  }, [session]);

  const generateQrCode = async (event) => {
    event.preventDefault();
    if (!mealType || loading) return;

    setLoading(true);
    setSession(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/attendance/qr`,
        { mealType }
      );
      setSession(response.data);
      showToast("Attendance QR code created", TOAST_TYPE.SUCCESS);
    } catch (error) {
      showToast(
        error.response?.data?.message || "Unable to generate attendance QR code",
        TOAST_TYPE.ERROR
      );
    } finally {
      setLoading(false);
    }
  };

  const attendanceUrl = session
    ? `${window.location.origin}/mark-attendance?token=${encodeURIComponent(session.token)}`
    : "";
  const selectedMeal = MEAL_TYPES.find((meal) => meal.value === session?.mealType);

  return (
    <main className="mx-auto max-w-2xl p-6">
      <section className="rounded-2xl bg-white p-6 shadow-md">
        <h1 className="text-2xl font-semibold text-gray-900">Meal attendance QR</h1>
        <p className="mt-2 text-gray-600">
          Display this short-lived code at the mess entrance. Students must sign in before scanning it.
        </p>

        <form onSubmit={generateQrCode} className="mt-6 flex flex-wrap items-end gap-3">
          <label className="min-w-52 flex-1 text-sm font-medium text-gray-700">
            Meal
            <select
              value={mealType}
              onChange={(event) => setMealType(event.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-3"
              required
            >
              <option value="">Select meal</option>
              {MEAL_TYPES.map((meal) => (
                <option key={meal.value} value={meal.value}>{meal.label}</option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            disabled={!mealType || loading}
            className="rounded-lg bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate QR"}
          </button>
        </form>

        {session && (
          <div className="mt-8 flex flex-col items-center rounded-xl border border-gray-200 p-6 text-center">
            <p className="font-semibold text-gray-900">{selectedMeal?.label} attendance</p>
            <div className="mt-4 bg-white p-3">
              <QRCodeSVG value={attendanceUrl} size={240} level="M" />
            </div>
            <p className="mt-3 font-medium text-amber-700">
              Expires in {Math.floor(secondsRemaining / 60)}:{String(secondsRemaining % 60).padStart(2, "0")}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Generate a new code if this one expires. Each student can record this meal only once per day.
            </p>
          </div>
        )}
      </section>
      <section className="mt-6 overflow-x-auto rounded-2xl bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-900">Recent attendance</h2>
        {attendanceLoading ? (
          <p className="mt-4 text-gray-500">Loading attendance records...</p>
        ) : attendance.length === 0 ? (
          <p className="mt-4 text-gray-500">No attendance has been recorded yet.</p>
        ) : (
          <table className="mt-4 w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="p-3">Student</th>
                <th className="p-3">Email</th>
                <th className="p-3">Meal</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record, index) => (
                <tr key={`${record.email}-${record.date}-${record.mealType}-${index}`} className="border-b last:border-0">
                  <td className="p-3">{record.studentName}</td>
                  <td className="p-3">{record.email}</td>
                  <td className="p-3 capitalize">{record.mealType}</td>
                  <td className="p-3">{record.date ? new Date(record.date).toLocaleDateString() : "N/A"}</td>
                  <td className="p-3 capitalize">{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
};

export default QRDisplay;

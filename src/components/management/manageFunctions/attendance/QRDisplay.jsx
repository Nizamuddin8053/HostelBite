import React, { useState, useEffect } from "react";
import axios from "axios";

const QRDisplay = ({ onBack }) => {
    const [qrCode, setQrCode] = useState("");
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    const fetchQR = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/qr/get-qr");
            setQrCode(res.data.qrUrl);
            setTimer(30); // reset countdown
        } catch (err) {
            console.error("QR Fetch Error:", err);
        }
    };

    const startQR = () => {
        if (isRunning) return;
        setIsRunning(true);
        fetchQR();

        // refresh QR every 30 seconds
        const qrUpdater = setInterval(fetchQR, 30000);

        // countdown timer
        const countdown = setInterval(() => {
            setTimer((prev) => (prev > 1 ? prev - 1 : 30));
        }, 1000);

        // store intervals to clear later
        setIntervalId({ qrUpdater, countdown });
    };

    const stopQR = () => {
        if (intervalId) {
            clearInterval(intervalId.qrUpdater);
            clearInterval(intervalId.countdown);
        }
        setIsRunning(false);
        setQrCode("");
        setTimer(0);
        onBack && onBack(); // if back navigation handler passed
    };

    useEffect(() => {
        // cleanup on unmount
        return () => stopQR();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="flex flex-col justify-center items-center gap-5 h-[100vh]">
            <h2 className="text-2xl text-violet-600 font-semibold">Mess Attendance QR</h2>

            {!isRunning ? (
                <button
                    onClick={startQR}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                    ▶️ Start QR Generation
                </button>
            ) : (
                <>
                    <img src={qrCode} alt="QR Code" width={300} />
                    <h3 className="text-xl text-gray-700">
                        ⏳ Refreshing in {timer}s
                    </h3>
                    <button
                        onClick={stopQR}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                        ⏹ Stop & Go Back
                    </button>
                </>
            )}
        </div>
    );
};

export default QRDisplay;

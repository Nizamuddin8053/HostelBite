const QRCode = require("qrcode");
const crypto = require("crypto");

let latestQR = { codeData: "", qrUrl: "" };

// Function to generate new QR
const generateQRCode = async () => {
    try {
        const uniqueData = crypto.randomBytes(16).toString("hex");
        const timestamp = new Date().toISOString();

        const FRONTEND_URL = "http://localhost:3000";
        const qrPayload = `${FRONTEND_URL}/mark-attendance?token=${uniqueData}`;
        const qrImageUrl = await QRCode.toDataURL(qrPayload);

        latestQR = { codeData: { token: uniqueData, time: timestamp }, qrUrl: qrImageUrl };
        console.log("✅ QR Updated at:", timestamp);
    } catch (error) {
        console.error("QR generation failed:", error);
    }
};

exports.getLatestQR = async (req, res) => {
    await generateQRCode(); // Generate QR only when requested
    res.json({
        success: true,
        updatedAt: latestQR.codeData.time,
        qrUrl: latestQR.qrUrl,
    });
};

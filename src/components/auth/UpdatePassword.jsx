import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../common/Spinner";
import showToast from "../../utils/showToast";
import { TOAST_TYPE } from "../../utils/constants";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [step, setStep] = useState("email");
  const [loading, setLoading] = useState(false);

  const sendCode = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/send-otp`,
        { email, purpose: "password-reset" }
      );
      showToast(response.data.message, TOAST_TYPE.INFO);
      setStep("verify");
    } catch (error) {
      showToast(
        error.response?.data?.message || "Unable to send a verification code",
        TOAST_TYPE.ERROR
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/verify-otp`,
        { email, otp, purpose: "password-reset" }
      );
      setResetToken(response.data.resetToken);
      setStep("password");
    } catch (error) {
      showToast(
        error.response?.data?.message || "The verification code is invalid or expired",
        TOAST_TYPE.ERROR
      );
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (event) => {
    event.preventDefault();
    if (password.length < 8) {
      showToast("Password must be at least 8 characters long", TOAST_TYPE.ERROR);
      return;
    }
    if (password !== confirmPassword) {
      showToast("Passwords do not match", TOAST_TYPE.ERROR);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/auth/forgot-password`,
        { email, resetToken, password, confirmPassword }
      );
      showToast(response.data.message, TOAST_TYPE.SUCCESS);
      navigate("/login", { replace: true });
    } catch (error) {
      showToast(
        error.response?.data?.message || "Unable to update password",
        TOAST_TYPE.ERROR
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={step === "email" ? sendCode : step === "verify" ? verifyCode : resetPassword}
        className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-xl"
      >
        <h1 className="text-center text-2xl font-semibold text-gray-800">Reset password</h1>

        <label className="block font-medium text-gray-600">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value.trim())}
            required
            disabled={step !== "email"}
            autoComplete="email"
            className="mt-1 w-full rounded-lg border px-4 py-2"
          />
        </label>

        {step === "verify" && (
          <label className="block font-medium text-gray-600">
            Email verification code
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              required
              autoComplete="one-time-code"
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </label>
        )}

        {step === "password" && (
          <>
            <label className="block font-medium text-gray-600">
              New password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={8}
                required
                autoComplete="new-password"
                className="mt-1 w-full rounded-lg border px-4 py-2"
              />
            </label>
            <label className="block font-medium text-gray-600">
              Confirm new password
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                minLength={8}
                required
                autoComplete="new-password"
                className="mt-1 w-full rounded-lg border px-4 py-2"
              />
            </label>
          </>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          {step === "email" ? "Send verification code" : step === "verify" ? "Verify code" : "Update password"}
        </button>
      </form>
    </main>
  );
};

export default UpdatePassword;

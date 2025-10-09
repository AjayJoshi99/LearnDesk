import { useState } from "react";
import axios from "axios";
import "./styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // 👈 loader state

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(
       `${process.env.REACT_APP_API_URL}/api/auth/forgot-password`,
        { email }
      );
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/verify-password-otp`,
        { email, otp }
      );
      setMessage(res.data.message);
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("❌ New Password and Confirm Password do not match!");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/reset-password`,
        { email, otp, newPassword }
      );
      setMessage(res.data.message);
      setStep(4);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h2>Forgot Password</h2>
        {message && <p className="message">{message}</p>}

        {loading && <div className="loader"></div>} {/* 👈 loader */}

        {!loading && step === 1 && (
          <form onSubmit={handleRequestOtp}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send OTP</button>
          </form>
        )}

        {!loading && step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <label>OTP</label>
            <input
              type="text"
              placeholder="Enter OTP sent to your email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="submit">Verify OTP</button>
          </form>
        )}

        {!loading && step === 3 && (
          <form onSubmit={handleResetPassword}>
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <label>Confirm New Password</label>
            <input
              type="password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit">Reset Password</button>
          </form>
        )}

        {step === 4 && !loading && (
          <div className="success">
            <p>✅ Password updated successfully!</p>
            <a href="/">Back to Login</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

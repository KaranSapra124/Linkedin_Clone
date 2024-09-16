import React, { useState } from "react";
import axios from "axios"; // Assuming you'll use axios for API calls
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  // State to manage form data
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  // State to manage submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle phone number input change
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Handle phone number submission to send OTP
  const handlePhoneNumberSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      // Send phone number to your backend API to request OTP
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/log-in`,
        {
          mobile: phoneNumber,
        }
      );
      setSuccess(response.data.message || "OTP sent successfully!");
      setIsOtpSent(true); // Enable OTP input field
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while sending OTP."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      // Send OTP and phone number to your backend API for verification
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/verify-otp`,
        {
          mobile: phoneNumber,
          otp,
        }
      );
      Cookies.set("userLinkedin", response?.data?.token);
      navigate("/");
      setSuccess(response.data.message || "Login successful!");
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during login."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {!isOtpSent ? (
        <form onSubmit={handlePhoneNumberSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="text-lg font-semibold mb-1">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your phone number"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-blue-400 transition duration-300"
          >
            {isSubmitting ? "Sending OTP..." : "Send OTP"}
          </button>
          {error && <p className="mt-4 text-red-500">{error}</p>}
          {success && <p className="mt-4 text-green-500">{success}</p>}
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="otp" className="text-lg font-semibold mb-1">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleOtpChange}
              required
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter OTP"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-blue-400 transition duration-300"
          >
            {isSubmitting ? "Verifying OTP..." : "Verify OTP"}
          </button>
          {error && <p className="mt-4 text-red-500">{error}</p>}
          {success && <p className="mt-4 text-green-500">{success}</p>}
        </form>
      )}
    </div>
  );
};

export default Login;

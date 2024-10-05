import React, { useState } from "react";
import toast from "react-hot-toast";
import { forgotPassword } from "../../../api/authApi";
import { useNavigate } from "react-router-dom";

const SendOtpForm = ({ onOtpSent }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formattedData = { email };
      // API call to send OTP
      const response = await forgotPassword(formattedData);
      toast.success(response.message || "OTP sent to your email.");
      onOtpSent(email);
    } catch (error) {
      console.error("Failed to send OTP", error);
      toast.error(error.response?.data?.message || "Failed to send OTP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <form onSubmit={handleSendOtp}>
      <div className="mx-auto max-w-xs">
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        >
          {isSubmitting ? "Sending OTP..." : "Send OTP"}
        </button>
      </div>
      <p className="mt-4 text-xs text-gray-600 text-center">
        If you don't want to forget your password, click on{" "}
        <span
          onClick={handleNavigate}
          className="border-b border-gray-500 border-dotted text-indigo-500 cursor-pointer"
        >
          login
        </span>
        .
      </p>
    </form>
  );
};

export default SendOtpForm;

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { resetPassword } from "../../../api/authApi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Importing react-icons

const ResetPasswordForm = ({ email, onResetSuccess }) => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(900); // 15 minutes in seconds

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Countdown timer logic
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      toast.error("OTP expired. Please request a new one.");
    }

    return () => clearInterval(timer); // Clean up the timer
  }, [countdown]);

  const formatTime = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedData = { email, otp, newPassword };
      // API call to reset password
      const response = await resetPassword(formattedData);
      toast.success(response.message || "Password reset successfully.");
      onResetSuccess(); // Notify parent component about success
    } catch (error) {
      console.error("Failed to reset password", error);
      toast.error(error.response?.data?.message || "Failed to reset password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleResetPassword}>
      <div className="mx-auto max-w-xs">
        <p className="text-center text-gray-600">Time remaining: {formatTime()}</p>

        {/* OTP Input */}
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        {/* New Password Input */}
        <div className="relative mt-5">
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
          >
            {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
          </span>
        </div>

        {/* Confirm Password Input */}
        <div className="relative mt-5">
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
          >
            {showConfirmPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        >
          {isSubmitting ? "Resetting Password..." : "Reset Password"}
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;

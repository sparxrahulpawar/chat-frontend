import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SendOtpForm from "./Components/SendOtpForm";
import ResetPasswordForm from "./Components/ResetPasswordForm";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // Step 1: Send OTP, Step 2: Reset Password
  const navigate = useNavigate();

  const handleOtpSent = (email) => {
    setEmail(email);
    setStep(2); // Move to the Reset Password step
  };

  const handleResetSuccess = () => {
    navigate("/login"); // Redirect to login after success
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src="https://drive.google.com/uc?export=view&id=1MFiKAExRFF0-2YNpAZzIu1Sh52J8r16v"
              alt="Forgot Password Logo"
              className="w-mx-auto"
            />
          </div>
          <div className="mt-6 flex flex-col items-center">
            <div className="w-full flex-1 mt-8">
              {/* Step 1: Send OTP Form */}
              {step === 1 && <SendOtpForm onOtpSent={handleOtpSent} />}

              {/* Step 2: Reset Password Form */}
              {step === 2 && (
                <ResetPasswordForm
                  email={email}
                  onResetSuccess={handleResetSuccess}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 bg-blue-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://drive.google.com/uc?export=view&id=1KZ_Ub_2lZ0dHbKV0fAIhxVhiQA183RCz')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

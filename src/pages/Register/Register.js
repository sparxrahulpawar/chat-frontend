import React, { useState } from "react";
import { FiCamera } from "react-icons/fi";
import { registerUser } from "../../api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // handle Image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Handle register
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    if (image) {
      formData.append("profilePic", image);
    }

    try {
      const response = await registerUser(formData);
      toast.success(response.data.message || "Registration success");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response.data.message);
      toast.error(error.response.data.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src="https://drive.google.com/uc?export=view&id=1MFiKAExRFF0-2YNpAZzIu1Sh52J8r16v"
              alt="Register Logo"
              className="w-mx-auto"
            />
          </div>
          <div className="mt-6 flex flex-col items-center">
            {/* Image Upload Section */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
                <img
                  src={
                    image
                      ? image
                      : "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover cursor-pointer transform transition duration-500 hover:scale-125 hover:flex justify-center items-center"
                />
              </div>
              <label htmlFor="imageUpload">
                <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer">
                  <FiCamera className="text-gray-700 w-2 h-2" />
                </div>
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleSubmit}>
                <div className="mx-auto max-w-xs">
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Username"
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="email"
                    placeholder="Email"
                  />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                  />
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Confirm Password"
                  />
                  <button
                    className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    type="submit"
                  >
                    <span className="ml-">Register</span>
                  </button>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="border-b border-gray-500 border-dotted text-indigo-400"
                    >
                      Login
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-green-100 text-center hidden lg:flex">
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

export default Register;

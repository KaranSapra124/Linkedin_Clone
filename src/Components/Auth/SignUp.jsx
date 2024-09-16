import React, { useEffect, useState } from "react";
import axios from "axios";

const SignUp = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    userName: "",
    mobile: "",
    email: "",
  });

  // State to manage submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userProfilePic") {
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const UserData = new FormData();
    UserData.append("userName", formData?.userName);
    UserData.append("mobile", formData?.mobile);
    UserData.append("email", formData?.email);
    UserData.append("userProfilePic", formData?.userProfilePic);
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      // Send form data to your backend API
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/sign-up`,
        UserData
      );
      setSuccess(response.data.message || "User registered successfully!");
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during registration."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => console.log(formData), [formData]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="userName" className="text-lg font-semibold mb-1">
            User Name
          </label>
          {formData?.userProfilePic && (
            <img
              className="w-16 border rounded-full m-2"
              src={URL.createObjectURL(formData?.userProfilePic)}
            />
          )}
          <input
            type="file"
            id="userName"
            name="userProfilePic"
            onChange={handleChange}
            // required
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="userName" className="text-lg font-semibold mb-1">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="mobile" className="text-lg font-semibold mb-1">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg font-semibold mb-1">
            Email (optional)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-blue-400 transition duration-300"
        >
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {success && <p className="mt-4 text-green-500">{success}</p>}
    </div>
  );
};

export default SignUp;

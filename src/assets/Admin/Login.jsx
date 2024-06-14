import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "@/Api/api_instance";
import { PiWindLight } from "react-icons/pi";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    const id = toast.loading("Please wait...");
    try {
      e.preventDefault();
      // Handle login logic here
      console.log("Email:", email);
      console.log("Password:", password);
      const res = await instance.post("/login", {
        email: email,
        password: password,
      });
      if (res.data.success) {
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("role", res.data.role);
        toast.update(id, {
          render: "verified",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        navigate("/admin/dashboard");
        window.location.reload();
      } else {
        console.log(res.data.error);
        toast.update(id, {
          render: "error",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (e) {
      toast.update(id, {
        render: "error",
        type: e.message,
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

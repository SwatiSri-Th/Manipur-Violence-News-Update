import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "@/Api/api_instance";
import { PiWindLight } from "react-icons/pi";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const Login = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");

  const handleSave = async () => {
    // Handle save logic here
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    const response = await instance.post(
      "/reset",
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    if (response.status === 200) {
      toast.success("Password updated successfully");
      navigate("/admin/dashboard");
    } else {
      toast.error("Invalid credentials");
    }
  };

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
      console.log(res);
      console.log(res.data.needs_password_change);
      if (res.data.success) {
        setToken(res.data.token);
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("role", res.data.role);
        if (res.data.needs_password_change) {
          toast.update(id, {
            render: "Change Password",
            type: "warning",
            isLoading: false,
            autoClose: true,
          });
          open();
        } else {
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
        }
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
      <Modal opened={opened} onClose={close} title="Authentication">
        <div className="p-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="oldPassword"
            >
              Old Password
            </label>
            <input
              type="text"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter old password"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              type="text"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter new password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
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

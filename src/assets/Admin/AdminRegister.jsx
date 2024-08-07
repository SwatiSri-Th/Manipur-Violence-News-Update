import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/Component/Footer";
import { toast } from "react-toastify";
import { Select } from "@mantine/core";
import instance from "@/Api/api_instance";
const AdminRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = toast.loading("Loading...");
    console.log(name);
    const res = await instance.post("/admin", { name, email, password, role });
    console.log(res);
    if (res.status === 200) {
      toast.update(id, {
        render: "verified",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    }
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
  };
  return (
    <div className=" flex">
      <AdminSidebar />
      <div className="w-full">
        <AdminNavbar hide={true} />
        <div className="h-[calc(100vh-10rem)">
          <div className="flex justify-center items-center h-[80vh] bg-gray-100">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            >
              <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700">Role</label>
                <Select
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  variant="unstyled"
                  placeholder="Choose ..."
                  value={role}
                  onChange={setRole}
                  data={["Admin", "Moderator"]}
                  defaultValue="React"
                  clearable
                  allowDeselect
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              >
                Save
              </button>
            </form>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-2rem)] w-full rounded-md  ">
          <Footer />
        </ScrollArea>
      </div>
    </div>
  );
};

export default AdminRegister;

import React, { useState, useEffect } from "react";
import instance from "@/Api/api_instance";
import AdminSidebar from "./AdminSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/Component/Footer";
import AdminTwitter from "./AdminTwittert";
import { toast } from "react-toastify";
import { useDisclosure, useSet } from "@mantine/hooks";
import { Modal, Select } from "@mantine/core";
import AdminNavbar from "./AdminNavbar";

const ModeratorList = () => {
  const [data, setData] = useState([]);
  const fetchModeratorsList = async () => {
    try {
      const res = await instance({
        url: "moderators",
        method: "GET",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      console.log(res);
      setData(res.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchModeratorsList();
  }, []);
  const deleteHandler = async (id) => {
    try {
      const res = await instance.delete(`/mod/${id}`);
      if (res.status === 200) {
        toast.success("deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className=" flex">
      <AdminSidebar />
      <div className="flex flex-col w-full">
        <AdminNavbar />
        <ScrollArea className="h-[calc(100vh-2rem)]  w-full rounded-md flex justify-center items-center  ">
          <div className="h-96 overflow-auto flex justify-center items-start pt-10  bg-white shadow-md rounded-lg">
            <table className="w-3/4 divide-y border border-gray-100 rounded-lg divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.map((eachUser, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {eachUser.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {eachUser.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {eachUser.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                        onClick={() => deleteHandler(eachUser._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Footer />
        </ScrollArea>
      </div>
    </div>
  );
};

export default ModeratorList;

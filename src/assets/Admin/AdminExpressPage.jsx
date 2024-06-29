import React, { useState, useEffect } from "react";
import instance from "@/Api/api_instance";
import AdminExpress from "./AdminExpress";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/Component/Footer";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Select } from "@mantine/core";
import { toast } from "react-toastify";

const AdminExpressPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [express, setExpress] = useState([]);
  const [id, setId] = useState();
  const [category, setCategory] = useState([]);
  const [district, setDistrict] = useState([]);
  const [categoryData, setCategoryData] = useState();
  const [districtData, setDistrictData] = useState();

  const fetchNewData = async () => {
    try {
      const id = toast.loading("Please wait...");
      const response = await instance.get("/express");
      console.log(response.data);
      if (response.data.data.length === 0) {
        toast.update(id, {
          render: "No new data available",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }
      if (response.status === 200) {
        toast.update(id, {
          render: "Data is fetch",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
      setExpress(response.data.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  const addCategoryAndDistrict = async (category, district) => {
    try {
      const toastid = toast.loading("...adding");
      console.log(id);
      const res = await instance.put(`/timeExpress/${id}`, {
        category,
        district,
      });
      if (res.status === 200) {
        toast.update(toastid, {
          render: "added",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const districtAndCategoryHandler = () => {
    addCategoryAndDistrict(categoryData, districtData);
  };
  const getCategory = async () => {
    try {
      const res = await instance.get("/category");
      setCategory(res.data.data);
    } catch (error) {
      toast.error(error);
    }
  };
  const getDistrict = async () => {
    try {
      const res = await instance.get("/district");
      setDistrict(res.data.data);
    } catch (error) {
      toast.error(error);
    }
  };
  const modalOpened = (id) => {
    setId(id);
    open();
  };
  const deleteHandler = async (id) => {
    try {
      const toastid = toast.loading("Deleting...");
      const res = await instance.delete(`/time/delete/${id}`);
      if (res.status === 200) {
        toast.update(toastid, {
          render: "Deleted",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setExpress((prev) => {
          return prev.filter((item) => item._id !== id);
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const fetchExpress = async () => {
    try {
      const res = await instance({
        url: "express/data",
      });
      setExpress(res.data.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchExpress();
    getCategory();
    getDistrict();
  }, []);

  return (
    <div className=" flex">
      <AdminSidebar />
      <Modal opened={opened} onClose={close}>
        {/* Modal content */}
        <div className="flex flex-col gap-y-4">
          <p>Category</p>
          <Select
            className="w-full placeholder:text-black"
            data={category?.map((branch) => ({
              value: branch._id,
              label: branch.category,
            }))}
            onChange={setCategoryData}
            defaultValue="React"
            clearable
            allowDeselect
          />
          <p>District</p>
          <Select
            className="w-full placeholder:text-black"
            data={district?.map((branch) => ({
              value: branch._id,
              label: branch.name,
            }))}
            defaultValue="React"
            onChange={setDistrictData}
            clearable
            allowDeselect
          />
          <div className="flex gap-4">
            <div
              className="px-4 bg-blue-400 text-white rounded-lg cursor-pointer"
              onClick={districtAndCategoryHandler}
            >
              Save
            </div>
            <p className="px-4 bg-blue-400 text-white rounded-lg cursor-pointer">
              Cancel
            </p>
          </div>
        </div>
      </Modal>
      <ScrollArea className="h-[calc(100vh-2rem)] w-full rounded-md  ">
        <AdminNavbar />
        <div>
          <div className="flex w-full items-center justify-center gap-8 ">
            <h1 className="text-3xl font-extrabold text-[#792d2d] text-center mb-8 mt-8">
              Indian Express
            </h1>
            <button
              onClick={fetchNewData}
              className="w-[170px] h-[40px] bg-blue-900 text-wrap rounded-xl hover:bg-blue-700 text-white"
            >
              Fetch New Data
            </button>
          </div>
          <div className="grid  lg:grid-cols-3 items-center justify-items-center  w-screen  sm:w-full justify-center  gap-4">
            {express?.map((data) => (
              <AdminExpress
                id={data._id}
                key={data._id}
                img={data.img}
                link={data.link}
                time={data.time}
                paragraph={data.paragraph}
                district={data.district}
                category={data.category}
                title={data.title}
                open={modalOpened}
                deleteHandler={deleteHandler}
              />
            ))}
          </div>
        </div>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default AdminExpressPage;

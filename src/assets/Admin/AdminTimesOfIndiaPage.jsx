import React, { useState, useEffect } from "react";
import instance from "@/Api/api_instance";
import AdminTimesOfIndia from "./AdminTimesOfIndia";
import AdminSidebar from "./AdminSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/Component/Footer";
import { toast } from "react-toastify";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Select } from "@mantine/core";

const AdminTimesOfIndiaPage = () => {
  const [tofIndia, setTofIndia] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [id, setId] = useState();
  const [category, setCategory] = useState([]);
  const [district, setDistrict] = useState([]);
  const [categoryData, setCategoryData] = useState();
  const [districtData, setDistrictData] = useState();

  const addCategoryAndDistrict = async (category, district) => {
    try {
      const toastid = toast.loading("...adding");
      console.log(id);
      const res = await instance.put(`/timeOfIndia/${id}`, {
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

  const fetchNewData = async () => {
    try {
      const id = toast.loading("Please wait...");
      const response = await instance.get("/time");
      console.log(response.data);
      if (response.data.length === 0) {
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
      setTofIndia(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const res = await instance.delete(`/times/delete/${id}`);
      setTofIndia((prev) => prev.filter((item) => item._id !== id));
      if (res.status === 200) {
        toast.success("deleted");
      }
    } catch (error) {
      toast.error(error.message);
    }
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

  const fetchTimesOfIndia = async () => {
    try {
      const res = await instance({
        url: "/timeOfIndia/data",
      });
      setTofIndia(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const modalOpened = (id) => {
    setId(id);
    open();
  };

  useEffect(() => {
    fetchTimesOfIndia();
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
        <div>
          <div className="flex w-full items-center justify-center gap-8">
            <h1 className="text-3xl font-extrabold text-[#6e276f]  text-center mb-8 mt-8">
              Times Of India
            </h1>
            <button
              onClick={fetchNewData}
              className="w-[170px] h-[40px] bg-blue-900 text-wrap rounded-xl hover:bg-blue-700 text-white"
            >
              Fetch New Data
            </button>
          </div>

          <div className="flex  flex-wrap place-self-start w-full justify-center  gap-5">
            {tofIndia?.map((data) => (
              <AdminTimesOfIndia
                key={data._id}
                id={data._id}
                title={data.title}
                description={data.description}
                link={data.link}
                date={data.date}
                image={data.image}
                district={data.district}
                category={data.category}
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

export default AdminTimesOfIndiaPage;

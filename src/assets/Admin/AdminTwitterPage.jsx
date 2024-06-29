import React, { useState, useEffect } from "react";
import instance from "@/Api/api_instance";
import AdminSidebar from "./AdminSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/Component/Footer";
import AdminTwitter from "./AdminTwittert";
import { toast } from "react-toastify";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Select } from "@mantine/core";

const AdminTwitterPage = () => {
  const [image, setImage] = useState();
  const [twitterData, setTwitterData] = useState([]);
  const [imageModel, setImageModel] = useState(false);
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
      const res = await instance.put(`/twitter/${id}`, {
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
      const response = await instance.get("/twitter");
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
      setTwitterData(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const toastid = toast.loading("...deleting ");
      const res = await instance.delete(`/twitter/delete/${id}`);
      if (res.status === 200) {
        toast.update(toastid, {
          render: "deleted",
          icon: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setTwitterData((prev) => {
          return prev.filter((item) => item._id !== id);
        });
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

  const fetchTwitter = async () => {
    try {
      const res = await instance({
        url: "twitter/search",
      });
      setTwitterData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const modalOpened = (id) => {
    setId(id);
    open();
  };

  const imageOpenHandler = (media) => {
    setImage(media);
    setImageModel(true);
  };
  useEffect(() => {
    fetchTwitter();
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

      <Modal
        opened={imageModel}
        onClose={() => setImageModel(false)}
        centered
        size="100vw"
      >
        <img
          className="aspect-auto w-full object-cover"
          src={`https://drive.google.com/thumbnail?id=${image}&sz=w1000-h1000`}
        />
      </Modal>

      <ScrollArea className="h-[calc(100vh-2rem)] w-full rounded-md  ">
        <div>
          <div className="flex w-full items-center justify-center gap-8">
            <h1 className="text-3xl font-extrabold text-[#000] text-center mt-8 mb-8">
              Twitter
            </h1>
            <button
              onClick={fetchNewData}
              className="w-[170px] h-[40px] bg-blue-900 text-wrap rounded-xl hover:bg-blue-700 text-white"
            >
              Fetch New Data
            </button>
          </div>
          <div className="flex flex-col w-screen items-center bg-slate-300  justify-center  gap-4">
            {twitterData?.map((data) => (
              <AdminTwitter
                key={data._id}
                id={data._id}
                text={data.text}
                link={data.url}
                author={data.user_name}
                date={data.created_at}
                type={data.type}
                media={data.media}
                district={data.district}
                category={data.category}
                open={modalOpened}
                deleteHandler={deleteHandler}
                imageOpenHandler={imageOpenHandler}
              />
            ))}
          </div>
        </div>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default AdminTwitterPage;

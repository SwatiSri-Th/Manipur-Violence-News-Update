import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { format } from "date-fns";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "@/Api/api_instance";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Select } from "@mantine/core";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

const AdminYoutubeDisplay = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();
  const [displayData, setDisplayData] = useState();
  const [category, setCategory] = useState();
  const [district, setDistrict] = useState();
  const [categoryData, setCategoryData] = useState();
  const [districtData, setDistrictData] = useState();
  const { id } = useParams();

  const fetchDataById = async (id) => {
    try {
      const res = await instance.get(`/youtube/${id}`);
      console.log(res.data);
      setDisplayData(res.data.data);
    } catch (error) {
      console.log(error);
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

  const addCategoryAndDistrict = async (category, district) => {
    try {
      const toastid = toast.loading("...adding");
      const res = await instance.put(`/youtube/${id}`, { category, district });
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

  useEffect(() => {
    fetchDataById(id);
    getCategory();
    getDistrict();
  }, []);

  const deleteDataById = async (id) => {
    try {
      const toastId = toast.loading("Please wait...");
      const res = await instance.delete(`/youtube/delete/${id}`);
      if (res.status === 200) {
        toast.update(toastId, {
          render: "verified",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        navigate("/admin/youtube");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex">
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
          <div className="flex gap-4 ">
            <p
              className="px-4 bg-blue-400 text-white rounded-lg"
              onClick={districtAndCategoryHandler}
            >
              Save
            </p>
            <p className="px-4 bg-blue-400 text-white rounded-lgr">Cancel</p>
          </div>
        </div>
      </Modal>
      {displayData ? (
        <div className="flex flex-col w-full">
          <AdminNavbar hide={true} />
          <div className="flex p-8 items-start gap-4 ">
            <div
              onClick={() => navigate(`/youtube/${video_id}`)}
              className="w-[70%]  p-4 text-wrap  text-black  rounded-xl flex flex-col items-start justify-between border shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10 transition-opacity duration-300 "
            >
              <iframe
                className="aspect-video w-full object-cover"
                src={`https://drive.google.com/file/d/${displayData.file_id}/preview`}
                allowFullScreen
              ></iframe>
              <h1 className="font-bold">{displayData.title}</h1>

              <p>{displayData.channel}</p>
              <p> {format(new Date(displayData.publishedAt), "PPP")}</p>
              <div>
                District :
                {displayData.district ? displayData.district : "Not set"}
              </div>
              <div>
                Category :
                {displayData.category ? displayData.category : "Not set"}
              </div>
              <div className="w-[100px] flex justify-around">
                <WhatsappShareButton url={displayData.link}>
                  <WhatsappIcon
                    className="rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)] "
                    size={24}
                  ></WhatsappIcon>
                </WhatsappShareButton>

                <FacebookShareButton url={displayData.link}>
                  <FacebookIcon
                    className="rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)]"
                    size={24}
                  ></FacebookIcon>
                </FacebookShareButton>

                <TwitterShareButton url="link">
                  <XIcon
                    className="rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)]"
                    size={24}
                  ></XIcon>
                </TwitterShareButton>

                <TelegramShareButton url="link">
                  <TelegramIcon
                    className="rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)]"
                    size={24}
                  ></TelegramIcon>
                </TelegramShareButton>
              </div>
            </div>
            <div className="w-[40%]">
              <div className=" flex w-full justify-end gap-5">
                <button
                  className="w-[100px] rounded-lg cursor-pointer border  border-solid-[6px] transition-[3s] hover:bg-transparent hover:text-black  bg-black text-wrap text-white"
                  onClick={open}
                >
                  Edit
                </button>

                <button
                  className="w-[100px] rounded-lg cursor-pointer border border-solid-[6px]  transition-[3s] hover:bg-transparent hover:text-black bg-black text-wrap text-white"
                  onClick={() => deleteDataById(id)}
                >
                  Delete
                </button>
              </div>
              <div className="w-full h-[calc(100vh-10rem)] p-4 rounded-lg mt-4 overflow-y-scroll border shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
                <p>{displayData.description}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminYoutubeDisplay;

import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "react-toastify";
import Footer from "@/Component/Footer";
import instance from "@/Api/api_instance";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
const CategoryPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [select, setSelect] = useState();
  const [id, setId] = useState();
  const [category, setCategory] = useState([]);
  const [value, setValue] = useState();
  const fetchCategory = async () => {
    try {
      const response = await instance.get("/category");
      setCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCategoryHandler = async () => {
    try {
      const id = toast.loading("adding...");
      const response = await instance.post("/category", {
        category: value,
      });
      if (response.status == 200) {
        toast.update(id, {
          render: "Category added",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const modalHandler = (id, text) => {
    open();
    setSelect(text);
    setId(id);
  };

  const editHandler = async () => {
    try {
      const res = await instance.put(`/category/${id}`, {
        category: select,
      });
      if (res.status === 200) {
        toast.success("updated");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const deleteHandler = async () => {
    try {
      const res = await instance.delete(`/category/${id}`);
      if (res.status === 200) {
        toast.success("deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className=" flex">
      <AdminSidebar />
      <Modal opened={opened} onClose={close}>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="border border-black px-4 py-2  rounded-lg"
            onChange={(e) => setSelect(e.target.value)}
            value={select}
          />
          <div className="flex gap-4 ">
            <button
              className="px-4 py-2 bg-blue-800 rounded-lg text-white"
              onClick={editHandler}
            >
              Edit
            </button>
          </div>
        </div>
      </Modal>
      <div className="w-full">
        <AdminNavbar hide={true} />
        <div className="h-[calc(100vh-10rem)]">
          <div className="ml-20 mt-20 flex gap-4">
            <input
              type="text"
              onChange={(e) => setValue(e.target.value)}
              className="border border-black w-1/2 px-4 py-2 rounded-lg"
            />
            <button
              type="button"
              className="bg-blue-300 px-4 py-2 rounded-md"
              onClick={addCategoryHandler}
            >
              Add Category
            </button>
          </div>

          <div className="flex gap-2 items-start pl-20 justify-start ">
            {category?.map((each) => (
              <h1
                key={each._id}
                className="text-1xl bg-blue-400 px-4 py-2 rounded-md font-extrabold text-white mb-8 mt-8"
                onClick={() => modalHandler(each._id, each.category)}
              >
                {each.category}
              </h1>
            ))}
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-2rem)] w-full rounded-md  ">
          <Footer />
        </ScrollArea>
      </div>
    </div>
  );
};

export default CategoryPage;

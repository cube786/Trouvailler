import { useContext, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../../../utils/axiosInstance";

export const SectionUpdate = ({
    updateSectionOpen,
    setUpdateSectionOpen,
    reFetch,
    category

}) => {

  const [info, setinfo] = useState({});
  const [updateSectionLoading, setUpdateSectionLoading] = useState(false);
    useEffect(()=>{
        setinfo(category)
    },[category])
  const handleChange = (e) => {
    setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info);
  };
  const handleClose = () => {
    document.getElementById("updateSection").reset();
    setUpdateSectionOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSectionLoading(true);
    try {
      const updatedCategory = {
        ...info,
      };
      const res = await axiosInstance.patch(
        `/category/${category._id}`,
        updatedCategory
      );
      setUpdateSectionLoading(false);
      setUpdateSectionOpen(false);
      document.getElementById("updateSection").reset();

      reFetch(`/category/${category._id}`);
    } catch (error) {
      alert(
        "Something happened. Please try again or contact service provider."
      );
      setUpdateSectionLoading(false);
    }
  };
  return (
    <div id="" className="fixed fadein top-0 left-0 right-0 bottom-0 bg-[#0000005e] z-[1000000000] flex justify-center items-center ">
            




    <div className=" relative w-[90%] md:w-[50%] bg-[white]  overflow-hidden px-0 py-0 rounded-[5px]">
    <div className="flex items-center justify-between pl-4 pr-2 py-2 ">
					<h1 className="roboto-medium ">Update Section Details</h1>
					<button className="btn btn-sm btn-circle btn-ghost " onClick={() => handleClose()}>
						✕
					</button>
				</div>
				<hr />
        <div className="flex flex-col">
        <form id="updateSection" className="my-12 px-4 grow">

          
<div className="relative  ">
    <label htmlFor="" className="roboto-regular text-sm bg-[white] absolute top-0 left-1 translate-y-[-50%] px-2">
      Name
    </label>
    <input onChange={handleChange} defaultValue={info && info.name || ""}  type="text" name="name" id="name" className="border border-[#d9d9d9] border-[2px] text-sm outline-none rounded-[5px] w-full px-4 py-4" />
  </div>

  <div className="relative  mt-8">
    <label htmlFor="" className="roboto-regular text-sm bg-[white] absolute top-0 left-1 translate-y-[-50%] px-2">
    Description
    </label>
    <input onChange={handleChange}  defaultValue={info && info.description || ""}  type="name" name="description" id="description" className="border border-[#d9d9d9] border-[2px] text-sm outline-none rounded-[5px] w-full px-4 py-4" />
  </div>







</form>
        <div className="flex pb-4 px-4">
                <button
                  className="btn-grad  w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]"
                  onClick={handleSubmit}
                >
                  Update section
                  {updateSectionLoading && <ClipLoader color="white" size={24} />}
                </button>
              </div>
        </div>
         
        
        </div>
    </div>
  );
};

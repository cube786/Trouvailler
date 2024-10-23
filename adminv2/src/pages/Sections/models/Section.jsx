import {  useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../../../utils/axiosInstance";

export const Section = ({
    createSectionOpen,
    setCreateSectionOpen,
    reFetch

}) => {

  const [info, setinfo] = useState({});
  const [createSectionLoading, setCreateSectionLoading] = useState(false);
    
  const handleChange = (e) => {
    setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info);
  };
  const handleClose = () => {
    document.getElementById("newSection").reset();
    setCreateSectionOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreateSectionLoading(true);
    try {
      const newCategory = {
        ...info,uploaded:false, page:"null"
      };
      const res = await axiosInstance.post(
        `/category/`,
        newCategory
      );
      setCreateSectionLoading(false);
      setCreateSectionOpen(false);
      document.getElementById("newSection").reset();

      reFetch('/category');
    } catch (error) {
      alert(
        "Something happened. Please try again or contact service provider."
      );
      setCreateSectionLoading(false);
    }
  };
  return (
    <div className="fixed fadein top-0 left-0 right-0 bottom-0 bg-[#0000005e] z-[1000000000] flex justify-center items-center">
     
       
        <div className="relative w-[90%] md:w-[50%] bg-[white] max-h-[500px]  overflow-hidden px-0 py-0 rounded-[5px]">
        <div className="flex items-center justify-between pl-4 pr-2 py-2 ">
					<h1 className="roboto-medium ">New section</h1>
					<button className="btn btn-sm btn-circle btn-ghost " onClick={() => handleClose()}>
						✕
					</button>
				</div>
				<hr />
        <div className="px-4 flex flex-col">
        <form id="newSection" className="my-12 grow">


        <div className="relative  ">
									<label htmlFor="" className="roboto-regular text-sm roboto-medium bg-[white] absolute top-0 left-1 translate-y-[-50%] px-2">
										Title
									</label>
									<input onChange={handleChange}  type="text" name="name" id="name" className="border border-[#d9d9d9] border-[2px] text-sm outline-none rounded-[5px] w-full px-4 py-4" />
								</div>

                <div className="relative mt-8 ">
									<label htmlFor="" className="roboto-regular text-sm roboto-medium bg-[white] absolute top-0 left-1 translate-y-[-50%] px-2">
										One-line description
									</label>
									<input onChange={handleChange}  type="text" name="description" id="description" className="border border-[#d9d9d9] border-[2px] text-sm outline-none rounded-[5px] w-full px-4 py-4" />
								</div>


                




    

</form>
<div className="flex  pb-4">
      <button
        className="btn-grad w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]"
        onClick={handleSubmit}
      >
        Create new section
        {createSectionLoading && <ClipLoader color="white" size={24} />}
      </button>
    </div>
        </div>
      
      
        
        
        </div>
    </div>
  );
};

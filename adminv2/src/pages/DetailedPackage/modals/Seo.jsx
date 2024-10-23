import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Scrollbar } from "react-scrollbars-custom";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../../../utils/axiosInstance";

export const Seo = ({
  seoOpen,
  setSeoOpen,
  pack,
  reFetch,
}) => {

  const location = useLocation();



  const [info, setinfo] = useState({title:"", description:"",keywords:""});
  useEffect(()=>{
    setinfo(pack.seo)
    console.log(info)
  }, [pack, seoOpen])
  const [updateSeoLoading, setUpdateSeoLoading] = useState(false);
    
  const handleChange = (e) => {
    setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info);
  };


  const handleClose = () => {
    document.getElementById("seo").reset();
    setSeoOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSeoLoading(true);
    try {
      const updatedSeo = {
        ...info,
      };
      const res = await axiosInstance.patch(
        `/package/${pack._id}`,
        updatedSeo
      );
      setUpdateSeoLoading(false);
      setSeoOpen(false);
      document.getElementById("seo").reset();

      reFetch(`/package/${location.pathname.split("/")[2]}`);
    } catch (error) {
      alert(
        "Something happened. Please try again or contact service provider."
      );
      setUpdateSeoLoading(false);
    }
  };
  return (
    <div className="fixed fadein top-0 left-0 right-0 bottom-0 bg-[#0000005e] z-[1000000000] flex justify-center items-center">
     
        <div className="relative w-[90%] md:w-[50%] bg-[white] max-h-[500px]  overflow-hidden px-0 py-0 rounded-[5px]">
        <div className="flex items-center justify-between pl-4 pr-2 py-2 ">
					<h1 className="roboto-medium ">SEO Data</h1>
					<button className="btn btn-sm btn-circle btn-ghost " onClick={() => handleClose()}>
						✕
					</button>
				</div>
        <hr />
        <Scrollbar style={{ height: "500px", maxHeight: "400px", width:'99.8%', marginTop:"5px", marginBottom:"5px" }}>
          <div className="py-8 px-4 grow">
            <form
              action=""
              id="seo"
              className="text-[#414141] flex flex-col gap-8"
            >
              <div className="relative  ">
									<label htmlFor="" className="roboto-regular text-sm bg-[white] absolute top-0 left-2 translate-y-[-50%] px-2">
										Page Title
									</label>
									<input onChange={handleChange}  defaultValue={info && info.title} type="text" name="title" id="title" className="border border-[#d9d9d9] border-[2px] text-sm outline-none rounded-[5px] w-full px-4 py-4" />
								</div>
                <div className="relative ">
									<label htmlFor="" className=" text-sm bg-[white] absolute top-0 left-2 translate-y-[-50%] px-2">
										Page Description
									</label>
									<textarea onChange={handleChange} defaultValue={info && info.description} name="description" id="description" className="overflow-auto scroll-textarea border border-[#d9d9d9] border-[2px] outline-none text-sm rounded-[5px] w-full px-4 py-4" />
								</div>
                <div className="relative ">
									<label htmlFor="" className=" text-sm bg-[white] absolute top-0 left-2 translate-y-[-50%] px-2">
                  Site Keywords ( Separate with commas )
									</label>
									<textarea onChange={handleChange} defaultValue={info && info.description} name="keywords" id="keywords" className="overflow-auto scroll-textarea border border-[#d9d9d9] border-[2px] outline-none text-sm rounded-[5px] w-full px-4 py-4" />
								</div>
            
             


             
             
             
             
             
            </form>
          </div>
          <div className="flex px-4">
                <button
                  className="btn-grad w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]"
                  onClick={handleSubmit}
                >
                  Update Package{" "}
                  {updateSeoLoading && <ClipLoader color="white" size={24} />}
                </button>
              </div>
          </Scrollbar >
        </div>
    </div>
  );
};

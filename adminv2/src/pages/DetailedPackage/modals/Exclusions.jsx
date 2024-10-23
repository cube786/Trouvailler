import {  useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { Scrollbar } from "react-scrollbars-custom";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../../../utils/axiosInstance";

export const Exclusions = ({
    setExclusionsOpen,
  exclusionsOpen,
  pack,
  reFetch,
}) => {
	const location = useLocation();

const [exclusion, setExclusion] = useState(null)
  const [info, setinfo] = useState([]);
  useEffect(()=>{
    setinfo(pack.exclusions)
    console.log(info)
  }, [pack, exclusionsOpen])
  const [exclusionsLoading, setExclusionsLoading] = useState(false);
    const handleChange = (e) => {
        setExclusion(e.target.value)

    }
 const addExclusion = (e) => {
    e.preventDefault()
    if(exclusion !== null){
        setinfo((prev)=> ([...prev, exclusion]))
        setExclusion(null)
        document.getElementById('exclusions').reset()
    }
    else{
        alert("Please enter some value!")
    }
    
 }

 const handleDelete = (index) => {
    setinfo(info.filter((item,ind)=> index !== ind))
 }


  const handleClose = () => {
    setExclusionsOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setExclusionsLoading(true);
    try {
        
       
      
      const res = await axiosInstance.patch(
        `/package/${pack._id}`,{exclusions: info}
        
      );
      console.log(res)
      setExclusionsLoading(false);
      setExclusionsOpen(false);
      document.getElementById("exclusions").reset();

      reFetch(`/package/${location.pathname.split("/")[2]}`);
    } catch (error) {
      alert(
        "Something happened. Please try again or contact service provider."
      );
      setExclusionsLoading(false);
    }
  };
  return (
    <div className="fixed fadein top-0 left-0 right-0 bottom-0 bg-[#0000005e] z-[100000000] flex justify-center items-center">
      
       
        <div className="relative w-[90%] md:w-[40%] bg-[white] max-h-[500px]  overflow-hidden px-0 py-0 rounded-[5px]">
        <div className="flex items-center justify-between pl-4 pr-2 py-2 ">
					<h1 className="roboto-medium ">Exclusions</h1>
					<button className="btn btn-sm btn-circle btn-ghost " onClick={() => handleClose()}>
						✕
					</button>
				</div>
        <hr />
        <Scrollbar style={{ height:'400px',width:'99.8%', marginTop:"5px", marginBottom:"5px"}}>

          <div className="py-8 px-4 grow">
           
             
            {info && info.length === 0 &&
              <div className="flex flex-col items-center gap-4 py-4">
              <img src="/images/notFound.gif" alt="" className="w-20"/>
              <h1 className="text-[grey]">No Exclusions added</h1>
          </div>
            }
           <div className=" flex justify-start gap-4 flex-wrap">
           {info && info.map((item, index)=>(
                <span className="  bg-[#dff1ff] py-1 px-1 rounded-full text-[#393939] flex gap-4 items-center" key={index}>
                    <span className="ml-2">{item}</span> <div className="min-h-0 p-0 btn flex justify-center items-center  rounded-full text-[white] w-5 h-5"><IoCloseSharp onClick={()=>handleDelete(index)} className="w-full cursor-pointer text-[#4558ff] " alt="" /></div>
                </span>
            ))}
           </div>

<form
              action=""
              id="exclusions"
              className="text-[#414141] flex flex-col gap-8"
            >

        <div className="flex flex-col gap-2 items-start">
        <div className="relative  mt-8 w-full">
									<label htmlFor="" className="roboto-regular text-sm bg-[white] absolute top-0 left-1 translate-y-[-50%] px-2">
										Enter Exclusion
									</label>
									<input onChange={handleChange}  type="text" name="exclusion" id="exclusion" className="border  border-[#d9d9d9] border-[2px] text-sm outline-none rounded-[5px] w-full px-4 py-4" />
								</div>
                <button className="btn-grad text-xs text-[white] px-4 py-1 rounded" onClick={addExclusion}>Add</button>
        </div>

             
             
             
             
             
            
            </form>
          </div>
          <div className="flex px-4">
                <button
                  className="btn-grad w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]"
                  onClick={handleSubmit}
                >
                  Update Exclusions
                  {exclusionsLoading && <ClipLoader color="white" size={24} />}
                </button>
              </div>
          </Scrollbar>
        </div>
    </div>
  );
};

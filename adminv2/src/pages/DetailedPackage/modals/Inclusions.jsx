import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { Scrollbar } from "react-scrollbars-custom";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../../../utils/axiosInstance";

export const Inclusions = ({
    setInclusionsOpen,
  inclusionsOpen,
  pack,
  reFetch,
}) => {
	const location = useLocation();

const [inclusion, setInclusion] = useState(null)
  const [info, setinfo] = useState([]);
  useEffect(()=>{
    setinfo(pack.inclusions)
    console.log(info)
  }, [pack, inclusionsOpen])
  const [inclusionsLoading, setInclusionsLoading] = useState(false);
    const handleChange = (e) => {
        setInclusion(e.target.value)

    }
 const addInclusion = (e) => {
    e.preventDefault()
    if(inclusion !== null){
        setinfo((prev)=> ([...prev, inclusion]))
        setInclusion(null)
        document.getElementById('inclusions').reset()
    }
    else{
        alert("Please enter some value!")
    }
    
 }

 const handleDelete = (index) => {
    setinfo(info.filter((item,ind)=> index !== ind))
 }


  const handleClose = () => {
    setInclusionsOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setInclusionsLoading(true);
    try {
        
       
      
      const res = await axiosInstance.patch(
        `/package/${pack._id}`,{inclusions: info}
        
      );
      console.log(res)
      setInclusionsLoading(false);
      setInclusionsOpen(false);
      document.getElementById("inclusions").reset();

      reFetch(`/package/${location.pathname.split("/")[2]}`);
    } catch (error) {
      alert(
        "Something happened. Please try again or contact service provider."
      );
      setInclusionsLoading(false);
    }
  };
  return (
    <div className="fixed fadein top-0 left-0 right-0 bottom-0 bg-[#0000005e] z-[100000000] flex justify-center items-center">
      
       
        <div className="relative w-[90%] md:w-[40%] bg-[white] max-h-[500px]  overflow-hidden px-0 py-0 rounded-[5px]">
        <div className="flex items-center justify-between pl-4 pr-2 py-2 ">
					<h1 className="roboto-medium ">Inclusions</h1>
					<button className="btn btn-sm btn-circle btn-ghost " onClick={() => handleClose()}>
						✕
					</button>
				</div>
        <hr />
        <Scrollbar style={{ height:'400px',width:'99.8%', marginTop:"5px", marginBottom:"5px"}}>

          <div className="py-4 px-4 grow">
           
             
            {info && info.length === 0 &&
              <div className="flex flex-col items-center gap-4 py-4">
              <img src="/images/notFound.gif" alt="" className="w-16"/>
              <h1 className="text-[grey]">No Inclusions added</h1>
          </div>
            }
          { info && <div className=" flex justify-start gap-4 flex-wrap">
           {info && info.map((item, index)=>(
                <span className=" bg-[#dff1ff] py-1 px-1 rounded-full text-[#393939] flex gap-4 items-center" key={index}>
                    <span className="ml-2">{item}</span> <div className="btn min-h-0  p-0 flex justify-center items-center  rounded-full text-[white] w-5 h-5"><IoCloseSharp onClick={()=>handleDelete(index)} className="w-full text-[#4558ff] cursor-pointer" alt="" /></div>
                </span>
            ))}
           </div>}

<form
              action=""
              id="inclusions"
              className="text-[#414141] flex flex-col gap-8"
            >


              


        <div className="flex flex-col gap-2 items-start">
        <div className="relative  mt-8 w-full">
									<label htmlFor="" className="roboto-regular text-sm bg-[white] absolute top-0 left-1 translate-y-[-50%] px-2">
										Enter inclusion
									</label>
									<input onChange={handleChange}  type="text" name="inclusion" id="inclusion" className="border  border-[#d9d9d9] border-[2px] text-sm outline-none rounded-[5px] w-full px-4 py-4" />
								</div>
                <button className="btn-grad text-xs text-[white] px-4 py-1 rounded" onClick={addInclusion}>Add</button>
        </div>

             
             
             
             
            
            </form>
          </div>
           
          <div className="flex px-4 pb-2">
                <button
                  className="btn-grad w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]"
                  onClick={handleSubmit}
                >
                  Update Inclusions
                  {inclusionsLoading && <ClipLoader color="white" size={24} />}
                </button>
              </div>

          </Scrollbar>
        </div>
      
    </div>
  );
};

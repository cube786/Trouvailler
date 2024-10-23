import { useContext, useEffect, useState } from "react";
import CropEasy from "../../../utils/crop/CropEasy";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../../../utils/axiosInstance";
import { Scrollbar } from "react-scrollbars-custom";
import { FaChevronDown } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useLocation } from "react-router-dom";

export const Schedule = ({setScheduleOpen, scheduleOpen, pack, reFetch})=> {
  const location = useLocation();

    const [editable, setEditable] = useState(null)
    const [scheduleLoading,setScheduleLoading] = useState(false)
    const [schedule, setSchedule] = useState([])
    const [showNextDayInput, setShowNextDayInput] = useState(false)
    const handleClose = () => {
        setScheduleOpen(false);
        document.querySelector('#newDayForm').reset()
      };
      useEffect(()=>{
        setSchedule(pack.schedule)
      }, [pack, scheduleOpen])
      const [info,setInfo] = useState({})
      const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        console.log(info);
      };
      const handleAddNewDay = (e) => {
        let confirmation = window.confirm("Sure to add this day?")
        if(confirmation){
            e.preventDefault();
            setSchedule(prev => ([...prev, info]))
            document.getElementById('newDayForm').reset()
            setInfo({})
            setShowNextDayInput(false)
        }
        
      }

    const handleShoeNextDayInput = (e) => {
        e.preventDefault()
        document.querySelector('#newDayForm').reset();
        setShowNextDayInput(!showNextDayInput)
       
    }
      
      
      
      const handleSubmit = async (e) => {
        e.preventDefault()
        setScheduleLoading(true)
        try {
            const scheduleobj = {schedule}
            const res = await axiosInstance.patch(`/package/${pack._id}`, scheduleobj)
            setScheduleLoading(false)
            setScheduleOpen(false)
            reFetch(`/package/${location.pathname.split("/")[2]}`)
            
          
        } catch (error) {
            alert(error)
            setScheduleLoading(false)
        }
      }
     
     

      const cancelEdit = (index) => {
        setEditable(null)
      };

      const [currentDay, setCurrentDay] = useState({})
      const makeScheduleEditable = (index) => {
        if(editable === null){
            setEditable(index)
            setCurrentDay(schedule[index])
        }
        else{
            alert("Please complete editing the current day schedule!")
        }
      }
      const handleEditScheduleChange = (e) => {
        setCurrentDay(prev => ({...prev, [e.target.id]: e.target.value}))
        console.log(currentDay)
      }
      const updateEdit = (e, index) => {
        e.preventDefault()
        const newSchedule = schedule;
        newSchedule[index] = currentDay
        setSchedule(newSchedule)
        console.log(schedule)
        setEditable(null)
      }
      const makeScheduleDelete = (index) => {
        setSchedule(schedule.filter((item, ind) => (ind !== index)))
      }

    return(
        <div className="fixed fadein top-0 left-0 right-0 bottom-0 bg-[#0000005e] z-[1000000000] flex justify-center items-center">
     
       
        <div className="relative w-[90%] md:w-[50%] bg-[white] max-h-[500px]  overflow-hidden px-0 py-0 rounded-[5px]">
        <div className="flex items-center justify-between pl-4 pr-2 py-2 ">
					<h1 className="roboto-medium ">Schedule</h1>
					<button className="btn btn-sm btn-circle btn-ghost " onClick={() => handleClose()}>
						✕
					</button>
				</div>
				<hr />
        <Scrollbar style={{ height: "500px", maxHeight: "400px", width:'99.8%', marginTop:"5px", marginBottom:"5px" }}>

          <div className="grow">
          <div className="px-4 py-4">
            {schedule && schedule?.map((item,index)=>(
                <div key={index} className="bg-[#dff1ff] mb-4 rounded px-4 py-2 flex flex-col items-start gap-4 relative">
                    <div className="absolute top-2 right-2 flex items-center ">
                      <div className="btn px-0 py-0 bg-[transparent] min-h-0 h-6 flex justify-center items-center rounded-full shadow-none w-6">
                      <FaRegEdit className="w-5 cursor-pointer text-[#4558ff]" onClick={()=>makeScheduleEditable(index)} />
                      </div>
                      <div className="btn px-0 py-0 bg-[transparent] min-h-0 h-6 w-6 flex justify-center items-center rounded-full shadow-none w-6">
                        <MdDelete style={{fontSize:16}} className=" cursor-pointer text-[#4558ff]" onClick={()=>makeScheduleDelete(index)} />
                      </div>
                    </div>
                    <h1 className="text-sm font-medium flex gap-4 items-center">Day {index+1} - <input onChange={handleEditScheduleChange} type="text" id="dayTitle" className={`${editable ===index ? "bg-[white]":"bg-[transparent]"} grow px-4 py-0 rounded`} defaultValue={item.dayTitle} disabled={editable === index ? false:true}/></h1>
                    <textarea name="" onChange={handleEditScheduleChange} id="dayDesc" className={`${editable ===index ? "bg-[white]":"bg-[transparent]"} w-full overflow-auto scroll-textarea px-2 text-sm py-1 rounded` } disabled={editable === index ? false:true} defaultValue={item.dayDesc}></textarea>
                   { editable === index && <div className="text-xs flex items-center gap-4"><button className="btn-grad text-[10px] text-[white] px-4 py-1 rounded" onClick={(e)=>updateEdit(e,index)}>Update Edit</button>
                                            <button className="btn-grad text-[10px] text-[white] px-4 py-1 rounded" onClick={()=>cancelEdit(index)}>Cancel Edit</button>  </div>
                   }
                </div>
            ))}
          {schedule &&  schedule.length === 0 &&  <div className="flex flex-col items-center  rounded gap-4 py-4">
                    <img src="/images/notFound.gif" alt="" className="w-12"/>
                    <h1 className="text-[grey]">No Schedule added</h1>
                </div>}

          </div>
         



          <div className="px-4 py-2">
               <form action="" id="newDayForm">

               <div>
                    <button className="btn-grad flex items-center gap-3  text-[white] text-xs px-4 py-2 rounded" onClick={handleShoeNextDayInput}>Add next day <FaChevronDown /></button>
                </div>
                <div className={`${showNextDayInput ? " max-h-[500px]" : "max-h-[0px]"} overflow-hidden transition-all duration-300 my-8 flex flex-col gap-4 px-4 shadow-xl rounded border-[#eeeeee]`}>
                  
                <div className="relative  mt-4">
									<label htmlFor="" className="roboto-regular text-sm bg-[white] absolute top-0 left-2 translate-y-[-50%] px-2">
										 Title
									</label>
									<input onChange={handleChange} autoComplete="off"  type="text" name="dayTitle" id="dayTitle" className="border border-[#d9d9d9] border-[2px] text-sm outline-none rounded-[5px] w-full px-4 py-2" />
								</div>
                <div className="relative ">
									<label htmlFor="" className=" text-sm bg-[white] absolute top-0 left-2 translate-y-[-50%] px-2">
										Description
									</label>
									<textarea autoComplete="off" onChange={handleChange}  name="dayDesc" id="dayDesc" className="overflow-auto scroll-textarea border border-[#d9d9d9] border-[2px] outline-none text-sm rounded-[5px] w-full px-4 py-4" />
								</div>
                   
                  
                   <div className="mb-4">
                    <button className="btn-grad text-[white] text-xs px-4 py-1 rounded" onClick={handleAddNewDay}>Add</button>
                   </div>

                </div>



              
               </form>
          </div>
          </div>
          <div className="flex px-4">
                
                <button
                  className="btn-grad  w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]"
                  onClick={handleSubmit}
                >
                  Update Schedule{" "}
                  {scheduleLoading && <ClipLoader color="white" size={24} />}
                </button>
              </div>
          </Scrollbar>
        </div>
    </div>
    )
}
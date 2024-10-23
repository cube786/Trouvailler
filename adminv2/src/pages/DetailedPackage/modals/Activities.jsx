import axios from "axios";
import { useEffect, useState } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../../../utils/axiosInstance";
import CropEasy from "../../../utils/crop/CropEasy";
import { MdDelete } from "react-icons/md";
import { BiSolidCloudUpload } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa6";
import { useLocation } from "react-router-dom";


export const Activities = ({activityOpen, setActivityOpen, pack, reFetch}) => {
  const location = useLocation();

    const [openAddActivity, setOpenAddActivity] = useState(false)
    const [activityLoading, setActivityLoading] = useState(false);
    const [newActivityLoading, setNewActivityLoading] = useState(false)
    

      const [info, setinfo] = useState({});
      const handleChange = (e) => {
        setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        console.log(info);
      };
      const handleClose = () => {
        setActivityOpen(false);
        setinfo({})
        setOpenAddActivity(false)
        document.getElementById('new-activity').reset()

      };

      const [imgFiles, setImgFiles] = useState([]);
      const [cropCompleted, setCropCompleted] = useState(false);

      const [photoURL, setPhotoURL] = useState("");
      const [openCrop, setOpenCrop] = useState(false);
      const [file, setFile] = useState(null);
      

    const [activities, setActivities] = useState([])
    const [existingActivities, setExistingActivities] = useState([])
      useEffect(()=>{
        setExistingActivities(pack.activities)
      },[pack,activityOpen])

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log("hello")
        if (file) {
          setFile(file);
          
          setPhotoURL(URL.createObjectURL(file));
          setOpenCrop(true);
          // console.log(imgFiles)
        }
      };
     


      const handleAddNewActivity =  async (e) => {
        e.preventDefault()
        console.log(info)

        if(!info.title || info.title.trim() === "" || !info.description || info.description.trim() === "" || file === null){
          alert("Please enter all activity fields")
        }
        else{
          setNewActivityLoading(true)
          let confirmation = window.confirm("Are you sure to upload this activity ?")
         if(confirmation){
          console.log(info)
          let url =
          "";
        if (file != "") {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");

          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/difxlqrlc/image/upload",
            data
          );

          url = uploadRes.data.url;
        }
        const newActivity = [
          ...existingActivities, {...info, img:url}
        ]
          await axiosInstance.patch(`/package/${pack._id}`, {activities:newActivity})
          setOpenAddActivity(false)
          setNewActivityLoading(false)
          reFetch(`/package/${location.pathname.split("/")[2]}`)
          setinfo({})
          document.getElementById('new-activity').reset()
          setFile(null)
         }
        }
        
      }

      const handleAddActivity = (e) => {
        e.preventDefault()
        setOpenAddActivity(!openAddActivity)
        document.querySelector('#new-activity').reset()
        setinfo({})
        setFile('')
        setPhotoURL('')

      }
     
      const makeExistingActivityDelete = (index) => {
        setExistingActivities(existingActivities.filter((item,ind)=>(ind !== index)))

      }
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        setActivityLoading(true)
        try {
          await axiosInstance.patch(`/package/${pack._id}`, {activities:existingActivities})
          setActivityLoading(false)
          reFetch(`/package/${location.pathname.split("/")[2]}`)
          setActivityOpen(false)
          
        } catch (error) {
          
        }


      }
      
      const handleCloseCropEasyModal = () => {
        document.getElementById("activity-upload").value = "";
        
      };

      





    return(
      <>
     {openCrop && <CropEasy
				{...{
					photoURL,
					setOpenCrop,
					handleCloseCropEasyModal,
					setPhotoURL,
					setFile,
					imgFiles,
					setImgFiles,
					size: 16 / 9,
					setCropCompleted,
				}}
			/>}
    <div id="" className="fixed fadein top-0 left-0 right-0 bottom-0 bg-[#0000005e] z-[1000000000] flex justify-center items-center ">
            




    <div className=" relative w-[90%] md:w-[50%] bg-[white]  overflow-hidden px-0 py-0 rounded-[5px]">
    <div className="flex items-center justify-between pl-4 pr-2 py-2 ">
					<h1 className="roboto-medium ">Activities</h1>
					<button className="btn btn-sm btn-circle btn-ghost " onClick={() => handleClose()}>
						✕
					</button>
				</div>
				<hr />
				<Scrollbar style={{ height: "500px", maxHeight: "400px", width:'99.8%', marginTop:"5px", marginBottom:"5px", display:'flex', flexDirection:'column', justifyContent:'end'  }}>

        <div className="px-4 grow">
         <div>
          {
              existingActivities && existingActivities?.map((item, index)=>(
                <div key={index} className="relative flex justify-between items-center border bg-[#dff1ff] rounded border-[#e2e2e2] my-4 px-4 py-4">
                            <div className="absolute top-2 right-2 flex items-center gap-4">
                        <div className="btn px-0 py-0 bg-[transparent] min-h-0 h-6 flex justify-center items-center rounded-full shadow-none w-6">
                      <MdDelete className="w-5 cursor-pointer text-[#4558ff]" onClick={()=>makeExistingActivityDelete(index)} />
                      </div>
                    </div>
                                      <div className="w-[15%]">
               <img
                      className=" w-full"
                      src={item.img}
                      alt=""
                    />               </div>



                    <div className="w-[80%]">
                        <h1 className="font-bold text-xl">{item.title  }</h1>
                        <p className="text-sm">{item.description}</p>
                    </div>
                </div>
              ))
            }
          
            

          {existingActivities  && existingActivities.length === 0 &&  <div className="flex flex-col items-center gap-4 py-8">
                    <img src="/images/notFound.gif" alt="" className="w-12"/>
                    <h1 className="text-[grey]">No activities added</h1>
                </div>}

          </div>



          <div>

            <div className="my-4">
              <button className="btn-grad text-xs text-[white] px-4 py-2 rounded flex items-center gap-2" onClick={handleAddActivity}>Add new activity <FaChevronDown /></button>
            </div>

            <div className={`shadow-xl px-4 overflow-hidden rounded ${openAddActivity ? "max-h-[1000px]" : "max-h-[0px]" } transition-all duration-500`}>
              <form action="" id="new-activity" className="py-4">
                 
                    <div className="flex justify-start">
										<label className="flex items-center bg-[#3e3762]  text-sm  px-4 py-1 rounded  gap-2 cursor-pointer text-white" htmlFor="activity-upload">
											<BiSolidCloudUpload style={{ fontSize: 20 }} />
											Choose new Image{" "}
										</label>
										<input type="file" className="hidden" id="activity-upload" onChange={handleImageChange} />
									</div>

                    

              <div className="relative  mt-8">
									<label htmlFor="" className="roboto-regular text-sm bg-[white] absolute top-0 left-1 translate-y-[-50%] px-2">
										Activity Title
									</label>
									<input onChange={handleChange}  type="text" name="title" id="title" className="border border-[#d9d9d9] border-[2px] text-sm outline-none rounded-[5px] w-full px-4 py-4" />
								</div>
                <div className="relative mt-8">
									<label htmlFor="" className=" text-sm bg-[white] absolute top-0 left-2 translate-y-[-50%] px-2">
                  Activity Description
									</label>
									<textarea onChange={handleChange}  name="description" id="description" className="overflow-auto scroll-textarea border border-[#d9d9d9] border-[2px] outline-none text-sm rounded-[5px] w-full px-4 py-4" />
								</div>


              






                  <div className="flex  gap-4 justify-between items-center border border-[#e2e2e2] my-2 px-4 py-1">

                    <div className="w-[30%]">
                       <img
                     className=" w-full"
                     src={
                       !cropCompleted
                         ? "/images/noImg.jpg"
                         : file
                         ? URL.createObjectURL(file)
                         : "/images/noImg.jpg"
                     }
                     alt=""
                   />
                     </div>



                    <div className="w-[80%]">
                        <h1 className="font-bold text-xl">{info.title ? info.title : "Activity Title" }</h1>
                        <p className="text-sm">{info.description ? info.description : "Activity Description" }</p>
                    </div>




                    </div>



                      <div className="flex items-center gap-4">
                        <button className="btn-grad text-xs px-4 py-2 text-[white] rounded flex gap-2 items-center" onClick={handleAddNewActivity}>Add activity{newActivityLoading && <ClipLoader color="white" size={18} />}</button>
                      </div>

              </form>
            </div>

            
          </div>
          
          
          </div>
         <div className="px-4 mb-2">
         <button
                  className="btn-grad  mt-8 w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]" onClick={handleSubmit}
                >
                  Update Activities
                  {activityLoading && <ClipLoader color="white" size={24} />}
                </button>
         </div>
          </Scrollbar>
          
        </div>
        </div></>
    )
}
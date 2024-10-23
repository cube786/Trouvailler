import {  useEffect, useState } from "react"
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import axiosInstance from "../../../utils/axiosInstance";
import CropEasy from "../../../utils/crop/CropEasy";
import { Scrollbar } from "react-scrollbars-custom";
import { FaChevronDown } from "react-icons/fa6";
import { BiSolidCloudUpload } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";


export const PlacesToVisit = ({placesToVisitOpen, setPlacesToVisitOpen, pack, reFetch}) => {
    const [openAddPlace, setOpenAddPlace] = useState(false)
    const [placeLoading, setPlaceLoading] = useState(false);
    const [newPlaceLoading, setNewPlaceLoading] = useState(false)
    
  const location = useLocation()
      const [info, setinfo] = useState({});
      const handleChange = (e) => {
        setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        console.log(info);
      };
      const handleClose = () => {
        setPlacesToVisitOpen(false);
        setinfo({})
        setOpenAddPlace(false)
        document.getElementById('new-place').reset()

      };

      const [imgFiles, setImgFiles] = useState([]);
      const [cropCompleted, setCropCompleted] = useState(false);

      const [photoURL, setPhotoURL] = useState("");
      const [openCrop, setOpenCrop] = useState(false);
      const [file, setFile] = useState(null);
      

    const [existingPlaces, setExistingPlaces] = useState([])
      useEffect(()=>{
        setExistingPlaces(pack.places)
      },[pack,placesToVisitOpen])

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setFile(file);
          
          setPhotoURL(URL.createObjectURL(file));
          setOpenCrop(true);
          // console.log(imgFiles)
        }
      };
     


      const handleAddNewPlace=  async (e) => {
        e.preventDefault()
        console.log(info)

        if(!info.place || info.place.trim() === ""  || file === null){
          alert("Please enter all place fields")
        }
        else{
          setNewPlaceLoading(true)
          let confirmation = window.confirm("Are you sure to upload this Place? New place will be added even if you not click the Update places button.")
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
        const newPlace = [
          ...existingPlaces, {...info, img:url}
        ]
          await axiosInstance.patch(`/package/${pack._id}`, {places:newPlace})
          setOpenAddPlace(false)
          setNewPlaceLoading(false)
          reFetch(`/package/${location.pathname.split("/")[2]}`)
          setinfo({})
          document.getElementById('new-place').reset()
          setFile(null)
         }
        }
        
      }

      const handleAddPlace = (e) => {
        e.preventDefault()
        setOpenAddPlace(!openAddPlace)

      }
     
      const makeExistingPlaceDelete = (index) => {
        setExistingPlaces(existingPlaces.filter((item,ind)=>(ind !== index)))

      }
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        setPlaceLoading(true)
        try {
          await axiosInstance.patch(`/package/${pack._id}`, {places:existingPlaces})
          setPlaceLoading(false)
          reFetch(`/package/${location.pathname.split("/")[2]}`)
          setPlacesToVisitOpen(false)
          
        } catch (error) {
          
        }


      }
      const handleCloseCropEasyModal = () => {
        document.getElementById("places-img-upload").value = "";
        
      };

      





    return(
        <div>
          



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

<div className="fixed fadein top-0 left-0 right-0 bottom-0 bg-[#0000005e] z-[1000000000] flex justify-center items-center">
     
       
     <div className="relative w-[90%] md:w-[50%] bg-[white] max-h-[500px]  overflow-hidden px-0 py-0 rounded-[5px]">
     <div className="flex items-center justify-between pl-4 pr-2 py-2 ">
					<h1 className="roboto-medium ">Places to visit</h1>
					<button className="btn btn-sm btn-circle btn-ghost " onClick={() => handleClose()}>
						✕
					</button>
				</div>
				<hr />
        <Scrollbar style={{ height: "500px", maxHeight: "400px", width:'99.8%', marginTop:"5px", marginBottom:"5px", display:'flex', flexDirection:'column', justifyContent:'end'  }}>

         

       <div className="grow px-4">
       <div>
          {
              existingPlaces && existingPlaces?.map((item, index)=>(
                <div key={index} className="relative flex justify-between items-center bg-[#dff1ff]  my-8 px-4 py-4">
                            <div className="absolute top-2 right-2 flex items-center gap-4">
                        <MdDelete className="w-5 cursor-pointer text-[#4558ff]" onClick={()=>makeExistingPlaceDelete(index)} />

                    </div>
                                      <div className="w-[15%]">
               <img
                      className=" w-full"
                      src={item.img}
                      alt=""
                    />               </div>



                    <div className="w-[80%]">
                        <h1 className="font-bold text-xl">{item.place  }</h1>
                    </div>
                </div>
              ))
            }
          
            

          {existingPlaces  && existingPlaces.length === 0 &&  <div className="flex flex-col items-center gap-4 py-8">
                    <img src="/images/notFound.gif" alt="" className="w-16"/>
                    <h1 className="text-[grey]">No Places added</h1>
                </div>}

          </div>



          <div>

            <div className="my-4  px-4">
              <button className="btn-grad text-[white] px-4 py-2 rounded text-xs flex gap-2 items-center" onClick={handleAddPlace}>Add new place <FaChevronDown /></button>
            </div>

            <div className={` px-4 overflow-hidden rounded shadow-xl ${openAddPlace ? "max-h-[1000px]" : "max-h-[0px]" } transition-all duration-300`}>
              <form action="" id="new-place" className="py-4">
              <div className="flex justify-start">
										<label className="flex items-center bg-[#3e3762]  text-sm  px-4 py-1 rounded  gap-2 cursor-pointer text-white" htmlFor="places-img-upload">
											<BiSolidCloudUpload style={{ fontSize: 20 }} />
											Choose new Image{" "}
										</label>
										<input type="file" className="hidden" id="places-img-upload" onChange={handleImageChange} />
									</div>
                  
              <div className="relative  mt-8">
									<label htmlFor="" className="roboto-regular text-sm bg-[white] absolute top-0 left-1 translate-y-[-50%] px-2">
                  Place Title
									</label>
									<input onChange={handleChange}  type="text" name="place" id="place" className="border border-[#d9d9d9] border-[2px] text-sm outline-none rounded-[5px] w-full px-4 py-4" />
								</div>

                    



            






                    <div className="flex justify-between items-center border border-[#e2e2e2] my-8 px-4 py-4">

                    <div className="w-[15%]">
               <img
                      className=" w-full"
                      src={
                        cropCompleted
                          && 
                           file &&
                          URL.createObjectURL(file)
                      }
                      alt=""
                    />               </div>



                    <div className="w-[80%]">
                        <h1 className="font-bold text-xl">{info.place ? info.place : "Place Title" }</h1>
                    </div>




                    </div>



                      <div className="flex items-center gap-4">
                        <button className="btn-grad px-4 py-2 text-[white] text-xs rounded flex gap-2 items-center" onClick={handleAddNewPlace}>Add place{newPlaceLoading && <ClipLoader color="white" size={18} />}</button>
                      </div>

              </form>
            </div>

           
          </div>
       </div>
       <div className="px-4 pb-4">
       <button
                  className="btn-grad mt-8 w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]" onClick={handleSubmit}
                >
                  Update Places
                  {placeLoading && <ClipLoader color="white" size={24} />}
                </button>
       </div>

          </Scrollbar>
          
        </div> </div>
        </div>
    )
}
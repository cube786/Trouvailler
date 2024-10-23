import axios from "axios"
import { useState } from "react"
import ClipLoader from "react-spinners/ClipLoader"
import axiosInstance from "../../../utils/axiosInstance"
import CropEasy from "../../../utils/crop/CropEasy"
import { BiSolidCloudUpload } from "react-icons/bi";

export const CreatePackageLocation = ({setOpenCreateLocation, openCreateLocation}) => {
    const [location, setLocation] = useState("")
    const [newLocationLoading, setNewLocationLoading] = useState(false)
    const handleChange = (e) => {
        setLocation(e.target.value)
        console.log(location)
    }
    const [photoURL, setPhotoURL] = useState("");
    const [openCrop, setOpenCrop] = useState(false);
    const [file, setFile] = useState("");
    const [imgFiles, setImgFiles] = useState([]);
    const [cropCompleted, setCropCompleted] = useState(false);

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
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
          setNewLocationLoading(true)
            let url =
          "https://res.cloudinary.com/difxlqrlc/image/upload/v1702213948/site/lwxn98cm18bncsmq89nr.jpg";
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
        const loc = {
          location:location.toLowerCase(),
          img:url

        }
        const res= await axiosInstance.post('/packagelocations', loc)
        setOpenCreateLocation(false)
        setNewLocationLoading(false)
        document.getElementById("newLoc").reset();
        setFile("");
            
        } catch (error) {
          if (error.response && error.response.status === 409) {
            alert("Location already exists!"); // Display a specific message for 409 error
          } else {
            console.error(error); // Log the error for other status codes or unexpected errors
          }
        
          setOpenCreateLocation(false);
          setNewLocationLoading(false);
          document.getElementById("newLoc").reset();
          setFile("");
        }

    }
    const handleCloseCropEasyModal = () => {
		document.getElementById("createpackagelocation-img-upload").value = "";
		
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
        <div className="fixed fadein top-0 left-0 right-0 bottom-0 bg-[#0000005e] z-[1000000000] flex justify-center items-center">
            
            <div className="relative w-[90%] md:w-[40%] bg-[white] h-[500px]  overflow-hidden px-0 py-0 rounded-[5px]">
            <div className="flex items-center justify-between pl-4 pr-2 py-2 ">
                <h1 className="roboto-medium ">Location Tags</h1>
                <button className="btn btn-sm btn-circle btn-ghost " onClick={() => setOpenCreateLocation()}>
                    ✕
                </button>
            </div>
            <hr />
                
                <div>
                    <form action=" " onSubmit={handleSubmit} id="newLoc">
                    <div className="px-4">
                       
                       <div className="w-[50%]">
                       <img
                     className="my-8 w-full"
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
                       
                   </div>
                    <div className="flex justify-start px-4 mt-8">
										<label className="flex items-center bg-[#3e3762]  text-sm  px-4 py-1 rounded  gap-2 cursor-pointer text-white" htmlFor="createpackagelocation-img-upload">
											<BiSolidCloudUpload style={{ fontSize: 20 }} />
											Choose Image{" "}
										</label>
										<input type="file" className="hidden" id="createpackagelocation-img-upload" onChange={handleImageChange} />
									</div>
                       
                        <div className="relative mx-4 mt-8">
									<label htmlFor="" className="roboto-regular text-sm bg-[white] absolute top-0 left-1 translate-y-[-50%] px-2">
										Package Title
									</label>
									<input onChange={handleChange}  type="text" name="location" id="location" className="border border-[#d9d9d9] border-[2px] text-sm outline-none rounded-[5px] w-full px-4 py-2" />
								</div>
                                
                        
                    
                        <div className="px-4  mt-8">
                        <button
                  className="btn-grad  w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]"
                  onClick={handleSubmit}
                >
                  Add Location{" "}
                  {newLocationLoading && <ClipLoader color="white" size={24} />}
                </button>                        </div>
                    </form>
                </div>
            </div>
        </div></>
    )
}
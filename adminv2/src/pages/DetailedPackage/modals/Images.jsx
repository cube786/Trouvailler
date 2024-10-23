import React, { useEffect, useState } from 'react'
import { Scrollbar } from 'react-scrollbars-custom';
import ClipLoader from 'react-spinners/ClipLoader';
import axiosInstance from '../../../utils/axiosInstance';
import CropEasy from '../../../utils/crop/CropEasy';
import { BiSolidCloudUpload } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { useLocation } from 'react-router-dom';

function Images({pack, reFetch, setOpenImagesUpload, openImagesUpload}) {
  const location = useLocation();

    const [updateImagesLoading,setUpdateImagesLoading] = useState(false)
    const [imgFiles, setImgFiles] = useState([]);
	const [cropCompleted, setCropCompleted] = useState(false);
    const handleCloseCropEasyModal = () => {
		document.getElementById("images-img-upload").value = "";
		
	};
    // const handleClose = () => {
    //     setImagesOpen(false);
    //     
    //   };
      const [images, setImages] = useState([])
      useEffect(()=>{
        setImages(pack.images)
      },[pack, openImagesUpload])

      const handleImagesClose = () => {
		setFile("");
		setPhotoURL("");
        setImgFiles([])
        setOpenImagesUpload(false)	
    };

      const handleDeleteImageExisting = (index) => {
        setImages(images.filter((item,ind)=>(ind !== index)))

      }
      const handleDeleteImageNew = (index)=> {
        setImgFiles(imgFiles.filter((item,ind)=>ind !== index))
      }
      const [file, setFile] = useState("");

      const [photoURL, setPhotoURL] = useState("");
      const [openCrop, setOpenCrop] = useState(false);
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setFile(file);
          setPhotoURL(URL.createObjectURL(file));
          setOpenCrop(true);
          // console.log(imgFiles)
        }
      };
      const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(images)
        setUpdateImagesLoading(true)
        try {
            const list = await Promise.all(
                Object.values(imgFiles).map(async (file) => {
                  const data = new FormData();
                  data.append("file", file);
                  data.append("upload_preset", "upload");
                  const uploadRes = await axiosInstance.post(
                    "https://api.cloudinary.com/v1_1/difxlqrlc/image/upload",
                    data
                  );
        
                  const url = uploadRes.data.url;
                  return url;
                })
              );

              const data = {
                images:[...images, ...list ]
              }

              const res = await axiosInstance.patch(`/package/${pack._id}`, data)
                setUpdateImagesLoading(false)
                setImgFiles([])
                setOpenImagesUpload(false)
                reFetch(`/package/${location.pathname.split("/")[2]}`)
            
        } catch (error) {
            alert(error)
            setUpdateImagesLoading(false)
        }
      }
      
  return (
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
        <div className="  relative w-[90%] md:w-[50%] bg-[white]  overflow-hidden px-0 py-0 rounded-[5px]">
            <div className="flex items-center justify-between pl-4 pr-2 py-2 ">
                <h1 className="roboto-medium ">Images</h1>
                <button className="btn btn-sm btn-circle btn-ghost " onClick={() => handleImagesClose()}>
                    ✕
                </button>
            </div>
            <hr />
            <Scrollbar style={{ height: "500px", maxHeight: "400px", width:'99.8%', marginTop:"5px", marginBottom:"5px" }}>
                <div className='grow'>
                <div className="py-8 px-4">
                <div className="flex flex-wrap gap-[5%]">
                    {images && images.map((item,index)=>(
                        <div className="w-[30%] relative mb-8 aspect-video skeleton"  key={index}>
                            <img src={item} alt="" />
                            <div className="absolute top-1 w-4 glass bg-[#ffffff70] h-4 btn min-h-0 px-0 py-0 right-1  rounded-full ">
                                <IoCloseSharp className="w-6  cursor-pointer " onClick={()=>handleDeleteImageExisting(index)}/>
                            </div>
                        </div>
                    ))}
                    {imgFiles &&
                Object.values(imgFiles).map((pic, index) => (
                 <div className="w-[30%] mb-8 relative">
                     <img
                    className="w-full"
                    src={
                      pic
                        ? URL.createObjectURL(pic)
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                  />
                   <div className="absolute top-1 w-4 glass bg-[#ffffff70] h-4 btn min-h-0 px-0 py-0 right-1  rounded-full ">
                                <IoCloseSharp className="w-6  cursor-pointer " onClick={()=>handleDeleteImageNew(index)}/>
                            </div>
                 
                 </div>
                ))}
                </div>
          </div>



          <div className="px-4">
                <form action="">
                <div className="flex justify-start">
										<label className="flex items-center bg-[#3e3762]  text-sm  px-4 py-1 rounded  gap-2 cursor-pointer text-white" htmlFor="images-img-upload">
											<BiSolidCloudUpload style={{ fontSize: 20 }} />
											Choose new Image{" "}
										</label>
										<input type="file" className="hidden" id="images-img-upload" onChange={handleImageChange} />
									</div>

                    
                </form>
          </div>
                </div>
                <div className="flex mt-4 px-4">
                <button
                  className="btn-grad mb-4 w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]"
                  onClick={handleSubmit}
                >
                  Update Images{" "}
                  {updateImagesLoading && <ClipLoader color="white" size={24} />}
                </button>
              </div>
            </Scrollbar>
        </div>
    </div>
</>

  
  )
}

export default Images
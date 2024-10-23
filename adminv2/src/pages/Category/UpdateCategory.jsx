import React, { useEffect, useState } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import { useLocation, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
import CropEasy from "../../utils/crop/CropEasy";

function UpdateCategory({ pack, reFetch, openUpdateCategory, setOpenUpdateCategory }) {
	const location = useLocation();
    const [ id, setId] = useState("")
	const [file, setFile] = useState("");
    const [photoURL, setPhotoURL] = useState("");
	const [updateLoading, setUpdateLoading] = useState(false);
	const [size, setSize] = useState(null)
	const [mobileImg, setMobileImg] = useState("")
    const [ desktopImg, setDesktopImg] = useState("")
    const [loading, setLoading] = useState(false);
	const [info, setinfo] = useState({});
	const [openCrop, setOpenCrop] = useState(false);
	const [imgFiles, setImgFiles] = useState([]);
	const [cropCompleted, setCropCompleted] = useState(false);
	const handleChange = (e) => {
		setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
		console.log(info);
	};
	useEffect(()=>{
		setinfo(pack)
	},[pack])

	const handleCloseCropEasyModal = () => {
		document.getElementById("img-input-create-category-mobile").value = "";
		document.getElementById("img-input-create-category-desktop").value = "";
	
		setSize(null)
		console.log(size)
	  };
	

	const handleBasicDetailsClose = () => {
		setOpenUpdateCategory(false)
		setinfo({});
	};

	const handleImageChange = (e) => {

		const file = e.target.files[0];
		if (file) {
		  setFile(file);
		  setPhotoURL(URL.createObjectURL(file));
		  setId("img-input-create-category-desktop")
		  setSize(151 / 25)
		  // console.log(imgFiles)
		}
	  };
	  

const handleMobileImageChange = (e) => {

  
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
      setId("img-input-create-category-mobile")

      setSize(16 / 9)
      // console.log(imgFiles)
    }
  };


  useEffect(()=>{
	if(size !== null) {
	  setOpenCrop(true)
  
	}
  }, [size])
  
  


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (info.title) {
      try {
        setLoading(true);

        let mobileurl = pack.mobileImg
          
          let desktopUrl = pack.desktopImg
          
       
          if (mobileImg != "") {
          const data = new FormData();
          data.append("file", mobileImg);
          data.append("upload_preset", "upload");

          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/difxlqrlc/image/upload",
            data
          );

          mobileurl = uploadRes.data.url;
        }
        if (desktopImg != "") {
          const data = new FormData();
          data.append("file", desktopImg);
          data.append("upload_preset", "upload");

          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/difxlqrlc/image/upload",
            data
          );

          desktopUrl = uploadRes.data.url;
        }
        const newCategoryItem = {
          title: info.title.toLowerCase(),
		  description:info.description.toLowerCase(),
          mobileImg : mobileurl,
          desktopImg:desktopUrl
          
        
        };
        
        const res = await axiosInstance.patch(`/categoryItem/${pack._id}`, newCategoryItem);
        console.log(res);
        setLoading(false)
		setOpenUpdateCategory(false)
		reFetch('/categoryItem')

      } catch (error) {}
    } else {
      alert("Please enter a package name");
    }
  };
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
          setSize:setSize,
					size: size,
					setCropCompleted,
          id,
          setDesktopImg,
          setMobileImg
				}}
			/>}
		
		
		
		<div id="" className="fixed fadein top-0 left-0 right-0 bottom-0 bg-[#0000005e] z-[1000000000] flex justify-center items-center ">
			<div className=" relative w-[90%] md:w-[50%] bg-[white]  overflow-hidden px-0 py-0 rounded-[5px]">
				<div className="flex items-center justify-between pl-4 pr-2 py-2 ">
					<h1 className="roboto-medium ">Update Category</h1>
					<button className="btn btn-sm btn-circle btn-ghost " onClick={() => handleBasicDetailsClose()}>
						✕
					</button>
				</div>
				<hr />
				<Scrollbar style={{ height: "700px", maxHeight: "600px", width:'99.8%', marginTop:"5px", marginBottom:"5px"  }}>
					<div>
						<div className="pl-4 pr-4 py-2 mt-6">
							<form action="" id="basicDetails" className="text-[#414141] flex flex-col gap-8">
								<div className="relative  ">
									<label htmlFor="" className="roboto-regular text-sm bg-[white] absolute top-0 left-1 translate-y-[-50%] px-2">
										Category Title
									</label>
									<input onChange={handleChange} defaultValue={pack.title} type="text" name="title" id="title" className="border border-[#d9d9d9] border-[2px] text-sm outline-none rounded-[5px] w-full px-4 py-4" />
								</div>

								

								

								<div className="relative ">
									<label htmlFor="" className=" text-sm bg-[white] absolute top-0 left-2 translate-y-[-50%] px-2">
										Description
									</label>
									<textarea onChange={handleChange} defaultValue={pack.description} name="description" id="description" className="overflow-auto scroll-textarea border border-[#d9d9d9] border-[2px] outline-none text-sm rounded-[5px] w-full px-4 py-4" />
								</div>


								<div className="relative flex">
									<div className="w-[50%]">
									<label className="form-control w-full max-w-xs">
											<div className="label">
												<span className="label-text">Upload Desktop Banner Image</span>
											</div>
												<label htmlFor="img-input-create-category-desktop" className="cursor-pointer text-[white] px-4 py-1 bg-[#3e3762] w-fit rounded-[6px]">Choose File</label>
											<input type="file" className="file-input hidden file-input-sm file-input-bordered w-full max-w-xs"   id="img-input-create-category-desktop"
																	onChange={handleImageChange}/>
											
											</label>
									</div>
									<div className="w-[50%]">
										<img  src={
                        !cropCompleted
                          ? pack.desktopImg
                          : desktopImg
                          ? URL.createObjectURL(desktopImg)
                          : pack.desktopImg
                      }  className="w-full"/>
									</div>
								</div>

								<div className="relative flex">
									<div className="w-[50%]">
									<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Upload Mobile Banner Image</span>
  </div>
    <label htmlFor="img-input-create-category-mobile" className="cursor-pointer text-[white] px-4 py-1 bg-[#3e3762] w-fit rounded-[6px]">Choose File</label>
  <input type="file" className="file-input hidden file-input-sm file-input-bordered w-full max-w-xs"   id="img-input-create-category-mobile"
                        onChange={handleMobileImageChange}/>
  
</label>
									</div>
									<div className="w-[50%]">
										<img  src={
                        !cropCompleted
                          ? pack.mobileImg
                          : mobileImg
                          ? URL.createObjectURL(mobileImg)
                          : pack.mobileImg
                      }  className="w-full"/>
									</div>
								</div>

								

								
								

								

								

								<div className="flex ">
									<button className=" btn-grad w-full flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]" onClick={handleSubmit}>
										Update Category {updateLoading && <ClipLoader color="white" size={24} />}
									</button>
								</div>
							</form>
						</div>
					</div>
				</Scrollbar>
			</div>
		</div></>
	);
}

export default UpdateCategory;

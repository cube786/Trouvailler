import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { MyContext } from "../../context/myContext";
import axiosInstance from "../../utils/axiosInstance";
import {useNavigate} from 'react-router-dom'
import CropEasy from "../../utils/crop/CropEasy";
import axios from "axios";

function CreateCategory() {

    const [mobileImg, setMobileImg] = useState("")
    const [ desktopImg, setDesktopImg] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [ id, setId] = useState("")
    const [file, setFile] = useState("");
    const [photoURL, setPhotoURL] = useState("");
  const [openCrop, setOpenCrop] = useState(false);
  const [imgFiles, setImgFiles] = useState([]);
  const [cropCompleted, setCropCompleted] = useState(false);
  const { expand, setExpand } = useContext(MyContext);
const [size, setSize] = useState(null)
  const [info, setinfo] = useState({});

  useEffect(()=>{
    setExpand(false)
  }, [])
  const handleChange = (e) => {
    setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info);
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

        let mobileurl =
          "https://res.cloudinary.com/difxlqrlc/image/upload/v1702213948/site/lwxn98cm18bncsmq89nr.jpg";
          let desktopUrl =
          "https://res.cloudinary.com/difxlqrlc/image/upload/v1702213948/site/lwxn98cm18bncsmq89nr.jpg";
       
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
          description: info.description.toLowerCase(),
          mobileImg : mobileurl,
          desktopImg:desktopUrl
          
        
        };
        
        const res = await axiosInstance.post("/categoryItem", newCategoryItem);
        console.log(res);
        setLoading(false)
        navigate('/packages/category')

      } catch (error) {}
    } else {
      alert("Please enter a package name");
    }
  };
  const handleCloseCropEasyModal = () => {
    document.getElementById("img-input-create-category-mobile").value = "";
    document.getElementById("img-input-create-category-desktop").value = "";

    setSize(null)
    console.log(size)
  };


  const breadcrumb = [ 
    {
      name: "Home",
      path: "/"
    },
    {
      name: "Travel Packages",
      path: "/packages"
    },
    {
      name: "Categories",
      path: "/packages/category"
    },
    {
      name: "Create new Category",
      path: null
    }
  ]


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
   
    <div className="w-[100vw]  h-[100vh] flex w-full">
        
      <Sidebar />
      <div
        className={` h-full w-full trasition-all  duration-300   ${
          expand ? "ml-[280px]" : "md:ml-[70px] "
        }`}
      >
        <Navbar pageTitle="Travel Packages" breadcrumb={breadcrumb} />
        <div className="py-4 md:py-12 px-4 md:px-24  w-full bg-[#f5f5f55e] sticky top-[61px] overflow-auto  available-height">
        
          <div className="w-full">
           <div className="flex items-center justify-between pb-4">
           <h3 className="mb-2 roboto-medium md:text-xl">
              Create Category
            </h3>                    <button className="px-4 py-2 text-xs md:text-base btn-grad rounded text-[white] glass"   onClick={handleSubmit}>Create Category</button> 

           </div>
            <hr className="mb-6" />
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-[50%]">
                    <form action="">
                    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Category</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"  id="title"  onChange={handleChange} />
  
</label>



<label className="form-control w-full max-w-xs mt-4">
  <div className="label">
    <span className="label-text">Description</span>
  </div>
  <textarea placeholder="Type here" className="input input-bordered py-2 w-full max-w-xs"  id="description"  onChange={handleChange} />
  
</label>


<div className="mt-8">
                    <div className="flex flex-col  gap-2 items-start gap-8">
                    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Upload Desktop Banner Image</span>
  </div>
    <label htmlFor="img-input-create-category-desktop" className="cursor-pointer text-[white] px-4 py-1 bg-[#3e3762] w-fit rounded-[6px]">Choose File</label>
  <input type="file" className="file-input hidden file-input-sm file-input-bordered w-full max-w-xs"   id="img-input-create-category-desktop"
                        onChange={handleImageChange}/>
  
</label>





<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Upload Mobile Banner Image</span>
  </div>
    <label htmlFor="img-input-create-category-mobile" className="cursor-pointer text-[white] px-4 py-1 bg-[#3e3762] w-fit rounded-[6px]">Choose File</label>
  <input type="file" className="file-input hidden file-input-sm file-input-bordered w-full max-w-xs"   id="img-input-create-category-mobile"
                        onChange={handleMobileImageChange}/>
  
</label>
                  
                    </div>
                  </div>
                    </form>
                </div>
                <div className="w-full mt-8 md:mt-0 md:w-[50%]">
                    <h3 className="roboto-medium mb-2">Preview</h3>
                    <hr />
                    <div className="bg-[white] min-h-[200px] mt-6 shadow-xl rounded-[10px] px-8 py-8">
                        <h1 className="text-lg roboto-bold">{info.title ? info.title : null}</h1>
                        <h1 className="text-lg roboto-bold">{info.description ? info.description : null}</h1>

                        <div className="w-[60%]">
                          <p>Desktop Banner Image</p>
                    <img
                      className="my-8 w-full rounded"
                      src={
                        !cropCompleted
                          ? "/images/noImg.jpg"
                          : desktopImg
                          ? URL.createObjectURL(desktopImg)
                          : "/images/noImg.jpg"
                      }
                      alt=""
                    />
                  </div>
                  <div className="w-[60%]">
                          <p>Mobile Banner Image</p>
                    <img
                      className="my-8 w-full rounded"
                      src={
                        !cropCompleted
                          ? "/images/noImg.jpg"
                          : mobileImg
                          ? URL.createObjectURL(mobileImg)
                          : "/images/noImg.jpg"
                      }
                      alt=""
                    />
                  </div>
                    </div>
                </div>
            </div>
          </div>

        
        </div>
      </div>
    </div></>
  );
}

export default CreateCategory;

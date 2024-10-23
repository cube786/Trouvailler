import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { MyContext } from "../../context/myContext";
import axiosInstance from "../../utils/axiosInstance";
import {useNavigate} from 'react-router-dom'
import CropEasy from "../../utils/crop/CropEasy";
import axios from "axios";

function CreatePackage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const [file, setFile] = useState("");
    const [photoURL, setPhotoURL] = useState("");
  const [openCrop, setOpenCrop] = useState(false);
  const [imgFiles, setImgFiles] = useState([]);
  const [cropCompleted, setCropCompleted] = useState(false);
  const { expand, setExpand } = useContext(MyContext);

  useEffect(()=>{
    setExpand(false)
  }, [])
  const size = 16 / 9;

  const [info, setinfo] = useState({});

  const handleChange = (e) => {
    setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info);
  };
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
    e.preventDefault();


    if (info.title) {
      try {
        setLoading(true);

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
        const newPackage = {
          ...info,
          titleImage:url,
          images: [],
          uploaded:false,
          shortDescription:"",
          descriptionTitle:"",
          description:"",
          price:0,
          duration:"",
          shortDuration:"",
          category:null,
          locationTags:[],
          schedule:[],
          seo:{
            title:"",
            description:"",
            keywords:""
          },
          cardTags:{
            cardTag1:"",
            cardTag2:""
          },
          activities:[],
          inclusions:[],
          exclusions:[],
          locations:[],
          categories:[],
          places:[],
          featured:{
            featured:false,
            order:0
          }
        };
        const res = await axiosInstance.post("/package/new", newPackage);
        console.log(res);
        setLoading(false)
        navigate('/')

      } catch (error) {}
    } else {
      alert("Please enter a package name");
    }
  };
  const handleCloseCropEasyModal = () => {
    document.getElementById("img-input-create-package").value = "";
    
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
      name: "Create Package",
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
					size: 16 / 9,
					setCropCompleted,
				}}
			/>}
   
    <div className="w-[100vw]  h-[100vh] flex w-full">
        
      <Sidebar />
      <div
        className={` h-full w-full trasition-all  duration-300   ${
          expand ? "ml-[280px]" : "md:ml-[70px] "
        }`}
      >
        <Navbar pageTitle="Travel Packages" breadcrumb={breadcrumb}/>
        <div className="py-4 md:py-12 px-4 md:px-24  w-full bg-[#f5f5f55e] sticky top-[61px] overflow-auto  available-height">
        
          <div className="w-full">
           <div className="flex items-center justify-between pb-4">
           <h3 className="mb-2 roboto-medium md:text-xl">
              Create Travel Package
            </h3>                    <button className="px-4 py-2 btn-grad rounded text-[white] text-xs md:text-base"   onClick={handleSubmit}>Create Package</button> 

           </div>
            <hr className="mb-6" />
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-[50%]">
                    <form action="">
                    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Package Title?</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"  id="title"  onChange={handleChange} />
  
</label>
<div className="mt-8">
                    <div className="flex gap-2 items-center">
                    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Upload Title Image</span>
  </div>
    <label htmlFor="img-input-create-package" className="cursor-pointer text-[white] px-4 py-1 bg-[#3e3762] w-fit rounded-[6px]">Choose File</label>
  <input type="file" className="file-input hidden file-input-sm file-input-bordered w-full max-w-xs"   id="img-input-create-package"
                        onChange={handleImageChange}/>
  
</label>
                  
                    </div>
                  </div>
                    </form>
                </div>
                <div className="mt-8 md:mt-0 w-full md:w-[50%]">
                    <h3 className="roboto-medium mb-2">Preview</h3>
                    <hr />
                    <div className="bg-[white] min-h-[200px] mt-6 shadow-xl rounded-[10px] px-8 py-8">
                        <h1 className="text-lg roboto-bold">{info.title ? info.title : null}</h1>
                        <div className="w-[60%]">
                    <img
                      className="my-8 w-full rounded"
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
                </div>
            </div>
          </div>

        
        </div>
      </div>
    </div></>
  );
}

export default CreatePackage;

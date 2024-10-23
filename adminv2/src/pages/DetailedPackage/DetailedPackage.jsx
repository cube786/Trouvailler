import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { MyContext } from "../../context/myContext";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../utils/useFetch";
import { BiDetail } from "react-icons/bi";
import { FaImage } from "react-icons/fa6";
import { FaImages } from "react-icons/fa6";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { TbSeo } from "react-icons/tb";
import { FaTags } from "react-icons/fa";
import { FaHiking } from "react-icons/fa";
import { MdTravelExplore } from "react-icons/md";
import { GoCheckCircleFill } from "react-icons/go";
import { IoIosCloseCircle } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../../utils/axiosInstance";
import { Scrollbar } from "react-scrollbars-custom";
import { TbCategoryFilled } from "react-icons/tb";
import { FaMobileRetro } from "react-icons/fa6";

import BasicDeatils from "./modals/BasicDeatils";
import UpdateErrorModal from "./modals/UpdateErrorModal";
import TitleImageUpload from "./modals/TitleImageUpload";
import Images from "./modals/Images";
import { LocationTags } from "./modals/LocationTags";
import { Schedule } from "./modals/Schedule";
import { Seo } from "./modals/Seo";
import { CardText } from "./modals/CardTags";
import { Activities } from "./modals/Activities";
import { PlacesToVisit } from "./modals/PlacestoVisit";
import { Inclusions } from "./modals/Inclusions";
import { Exclusions } from "./modals/Exclusions";
import TitleImageUploadMobile from "./modals/TitleImageUploadMobile";
import { SecondaryLocations } from "./modals/SecondaryLocations";
import { Categories } from "./modals/Categories";

function DetailedPackage() {
    const [openBasicDetails, setOpenBasicDetails] = useState(false)
    const [openTitleImage, setOpenTitleImage] = useState(false)
	const [openTitleImageMobile, setOpenTitleImageMobile] = useState(false)
	
    const [openLocationTags, setOpenLocationTags] = useState(false)
	const [openSeondaryLocs, setOpenSeondaryLocs] = useState(false)
	const [openCategories, setOpenCategories] = useState(false)

	
    const [ openImagesUpload, setOpenImagesUpload] = useState(false)
    const [scheduleOpen, setScheduleOpen] = useState(false)
    const [cardTextOpen, setCardTextOpen] =useState(false)
    const [activityOpen, setActivityOpen] = useState(false)
    const [placesToVisitOpen, setPlacesToVisitOpen] = useState(false)
	const [inclusionsOpen, setInclusionsOpen] = useState(false)
    const [exclusionsOpen, setExclusionsOpen] = useState(false)
	const navigate = useNavigate()
    const [seoOpen, setSeoOpen] = useState(false)
	const { expand } = useContext(MyContext);
	const location = useLocation();
	const { data, loading, error, reFetch } = useFetch(`/package/${location.pathname.split("/")[2]}`);

	//CropEasy states

	//Initial Package Fetching Block
	const [pack, setPackage] = useState({});
	useEffect(() => {
		setPackage(data);
	}, [data]);

	//Common info object for storing form data. Used in multiple forms.
	const [info, setinfo] = useState({});
	const handleChange = (e) => {
		setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
		console.log(info);
	};

	//Error handling modal
	const [updateError, setUpdateError] = useState(null);

	//Basic Details Update Modal


	const handleUpload = async (id) => {
		alert(id)
		console.log(document.querySelector('#uploadedpackageCheck').checked)
		if(document.querySelector('#uploadedpackageCheck').checked === false){
		  console.log("im out")
		  const confirmOption = window.confirm('Are you sure to Archive this Package?')
		  if(confirmOption){
			try {
			  const res = await axiosInstance.patch(`/package/${id}`,
			  {uploaded: false})
			  reFetch(`/package/${id}`)
			  
			} catch (error) {
			  alert("Sorry, some error occured. Please try again later.")
			  reFetch(`/package/${id}`)
  
			}
		  }
		  else{
			reFetch(`/package/${id}`)

		  }
		  
		}
		if(document.querySelector('#uploadedpackageCheck').checked === true){
		  console.log('im in')
		  const confirmOption = window.confirm('Are you sure to publish this package?')
		  if(confirmOption){
			try {
			  const res = await axiosInstance.patch(`/package/${id}`,
			  {uploaded: true})
			  reFetch(`/package/${id}`)
			  
			} catch (error) {
			  alert("Sorry, some error occured. Please try again later.")
			  reFetch(`/package/${id}`)
  
			}
		  }
		  else{
			reFetch(`/package/${id}`)

		  }
		  
		}
	  }
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
		  name: data.title,
		  path: null
		}
	  ]
	  const handleDeletePackage = async (id)=> {
		const confirmDelete = window.confirm("Are you sure to delete this package? If deleted this package will be removed from all the Sections and this action can be undone!")
		if(confirmDelete){
			try{

				const res = await axiosInstance.delete(`/package/admin/delete/${id}`)
				alert(res.data.msg)
				navigate('/packages/list')


			}catch(error){
				alert(error)
			}
		}
	  }

	return (
		<>
          {openBasicDetails ?  <BasicDeatils pack={pack} reFetch={reFetch} setUpdateError={setUpdateError} setOpenBasicDetails={setOpenBasicDetails} />: null}
          {openTitleImage ?  <TitleImageUpload pack={pack} reFetch={reFetch} setUpdateError={setUpdateError} setOpenTitleImage={setOpenTitleImage} />: null}
		  {openTitleImageMobile ?  <TitleImageUploadMobile pack={pack} reFetch={reFetch} setUpdateError={setUpdateError} setOpenTitleImageMobile={setOpenTitleImageMobile} />: null}

            {openImagesUpload ? <Images pack={pack} reFetch={reFetch}  setOpenImagesUpload={setOpenImagesUpload} openImagesUpload={openImagesUpload} /> : null}
{openLocationTags ?             <LocationTags openLocationTags={openLocationTags} setOpenLocationTags={setOpenLocationTags} pack={pack} reFetch={reFetch} />
:null}

{scheduleOpen ? <Schedule  pack={pack} reFetch={reFetch} scheduleOpen={scheduleOpen} setScheduleOpen={setScheduleOpen} />: null}
            {seoOpen ? <Seo pack={pack} reFetch={reFetch} seoOpen={seoOpen} setSeoOpen={setSeoOpen} />: null}
            {cardTextOpen ? <CardText pack={pack} setCardTextOpen={setCardTextOpen} reFetch={reFetch} cardTextOpen={cardTextOpen} /> : null}
           {activityOpen ? <Activities pack={pack} setActivityOpen={setActivityOpen} reFetch={reFetch} activityOpen={activityOpen} /> : null}
           {placesToVisitOpen ? <PlacesToVisit pack={pack} reFetch={reFetch} placesToVisitOpen={placesToVisitOpen} setPlacesToVisitOpen={setPlacesToVisitOpen} />:null}
		   {inclusionsOpen ? <Inclusions pack={pack} reFetch={reFetch} inclusionsOpen={inclusionsOpen} setInclusionsOpen={setInclusionsOpen} /> : null}
		   {exclusionsOpen ? <Exclusions pack={pack} reFetch={reFetch} exclusionsOpen={exclusionsOpen} setExclusionsOpen={setExclusionsOpen} />:null}
		   {openSeondaryLocs ? <SecondaryLocations pack={pack} reFetch={reFetch} openSeondaryLocs={openSeondaryLocs} setOpenSeondaryLocs={setOpenSeondaryLocs} />:null}
		   {openCategories ? <Categories pack={pack} reFetch={reFetch} openCategories={openCategories} setOpenCategories={setOpenCategories} />:null}

		    <div className="w-[100vw]  h-[100vh] flex w-full">
				<Sidebar />
				<div className={` h-full w-full trasition-all  duration-300   ${expand ? "ml-[280px]" : "md:ml-[70px] "}`}>
					<Navbar pageTitle="Package Details" breadcrumb={breadcrumb}/>
					<div className="py-4 md:py-12 px-4 md:px-24  w-full bg-[#f5f5f55e] sticky top-[61px] overflow-auto  available-height">
						{error && (
							<div className="flex flex-col mt-20 items-center">
								<img src="/images/notfound.gif" alt="" className="w-20" />
								<span>Package not Found!</span>
							</div>
						)}

						{loading ? (
							<div className={`h-full flex justify-center py-28 mt-20   `}>
								<progress className="progress w-56"></progress>
							</div>
						) : null}

						{!error && !loading && data && (
							<div className="w-full fadein">
								<div className="flex justify-between items-center mb-2">
									<h3 className="mb-2 roboto-medium text-xl">{data.title}</h3>
									<div className="flex items-center gap-4">
										<button className="text-sm btn-grad px-4 py-2 rounded text-[white]" onClick={()=>handleDeletePackage(data._id)}>Delete Package</button>
										<span>Uploaded</span>
										<input type="checkbox" id="uploadedpackageCheck" className="toggle toggle-success" defaultChecked={data.uploaded} onChange={()=>{handleUpload( data._id)}}/>
									</div>
								</div>
								<hr className="mb-6  " />

								<div className="text-center py-20">
									<h1>Analysis data wiil be shown here</h1>
								</div>

								<div className="">
									<div className="roboto-bold text-base">Update Package Data</div>
                                  

									<hr className=" mt-2" />

									<div className="py-8 w-full">
										<div className="w-full flex gap-[1.66%] md:gap-[2%] flex-wrap">
											<div onClick={() => setOpenBasicDetails(!openBasicDetails)} className="text-center shadow-xl bg-white w-[32%] md:w-[15%] mb-6 rounded-[10px] cursor-pointer flex flex-col justify-center items-center py-8">
												<BiDetail className="text-[40px] text-[#00d9ff]" />
												<span className="mt-2 text-xs roboto-medium">Basic Details</span>
											</div>
											<div onClick={() =>setOpenTitleImage(!openTitleImage)} className="text-center shadow-xl bg-white w-[32%] md:w-[15%] mb-6 rounded-[10px] cursor-pointer flex flex-col justify-center items-center py-8">
												<FaImage className="text-[40px] text-[#00d9ff]" />
												<span className="mt-2 text-xs roboto-medium">Title Image</span>
											</div>
											<div onClick={() =>setOpenTitleImageMobile(!openTitleImageMobile)} className="text-center shadow-xl bg-white w-[32%] md:w-[15%] mb-6 rounded-[10px] cursor-pointer flex flex-col justify-center items-center py-8">
												<FaMobileRetro className="text-[40px] text-[#00d9ff]" />
												<span className="mt-2 text-xs roboto-medium">Title Image Mobile</span>
											</div>
											<div onClick={() => setOpenImagesUpload(true)} className="text-center shadow-xl bg-white w-[32%] md:w-[15%] rounded-[10px] mb-6 cursor-pointer flex flex-col justify-center items-center py-8">
												<FaImages className="text-[40px] text-[#00d9ff]" />
												<span className="mt-2 text-xs roboto-medium">Images</span>
											</div>
											<div onClick={()=>setOpenLocationTags(true)} className="text-center shadow-xl bg-white w-[32%] md:w-[15%] rounded-[10px] mb-6 cursor-pointer flex flex-col justify-center items-center py-8">
												<FaMagnifyingGlassLocation className="text-[40px] text-[#00d9ff]" />
												<span className="mt-2 text-xs roboto-medium">Primary Locations</span>
											</div>
											<div onClick={()=>setOpenSeondaryLocs(true)} className="text-center shadow-xl bg-white w-[32%] md:w-[15%] rounded-[10px] mb-6 cursor-pointer flex flex-col justify-center items-center py-8">
												<FaMagnifyingGlassLocation className="text-[40px] text-[#00d9ff]" />
												<span className="mt-2 text-xs roboto-medium">Secondary Locations</span>
											</div>
											<div onClick={()=>setOpenCategories(true)} className="text-center shadow-xl bg-white w-[32%] md:w-[15%] rounded-[10px] mb-6 cursor-pointer flex flex-col justify-center items-center py-8">
												<TbCategoryFilled className="text-[40px] text-[#00d9ff]" />
												<span className="mt-2 text-xs roboto-medium">Categories</span>
											</div>
											<div onClick={()=>setScheduleOpen(true)} className="text-center shadow-xl bg-white w-[32%] md:w-[15%] rounded-[10px] mb-6 cursor-pointer flex flex-col justify-center items-center py-8">
												<RiCalendarScheduleFill className="text-[40px] text-[#00d9ff]" />
												<span className="mt-2 text-xs roboto-medium">Schedule</span>
											</div>
											<div onClick={()=>{setSeoOpen(true)}} className="text-center shadow-xl bg-white w-[32%] md:w-[15%] rounded-[10px] mb-6 cursor-pointer flex flex-col justify-center items-center py-8">
												<TbSeo className="text-[40px] text-[#00d9ff]" />
												<span className="mt-2 text-xs roboto-medium">SEO</span>
											</div>

											<div onClick={()=>{setCardTextOpen(true)}} className="text-center shadow-xl bg-white w-[32%] md:w-[15%] rounded-[10px] mb-6 cursor-pointer flex flex-col justify-center items-center py-8">
												<FaTags className="text-[40px] text-[#00d9ff]" />
												<span className="mt-2 text-xs roboto-medium">Card Tags</span>
											</div>
											<div onClick={()=> {setActivityOpen(true)}} className="text-center shadow-xl bg-white w-[32%] md:w-[15%] rounded-[10px] mb-6 cursor-pointer flex flex-col justify-center items-center py-8">
												<FaHiking className="text-[40px] text-[#00d9ff]" />
												<span className="mt-2 text-xs roboto-medium">Activities</span>
											</div>
											<div onClick={()=> {setPlacesToVisitOpen(true)}}  className="text-center shadow-xl bg-white w-[32%] md:w-[15%] rounded-[10px] mb-6 cursor-pointer flex flex-col justify-center items-center py-8">
												<MdTravelExplore className="text-[40px] text-[#00d9ff]" />
												<span className="mt-2 text-xs roboto-medium">Place to visit</span>
											</div>
											<div onClick={()=> {setInclusionsOpen(true)}} className="text-center shadow-xl bg-white w-[32%] md:w-[15%] rounded-[10px] mb-6 cursor-pointer flex flex-col justify-center items-center py-8">
												<GoCheckCircleFill className="text-[40px] text-[#00d9ff]" />
												<span className="mt-2 text-xs roboto-medium">Inclusions</span>
											</div>
											<div onClick={()=> {setExclusionsOpen(true)}} className="text-center shadow-xl bg-white w-[32%] md:w-[15%] rounded-[10px] mb-6 cursor-pointer flex flex-col justify-center items-center py-8">
												<IoIosCloseCircle className="text-[40px] text-[#00d9ff]" />
												<span className="mt-2 text-xs roboto-medium">Exclusions</span>
											</div>
										</div>
									</div>

									<hr className="my-8" />
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* -------------------------modals------------------------- */}

			{/* -------------------------Crop Easy modal------------------------- */}

			{/* -------------------------Update Success Modal------------------------- */}

			<dialog id="my_modal_1" className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg text-center">Package Successfully Updated</h3>
					<div className="modal-action flex justify-center">
						{/* if there is a button in form, it will close the modal */}
						<button
							className="btn"
							onClick={() => {
								document.getElementById("my_modal_1").close();
							}}>
							Close
						</button>
					</div>
				</div>
			</dialog>

			{/* -------------------------Update Error Modal------------------------- */}

			<UpdateErrorModal updateError={updateError} setUpdateError={setUpdateError} />

			{/* -------------------------Basic Details Modal------------------------- */}
			{/* {openBasicDetails && <BasicDeatils pack={pack} reFetch={reFetch} setUpdateError={setUpdateError} />} */}

			{/* -------------------------Title Image Modal------------------------- */}

			
		</>
	);
}

export default DetailedPackage;

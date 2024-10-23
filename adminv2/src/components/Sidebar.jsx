import React, { useContext, useState } from "react";
import { MdLibraryBooks, MdOutlineTravelExplore } from "react-icons/md";
import { RiAlignItemBottomFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MyContext } from "../context/myContext";
import { TbNewSection } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { MdRateReview } from "react-icons/md";

function Sidebar() {
	const { expand, setExpand, openPackage, setOpenPackage, openReviews, setOpenReviews } = useContext(MyContext);

    const handleOpenSelectPackage = () => {
        setExpand(true)
        setOpenPackage(!openPackage)
    }

	const handleOpenReviews = () => {
        setExpand(true)
        setOpenReviews(!openReviews)
    }
	

	return (
		<div className={`btn-grad glass ${expand ? "w-[280px]" : "w-[0px] md:w-[70px]"} transition-all duration-300 flex overflow-hidden  fixed z-[10000] top-0 bottom-0 left-0`}>
			<div className=" w-[280px]  min-w-[70px] h-full ">
				<div className="flex w-full ">
					<div className="flex w-[70px] min-w-[70px] max-w-[70px] justify-center items-center h-[60px]">
						<img src="/images/logos/icon.png" alt="" className="w-8" />
					</div>
					<div className="w-[210px] flex items-center">
						<img src="/images/logos/logowhite.png" alt="" className="w-20" />
					</div>
				</div>

				<hr />

				<div className="flex w-full mt-6">
					<Link to="/">
						<div className="flex ml-[5px] mr-[5px] hover:glass py-3 cursor-pointer rounded">
							<div className="flex justify-center items-center w-[65px] min-w-[65px] max-w-[65px] ">
								<div>
									<RiAlignItemBottomFill style={{ color: "white", fontSize: "26px" }} />
								</div>
							</div>
							<div className="w-[205px] min-w-[205px] max-w-[205px] flex items-center overflow-hidden whitespace-nowrap">
								<span className="text-white text-sm roboto-medium">Dashboard</span>
							</div>
						</div>
					</Link>
				</div>

				<div className="flex w-full ">
					
						<div className={`flex ml-[5px] mr-[5px] items-stretch hover:glass py-3 cursor-pointer rounded ${openPackage && "glass"}`} onClick={()=> {handleOpenSelectPackage()}}>
							<div className="flex">
								<div className="flex justify-center items-center w-[65px] min-w-[65px] max-w-[65px] ">
									<div>
										<MdLibraryBooks style={{ color: "white", fontSize: "26px" }} />
									</div>
								</div>
								<div className="w-[175px] min-w-[175px] max-w-[175px] flex items-center overflow-hidden whitespace-nowrap">
									<span className="text-white text-sm roboto-medium">Travel Packages</span>
								</div>
							</div>
							<div className="flex items-center w-[30px]" >
								<IoIosArrowDown color="white" className={` ${openPackage ? "-rotate-180" : ""} trasition-all duration-300 `} />
							</div>
						</div>
					
				</div>

				<div className={`overflow-hidden transition-all duration-300 ${openPackage ? "h-[240px]" : "h-[0px]"}`}>
					
                <div className="flex w-full ">
						<Link to="/packages">
							<div className="flex ml-[5px] pl-[65px] mr-[5px] hover:glass h-[40px] items-center cursor-pointer rounded">
								<div className="w-[205px] min-w-[205px] max-w-[205px] flex items-end overflow-hidden whitespace-nowrap">
									<span className="text-white text-[13px] font-regular">Overview</span>
								</div>
							</div>
						</Link>
					</div>
                    
                    
                    
                    <div className="flex w-full ">
						<Link to="/packages/create">
							<div className="flex ml-[5px] pl-[65px] mr-[5px] hover:glass h-[40px] items-center cursor-pointer rounded">
								<div className="w-[205px] min-w-[205px] max-w-[205px] flex items-end overflow-hidden whitespace-nowrap">
									<span className="text-white text-[13px] font-regular">Create Package</span>
								</div>
							</div>
						</Link>
					</div>

					<div className="flex w-full ">
						<Link to="/packages/sections">
							<div className="flex ml-[5px] pl-[65px] mr-[5px] hover:glass h-[40px] items-center cursor-pointer rounded">
								<div className="w-[205px] min-w-[205px] max-w-[205px] flex items-end overflow-hidden whitespace-nowrap">
									<span className="text-white text-[13px] font-regular">Section Management</span>
								</div>
							</div>
						</Link>
					</div>

					<div className="flex w-full ">
						<Link to="/packages/popularplaces">
							<div className="flex ml-[5px] pl-[65px] mr-[5px] hover:glass h-[40px] items-center cursor-pointer rounded">
								<div className="w-[205px] min-w-[205px] max-w-[205px] flex items-end overflow-hidden whitespace-nowrap">
									<span className="text-white text-[13px] font-regular">Popular Places</span>
								</div>
							</div>
						</Link>
					</div>

					<div className="flex w-full ">
						<Link to="/packages/category">
							<div className="flex ml-[5px] pl-[65px] mr-[5px] hover:glass h-[40px] items-center cursor-pointer rounded">
								<div className="w-[205px] min-w-[205px] max-w-[205px] flex items-end overflow-hidden whitespace-nowrap">
									<span className="text-white text-[13px] font-regular">Category Management</span>
								</div>
							</div>
						</Link>
					</div>
					<div className="flex w-full ">
						<Link to="/packages/locations">
							<div className="flex ml-[5px] pl-[65px] mr-[5px] hover:glass h-[40px] items-center cursor-pointer rounded">
								<div className="w-[205px] min-w-[205px] max-w-[205px] flex items-end overflow-hidden whitespace-nowrap">
									<span className="text-white text-[13px] font-regular">Locations</span>
								</div>
							</div>
						</Link>
					</div>


					



                    






				</div>

				<div className="flex w-full ">
					
						<div className={`flex ml-[5px] mr-[5px] items-stretch hover:glass py-3 cursor-pointer rounded ${openReviews && "glass"}`} onClick={()=> {handleOpenReviews()}}>
							<div className="flex">
								<div className="flex justify-center items-center w-[65px] min-w-[65px] max-w-[65px] ">
									<div>
										<MdRateReview style={{ color: "white", fontSize: "26px" }} />
									</div>
								</div>
								<div className="w-[175px] min-w-[175px] max-w-[175px] flex items-center overflow-hidden whitespace-nowrap">
									<span className="text-white text-sm roboto-medium">Reviews</span>
								</div>
							</div>
							<div className="flex items-center w-[30px]" >
								<IoIosArrowDown color="white" className={` ${openReviews ? "-rotate-180" : ""} trasition-all duration-300 `} />
							</div>
						</div>
					
				</div>



				<div className={`overflow-hidden transition-all duration-300 ${openReviews ? "h-[80px]" : "h-[0px]"}`}>
					
                <div className="flex w-full ">
						<Link to="/">
							<div className="flex ml-[5px] pl-[65px] mr-[5px] hover:glass h-[40px] items-center cursor-pointer rounded">
								<div className="w-[205px] min-w-[205px] max-w-[205px] flex items-end overflow-hidden whitespace-nowrap">
									<span className="text-white text-[13px] font-regular">Reviews</span>
								</div>
							</div>
						</Link>
					</div>
                    
                    
                    
                    <div className="flex w-full ">
						<Link to="/reviews/google">
							<div className="flex ml-[5px] pl-[65px] mr-[5px] hover:glass h-[40px] items-center cursor-pointer rounded">
								<div className="w-[205px] min-w-[205px] max-w-[205px] flex items-end overflow-hidden whitespace-nowrap">
									<span className="text-white text-[13px] font-regular">Google Reviews</span>
								</div>
							</div>
						</Link>
					</div>

				


					


					



                    






				</div>

				

				
			</div>

			<div></div>
		</div>
	);
}

export default Sidebar;

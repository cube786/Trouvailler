"use client";
import { myContext, MyContext } from "@/context/Context";
import { useContext } from "react";
import { IoCall, IoCloseSharp, IoLogoWhatsapp, IoLogoYoutube } from "react-icons/io5";
import { IoIosArrowDown, IoMdPerson } from "react-icons/io";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaBuilding, FaFacebook, FaWallet } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import Link from "next/link";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { BiSolidCalendarCheck } from "react-icons/bi";
import { AuthContext } from "@/context/AuthContext";
import { logOut } from "../../firebase";
import Image from "next/image";

function MobileNav() {
	const { navOpen, setNavOpen , setLoginOpen} = useContext(MyContext) as myContext;
	const {user} = useContext(AuthContext)

	let height;
	if (document) {
		height = document.documentElement.clientHeight;
	}

	return (
		<div className={`fixed ${navOpen ? "left-0 " : "-left-[100vw] "} top-0  bottom-0 h-[${height}px] max-h-[${height}px] min-h-[${height}px] overflow-hidden  w-[100vw]  bg-[#00000085] z-[11000]`}>
			{navOpen && (
				<button className="btn glass rounded-[20px] text-white absolute right-4 top-4" onClick={() => setNavOpen(false)}>
					<IoCloseSharp size={20} />
				</button>
			)}
			<div className={`relative h-full w-[80%] bg-[white]  ${navOpen ? "left-0 " : "-left-[100vw] "} transition-all flex overflow-y-auto flex-col ease-in-out duration-300`}>
				<div>
					<div className="px-4 py-2 pt-4">
					<img src="/images/logos/logodark.png" alt="" className="w-[30%]" />

					</div>

					{/* <div className="bg-[#ff6100] glass flex  items-start justify-between px-2 py-4">
						<div className=" text-[white] flex flex-col">
							<span className="font-medium text-xs">Discover Your</span>
							<span className="font-bold text-sm">
								Next Adventure <span className="">With Us</span>
							</span>
						</div>
						<img src="/images/logos/logowhite.png" alt="" className="w-[25%]" />
					</div> */}

                    {!user && <div className="flex items-center mx-2 py-2 mt-4  bg-[#ffefe0] rounded-[10px] px-2">
						<div onClick={()=>{setLoginOpen(true)}} className="flex items-center gap-4">
							<div className="bg-[#ff6100] glass w-[14%] aspect-square flex items-center justify-center rounded-full">
								<IoMdPerson color="white" size={"70%"} />
							</div>
							<div className="flex flex-col text-sm ">
								<span className="text-[10px] font-medium">Login or</span>
								<span className="text-[11px] -mt-[4px] font-bold">SignUp now </span>
							</div>
						</div>
						
					</div>}



					{user &&<div className="flex items-center mx-2 py-2 mt-4  bg-[#ffefe0] rounded-[10px] px-2">
						<div onClick={()=>logOut()} className="flex items-center gap-4">
						<div className="bg-[#ff6100] glass w-8 relative aspect-square flex items-center justify-center rounded-full">
                                            {user.photoURL ? 
                                            <Image src={user.photoURL} alt="" fill className="object-cover rounded-full" />
                                        
                                          :  <IoMdPerson color="white" size={"70%"} />}
                                        </div>
										<div className="flex flex-col  text-[black] ">
                                            <span className="text-[12px] md:text-[10px] font-medium">Logged in as</span>
                                            {user && user.displayName &&  <span className="text-[14px] md:text-[10px] font-medium flex items-center gap-1">{user.displayName}<IoIosArrowDown color="#8c8cf3" className="md:text-xs" /></span>}

                                            {user && !user.displayName &&  user.phoneNumber &&  <span className="text-[14px] md:text-[10px] font-medium flex items-center gap-1">{user.phoneNumber.slice(3)}<IoIosArrowDown color="#8c8cf3" className="md:text-xs" /></span>}
                                        
                                        </div>
						</div>
						
					</div>}

					<div className="mx-2 my-6 flex flex-col gap-2">
						<div className="border-b px-2 py-2 flex items-center gap-4">
							<div className="flex grow gap-4 items-center">
							<div className="w-[12%] flex justify-between items-center">
							<div className="bg-[#ff6100] flex justify-center items-center w-[22px] h-[22px] rounded-full">

                            <img src="/images/icons/packages.svg" className="w-[70%]" alt="travel packages" /></div></div>
							<div className="text-[10px] font-medium flex flex-col">
								<span className="text-[#6f6f6f]">Travel &</span>
								<span>Holiday Packages</span>
							</div>
                            </div>

                            <div>
							<IoIosArrowForward color="#ff6100" />
						</div>
						</div>

                        {/* <div className="border-b px-2 py-2 flex items-center gap-4">
							<div className="flex grow gap-4 items-center">
								<div className="w-[12%] flex justify-between items-center">
								<div className="bg-[#ff6100] flex justify-center items-center w-[22px] h-[22px] rounded-full">
								<FaBuilding color='white' className="text-[14px]" /> 

								</div>

								</div>
							<div className="text-[10px] font-medium flex flex-col">
								<span className="text-[#6f6f6f]">Hotels &</span>
								<span>Home Stays</span>
							</div>
                            </div>

                            <div>
							<IoIosArrowForward color="#ff6100" />
						</div>
						</div> */}

                        {/* <div className="border-b px-2 py-2 flex items-center gap-4">
							<div className="flex grow gap-4 items-center">
                            <div className="w-[12%] flex items-center justify-between">
							<div className="bg-[#ff6100] flex justify-center items-center w-[22px] h-[22px] rounded-full">
                            <FaWallet color='white' className="text-[13px]"  />

								</div>
                            </div>
							<div className="text-[10px] font-medium flex flex-col">
								<span className="text-[#6f6f6f]">Bid Now &</span>
								<span>Book your stay</span>
							</div>
                            </div>

                            <div>
							<IoIosArrowForward color="#ff6100" />
						</div>
						</div> */}


						<div className="border-b  px-2 py-2 flex items-center gap-4">
							<div className="flex grow gap-4 items-center">
                            <div className="w-[12%] flex items-center justify-between">
								<div className="bg-[#ff6100] w-22 h-22 rounded-full">
								<RiMoneyRupeeCircleFill color='white' size={22}/>

								</div>
                            </div>
							<div className="text-[10px] font-medium flex flex-col">
								<span className="text-[#6f6f6f]">Travel</span>
								<span>EMI Plans</span>
							</div>
                            </div>

                            <div>
							<IoIosArrowForward color="#ff6100" />
						</div>
						</div>


						<div className="border-b  px-2 py-2 flex items-center gap-4">
							<div className="flex grow gap-4 items-center">
                            <div className="w-[12%] flex items-center justify-between">
							<div className="bg-[#ff6100] flex justify-center items-center w-[22px] h-[22px] rounded-full">

                            <BiSolidCalendarCheck color='white'  /></div>
                            </div>
							<div className="text-[10px] font-medium flex flex-col">
								<span className="text-[#6f6f6f]">Travel Package</span>
								<span>Subscriptions</span>
							</div>
                            </div>

                            <div>
							<IoIosArrowForward color="#ff6100" />
						</div>
						</div>

						

						
					</div>


                    <div className="px-4 py-2">
						<p className="  text-xs ">Get a callback or Get in touch with us anytime through our official WhatsApp handle</p>
						<div className="flex items-center gap-4 mt-4">
							<button className=" px-3 py-3 rounded-[10px] font-medium  bg-[#ff6100] glass text-[white] text-[10px] flex items-center gap-2">
								<IoCall size={14} />
								Get A Callback
							</button>
							<button className="px-3 py-3 rounded-[10px] glass text-[white] font-medium bg-[#ff6100] text-[10px] flex items-center gap-2">
								<IoLogoWhatsapp size={14} />
								Chat With Us
							</button>
						</div>
					</div>

					

					
				</div>

				{/* <div className="grow flex flex-col justify-start px-4 py-6">
					<div className="flex mt-4 gap-2 mb-3 items-center">
						<FaFacebook size={20} color="#8c8c8c"/>
						<AiFillInstagram size={24} color="#8c8c8c"/>
						<IoLogoYoutube size={20} color="#8c8c8c"/>
					</div>
					<ul className="flex gap-3 text-xs">
						<Link href="/termsandconditions">
							<li className="text-[blue] font-medium">Terms and Conditions</li>
						</Link>
						<Link href="/privacypolicy">
							<li className="text-[blue] font-medium">Privacy Policy</li>
						</Link>
					</ul>
				</div> */}
			</div>
		</div>
	);
}

export default MobileNav;

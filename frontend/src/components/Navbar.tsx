"use client"

import { myContext, MyContext } from "@/context/Context";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useContext, useEffect } from "react";
import { IoMdPerson } from "react-icons/io";
import { FaWallet } from "react-icons/fa";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
import { logOut } from "../../firebase";
import Link from "next/link";



const Navbar: React.FC<{mode:string}> = ({ mode }) => {

    const { navOpen, setNavOpen, setLoginOpen} = useContext(MyContext) as myContext;
    const {user} = useContext(AuthContext)

    
        
  return (
    <div className={`flex justify-between  bg-[transparent] relative z-[1000] transition-all duration-100 w-full items-center px-4 xs:px-8 lg:px-12  ${mode === "explorelocation" ?"xl:px-20" : "xl:px-40"} ${(mode === "white") ? "py-2 nav-shadow": " xs:py-4"} ${mode == "detailpage" ? "!py-0 xs:!py-2 nav-shadow " : ""}`}>
        <div className={`  h-[20px] xs:h-[26px] relative w-[78px] xs:w-[96px] h-[21px] xs:h-[26px]`}>
        <Image src={`/images/logos/${(mode === "white" || mode === "detailpage")? "logoblue.svg": "logowhite.png"}`} alt="" fill className="transition-all duration-100"/>

        </div>
								<div className="text-[white] ">
									{!navOpen  && <button className={`my-4 xs:mr-2 p-3 ${mode === "explorelocation" || mode === "category" && "!my-1"} md:hidden rounded-[15px] ${mode === "home" && ""} ${(mode=="white" || mode === "detailpage")? "!py-0 text-[#ff6100]" : "text-white"} `} onClick={()=>setNavOpen(true)}>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-7 xs:h-5 w-7 xs:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
										</svg>
									</button>}






                                    <div className="flex gap-12 ">


						<div className="flex  items-center gap-10">
                        <div className=" flex items-center gap-4 hidden lg:flex ">
                            <div className="glass rounded-full relative w-8 h-8">
                            <Image src="/images/icons/sunbed.png" fill className="p-1" alt="" />

                            </div>
                            
							<div className={`text-xs ${(mode === "white" || mode == "detailpage" ) ? "text-[black]" :"text-[white]"} font-medium flex flex-col`}>
								<span className={`text-[10px] transition-all duration-100 ${(mode === "white" || mode == "detailpage" ) ? "text-[black] " : "text-[#dedede]"}`}>Travel & </span>
								<span className={`${(mode === "white" || mode == "detailpage" ) ? "text-[black]" : "text-[white]" } transition-all duration-100`}>Holiday Packages</span>
							</div>

                            
						</div>

                        {/* <div className=" flex items-center gap-4 hidden lg:flex">
                            
                        <div className="glass rounded-full relative w-8 h-8">
                            <Image src="/images/icons/building.png" fill className="p-1" alt="" />

                            </div>
							<div className={`text-xs ${(mode === "white" || mode == "detailpage" ) ? "text-[black]" :"text-[white]"} font-medium flex flex-col`}>
                            <span className={`text-[10px] transition-all duration-100 ${(mode === "white" || mode == "detailpage" )? "text-[black] " : "text-[#dedede]"}`}>Hotels &</span>
								<span className={`${(mode === "white" || mode == "detailpage" ) ? "text-[black]" : "text-[white]" } transition-all duration-100`}>Home Stays</span>
							</div>

                            
						</div> */}

                        {/* <div className="  items-center gap-4 hidden lg:flex">
                        <div className="glass rounded-full relative w-8 h-8">
                            <Image src="/images/icons/wallet.png" fill className="p-1" alt="" />

                            </div>                        <div className={`text-xs ${(mode === "white" || mode == "detailpage" ) ? "text-[black]" :"text-[white]"} font-medium flex flex-col`}>
                            <span className={`text-[10px] transition-all duration-100 ${(mode === "white" || mode == "detailpage" )  ? "text-[black] " : "text-[#dedede]"}`}>Bid Now &</span>
								<span className={`${(mode === "white" || mode == "detailpage" ) ? "text-[black]" : "text-[white]" } transition-all duration-100`}>Book your stay</span>
							</div>

                            
						</div> */}



                        <div className="  items-center gap-4 hidden lg:flex">
                        <div className="glass rounded-full relative w-8 h-8">
                            <Image src="/images/icons/renewal.png" fill className="p-1" alt="" />

                            </div>                        <div className={`text-xs ${(mode === "white" || mode == "detailpage" )? "text-[black]" :"text-[white]"} font-medium flex flex-col`}>
                            <span className={`text-[10px] transition-all duration-100 ${(mode === "white" || mode == "detailpage" )  ? "text-[black] " : "text-[#dedede]"}`}>Travel Package</span>
								<span className={`${(mode === "white" || mode == "detailpage" )  ? "text-[black]" : "text-[white]" } transition-all duration-100`}>Subscriptions</span>
							</div>

                            
						</div>





                      <Link href="/packages/emi">
                      <div className="  items-center gap-4 hidden lg:flex">
                        <div className="glass rounded-full relative w-8 h-8">
                            <Image src="/images/icons/accounting.png" fill className="p-1" alt="" />

                            </div>                        <div className={`text-xs ${(mode === "white" || mode == "detailpage" ) ? "text-[black]" :"text-[white]"} font-medium flex flex-col`}>
                            <span className={`text-[10px] transition-all duration-100 ${(mode === "white" || mode == "detailpage" )  ? "text-[black] " : "text-[#dedede]"}`}>Travel</span>
								<span className={`${(mode === "white" || mode == "detailpage" )  ? "text-[black]" : "text-[white]" } transition-all duration-100`}>EMI Plans</span>
							</div>

                            
						</div>
                      </Link>





                        </div>

						

						



                                     {!user &&<div onClick={()=>setLoginOpen(true)} className=" cursor-pointer items-center  hidden md:flex py-2 gap-4   bg-[#ffffffe8] rounded-[15px] px-4 md:px-2">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-[#ff6100] glass w-6 aspect-square flex items-center justify-center rounded-full">
                                                <IoMdPerson color="white" size={"70%"} />
                                            </div>
                                            <div className="flex flex-col  text-[black] ">
                                                <span className="text-[12px] md:text-[10px] font-medium">Login or</span>
                                                <span className="text-[14px] md:text-[10px] font-bold flex items-center gap-1">SignUp now <IoIosArrowDown color="#8c8cf3" className="md:text-xs" /></span>
                                            </div>
                                        </div>
                                        
                                    </div>}

                                    {user &&
                                    <div onClick={()=>logOut()} className=" cursor-pointer items-center  hidden md:flex py-2 gap-4   bg-[#ffffffe8] rounded-[15px] px-4 md:px-2">
                                    <div className="flex items-center gap-4">
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
                                    
                                </div>
                                    }
                                    </div>

								</div>
							</div>
  )
}

export default Navbar
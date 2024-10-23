"use client";

import { MyContext, myContext } from "@/context/Context";
import React, {  useContext, useEffect, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";

import { IoCall, IoClose } from "react-icons/io5";


function Needhelp() {

	const {needhelp, setNeedHelp} = useContext(MyContext) as myContext;
	useEffect(() => {
		const visitCount = sessionStorage.getItem('PackagevisitCount');
		const popupclosed = sessionStorage.getItem('popupclosed')

		if((popupclosed == null  || Number(popupclosed)> 2) && (visitCount === "2" || visitCount === "6" || visitCount === "9")){
			setTimeout(() => {
				setNeedHelp(true)
			  }, 3000);
		}
	}, [])


	const handleClose = () => {
		sessionStorage.setItem("popupclosed", '0')
		setNeedHelp(false)
	}

	
	return (
		<div className={` ${needhelp ? "flex" : " hidden "}   z-[1000001] w-full h-full fixed top-0 left-0 right-0   transition-all duration-300 bottom-0 bg-[#00000096]  justify-center items-center`}>
			<div className={`bg-[#ffece0] glass flex w-[90%] xs:w-[50%]  rounded-[10px] overflow-hidden ${needhelp && "fadein"}`}>
				
				<div className="w-[100%] py-8 text-[#4a4a4a]  relative flex">
					<button onClick={() => handleClose()} className="p-2 glass hover:bg-[#cead8a] rounded-full aspect-square absolute p-0 top-4 right-4">
						<IoClose color="#ff6100" size={20} />
					</button>
					<div className="w-[100%] px-4 xs:px-10 flex flex-col justify-center gap-3 items-start">

						<h2 className="text-[#000] text-xl font-bold">Need Help?</h2>
						<p className="text-xs sm:text-sm font-medium">Planning your dream vacation can be overwhelming, but we’re here to make it easy and stress-free.</p><p className="text-xs sm:text-sm font-medium" > Whether you need help finding the perfect destination, booking hotels, or planning activities, our travel experts are ready to assist you.
							</p>
							<div className='flex items-center gap-4 mt-4'>
            <button className='px-2 xs:px-3 py-2 xs:py-3 rounded-[10px] glass  font-medium  bg-[#ff6100]  gap-2 text-xs text-[#fff] flex items-center'><IoCall className='text-[14px] xs:text-[16px]' color="#fff"/>Get A Callback</button>
            <button className='px-2 xs:px-3 py-2 xs:py-3 rounded-[10px] font-medium flex items-center gap-2 glass text-[#fff] text-xs bg-[#ff6100]'><IoLogoWhatsapp className='text-[14px] xs:text-[16px]' color="#fff"/>Chat With Us</button>
        </div>
					</div>


					
					
				</div>
			</div>
		</div>
	);
}

export default Needhelp;

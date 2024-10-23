"use client";

import Image from "next/image";
import React, {  useEffect, useState } from "react";

import { IoClose } from "react-icons/io5";


function BidModal() {
	const [showBidModal, setShowBidModal] = useState(false)
	useEffect(() => {
		const visitCount = sessionStorage.getItem('visitCount');
		const PackageVisitCount = sessionStorage.getItem('PackagevisitCount')
		const popupclosed = sessionStorage.getItem('popupclosed')
		if( popupclosed !== null  && Number(popupclosed)> 2 && PackageVisitCount !== "2" && PackageVisitCount !== "6" &&  PackageVisitCount !== "9" && (visitCount === "4" || visitCount === "8" || visitCount === "14")){
			setTimeout(() => {
				setShowBidModal(true)
			  }, 3000);
		}else if(PackageVisitCount === "2" || PackageVisitCount === "6" || PackageVisitCount === "9"){
			sessionStorage.setItem('visitCount', "1" )		}
	}, [])

	const handleClose = () => {
		sessionStorage.setItem("popupclosed", '0')
		setShowBidModal(false)
	}

	
	return (
		<div className={` ${showBidModal ? "flex" : " hidden "}   z-[1000001] w-full h-full fixed top-0 left-0 right-0   transition-all duration-300 bottom-0 bg-[#00000096]  justify-center items-center`}>
			<div className={` bidmodalbg flex w-[95%] relative xs:w-[70%]  rounded-[10px] overflow-hidden ${showBidModal && "fadein"}`}>
				
					<img src="/images/bidmodalmobilebg.png" className="object-cover bg-[white] absolute top-0 bottom-0 left-0 right-0 xs:hidden"  alt=""/>
				
				<div className="w-[100%]  relative flex">
					<button onClick={() => handleClose()} className="p-2 glass hover:bg-[#cead8a] z-[100] rounded-full aspect-square absolute p-0 top-4 right-4">
						<IoClose color="#fff" size={20} />
					</button>
					
					<div className="w-full relative z-[100] xs:w-[60%] px-3 py-4 xs:py-2 w-[70%]   xs:px-10 flex flex-col justify-center gap-3 items-start">

						<h2 className="text-[#000] text-sm xs:text-xl w-[75%] font-bold">Do You Know That You Can Book A Hotel At Your Price?</h2>
						<p className="text-xs xs:text-sm text-[#4a4a4a] font-medium w-[65%]">Trouvailler offers a Bid feature that lets you place a bid on selected hotels and enjoy your stay at the price you set.
							</p><p className="font-medium text-[#4a4a4a] w-[50%] text-xs xs:text-sm"> Place your bid now!</p>
							<button className="bg-[#ff6100] text-[white] text-xs xs:text-base font-medium px-4 py-2 rounded glass">Make a Bid</button>

					</div>
					<div className="w-[70%] hidden xs:block absolute right-0  xs:relative xs:w-[40%]">

					<img src="/images/bidmodalimg.png" alt="" />


					</div>

					
					
				</div>
			</div>
		</div>
	);
}

export default BidModal;

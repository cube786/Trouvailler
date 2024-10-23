import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaWallet } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

function Explore() {
  return (
    <div className="bg-[white] relative z-[101] fadein pt-4  lg:hidden">

				<div className="flex px-4 xs:px-8 lg:px-20 flex-nowrap justify-between explore  min-[444px]:justify-start gap-[1%] min-[444px]:gap-3  relative z-10 items-center  ">
					<div className="  rounded-[10px] flex flex-col min-w-[25%] bg-[white]   justify-center px-3 items-center h-[90px]">
					<div className=" rounded-full relative w-10 h-10">
                            <Image src="/images/icons/packagesnav.svg" fill className="p-1" alt="" />

                            </div>
						<div className="flex flex-col items-center mt-1 text-[#2a2a2a]">
							<span className="text-[10px] font-regular mb-1">Travel</span>
							<span className="text-[11px] -mt-[5px] font-medium">Packages</span>
						</div>
					</div>

					<div className="  rounded-[10px] min-w-[25%] flex flex-col bg-white  px-3 justify-center items-center h-[90px]">
					<div className=" rounded-full relative flex items-center justify-center w-10 h-10">
                            <FaBuilding  size={26} color='#ff6100' />

                            </div>
						<div className="flex flex-col items-center mt-1 text-[#2a2a2a]">
							<span className="text-[10px] font-regular mb-1">Hotels &</span>
							<span className="text-[11px] -mt-[5px] font-medium">Homestays</span>
						</div>
					</div>

					<div className="  rounded-[10px] min-w-[25%] flex flex-col px-3 bg-white   justify-center items-center h-[90px]">
					<div className=" rounded-full flex items-center justify-center  relative w-10 h-10">
                            <FaWallet color='#ff6100' size={26}  />

                            </div> 
						<div className="flex flex-col items-center mt-1 text-[#2a2a2a]">
							<span className="text-[10px] font-regular mb-1">Bid </span>
							<span className="text-[11px] -mt-[5px] font-medium">for Today</span>
						</div>
					</div>



					




<div className="  rounded-[10px] min-w-[25%]  h-[90px]">
<Link href="/packages/emi" className='flex flex-col px-3 bg-white h-[90px]  justify-center items-center'>
					<div className="flex items-center justify-center rounded-full relative w-10 h-10">
                            <RiMoneyRupeeCircleFill color='#ff6100' size={30}/>

                            </div>   
						<div className="flex flex-col items-center mt-1 text-[#2a2a2a]">
							<span className="text-[10px] font-regular mb-1">Travel </span>
							<span className="text-[11px] -mt-[5px] font-medium">EMI Plans</span>
						</div></Link>
					</div>



				</div>
			</div>
  )
}

export default Explore
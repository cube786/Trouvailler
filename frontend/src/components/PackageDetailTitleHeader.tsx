"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import { PiShuffleBold } from 'react-icons/pi'

import { FaRegShareFromSquare } from "react-icons/fa6";
import { myContext, MyContext } from '@/context/Context';
import BidModal from './BidModal';
import { IoClose } from 'react-icons/io5';
import { usePathname } from 'next/navigation';
import { FaWhatsappSquare } from "react-icons/fa";




const PackageDetailTitleHeader: React.FC<{data:any}> = ({ data }) => {
    const [isSticky, setIsSticky] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);
     const [copyBtnValue, setCopyBtnValue] = useState("Copy URL")

     const {openShare, setOpenShare} = useContext(MyContext) as myContext
  
    useEffect(() => {
      const handleScroll = () => {
        if (elementRef.current) {
          const rect = elementRef.current.getBoundingClientRect();
          setIsSticky(rect.top <= 0);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const handleClose = () => {
      setOpenShare(false)
    }

    const pathName = usePathname() 
  
    const copyUrl = (pathname:any) =>  {
      if(copyBtnValue === "Copy URL"){
        navigator.clipboard.writeText(`https://trouvailler.com${pathname}`);
        setCopyBtnValue("Copied")
        setTimeout(()=>{
          setCopyBtnValue("Copy URL")
        }, 2000)
      }
    
     
       // Copy the text inside the text field
      
    
    }
      
  return (
    <>
    {
      <div className={` ${openShare ? "flex" : " hidden "}   z-[1000001] w-full h-full fixed top-0 left-0 right-0   transition-all duration-300 bottom-0 bg-[#00000096]  justify-center items-center`}>
			<div className={`bg-[#ffece0] glass flex w-[90%] xs:w-[50%]  rounded-[10px] overflow-hidden ${openShare && "fadein"}`}>
				
				<div className="w-[100%] py-8 text-[#4a4a4a]  relative flex">
					<button onClick={() => handleClose()} className="p-2 glass hover:bg-[#cead8a] rounded-full aspect-square absolute p-0 top-4 right-4">
						<IoClose color="#ff6100" size={20} />
					</button>
					<div className="w-[100%] px-4 xs:px-10 flex flex-col justify-center gap-3 items-start">

						<h2 className="text-[#000] text-xl font-bold">Share this Package</h2>
              <div className='bg-[white] px-4 py-2 rounded border w-full flex items-center justify-between'>
                <span className='text-sm grow text-ellipsis whitespace-nowrap overflow-hidden pr-6'>https://trouvailler.com{pathName}</span>
                <span className='text-[#ff6100] font-medium min-w-fit text-sm cursor-pointer' onClick={()=>copyUrl(pathName)}>{copyBtnValue}</span>
              </div>


							<p>Share via</p>
              <button>
              
              <a href={`https://api.whatsapp.com/send?text=https://trouvailler.com${pathName}`} data-action="share/whatsapp/share"><FaWhatsappSquare color='#47bb6a' size={32}/></a>

              </button>
					</div>


					
					
				</div>
			</div>
		</div>
    }
    <div ref={elementRef} className={`px-4 xs:px-8 lg:px-20 xl:px-40  md:mt-6 pt-4 md:pt-2  transition-all duration-300 sticky -top-[1px] bg-[white] relative z-[105] pb-4 md:pb-4 ${isSticky && "nav-shadow !pb-2 md:pb-4 "}`}>
      {/* <BidModal /> */}
				<div className="flex flex-col gap-2">
					<div className="flex flex-col lg:flex-row lg:items-end justify-between">
						<h1 className={`text-base xs:text-xl font-bold lg:w-[70%]  `}>{data.title}</h1>
            <p className='lg:hidden text-[11px] text-[#4a4a4a]'>{data.duration}</p>

						<div className="hidden lg:flex items-center  gap-4 lg:w-[30%] justify-end">
							<span className="bg-[#ff6100] glass text-[white] font-medium rounded px-2 py-1 text-xs ">{data.shortDuration}</span>

							<span className="border border-[#ff6100] px-2 font-medium py-1 rounded text-xs flex items-center gap-1"><PiShuffleBold color="#ff6100"/> Personalisable</span>
              <span className='cursor-pointer flex gap-1 items-center' onClick={()=>setOpenShare(true)}><FaRegShareFromSquare /> <span className='text-sm'>Share</span></span>
						</div>
					</div>

					<p className="text-sm font-medium hidden md:block">{data.shortDescription}</p>
				</div>
			</div></>
  )
}

export default PackageDetailTitleHeader
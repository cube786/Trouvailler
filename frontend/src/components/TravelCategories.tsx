"use client"
import Image from 'next/image'
import React from 'react'
import { LuArrowUpRight } from "react-icons/lu";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/autoplay";
import Link from 'next/link';



export const TravelCategories:React.FC<{mode:string}> = ({mode}) => {

  return (
   <div>

<div className='   pt-6'>
    <h2 className={`text-base lg:text-2xl font-bold text-[#2a2a2a] pb-4 ${mode === "searchmode" && "!text-sm xs:!text-base !font-medium"}`}><span className='text-[#ff6100]'>Browse By</span> Category </h2>
      
      </div>

      

<div className='rounded-[10px] overflow-hidden '>
<Swiper
   slidesPerView={1.25}
   spaceBetween={10}

   breakpoints={{
    512:{
      slidesPerView:1.75
    },
    640:{
      slidesPerView:2.35,
      spaceBetween:20

    },
    864:{
      slidesPerView:2.75
    },
    1024:{
      slidesPerView:4
    }
   }}
   
  
  
  

 
  
  
 >

<SwiperSlide>

<Link href="/packages/category/honeymoon">


<div
  className="relative min-w-[100%] w-[100%]  min-h-[150px]  lg:min-h-[170px]  flex items-end cursor-pointer  rounded-[10px] overflow-hidden  px-2 xs:px-4"
  
>

    <LuArrowUpRight size={20} color="#fff" className='absolute glass bg-[#ff6100] rounded z-[105] top-2 right-2'/>
              <div className="absolute top-0 left-0 right-0 bottom-0 z-[101] rounded bg-[#00000040]"></div>

    <Image src="https://res.cloudinary.com/difxlqrlc/image/upload/q_auto/f_auto/w_1000/v1684520311/site/Honeymoon_iogbop.jpg" alt="" fill className='object-cover object-right z-[100]'/>
    <div className='image-cover-2 z-[101]'></div>
  <div className=" relative flex flex-col justify-center py-4  z-[101]">
    <p className={`text-[white] text-[10px] lg:text-[12px]  leading-[14px] xs:leading-[16px] pb-2 w-[100%] ${mode === "searchmode" && "!text-[11px] "} `}>
      Create unforgettable honeymoon memories with our curated packages
    </p>
    <span className={`text-sm lg:text-lg font-bold text-[white] mt-1 ${mode === "searchmode" && "!text-sm !font-medium"}`}>
      HoneyMoon Packages
    </span>
  </div>
</div>
</Link>

</SwiperSlide>
<SwiperSlide>

<Link href="/packages/category/family">

<div
  className="relative min-w-[100%] w-[100%]  min-h-[150px] lg:min-h-[170px]   cursor-pointer flex items-end  rounded-[10px] overflow-hidden   px-2 xs:px-4"
  
>            <LuArrowUpRight size={20} color="#fff" className='absolute glass bg-[#ff6100] rounded z-[105] top-2 right-2'/>

              <div className="absolute top-0 left-0 right-0 bottom-0 z-[101] rounded bg-[#00000021]"></div>

    <Image src="https://res.cloudinary.com/difxlqrlc/image/upload/q_auto/f_auto/w_1000/v1684520351/site/family_qstl2o.jpg" alt="" fill className='object-cover z-[100]'/>
    <div className='image-cover-2 z-[101]'></div>
  <div className=" relative flex flex-col justify-center py-4  z-[101]">
    <p className={`text-[white] text-[10px] lg:text-xs pb-2 w-[100%] ${mode === "searchmode" && "!text-[11px] "} `}>
    Experience unforgettable moments with Trouvailler&apos;s family travel
      packages            </p>
    <span className={`text-sm lg:text-lg font-bold text-[white] ${mode === "searchmode" && "!text-sm !font-medium"} `}>
    Family Trip
      Packages
    </span>
  </div>
</div>
</Link>
</SwiperSlide>
<SwiperSlide>
<Link href="/packages/category/group">

<div
  className="relative min-w-[100%] w-[100%]  min-h-[150px] lg:min-h-[170px]   cursor-pointer  rounded-[10px] flex items-end overflow-hidden  px-2 lg:px-4"
  
>            <LuArrowUpRight size={20} color="#fff" className='absolute glass bg-[#ff6100] rounded z-[105] top-2 right-2'/>

              <div className="absolute top-0 left-0 right-0 bottom-0 z-[101] rounded bg-[#00000021]"></div>

    <Image src="https://res.cloudinary.com/difxlqrlc/image/upload/q_auto/f_auto/w_1000/v1684520357/site/friends_lpwyuz.jpg" alt="" fill className='object-cover z-[100]'/>
    <div className='image-cover-2 z-[101]'></div>
  <div className=" relative flex flex-col justify-end lg:justify-center py-4  z-[101]">
    <p className={`text-[white] text-[10px] lg:text-xs pb-2 w-[100%] ${mode === "searchmode" && "!text-[11px] "} `}>
    Celebrate in style with Trouvailler&apos;s tailored tour packages for
      your group</p>
    <span className={`text-sm lg:text-lg font-bold text-[white] ${mode === "searchmode" && "!text-sm !font-medium"}`}>
    Group Trip
       Packages
    </span>
  </div>
</div>
</Link>

</SwiperSlide>
<SwiperSlide>
<Link href="/packages/category/international">

<div
  className="relative min-w-[100%] w-[100%]  min-h-[150px] lg:min-h-[170px]   cursor-pointer flex items-end rounded-[10px] overflow-hidden  px-4"
  
>            <LuArrowUpRight size={20} color="#fff" className='glass absolute bg-[#ff6100] rounded z-[105] top-2 right-2'/>


<div className="absolute top-0 left-0 right-0 bottom-0 z-[101] rounded bg-[#00000021]"></div>


    <Image src="/images/international.jpg" alt="" fill className='object-cover object-right z-[100]'/>
    <div className='image-cover-2 z-[101]'></div>

  <div className=" relative flex flex-col justify-center py-4  z-[101]">
    <p className={`text-[white] text-[10px] lg:text-xs pb-2 w-[100%] ${mode === "searchmode" && "!text-[11px] "}  `}>
    Grab the best deals on international travel
      packages</p>
    <span className={`text-sm lg:text-lg font-bold text-[white] ${mode === "searchmode" && "!text-sm !font-medium"} `}>
    International  Destinations
    </span>
  </div>
</div>
</Link>

</SwiperSlide>








    
    
    
    
   
   
   
 </Swiper>

</div>
      



      


     
   </div>
  )
}


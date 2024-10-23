"use client"
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/autoplay";
import {  Autoplay , Navigation} from 'swiper/modules';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';


const places = [
    {
        img:"https://whereverfamily.com/wp-content/uploads/2018/02/dreamstime_m_14026311-e1517592384559.jpg",
        place: "Taj Mahal"
    },
    {
        img:"https://whereverfamily.com/wp-content/uploads/2018/02/dreamstime_m_14026311-e1517592384559.jpg",
        place: "Taj Mahal"
    },
    {
        img:"https://whereverfamily.com/wp-content/uploads/2018/02/dreamstime_m_14026311-e1517592384559.jpg",
        place: "Taj Mahal"
    },
    {
        img:"https://whereverfamily.com/wp-content/uploads/2018/02/dreamstime_m_14026311-e1517592384559.jpg",
        place: "Taj Mahal"
    },
    {
        img:"https://whereverfamily.com/wp-content/uploads/2018/02/dreamstime_m_14026311-e1517592384559.jpg",
        place: "Taj Mahal"
    }
]

function ActivitiesSlider() {
  
    const [beggining, setBeggining] = useState<boolean>(true)
    const [ended, setEnded] = useState(false)
  return (
    <div className="pt-4">
                            
                            <h1 className="text-lg font-semibold  ">Activities</h1>



                            <div className='w-full relative pt-4'>
                            <div className={`${beggining && "hidden"}  swiper-button-prev-activity absolute z-[1000] top-[50%] bg-[#ff6100]  flex justify-center w-8 h-8 rounded-full items-center translate-x-[-50%] translate-y-[-50%] glass`}><MdKeyboardArrowLeft size={30} className=' text-[#fff] cursor-pointer'/></div>


       <Swiper
   spaceBetween={20}
   slidesPerView={1.35}
   breakpoints={{
    512:{
      slidesPerView:1.75
    },
    640:{
      slidesPerView:2.35
    },
    864:{
      slidesPerView:2.75
    },
    1024:{
      slidesPerView:3.35
    },
     1284:{
         slidesPerView:3.35
     }
   }}
   
   onSwiper={(swiper:any) => console.log(swiper)}
   onSlideChange={(swiper:any)=>{
    if(swiper.isBeginning){
      setBeggining(true)
      setEnded(false)

    }
    else if( swiper.isEnd){
      setEnded(true)
      setBeggining(false)

    }
    else{
      setEnded(false)
      setBeggining(false)
    }
   }}
   modules={[ Autoplay, Navigation]}
   navigation={{ nextEl: ".swiper-button-next-activity", prevEl: ".swiper-button-prev-activity" }}

 
  
  /*update state on swiper initialization*/
  // onInit={() => setInit(true)}
 >
     {
         places?.map((item: any,index: any)=>(
             <SwiperSlide key={index}>
                                                    <div className=" relative mb-4" key={index}>
                                                        <img src={item.img} alt="" className="w-full aspect-square skeleton rounded" />
                                                        <div className="image-cover rounded" >
    
                                                        </div>
                                                        <div className="absolute bottom-2 left-2 ">
                                                            <h1 className="text-xs text-white">{item.place}</h1>
                                                        </div>
                                                    </div>
                                                
                                                
                                                    
             
         </SwiperSlide>
         ))
     }
    
    
    
   
   
   
 </Swiper>

 <div className={`${ended && "hidden"}  swiper-button-next-activity absolute z-[1000] top-[50%] glass bg-[#ff6100] right-0  flex justify-center w-8 h-8 rounded-full items-center translate-y-[-50%] translate-x-[50%]`}><MdKeyboardArrowRight size={30} className=' text-[#fff] cursor-pointer'/></div>

     </div>
    

                            </div>
  )
}

export default ActivitiesSlider
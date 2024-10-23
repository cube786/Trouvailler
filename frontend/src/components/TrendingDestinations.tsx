"use client";
import React, {  useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay, Navigation } from "swiper/modules";
import { PackageCard } from "./PackageCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdArrowBackIos, MdArrowForwardIos, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
export const TrendingDestinations:React.FC<{packages:any}> = ({packages}) => {
  const [beggining, setBeggining] = useState<boolean>(true);
  const [ended, setEnded] = useState(false);
 

  if (packages?.packages?.length > 0) {
    return (
      <div className=" bg-[white]  xs:px-8 lg:px-20 xl:px-40">
        <div className="  px-4 xs:px-0   pt-6 lg:pt-8">
        <h2 className='text-lg lg:text-2xl font-bold text-[#2a2a2a] '><span className="text-[#ff6100]">{packages.name.split(" ").slice(0,2).join(" ")}</span> {packages.name.split(" ").slice(2).join(" ")}</h2>
      <p className="text-sm pt-2 hidden lg:block">{packages.description}</p>
        </div>
        <div className="flex gap-[1rem]  mt-4  ">
        

            <div className="w-full relative">
            <div className={`${beggining && "hidden"}  swiper-button-prev-trending absolute z-[1000] top-[50%] bg-[#ff6100]  flex justify-center w-8 h-8 rounded-full items-center translate-x-[-50%] translate-y-[-50%] glass`}><MdKeyboardArrowLeft size={30} className=' text-[#fff] cursor-pointer'/></div>


              <Swiper
                slidesPerView={1.35}
                spaceBetween={10}
                breakpoints={{
                  512: {
                    slidesPerView: 1.75,
                  },
                  640: {
                    slidesPerView: 2.35,
                    spaceBetween: 20,
                  },
                  864: {
                    slidesPerView: 2.75,
                  },
                  1024: {
                    slidesPerView: 3.35,
                    spaceBetween: 30,
                  },
                  1284: {
                    slidesPerView: 4.15,
                    spaceBetween: 25,
                  },
                }}
                onSwiper={(swiper: any) => console.log(swiper)}
                onSlideChange={(swiper: any) => {
                  if (swiper.isBeginning) {
                    setBeggining(true);
                    setEnded(false);
                  } else if (swiper.isEnd) {
                    setEnded(true);
                    setBeggining(false);
                  } else {
                    setEnded(false);
                    setBeggining(false);
                  }
                }}
                modules={[Autoplay, Navigation]}
                navigation={{ nextEl: ".swiper-button-next-trending", prevEl: ".swiper-button-prev-trending" }}


                /*update state on swiper initialization*/
                // onInit={() => setInit(true)}
              >
                {packages.packages?.map((item: any, index: any) => (
                  <SwiperSlide key={index}>
                    <div key={index} className="ml-4 xs:ml-0">
                      <PackageCard mode="" item={item} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className={`${ended && "hidden"}  swiper-button-next-trending absolute z-[1000] top-[50%] glass bg-[#ff6100] right-0  flex justify-center w-8 h-8 rounded-full items-center translate-y-[-50%] translate-x-[50%]`}><MdKeyboardArrowRight size={30} className=' text-[#fff] cursor-pointer'/></div>

            </div>
        </div>
      </div>
    );
  } else {
    return;
  }
};

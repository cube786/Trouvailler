"use client";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import { generateSeoUrl, generateUrl } from "@/utils/generateUrl";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export const PopularPlaces: React.FC<{ mode: string, places:any }> = ({ mode, places }) => {
  const [beggining, setBeggining] = useState<boolean>(true);
  const [ended, setEnded] = useState(false);
 
 
  return (
    <div
      className={`pb-8 xs:px-8 pt-4 lg:px-20 xl:px-40  ${
        mode === "searchmode" && "!px-0"
      }`}
    >
      <div
        className={`flex items-center justify-between   px-4 xs:px-0  pt-2 ${
          mode === "searchmode" && "!px-0"
        }`}
      >
        <h2
          className={`text-lg lg:text-2xl font-bold text-[#2a2a2a] ${
            mode === "searchmode" && "!text-sm xs:!text-base !font-medium"
          }`}
        >
          <span className="text-[#ff6100]">Popular</span> Places
        </h2>
      </div>
      <div className="flex popular  mt-4">
    


          <div className="rounded-[10px] w-full  relative">
          <div className={`${beggining && "hidden"}  swiper-button-prev-popular absolute z-[1000] top-[50%] bg-[#ff6100]  flex justify-center w-8 h-8 rounded-full items-center translate-x-[-50%] translate-y-[-50%] glass`}><MdKeyboardArrowLeft size={30} className=' text-[#fff] cursor-pointer'/></div>

            <Swiper
              slidesPerView={1.7}
              spaceBetween={5}
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
                  slidesPerView: 4.25,
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
              navigation={{ nextEl: ".swiper-button-next-popular", prevEl: ".swiper-button-prev-popular" }}


              /*update state on swiper initialization*/
              // onInit={() => setInit(true)}
            >
              {places?.map((item: any, index: any) => (
                <SwiperSlide key={index}>
                  <div
                    className={`relative cursor-pointer ${
                      mode !== "searchmode" && "ml-4"
                    }  lg:ml-0 ${
                      index === places?.length - 1 &&
                      mode !== "searchmode" &&
                      "mr-4 lg:mr-0"
                    }`}
                  >
                    <Link
                      href={`/packages/location/${item.place.location}`}
                      className=""
                    >
                      <div
                        className={`relative w-full  ${
                          mode !== "searchmode"
                            ? ` h-[130px] xs:h-[170px]`
                            : ` h-[100px] xs:h-[130px]`
                        }`}
                      >
                        <Image
                          src={generateSeoUrl(item.place.mobileImg)}
                          fill
                          alt=""
                          className="object-cover rounded"
                        />
                        <div className="image-cover rounded"></div>
                      </div>
                      <div className="absolute bottom-2 xs:bottom-4 left-2 xs:left-4 z-[100] capitalize">
                        <h2 className="text-[white] font-semibold">
                          {item.place.location}
                        </h2>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={`${ended && "hidden"}  swiper-button-next-popular absolute z-[1000] top-[50%] glass bg-[#ff6100] right-0  flex justify-center w-8 h-8 rounded-full items-center translate-y-[-50%] translate-x-[50%]`}><MdKeyboardArrowRight size={30} className=' text-[#fff] cursor-pointer'/></div>

          </div>
      </div>
    </div>
  );
};

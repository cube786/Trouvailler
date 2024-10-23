'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import Image from "next/image";


function TravelSubscription  ()  {
    return (
        <div className="   py-2 xl:py-6  flex flex-col pt-4 gap-[5%] items-stretch">
            <div className="  rounded-[15px] flex flex-col justify-end pb-4">
                <div className="flex items-center justify-between">
                <h2 className="text-base lg:text-2xl  mt-2 text-[#2a2a2a]  font-bold mb-2 ">Travel subscription plans</h2>
                <span className="text-[#ff6100] font-semibold text-xs xs:text-sm">See All</span>
                </div>
                <p className="text-xs xs:text-sm  lg:hidden"> Enjoy convenient travel subscriptions with flights included for a year-long adventure at accessible monthly rates.</p>

            </div>

            <div className="w-[100%]   flex flex-col lg:flex-row lg:justify-between">
               

               <div className="hidden lg:flex min-h-[180px] bg-[#ff6100] glass  w-[30%]  rounded-[10px] text-[white] px-4 items-center">
               <p className="text-sm  "> Enjoy convenient travel subscriptions with flights included for a year-long adventure at accessible monthly rates.</p>
               </div>


                


                <div className="w-[100%]  lg:w-[68%]">
                   <div className="rounded-[10px] overflow-hidden">
                   <Swiper
                        spaceBetween={10}
                        slidesPerView={1.35}

                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper: any) => console.log(swiper)}>
                        <SwiperSlide>
                            <div className="w-[100%]  min-h-[150px] xl:min-h-[230px] relative h-full rounded-[10px] overflow-hidden ">
                                <div className="absolute top-0 left-0 right-0 bottom-0 rounded-[10px] overflow-hidden ">
                                    <Image src="/images/europe.png" alt="" fill className="object-cover object-bottom"/>
                                    </div>
                                    <div className="image-cover-2"></div>
                                <div className="absolute text-[white] pt-16 xs:pt-40 md:pt-28 px-4 pb-2 bottom-2 ">
                                    <h3 className="font-semibold text-sm xs:text-xl mb-1 ">Europe</h3>
                                    <p className=" text-[10px]  w-[100%] text-[#cecece] ">12 / 24 Months subscriptions available</p>

                                </div>
                                <button className="roboto-medium text-[10px] bg-[white] text-[black] font-medium px-4 py-1 rounded-full flex items-center gap-1 absolute top-0 right-1  mt-2 md:mt-4">Know more <MdOutlineFlightTakeoff /></button>

                            </div>
                        </SwiperSlide>
                        <SwiperSlide>


                        <div className="w-[100%]  min-h-[150px] xl:min-h-[230px] relative h-full rounded-[10px] overflow-hidden ">
                                <div className="absolute top-0 left-0 right-0 bottom-0 rounded-[10px] overflow-hidden ">
                                    <Image src="/images/thailand.png" alt="" fill className="object-cover object-bottom"/>

                                    </div>
                                    <div className="image-cover-2"></div>
                                <div className="absolute text-[white] pt-16 xs:pt-40 md:pt-28 px-4 pb-2 bottom-2 ">
                                    <h3 className="font-medium text-sm xs:text-xl mb-1">Thailand</h3>
                                    <p className=" text-[10px] text-[#cecece]  w-[100%] ">12 / 24 Months subscriptions available</p>

                                </div>
                                <button className="roboto-medium text-[10px] bg-[white] text-[black] font-medium px-4 py-1 rounded-full flex items-center gap-1 absolute top-0 right-1  mt-2 md:mt-4">Know more <MdOutlineFlightTakeoff /></button>

                            </div>






                          
                        </SwiperSlide>





                    </Swiper>
                   </div>
                </div>

            </div>


        </div>
    )
}

export default TravelSubscription
"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; // Import the navigation CSS

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import React, { useEffect, useRef, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ImQuotesLeft } from "react-icons/im";
import { generateUrl } from '@/utils/generateUrl';
import Image from 'next/image';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

const ReviewCrad: React.FC<{ review: any }> = ({ review }) => {
    return (
        <div className="px-4 bg-[white] py-4 rounded-[10px] flex flex-col h-[100%]">
            <div className='grow flex flex-col justify-center py-2'>
                <ImQuotesLeft className='mb-2' color='#ff6100' />
                <div>
                    <p className="text-[#4a4a4a] text-xs lg:text-sm lg:font-normal leading-[20px] lg:leading-[22px] mb-4">
                        {review.reviewnote}
                    </p>
                </div>
            </div>
            <div>
                <div className="flex gap-4 items-center">
                    <div className='w-8 xs:w-12 h-8 xs:h-12 rounded-full relative overflow-hidden'>
                        <Image src={generateUrl(review.image)} alt="" fill className='object-cover' />
                    </div>
                    <div className=''>
                        <h5 className="text-xs xs:text-sm font-semibold">{review.author}</h5>
                        <p className="text-xs text-[#868686]">{review.place}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Review() {
  
    const [reviews, setReviews] = useState<any[]>([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [beggining, setBeggining] = useState<boolean>(true);
    const [ended, setEnded] = useState(false);
    useEffect(() => {
        async function getReviews() {
            setReviewsLoading(true);
            try {
                const res = await axiosInstance.get('/reviews');
                setReviews(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setReviewsLoading(false);
            }
        }

        getReviews();
    }, []);

    

    return (
        <div className='pt-6 xl:pt-10'>
            <h2 className="text-base lg:text-2xl font-bold mb-1 xs:mb-2 px-4 xs:px-8 lg:px-20 xl:px-40">Stories with Trouvailler</h2>
            <p className="text-xs xs:text-sm px-4 xs:px-8 lg:px-20 xl:px-40">
                Unforgettable journeys, exceptional experiences - discover what our travelers have to say about our travel packages.
            </p>
            <div className="lg:mt-6">
                {reviewsLoading ? (

                    <div className='px-4 xs:px-8 lg:px-20 xl:px-40 flex justify-between'>

<div className="flex w-[80%] xs:w-[30%] flex-col gap-4 py-8 ">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="flex items-center gap-4">
                            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                            <div className="flex flex-col gap-4 grow">
                                <div className="skeleton h-4 w-28"></div>
                                <div className="skeleton h-4 w-full"></div>
                            </div>
                        </div>
                    </div>
                    <div className="hidden xs:flex w-[80%] xs:w-[30%]  flex-col gap-4 py-8 ">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="flex items-center gap-4">
                            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                            <div className="flex flex-col gap-4 grow">
                                <div className="skeleton h-4 w-28"></div>
                                <div className="skeleton h-4 w-full"></div>
                            </div>
                        </div>
                    </div><div className="hidden xs:flex w-[80%] xs:w-[30%] flex-col gap-4 py-8 ">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="flex items-center gap-4">
                            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                            <div className="flex flex-col gap-4 grow">
                                <div className="skeleton h-4 w-28"></div>
                                <div className="skeleton h-4 w-full"></div>
                            </div>
                        </div>
                    </div>

                    </div>
                    // Skeleton loading state
                  
                ) : (
                    <div className='relative pb-8  px-4 xs:px-8 lg:px-20 xl:px-40 '>
                        <div className={`${beggining && "opacity-30"}  swiper-button-prev-review absolute top-[50%] left-24 translate-y-[-50%]`}><MdArrowBackIos className='text-3xl text-[#ff6100] cursor-pointer'/></div>

                        <div className='rounded-[10px] overflow-hidden'>
                            <Swiper
                                spaceBetween={30}
                                slidesPerView={1}
                                breakpoints={{
                                    564: { slidesPerView: 1.35 },
                                    768: { slidesPerView: 1.75 },
                                    1024: { slidesPerView: 2.35 },
                                    1284: { slidesPerView: 3 }
                                }}
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
                                speed={800}
                                modules={[Autoplay, Navigation, Pagination]}
                                navigation={{ nextEl: ".swiper-button-next-review", prevEl: ".swiper-button-prev-review" }}
                                >
                                {reviews.map((item, index) => (
                                    <SwiperSlide key={index} className="!h-auto">
                                        <ReviewCrad review={item} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className={` ${ended && "opacity-30"} swiper-button-next-review absolute top-[50%] right-24 translate-y-[-50%]`}><MdArrowForwardIos className='text-3xl text-[#ff6100] cursor-pointer'/></div>


                    </div>
                )}
            </div>
        </div>
    );
}

export default Review;

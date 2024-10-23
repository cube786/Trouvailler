import { generateUrl } from '@/utils/generateUrl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaCheck } from "react-icons/fa";

export const PackageCard:React.FC<{item:any, mode: string}> = ({item, mode}) => {
  return (
    <div className='shad rounded-[10px] w-full xs:rounded-[15px] border mb-4 fadein overflow-hidden'>
        <div className='relative aspect-video'>
             <Image src={generateUrl(item.titleImage)} alt="" fill loading='lazy' className='rounded-t-[10px] xs:rounded-t-[15px]   object-cover' />
             <span className='bg-[#ff6100] text-[white] font-semibold text-xs px-3 py-1 glass rounded-tl rounded-br absolute top-0 left-0'>{item.shortDuration}</span>
           
        </div>
        <div className='px-2 xs:px-4  py-2 xs:py-4 bg-[white] rounded-[20px] relative z-100'>
        <h1 className={` font-bold text-sm xs:text-base text-ellipsis whitespace-nowrap overflow-hidden ${mode === "single" && "!text-base"}`}>{item.title}</h1>
        <p className={`text-[11px] my-1 mt-2 xs:my-2 text-[#4a4a4a] leading-[16px] max-h-[48px] h-[48px] line-clamp-3 ${mode === "single" && "!text-[12px]"}`}>{item.shortDescription}</p>

        <div className="mt-2 ">
                                <div className="   text-[#4a4a4a] ">
                                {item.cardTags.cardTag1 !== ""  && <div className="flex items-center gap-1 mb-1 ">
                                <FaCheck className='text-[11px] xs:text-[14px]' color="#ff6100"/>                                        <span className="text-[11px] xs:text-[12px] text-[#ff6100]   whitespace-nowrap	overflow-hidden text-ellipsis">{item.cardTags.cardTag1}</span>
                                    </div>}
                                    {item.cardTags.cardTag2 !== "" && <div className="flex  items-center gap-1 ">
                                        <FaCheck className='text-[11px] xs:text-[14px]' color="#ff6100"/>
                                        <span className="text-[11px] xs:text-[12px]   whitespace-nowrap text-[#ff6100]	overflow-hidden text-ellipsis">{item.cardTags.cardTag2}</span>
                                    </div>}
                                </div>
                                
                            </div>
        <div className='flex items-center justify-between mt-4'>

        <div >

        <p className={`font-bold text-sm xs:text-lg ${mode === "single" && "!text-base"}`}>INR {item.price
                                        .toString()
                                        .replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</p>
        <p className='xs:-mt-[5px] text-[10px] xs:text-[12px]'>Per Person</p>
        </div>

       <Link href={`/packages/${item._id}`}>
       <button className='bg-[#ff6100] text-xs xs:text-base text-white font-medium px-6 py-2 rounded-[10px] shad glass '>Explore</button>
       </Link>
        </div>

        </div>
    </div>
  )
}


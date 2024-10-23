"use client"
import { generateUrl } from '@/utils/generateUrl'
import useFetch from '@/utils/useFetch'
import Image from 'next/image'
import React, { useEffect } from 'react'



export const CategoryLocations:React.FC<{place:string}> = ({place}) => {
    const {data, loading,error} = useFetch(`packagelocations/category/${place}`)
    return (
    <div>

<div className=' pt-6 xs:pt-16 '>
      <div>
      <h2 className='text-base px-4 xs:px-0   xs:text-xl font-bold text-[#2a2a2a] mb-4'><span className='text-[#ff6100]'>Explore Packages</span> by Location</h2>
      </div>

      <div className='flex  w-full gap-[4%] overflow-auto xs:gap-[2.6%] py-3 no-scrollbar'>


        {data?.map((item:any, ind:any)=> (
            <div key={ind} className={`min-w-[26%] xs:min-w-[12%] mb-4 ${ind === 0 && 'ml-4 xs:ml-0'} ${ind+1 === data?.length && "mr-4 xs:mr-0"}`} >
                    <div className='w-full shadow-lg border rounded-[10px] overflow-hidden'>
                        <div className='w-full relative aspect-square skeleton rounded '>
                            <Image src={generateUrl(item.mobileImg)} fill className='object-cover' alt="" />
                        </div>

                    </div>
                    <div className='flex justify-center mt-3 '>
                        <h2 className='font-medium text-sm xs:text-base capitalize'>{item.location}</h2>
                    </div>
            </div>
       ))}


      </div>

      </div>
    </div>
  )
}


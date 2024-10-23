import React from 'react'
import { IoCall } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";

function CallBack() {
  return (
    <div className=' bg-[#fee9db] text-[#4a4a4a] glass  rounded-[10px]  shad overflow-hidden'>
        <div className=' py-4 xs:py-8 px-4 xs:px-8'>
        <h2 className='font-semibold text-sm lg:text-2xl lg:font-bold'>Do You want a customised travel plan?</h2>
        <p className='text-xs lg:text-base mt-2'>Looking for a personalized travel experience? Let us to create your customized travel plan tailored to your preferences and desires.</p>
        <div className='flex items-center gap-4 mt-4'>
            <button className='px-2 xs:px-3 py-2 xs:py-3 rounded-[10px]  font-medium  bg-[#ff6100] glass  gap-2 text-xs text-[#fff] flex items-center'><IoCall className='text-[14px] xs:text-[16px]' color="white"/>Get A Callback</button>
            <button className='px-2 xs:px-3 py-2 xs:py-3 rounded-[10px] font-medium flex items-center gap-2 glass text-[#fff] text-xs bg-[#ff6100]'><IoLogoWhatsapp className='text-[14px] xs:text-[16px]' color="#fff"/>Chat With Us</button>
        </div>
        </div>
    </div>
  )
}

export default CallBack
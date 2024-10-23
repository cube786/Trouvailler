"use client"

import { MyContext, myContext } from "@/context/Context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { IoSearch } from "react-icons/io5"

function MainPageHeader () {
	const { searchOpen, setSearchOpen } = useContext(MyContext) as myContext;
	const router = useRouter();

   
    return(
        
       
       <>
        <div onClick={()=>setSearchOpen(true)} className="bg-[white] fadein  mt-6 shad py-1 rounded-full flex gap-2 xs:gap-3  px-4 mr-12 xl:mr-[20rem] items-center ">
            <IoSearch className="text-[16px] xs:text-[22px]" style={{  color: "#ff6100" }} />
            <div  className="outline-none grow text-xs xs:text-sm py-2"  >Search Destinations</div>
        </div>
        </>
    )
}


export default MainPageHeader
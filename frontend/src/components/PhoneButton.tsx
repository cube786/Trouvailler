"use client"
import { MyContext, myContext } from "@/context/Context"
import { useContext } from "react"
import { BiPhoneCall } from "react-icons/bi"

const PhoneButton = () => {
    const {setNeedHelp} = useContext(MyContext) as myContext;
    return(
        <div onClick={()=>{setNeedHelp(true)}} className="bg-[#ff6100] cursor-pointer w-14 rounded-full fixed  glass animate-bounce bottom-8 xs:bottom-12 right-4 xs:right-8 z-[1000] !border !border-[#fff]  flex justify-center items-center h-14">
            <BiPhoneCall color="white" size={20} />
        </div>
    )
}


export default PhoneButton
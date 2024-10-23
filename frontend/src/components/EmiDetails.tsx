import Image from "next/image"
import Link from "next/link"

function EmiDetails () {
    return(
        <div className="relative rounded-[10px] overflow-hidden btn-grad flex items-stretch ">
            <div className="w-[70%] py-1 pb-2 relative ">
            <div className="relative z-[101] w-[90%] md:w-[50%]  max-w-[400px] left-4 top-6 aspect-[38/5]">
            <Image src="/images/emiheading.png" fill alt="" className="object-cover relative"></Image>

            </div>
            <p className="text-[10px] xs:text-[12px]  relative z-[101]  text-[white]  pl-4 pt-8 ">Travel anywhere you dream with our flexible EMI schemes, paying conveniently month by month.</p>
                <Link href="/packages/emi">
                <button className="relative z-[101] text-[black] text-[10px] xs:text-[12px] mb-4 ml-4 glass bg-[white] mt-3 px-2 xs:px-4 py-1 xs:py-2 rounded font-medium">Check Out Now</button>
</Link>
            </div>
            <div className="relative w-[30%]">
            <Image src="/images/emiperson.png" fill alt="" className="object-cover relative"></Image>

            </div>

           
           

        </div>
    )
}


export default EmiDetails
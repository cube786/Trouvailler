import axiosInstance from "@/utils/axiosInstance"
import Link from "next/link"
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoYoutube } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io5";
import Image from "next/image";
import { generateUrl } from "@/utils/generateUrl";




async function getData() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/65999e37781eacb0f9723bcc`, {cache: 'no-store'});
  const popularPlacesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/popularplaces`, {cache : 'no-store'})
  const sectionsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/packages`)
  const packages = await res.json()
  const popularPlaces = await popularPlacesRes.json()
  const sections = await sectionsRes.json()
	return {packages, popularPlaces, sections};
}
const seoData = [
    {
        q : "Who We Are - Trouvailler",
        ans:"Trouvailler is your one-stop platform for curated travel experiences. We offer both domestic and international tour packages tailored to your preferences, flexible payment plans, and even a subscription service for frequent travelers. Our bid-to-book feature allows you to negotiate hotel prices directly, providing a seamless and affordable way to explore the world."
    },
    {
        q: "Why Book with Trouvailler?",
        ans: "At Trouvailler, we specialize in creating personalized low budget tour packages that cater to your unique plans. Whether you're exploring domestic or international destinations, our custom itineraries, flexible EMI options, and subscription travel plans ensure an unforgettable experience. Plus, with our exclusive bidding feature, you can secure stays at top hotels at a price you choose. Travel smarter and more affordably with Trouvailler!"
    },
    {
        q:"Personalized Travel Packages",
        ans:"At Trouvailler, your journey is crafted just for you. Share your travel plans, and we’ll design a custom package that fits your dream itinerary. From destination choices to accommodation preferences, we provide a tailor-made travel experience, ensuring every trip is exactly how you imagined it."
    },
    {
        q:"Flexible Payment Plans",
        ans: "We believe that travel should be accessible to everyone. Trouvailler offers flexible EMI payment options, allowing you to pay for your dream vacation in manageable installments. Travel now, pay later, and enjoy stress-free adventures."
    },
    {
        q:"Exclusive Travel Subscription Plans",
        ans:"Subscribe to Trouvailler and unlock access to exclusive travel deals and packages. Our travel subscription plans offer the convenience of pre-booked trips, letting you travel more frequently and affordably without the hassle of repeated bookings."
    },
    {
        q:"Bid Your Price on Hotels",
        ans:"With Trouvailler’s unique bidding feature, you can raise a bid for your preferred hotel stay. If the hotel approves, you get to stay at your price! Save money while enjoying top-tier accommodations at your desired rate."
    }
]

async function Footer () {

    const data = await getData()

    console.log(data)
    return(
        <div className=" bg-[#e4e4e4] relative z-[103] text-[black]  pt-8 sm:pt-12 ">
           <div className="flex flex-wrap px-4 xs:px-8 sm:px-20 xl:px-40 gap-[10%] mb-2">
           {seoData &&  seoData?.map((item, index)=> (
                <div className="w-full xs:w-[45%] mb-8" key={index}>
                    <h2 className="text-xs sm:text-base font-bold">{item.q}</h2>
                    <p className="text-[#4a4a4a] text-[10px] xs:text-[13px] pt-2">{item.ans}</p>
                </div>
            ))}
           </div>
          
            <div className="flex bg-[black] flex-wrap px-4 xs:px-8 sm:px-20 xl:px-40 pt-6 pb-8">
                <div className="w-[100%] lg:w-[25%] flex items-start mb-8 xs:mb-20 lg:mb-0 justify-between  flex-col flex-row lg:flex-col">
                    <div className="text-[white]">
                    <h2 className="text-xs sm:text-base font-bold">Discover Your</h2>
                    <h2 className="text-sm sm:text-xl font-bold">Next Adventure <span className="text-[#ff6100]">With Us</span></h2>
                    <p className="text-[#c8c8c8] text-[10px] xs:text-[12px] pt-4">Explore the world with our travel app! Discover exciting destinations, book flights and hotels, create personalized itineraries, and get real-time travel updates. Whether you’re a globetrotter or planning your next getaway, our app makes travel easy and enjoyable. Bon voyage!</p>
                    </div>

                </div>
                <div className="w-[100%] xs:w-[40%] lg:pl-8 lg:w-[15%] roboto-regular">
                    <h2 className="text-[12px] text-[white] sm:text-[14px] font-semibold ">Site map</h2>
                    <ul className="mt-2 xs:mt-4 flex flex-col gap-1 xs:gap-2 text-[#c8c8c8] text-[10px] xs:text-[12px]">
                        <li className="cursor-pointer hover:text-[black]">Home</li>
                        <li className="cursor-pointer hover:text-[black]">My bids</li>
                        <li className="cursor-pointer hover:text-[black]">Bid for stay</li>
                        <li className="cursor-pointer hover:text-[black]">Hotels and Home Stays</li>
                        <li className="cursor-pointer hover:text-[black]">Travel Packages</li>
                    </ul>
                </div>
                <div className="w-[100%] xs:w-[60%] lg:w-[35%] mt-8 xs:mt-0 lg:pl-12">
                    <h2 className="text-[12px] sm:text-[14px] font-semibold text-[white]">Famous Places to Explore</h2>
                   <div className="flex flex-wrap gap-[%] mt-4 xs:mt-6">
                    <div className="flex gap-[2%] w-full"> 
                   {
                    data.popularPlaces && data.popularPlaces.slice(0,3).map((itm:any,index:any)=>(
                            <div key={index} className="w-[30%] md:w-[32%] lg:w-[25%] mb-4 aspect-video relative">
                                <Image src={generateUrl(itm.place.mobileImg)} alt="" fill loading="lazy"/>
                            </div>
                    ))
                   }
                   
                   
                    
                    </div>
                   <div className="flex gap-[2%] w-full">


                   {
                    data.popularPlaces && data.popularPlaces.slice(3,6).map((itm:any,index:any)=>(
                            <div key={index} className="min-w-[30%] md:min-w-[32%] lg:min-w-[25%] mb-4 aspect-video relative">
                                <Image src={generateUrl(itm.place.mobileImg)} alt="" fill loading="lazy"/>
                            </div>
                    ))
                   }
                   </div>
                   
                   </div>
                </div>
                <div className="w-[100%] mt-8 xs:mt-20 lg:mt-0 lg:w-[25%] roboto-regular">
                    <h2 className="text-[12px] font-semibold xs:text-[14px] text-[white]"> Connect Us</h2>
                    
                    <div className="mt-2 xs:mt-4 ">
                        <p className=" text-[#c8c8c8] text-[10px] xs:text-[12px]">Get in touch with us anytime through our official WhatsApp handle</p>
                        <button className=' flex items-center px-4 py-2 rounded-[5px] glass text-[10px] gap-2 xl:text-[14px] mt-4 text-[white] bg-[#ff6100]'><IoLogoWhatsapp className="text-[14px] xl:text-[20px]"/>Chat With Us</button>
                    </div>
                    <div className="flex mt-4 gap-4 items-center">
                        <FaFacebook size={20} color="#c8c8c8"/>
                        <AiFillInstagram size={24} color="#c8c8c8"/>
                        <IoLogoYoutube size={20} color="#c8c8c8" />

                    </div>
                </div>
            </div>
            <div className="px-4  xs:px-8 sm:px-20 xl:px-40 bg-[black] ">
                <hr className="border-[#272727]"/>
            </div>
            <div className="bg-[black] px-4  xs:px-8 sm:px-20 xl:px-40 flex flex-row justify-between items-end pb-8 pt-6  text-[#cccccc]   text-[10px] xs:text-[12px]" >
                <div className="flex flex-row lg:items-end gap-4">
                    <div className="w-[66px] lg:w-[96px] h-[19px] lg:h-[26px] relative">

                    <Image src="/images/logos/logowhite.png" fill className=""  alt="" />


                    </div>


                    <span className="hidden lg:block">&copy; Trouvailler Enterprises pvt ltd.</span>
                </div>
                <div >
                    <ul className="flex justify-end gap-4 ">
                        <Link href="/termsandconditions"><li className="hover:underline">Terms and Conditions</li></Link>
                        <Link href="/privacypolicy"><li className="hover:underline">Privacy Policy</li></Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default Footer
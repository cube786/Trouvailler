import Navbar from "@/components/Navbar";
import React from "react";
import { IoImagesOutline } from "react-icons/io5";
import { FaCircleCheck, FaRegShareFromSquare } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import PackageDetailTitleHeader from "@/components/PackageDetailTitleHeader";
import { PiShuffleBold } from "react-icons/pi";
import PopularPlacesSlider from "@/components/PopularPlacesSlider";
import ActivitiesSlider from "@/components/ActivitiesSlider";
import Footer from "@/components/Footer";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import dynamic from "next/dynamic";
import CallBack from "@/components/CallBack";
import { IoLogoWhatsapp } from "react-icons/io";
import VisitCounter from "@/utils/VisitCounter";
import Needhelp from "@/components/Needhelp";
import BidModal from "@/components/BidModal";
import VisitCounterPackage from "@/utils/VisitCounterPackage";
import PopUpCounter from "@/utils/PopUpCounter";
const MobileNav = dynamic(
    () => import('../../../components/MobileNav'),
    { ssr: false }
  )
async function getData(id: string) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/package/${id}`);
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}


const schedule : any = [
    {
        "dayTitle": "Delhi to Manali (Volvo Bus)",
        "dayDesc": "Board bus to Manali by evening from Delhi \n",
        "_id": "647b098c8af2ec7385b6b323"
    },
    {
        "dayTitle": " Manali Local sightseeing",
        "dayDesc": " After reaching Manali by morning (before 10 am)\nMeet out representative and proceed to hotel. (Early check-in is subjected to availability)\nAfter freshup, let's go for Manali local sightseeing \nHadimba Temple \nClub house \nVashisht temple \nTibetan Buddhist monastery \nMall road\n\nOvernight stay in Hotel \n\n",
        "_id": "647b098c8af2ec7385b6b324"
    },
    {
        "dayTitle": "Solang Valley + Atal Tunnel + Sissu",
        "dayDesc": "After breakfast proceed to Solang Valley then to Sissu through Atul tunnel.\n(you can go for rides and other activities here on your own cost)\n\nActivities: Cable car ride,Sling shot,Zipline, Skiing, Snow Sledge, Yak/horse ride & Quad bike ride (ATV) etc.",
        "_id": "647b098c8af2ec7385b6b325"
    },
    {
        "dayTitle": "Manali-Kullu-Delhi ",
        "dayDesc": "After breakfast proceed to Kullu , where you can go for River Rafting Paragliding and other activities.\nAfter that visit famous Kullu Handlooms and Matha Vaishnava Devi Temple .\nBy evening proceed to Manai bus stand to board bus back to Delhi.\n",
        "_id": "647b098c8af2ec7385b6b326"
    },
    {
        "dayTitle": "Delhi drop",
        "dayDesc": "Before 10am the bus will reach Delhi will drop you there with lots of memmories",
        "_id": "647b098c8af2ec7385b6b327"
    }
]

export default async function Page({ params }: { params: { id: string } }) {
	const data = await getData(params.id);

	return (
		<div className="relative">

<div className="bg-[#ff6100] glass fixed bottom-0 left-0 right-0 z-[105] py-2 px-4 flex justify-between items-center xl:hidden">
            <div className=" flex flex-col items-start text-white  text-[16px] xs:hidden">

                               <span className="font-extrabold    flex gap-1 items-center "> <span className='text-lg'>₹</span><span>{data.price.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</span></span>
                               <span className="text-[10px] -mt-[5px] text-[#e9e9e9]">Per Person</span>

                                </div>
                                <div className="flex gap-3 items-center">
                                <a className="bg-[white] glass w-full rounded py-2 px-2 text-xs flex items-center gap-2 text-[#ff6100] font-bold" href={`https://wa.me/918129177335?text=I would like to know more about ${data.title} package https%3A%2F%2Ftrouvailler.com%2Ftravelpackage%2F${data._id}`}><button className="flex items-center  gap-2">Enquire Now <IoLogoWhatsapp size={18}  /></button></a>

                                    
                                </div>

            
        </div>

            <Navbar mode="detailpage" />
            
            <MobileNav />

            <PackageDetailTitleHeader data={data}/>
            <VisitCounter />
            <VisitCounterPackage />
            <Needhelp />
            {/* <BidModal /> */}
            <PopUpCounter />
           

           


            <div className="px-4 xs:px-8 lg:px-20 xl:px-40 xs:pt-4 pb-6">

            <div className=" flex  flex-col xs:flex-row gap-[1%]">
                <div className="w-full xs:w-[55%] relative ">
                    <img src={data.titleImage} className="rounded-l-[5px] rounded-r-[5px] xs:rounded-r-none object-cover w-full"/>
                    <div className="glass flex absolute top-2 right-2 bg-[#ff6100] xs:hidden items-center px-2 py-1 cursor-pointer shadow-xl gap-2 rounded ">
                                <IoImagesOutline className="w-[12px]" color="#fff" />
                                <span className=" text-[10px] font-semibold text-[#fff]">View Gallery</span>
                            </div>

                </div>
                <div className="w-full xs:w-[44%] mt-2 xs:mt-0 flex flex-wrap gap-[1.33%] xs:gap-[2%]">
                    {data.images.slice(0,4)?.map((item :any, index :any)=>(
                        <div key={index} className="w-[24%] xs:w-[49%] relative">
                            <img src={item} alt="" className={`object-cover rounded-[5px] border xs:rounded-none w-full h-full ${index == 3 ? "!rounded-br-[5px]": ""} ${index == 1 ? "!rounded-tr-[5px]": ""}`}/>
                            {index == 3 && <div className="bg-[white] hidden absolute bottom-2 right-2 xs:flex items-center px-2 py-2 cursor-pointer shadow-xl gap-2 rounded ">
                                <IoImagesOutline className="w-[15px]" />
                                <span className="roboto-regular text-xs">View Gallery</span>
                            </div>}
                        </div>
                    ))}

                </div>
            </div>

            </div>

            <div className="flex lg:hidden items-center px-4 xs:px-8  justify-between">
							<div className="flex gap-2">
                            <span className="bg-[#ff6100] glass px-2 font-medium py-1 rounded text-xs text-[white] capitalize">{data.category.charAt(0).toUpperCase()+ data.category.slice(1)}</span>

<span className="border border-[#ff6100] px-2 font-medium py-1 rounded text-xs flex items-center gap-1"><PiShuffleBold color="#ff6100"/> Personalisable</span>
</div>   <div className="flex gap-3">
             <span><FaRegShareFromSquare /></span>
              <span><FaRegHeart /></span>
             </div>
						</div>


            <div className="px-4 xs:px-8 lg:px-20 xl:px-40  pt-6 ">

           

            <div className="flex pb-16">
                <div className="w-full xs:w-[60%]">
                <h2 className="text-lg font-semibold mb-1">{data.descriptionTitle}</h2>
                
                <p className="text-xs xs:text-sm  mt-1">{data.description}</p>
                


                        <hr className="mt-4"/>

                      {/* {data.places && data.places.length>0 && */}

                      <PopularPlacesSlider />
                      
                     {/* } */}

                     <hr className="mt-4"/>


                     { schedule && schedule.length > 0 &&
                     
                     <div className="  mt-2 xs:mt-4   rounded ">
                    <h1 className="text-base xs:text-lg font-semibold px-2 pt-2 ">Itinerary</h1>
                    <p className="  mt-2 text-xs xs:text-sm  px-2">We have carefully planned out each day to give you the best possible experience. From exploring historic landmarks to tasting delicious local cuisine, each day is packed with adventure and excitement. </p>



                    <div className="mt-4 ">
                       { schedule?.map((item:any ,index:number)=>(
                        <div key={index} className={`  schedule-grad rounded-b-[20px] mt-4 ${index === schedule.length -1 ? "pb-2" : "pb-6"}`}>
                           <div className="relative border-b border-b-[#ff6100] rounded-l-full">
                            
                           <span className=" w-full   py-1   pr-4 font-semibold text-xs xs:text-sm"><span className="bg-[#ff6100] py-1 text-[white] rounded-full glass !shadow-none px-4 mr-2">Day {index+1}</span> <span className=""> {item.dayTitle}</span></span>
                            
                           </div>
                           <p className=" text-xs xs:text-sm ml-[15px] mt-2 text-[#000] whitespace-pre-line	">{item.dayDesc}</p>
                        </div>
                       ))}
                       
                       
                    </div>
                    </div>}



                    <hr className="mt-4"/>


                    <ActivitiesSlider />
                    { data.inclusions && data.inclusions.length > 0 &&
                                            <hr className="mt-4"/>

                    }


                    <div className="flex mt-4 gap-8 md:mt-8 flex-wrap">
                       { data.inclusions && data.inclusions.length > 0 && 
                       <div className="w-full sm:w-auto sm:grow flex flex-col ">
                            <h1 className="text-sm md:text-base font-medium">Package Inclusions</h1>
                            <ul className=" mt-2 grow md:mt-4 border rounded-[10px] px-3 py-2 border-[1px] bg-[#fff2f2] border-[#ff6100]">
                            {data.inclusions?.map((item:any, index:any)=> (
                                <li className="flex gap-2 items-center mb-1" key={index}>
                                   <div>
                                   <FaCircleCheck color="#ff6100" size={14} className=" md:mt-0 w-4 md:w-6"/>
                                   </div>
                                    <div>
                                    <span className="text-xs md:text-sm roboto-regular">{item}</span>
                                    </div>
                                </li>
                            ))}
                               
                               
                            </ul>

                        </div>}
                       { data.exclusions && data.exclusions.length > 0 && <div className="w-full flex flex-col sm:w-auto sm:grow  sm:mt-0">
                            <h1 className="text-sm md:text-base roboto-medium">Package Exclusions</h1>
                            <ul className=" mt-4 grow border rounded-[10px] bg-[#fff2f2] px-3 py-2 border-[1px] border-[#ff6100]">
                               
                               
                                {data.exclusions?.map((item:any, index:any)=> (
                                
                                    <li className="flex gap-2 items-center " key={index}>
                                    <div>
                                    <MdCancel size={18} color="#ff6100" className=" w-4 md:w-6"/>
                                    </div>
                                        <div>
                                        <span className="text-xs md:text-sm roboto-regular">{item}</span>
                                        </div>
                                </li>))}
                            </ul>
                        </div>}
                    </div>





                    <div className="block xs:hidden mt-8">
                        <CallBack />
                    </div>



                </div>



                <div className="w-[40%]    hidden lg:block ">
                   <div className="w-full flex flex-col justify-start items-end  sticky top-28">
                   <div className="w-[80%] border border-[#ff6100] bg-[white] px-4 pt-4 schedule-grad  rounded-[5px]">
                        <div className="  pb-4 ">
                            
                            <div className="flex  justify-between items-end">

                            <div className=" flex flex-col items-start  text-[15px] xs:text-[24px]">

                               <span className=" text-xs   flex gap-1 items-end  "> <span className='text-base roboto-bold  lg:text-xl'>₹</span><span className="text-xl font-bold">{data.price.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</span></span>
                               <span className="text-xs text-[grey]">Per Person</span>
                                </div>
                                <div className=" flex flex-col items-end w-[50%]">
                                    <img src="/images/icons/emiicon.png" alt=""  className="w-[50%]"/>
                                    <span className="text-[10px] robot-regular text-[grey]">Talk with our agent for EMI details</span>
                                </div>
                            </div>
                        </div>
                        
                        <hr />
                        <div className="mb-4 mt-4">
                            <a href={`https://wa.me/917907160314?text=I%20would%20like%20to%20know%20more%20about%20${data.title}%20package%0Ahttps://trouvailler.com/travelpackage/${data._id}`}><button className="bg-[#ff6100] w-full rounded-full py-3 text-sm roboto-bold text-white glass ">Enquire Now</button></a>
                        </div>
                    </div>
                    <div className="w-[80%] border border-[#ff6100]  mt-8 mb-8 sticky top-0 rounded-[5px]">
                        <h1 className="mt-4 font-medium px-4 text-sm">Want to customise this package for you?</h1>
                        <div className="flex gap-4 items-center mt-4 py-2 cursor-pointer bg-[#d8881524] px-4">
                            <FiPhoneCall color="#ff6100" className="w-10"/>
                           <div className="flex flex-col">
                           <span className="mt-1 reobot-medium text-xs text-[#585858]">Call us now</span>
                           <span className="font-bold">+91 7907160314</span>
                           </div>
                        </div>
                        
                    </div>
                    <div className="w-[80%] border  relative mt-4 mb-8 sticky top-0 rounded-[10px] flex">
                        <div className="absolute w-[100%] h-full top-0 left-0  bottom-0 z-[10000] rounded-[10px] bg-gradient-to-r from-[#090740]  from-30% via-[#020137f7] via-50% to-[#ffffff00]  to-90%">

                        </div>
                        <div className="w-[50%] z-[10000000] text-[white] justify-center items-start pl-4  flex flex-col roboto-medium">
                            <span className="text-[11px] mb-1">Travelling with your group?</span>
                            <span className="text-[13px]">Great Discounts awaits you!</span>
                            <button className="text-xs bg-[#ff6100] px-2 py-1 rounded mt-2">Get a Callback</button>
                        </div>
                        <div className="w-[50%]">
                        <img src="/images/grp.jpg" className="w-full rounded-[10px]" alt="" />

                        </div>
                        
                    </div>
                   </div>
                </div>

            </div>

</div>






            <Footer />



		</div>
	);
}

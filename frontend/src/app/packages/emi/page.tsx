import Image from "next/image";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import ScrollListener from "@/utils/ScrollListener";
import NavbarScrolled from "@/components/NavbarScrolled";
import LoginModal from "@/components/LoginModal";
import VisitCounter from "@/utils/VisitCounter";
import PopUpCounter from "@/utils/PopUpCounter";
import Needhelp from "@/components/Needhelp";
import { SearchModal } from "@/components/SearchModal";
import { Metadata, ResolvingMetadata } from "next";

const MobileNav = dynamic(() => import("../../../components/MobileNav"), {
  ssr: false,
});



const Footer = dynamic(() => import("../../../components/Footer"), { ssr: false });

const CallBack = dynamic(() => import("../../../components/CallBack"), {
  ssr: false,
});



const TravelSubscription = dynamic(
  () => import("../../../components/TravelSubscription"),
  { ssr: false }
);

async function getData() {
	
	return 
}


export async function generateMetadata(
  { params, searchParams }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `Flexible EMI Travel Plans by Trouvailler`,
    description:
      "Explore flexible EMI travel plans with Trouvailler, making your dream vacations affordable and hassle-free with easy payment options for both domestic and international packages.",
    keywords:
      "travel, adventure travel, travel guides, vacation ideas,  cultural experiences, family travel, solo travel, budget travel, travel itineraries, travel planning,  travel tips, best places to visit, travel photography, local cuisine, summer travel, winter getaways, personalized travel experiences",
    robots: "index , follow",
    openGraph: {
      title: `Flexible EMI Travel Plans by Trouvailler`,
      description:
      "Explore flexible EMI travel plans with Trouvailler, making your dream vacations affordable and hassle-free with easy payment options for both domestic and international packages.",
      type: "website",
      url: `https://trouvailler.com/packages/emi`,
      images: [
        {
          url: "https://res.cloudinary.com/difxlqrlc/image/upload/v1684528069/site/emimobile_ks92eu.png",
          alt: "Flexible EMI Travel plans",
          width: 1280,
          height: 720,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Flexible EMI Travel Plans by Trouvailler`,

      description:
      "Explore flexible EMI travel plans with Trouvailler, making your dream vacations affordable and hassle-free with easy payment options for both domestic and international packages.",

      images: [
        {
          url: "https://res.cloudinary.com/difxlqrlc/image/upload/v1684528069/site/emimobile_ks92eu.png",
          alt: "Flexible EMI Travel plans by Trouvailler",
          width: 1280,
          height: 720,
        },
      ],
    },
    alternates: {
      canonical: "https://trouvailler.com",
    },
  };
}

export default async function Home() {
  const data = await getData()
  console.log(data)

  return (
    <main className=" min-h-screen   bg-[white] relative">
      <div className="">
        <ScrollListener />
        <VisitCounter />

        <MobileNav />
        <NavbarScrolled mode="home" />
        <LoginModal />
        <Needhelp />
        <PopUpCounter />
        <SearchModal mode="" />

        <div className="relative   ">
         
          <div className="relative z-[102] bg-[transparent] w-full top-0 overflow-hidden">
            <div className="relative z-[102] bg-[transparent] rounded-br-[40px] lg:rounded-br-[100px] shadow-white w-full top-0">
              <div className="relative z-[103]">
                <Navbar mode="detailpage" />
                <div className="  pb-2 emi-dektop-bg relative flex">
                    <div className=" w-4 xs:w-8 md:w-20 hidden xs:flex  lg:w-28 xl:w-60  items-end justify-center">
                        <div className="relative h-48">
                        <Image src="/images/icons/plane.svg" alt="" fill className="!relative"></Image>

                        </div>
                    </div>
                    <div className="grow flex flex-col justify-center items-start pt-8 xs:pt-0 pl-4 xs:pl-4">
                    <h1 className="xs:border-b xs:border-b-[#ff6100] pb-2 xs:border-b-[2px] w-fit flex flex-col xs:gap-2 mb-4 xs:mb-8">
                            <span className="text-[#ff6100] font-bold text-xl xs:text-2xl">Travel Now,</span>
                           <div className="flex items-start xs:items-end flex-col xs:flex-row gap-2 xs:gap-0 ">
                           <span className="text-[#4B4A4A] font-bold text-3xl xs:text-4xl">Pay Later</span>
                            <span className="text-[#4B4A4A] font-medium text-sm xs:text-lg xs:ml-4">with our Flexible EMI options</span>
                           </div>
                        </h1>
                        <div className="relative w-[65%] shadow-xl xs:hidden overflow-hidden rounded-xl">
                    <Image src="/images/emipersondetail.png"  fill alt=""  className="object-cover !relative  object-top  "></Image>

                    </div>
                        <p className="text-xs mt-6 xs:mt-0 xs:text-base">Imagine opening the world to everyone. That&apos;s what drives SanKash, India&apos;s largest travel-focused financial platform. We partner with travel agents to make dream vacations a reality, not just a budget fantasy.</p>
                       <button className="glass mt-4 xs:mt-8 bg-[#ff6100] text-xs font-bold xs:font-medium mb-4 xs:mb-0 xs:text-base text-white px-4 py-2 rounded-full">Connect Now</button>

                    </div>
                    <div className="relative w-[50%] hidden xs:block ">
                    <Image src="/images/emiheaderimg.png"  fill alt=""  className="object-cover !relative  object-top  "></Image>

                    </div>
                       
                </div>
              </div>
            </div>
          </div>
        </div>


       
      


     





       

        <div className="px-4 xs:px-8 lg:px-20 xl:px-40  bg-[white] relative z-[101] ">
          <TravelSubscription />
        </div>

        <div className="px-4 xs:px-8 lg:px-20 xl:px-40  pt-4 lg:pt-12 pb-8 lg:pb-12  bg-[white] relative z-[101] ">
          <CallBack />
        </div>

        <Footer />
      </div>
    </main>
  );
}

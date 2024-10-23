import { TrendingDestinations } from "@/components/TrendingDestinations";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Explore from "@/components/Explore";
import dynamic from "next/dynamic";
import ScrollListener from "@/utils/ScrollListener";
import NavbarScrolled from "@/components/NavbarScrolled";
import LoginModal from "@/components/LoginModal";
import VisitCounter from "@/utils/VisitCounter";
import BidModal from "@/components/BidModal";
import PopUpCounter from "@/utils/PopUpCounter";
import Needhelp from "@/components/Needhelp";
import MainPageHeader from "@/components/MainPageHeader";
import { SearchModal } from "@/components/SearchModal";
import { TravelCategories } from "@/components/TravelCategories";
import { Metadata, ResolvingMetadata } from "next";
import { PopularPlaces } from "@/components/PopularPlaces";
import { CategorySectionTemp } from "@/components/CategorySectionTemp";

const MobileNav = dynamic(() => import("../components/MobileNav"), {
  ssr: false,
});



const Footer = dynamic(() => import("../components/Footer"), { ssr: false });

const CallBack = dynamic(() => import("../components/CallBack"), {
  ssr: false,
});

const EmiDetails = dynamic(() => import("../components/EmiDetails"));

const BidCard = dynamic(() => import("../components/BidCard"));
const Review = dynamic(() => import("../components/Review"), { ssr: false });

const TravelSubscription = dynamic(
  () => import("../components/TravelSubscription"),
  { ssr: false }
);

async function getData() {
	const res = await fetch(`https://api.trouvailler.com/api/category/65999e37781eacb0f9723bcc`, {cache: 'no-store'});
  const popularPlacesRes = await fetch('https://api.trouvailler.com/api/popularplaces', {cache : 'no-store'})
  const sectionsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/packages`)
  const packages = await res.json()
  const popularPlaces = await popularPlacesRes.json()
  const sections = await sectionsRes.json()
	return {packages, popularPlaces, sections};
}


export async function generateMetadata(
  { params, searchParams }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `Trouvailler | Personalised Tour Packages`,
    description:
      "Experience the world like never before with our expertly crafted travel guides, tips, and itineraries. From travel itineraries and local insights to expert advice on accommodations and activities, we help you navigate the world with ease. Whether you’re seeking thrilling adventures, relaxing retreats, or cultural experiences, Trouvailler is your go-to resource for unforgettable travel experiences. Start your journey today!",
    keywords:
      "travel, adventure travel, travel guides, vacation ideas,  cultural experiences, family travel, solo travel, budget travel, travel itineraries, travel planning,  travel tips, best places to visit, travel photography, local cuisine, summer travel, winter getaways, personalized travel experiences",
    robots: "index , follow",
    openGraph: {
      title: `Trouvailler: Your Gateway to Unforgettable Journeys`,
      description:
        "Experience the world like never before with our expertly crafted travel guides, tips, and itineraries. From travel itineraries and local insights to expert advice on accommodations and activities, we help you navigate the world with ease. Whether you’re seeking thrilling adventures, relaxing retreats, or cultural experiences, Trouvailler is your go-to resource for unforgettable travel experiences. Start your journey today!",
      type: "website",
      url: `https://trouvailler.com`,
      images: [
        {
          url: "https://res.cloudinary.com/difxlqrlc/image/upload/v1692592343/site/Group_6_tlw08h.png",
          alt: "Trouvailler | Personalised Trips, Perfectly Packages",
          width: 1280,
          height: 720,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Trouvailler: Your Gateway to Unforgettable Journeys`,

      description:
        "Experience the world like never before with our expertly crafted travel guides, tips, and itineraries. From travel itineraries and local insights to expert advice on accommodations and activities, we help you navigate the world with ease. Whether you’re seeking thrilling adventures, relaxing retreats, or cultural experiences, Trouvailler is your go-to resource for unforgettable travel experiences. Start your journey today!",

      images: [
        {
          url: "https://res.cloudinary.com/difxlqrlc/image/upload/v1692592343/site/Group_6_tlw08h.png",
          alt: "Trouvailler | Personalised Trips, Perfectly Packages",
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
        {/* <BidModal /> */}
        <Needhelp />
        <PopUpCounter />
        <SearchModal mode="" />

        <div className="relative  h-[270px] md:h-[270px]  lg:h-[400px] xl:h-[470px] ">
          <div
            id="fixedDiv"
            className={`overflow-hidden absolute h-[270px] md:h-[300px]  lg:h-[400px]  xl:h-[470px] top-0  right-0 left-0`}
          >
            <Image
              src="/images/bg.jpg"
              alt=""
              fill
              priority
              className=" object-cover fadein rounded-br-[40px] lg:rounded-br-[100px]"
            ></Image>
            <div className="image-cover z-100"></div>
            <div className="absolute w-full h-full z-[100] top-0 left-0 bg-[#00000073]"></div>
          </div>
          <div className="relative z-[102] bg-[transparent] h-[270px] md:h-[300px] lg:h-[400px] xl:h-[470px] w-full top-0 overflow-hidden">
            <div className="relative z-[102] bg-[transparent] h-[270px] md:h-[300px]  lg:h-[400px] xl:h-[470px] rounded-br-[40px] lg:rounded-br-[100px] shadow-white w-full top-0">
              <div className="relative z-[103]">
                <Navbar mode="home" />
                <div className="px-4 xs:px-8 md:px-20  lg:px-28 xl:px-40 pt-8 md:pt-12 lg:pt-24  pb-2">
                  <h1 className="text-white text-2xl font-bold md:font-semibold fadein">
                    <span className="text-sm lg:text-2xl">
                      Personalised Trips{" "}
                    </span>
                    <br />{" "}
                    <span className="text-2xl lg:text-4xl">
                      Perfectly Packaged
                    </span>
                  </h1>
                  <p className="hidden lg:block text-[#f2f2f2] mt-2 mr-[26rem]">
                    Experience the adventure of a lifetime with our hand-picked
                    travel packages. Book now and create memories that will last
                    a lifetime!
                  </p>
                  <MainPageHeader />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <Explore /> */}

        <div className=" bg-[white] relative z-[101] pb-4 xl:pb-6">
          <TrendingDestinations packages={data.packages}/>
        </div>

        {/* <div className="px-4 xs:px-8 lg:px-20 lg:px-40  bg-[white] relative z-[101]  pb-6 md:pb-8 xl:pb-12">
          <BidCard />
        </div> */}

        {/* {data.sections && data.sections?.length >0 &&<div className=" bg-[white] relative z-[101]">

        <CategorySectionTemp item={data.sections[0]}  />
</div>} */}
        <div>
        <div className=" bg-[white] relative z-[101]  lg:pb-2 xl:pb-4 ">
          <PopularPlaces mode="" places={data.popularPlaces} />
        </div>
      </div>
      <div className=" bg-[white] relative mx-4 lg:mx-[24rem] z-[101] pb-2 pt-4 lg:pb-6 xl:pb-4 ">
        <EmiDetails />
      </div>
     


      <div className=" bg-[white] relative z-[101]">
      {data.sections && data.sections?.length >1 && 
        data.sections.slice(1)?.map((item: any, index:any) => {
          if (item.packages.length > 0) {
            return <CategorySectionTemp item={item} key={index} />;
          }else return ;
        })}

        </div>




      


        <div className=" bg-[white] relative z-[101] pb-8 lg:pb-6 xl:pb-10 px-4 xs:px-8 lg:px-20 xl:px-40 ">
          <TravelCategories mode="" />
        </div>

        <div className="    bg-[#f5f5ff] relative z-[101] ">
          <Review />
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

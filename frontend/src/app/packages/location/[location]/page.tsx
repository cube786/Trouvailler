import BidModal from "@/components/BidModal";
import Footer from "@/components/Footer";
import { LocationCategorySlider } from "@/components/LocationCategorySlider";
import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import NavbarScrolled from "@/components/NavbarScrolled";
import Needhelp from "@/components/Needhelp";
import PopUpCounter from "@/utils/PopUpCounter";
import ScrollListener from "@/utils/ScrollListener";
import VisitCounter from "@/utils/VisitCounter";
import { generateSeoUrl, generatedeskSeoUrl } from "@/utils/generateUrl";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import React from "react";




export async function generateMetadata(
	{ params, searchParams }: any,
	parent: ResolvingMetadata
  ): Promise<Metadata> {
	const { location } = params;
  
	const commonKeywords = [
	  `${location} Packages`,
	  `${location} Deals`,
	  `${location} Destinations`,
	  `${location} Tours`,
	  `${location} Travel Packages`,
	  `${location} Resorts`,
	  `${location} Planning`,
	  `Best ${location} Packages`,
	  `Affordable ${location} Packages`,
	  `Luxury ${location} Packages`,
	];
	const locationsDetails = await fetch(
	  `https://api.trouvailler.com/api/packagelocations/location/${location}`,
	  { cache: "no-store" }
	).then((res) => res.json());
	
	const categories = locationsDetails.categories.map((item: any) => item.title);
	const locationKeywords = categories.map(
	  (category: any) => `${category} Packages in ${location}`
	);
	const allKeywords = [...commonKeywords, ...locationKeywords];

	console.log(allKeywords)
  
	return {
	  title: `${
		locationsDetails.location.charAt(0).toUpperCase() +
		locationsDetails.location.slice(1)
	  } Travel Packages`,
	  description: locationsDetails.description,
	  keywords: allKeywords.join(", "),
	  robots: "index , follow",
	  openGraph: {
		title: `${
		  locationsDetails.location.charAt(0).toUpperCase() +
		  locationsDetails.location.slice(1)
		} Travel Packages`,
		description: locationsDetails.location.description,
		type: "website",
		url: `https://trouvailler.com/packages/location/${locationsDetails.location}`,
		images: [
		  {
			url: `https://${locationsDetails.mobileImg.slice(7)}`,
			alt: locationsDetails.location,
		  },
		],
	  },
	  twitter: {
		card: "summary_large_image",
		title: `${
			locationsDetails.location.charAt(0).toUpperCase() +
			locationsDetails.location.slice(1)
		} Travel Packages`,
		description: locationsDetails.description,
  
		images: [
		  {
			url: generateSeoUrl(locationsDetails.mobileImg),
			width: 640,
			height: 260,
			alt: locationsDetails.location,
		  },
		],
	  },
	  alternates: {
		canonical: "https://trouvailler.com",
	  },
	};
  }

async function getData(id: string) {
	const res = await fetch(`https://api.trouvailler.com/api/packagelocations/location/${id}`, {cache: 'no-store'});
	console.log(id)
	
	return await res.json();
}




export default async function Page({ params }: { params: { location: string } }) {
	const data = await getData(params.location)
	console.log(data)
	return (
		<div className="">
			<VisitCounter />
			
      <MobileNav />
	  <BidModal />
	  <Needhelp />
	  <PopUpCounter />
			<NavbarScrolled mode="explorelocation" />
                  <ScrollListener />

				  
			<div className="relative  h-[170px] xs:h-[250px] ">
      <div id="fixedDiv" className={`overflow-hidden absolute h-[170px]  xs:h-[250px] top-0  w-full `}>
	  			<Image src={generateSeoUrl(data.mobileImg)} alt="" fill priority className=" xs:hidden object-cover fadein rounded-br-[40px] lg:rounded-br-[100px]"></Image>

					<Image src={generatedeskSeoUrl(data.desktopImg)} alt="" fill priority className=" object-cover fadein hidden xs:block rounded-br-[40px] lg:rounded-br-[100px]"></Image>
					<div className="image-cover z-100"></div>

					<div className="absolute w-full h-full z-[100] top-0 left-0 bg-[#00000073]"></div>
				</div>
				<div className="relative z-[102] bg-[transparent] h-[170px] xs:h-[250px] w-full top-0 overflow-hidden">
					<div className="relative z-[102] bg-[transparent] h-[170px] xs:h-[250px] rounded-br-[40px] lg:rounded-br-[100px] shadow-white w-full top-0">
						<div className="relative z-[103] flex flex-col justify-between  h-full">
							<Navbar mode="explorelocation"/>
							<div className="px-4 xs:px-8 md:px-20 lg:px-20  pb-4 xs:pb-6">
								<h1 className="text-white text-lg capitalize xs:text-2xl font-extrabold md:font-bold fadein">
									{data.location} Travel Packages
								</h1>
								<p className="text-[#cbcbcb] capitalize text-[12px] xs:text-[16px] xs:mt-1">
                  {data.description}
                </p>
							</div>
						</div>
					</div>
				</div>
				

				
			</div>

		


            <div className=" px-4 xs:px-8 lg:px-20  pb-20     ">
				<div className="relative ">
                <LocationCategorySlider title={data.location} titleImg={data.desktopImg} location={params.location}/>

				</div>
            </div>

			<Footer />


            	
			

			</div>


           






         


	);
}

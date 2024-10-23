import { CategoryLocations } from "@/components/CategoryLocations";
import Navbar from "@/components/Navbar";
import NavbarScrolled from "@/components/NavbarScrolled";
import PopUpCounter from "@/utils/PopUpCounter";
import ScrollListener from "@/utils/ScrollListener";
import VisitCounter from "@/utils/VisitCounter";
import Image from "next/image";
import React from "react";
import dynamic from 'next/dynamic'

import type { Metadata, ResolvingMetadata } from "next";
import { generateSeoUrl, generatedeskSeoUrl } from "@/utils/generateUrl";


const MobileNav = dynamic(
	()=> import('../../../../components/MobileNav'),
	{ssr:false}
)

const Footer = dynamic(
	()=> import('../../../../components/Footer'),
	{ssr:false}
)

const BidCard = dynamic(
	()=> import('../../../../components/BidCard'),
	{ssr:false}
)

const BidModal = dynamic(
	()=> import('../../../../components/BidModal'),
	{ssr:false}
)

const CategoryContainerCommon = dynamic(
	()=> import('../../../../components/CategoryContainerCommon'),
	{ssr:false}
)


const LoginModal = dynamic(
	()=> import('../../../../components/LoginModal'),
	{ssr:false}
)

const Needhelp = dynamic(
	()=> import('../../../../components/Needhelp'),
	{ssr:false}
)

const PhoneButton = dynamic(
	()=> import('../../../../components/PhoneButton'),
	{ssr:false}
)

const Review = dynamic(
	()=> import('../../../../components/Review'),
	{ssr:false}
)



export async function generateMetadata(
  { params, searchParams }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { category } = params;

  const commonKeywords = [
    `${category} Packages`,
    `${category} Deals`,
    `${category} Destinations`,
    `${category} Tours`,
    `${category} Travel Packages`,
    `${category} Resorts`,
    `${category} Planning`,
    `Best ${category} Packages`,
    `Affordable ${category} Packages`,
    `Luxury ${category} Packages`,
  ];
  const categoryDetails = await fetch(
    `https://api.trouvailler.com/api/categoryItem/${category}`,
    { cache: "no-store" }
  ).then((res) => res.json());
  const locationsDetails = await fetch(
    `https://api.trouvailler.com/api/packagelocations/category/${category}`,
    { cache: "no-store" }
  ).then((res) => res.json());
  const locations = locationsDetails.map((item: any) => item.location);
  const locationKeywords = locations.map(
    (location: any) => `${category} Packages in ${location}`
  );
  const allKeywords = [...commonKeywords, ...locationKeywords];

  return {
    title: `${
      categoryDetails[0].title.charAt(0).toUpperCase() +
      categoryDetails[0].title.slice(1)
    } Travel Packages`,
    description: categoryDetails[0].description,
    keywords: allKeywords.join(", "),
    robots: "index , follow",
    openGraph: {
      title: `${
        categoryDetails[0].title.charAt(0).toUpperCase() +
        categoryDetails[0].title.slice(1)
      } Travel Packages`,
      description: categoryDetails[0].description,
      type: "website",
      url: `https://trouvailler.com/packages/category/${categoryDetails[0].title}`,
      images: [
        {
          url: `https://${categoryDetails[0].mobileImg.slice(7)}`,
          alt: categoryDetails[0].title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${
        categoryDetails[0].title.charAt(0).toUpperCase() +
        categoryDetails[0].title.slice(1)
      } Travel Packages`,
      description: categoryDetails[0].description,

      images: [
        {
          url: generateSeoUrl(categoryDetails[0].mobileImg),
          width: 640,
          height: 260,
          alt: categoryDetails[0].title,
        },
      ],
    },
    alternates: {
      canonical: "https://trouvailler.com",
    },
  };
}

async function getData(category: string) {
  console.log(category);
  const res = await fetch(
    `https://api.trouvailler.com/api/categoryItem/${category}`,
    { cache: "no-store" }
  );

  return await res.json();
}

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const data: any = await getData(params.category);
  console.log(data);
  return (
    <div className="">
      <VisitCounter />
      <LoginModal />

      <MobileNav />
      <BidModal />
      <PhoneButton />
      <Needhelp />
      <PopUpCounter />
      <NavbarScrolled mode="explorelocation" />
      <ScrollListener />

      <div className="relative  h-[200px] xs:h-[250px] ">
        <div
          id="fixedDiv"
          className={`overflow-hidden absolute h-[200px]  xs:h-[250px] top-0  w-full `}
        >
          <Image
            src={generatedeskSeoUrl(data[0].desktopImg)}
            alt=""
            fill
            priority
            className=" object-cover hidden md:block fadein rounded-br-[40px] lg:rounded-br-[100px]"
          ></Image>
          <Image
            src={generateSeoUrl(data[0].mobileImg)}
            alt=""
            fill
            priority
            className=" object-cover md:hidden  fadein rounded-br-[40px] lg:rounded-br-[100px]"
          ></Image>

          <div className="image-cover z-100"></div>
          <div className="absolute w-full h-full z-[100] top-0 left-0 bg-[#00000073]"></div>
        </div>
        <div className="relative z-[102] bg-[transparent] h-[200px] xs:h-[250px] w-full top-0 overflow-hidden">
          <div className="relative z-[102] bg-[transparent] h-[200px] xs:h-[250px] rounded-br-[40px] lg:rounded-br-[100px] shadow-white w-full top-0">
            <div className="relative z-[103] flex h-full flex-col justify-between">
              <Navbar mode="category" />
              <div className="px-4 xs:px-8 md:px-20 lg:px-28 xl:px-40    pb-4 xs:pb-8">
                <h1 className="text-white capitalize text-lg xs:text-2xl font-bold md:font-bold fadein">
                  {data[0].title} Packages
                </h1>
                <p className="text-[#cbcbcb] capitalize text-[12px] xs:text-[16px] xs:mt-3">
                  {data[0].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" xs:px-8 lg:px-20 xl:px-40     ">
        <CategoryLocations place={params.category} />
      </div>

      <div className="mb-8">
        <CategoryContainerCommon categoryItem={params.category} />
      </div>
      <div className=" xs:mx-40 mb-8">
        <BidCard />
      </div>
      <div className="px-4 xs:px-8 lg:px-20 xl:px-40    bg-[#f5f5ff] relative z-[101] ">
        <Review />
      </div>
      <Footer />
    </div>
  );
}

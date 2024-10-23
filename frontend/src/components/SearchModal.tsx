"use client";

import React, { useContext, useEffect, useState } from "react";

import { myContext, MyContext } from "@/context/Context";
import { IoClose } from "react-icons/io5";

import { TravelCategories } from "./TravelCategories";
import {PopularPlaces} from "./PopularPlaces";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useDebounce from "@/utils/useDebounce";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";
import Image from "next/image";
import { generateSeoUrl } from "@/utils/generateUrl";



export const SearchModal: React.FC<{mode:string}> = ({ mode }) => {

	
	const [locations, setLocations] = useState([])

	const { searchOpen, setSearchOpen } = useContext(MyContext) as myContext;

	const router = useRouter();
	const [search, setSearch] = useState(null)
	const debouncedSearch = useDebounce(search, 500)
	const [places, setPlaces] = useState(null)
	useEffect(()=>{
		const getPlaces = async () => {
			const res = await axiosInstance.get('/popularplaces')
			setPlaces(res.data)
		}

		getPlaces()
	}, [])
	
    useEffect(() => {
        async function fetchData() {
            
            const data = await axiosInstance.get(`/packagelocations?location=${debouncedSearch}`)
                .then(res => {setLocations(res.data)
                   })
                .catch(err=> {console.log(err)
                    })

            
        }
        if (debouncedSearch) fetchData()

    },[debouncedSearch])
	const handleSetSearch = (e:any) => {
        if (e.target.value === '') {
            setLocations([])
          } 
        setSearch(e.target.value);
      };



	const handleClose = () => {
		setSearchOpen(false);
	};


	return (
		<div className={` ${(searchOpen || mode==="searchpage") ? "flex" : " hidden "}   z-[1000001] w-full h-full ${mode!=="searchpage" && "fixed top-0 left-0 right-0 "}  transition-all duration-300 bottom-0 bg-[#00000096]  justify-center items-center`}>
			<div className={`bg-[white] flex  h-[70%] ${mode!=="searchpage" && "rounded-[10px] w-[90%] xs:w-[70%]" } items-start overflow-hidden ${searchOpen && "fadein"}`}>
				
				<div className="w-full h-full  flex flex-col items-stretch pt-4 xs:pt-8 justify-center relative">
					<div className={`flex items-start justify-between  px-4 gap-6 xs:gap-12 xs:px-12 ${mode=== "searchpage" && "!flex-row-reverse gap-4"}`}>
						<div className="grow">
                            <input type="text" placeholder="Search Destinations"       onChange={handleSetSearch}  className=" text-sm outline-none border border-[#FF6100] border-[1px] px-4 rounded-[5px] w-full py-2"/>
							<div>
								{locations?.map((itm:any, ind)=>(
									<Link key={ind} href={`/packages/location/${itm.location}`} className="">

									<div  className="  w-[120%] mt-[5px] rounded overflow-hidden xs:w-full text-[black] mb-[2px] flex text-sm font-medium border cursor-pointer">
											<div className="h-[50px] xs:h-[70px] aspect-video relative skeleton">
												<Image src={generateSeoUrl(itm.mobileImg)} fill className="object-cover" alt="" />
											</div>
										<div className="grow px-4 py-1 flex flex-col justify-center">
										<div className="flex justify-between items-center">
										<span className="capitalize text-sm xs:text-base">{itm.location}</span>
										<FaArrowLeft color="#ff6100" className="text-[12px] rotate-180 xs:text-[16px]" />

										</div>
										<p className="text-xs text-[#6a6a6a] text-ellipsis h-[12px] xs:h-[24px] whitespace-prewrap mt-2 w-full xs:w-[90%]">{itm.description} </p>
										</div>
									</div>
									</Link>
								))}
							</div>
                        </div>
                        { mode === "searchpage" && <button onClick={() => router.push("/")} className=" min-h-0 xs:min-h-auto h-8 xs:h-[44px] btn rounded-full aspect-square  p-0 ">
							<FaArrowLeft color="#ff6100" className="text-[16px] xs:text-[26px]" />
						</button>}

						{mode !== "searchpage" && <button onClick={() => handleClose()} className=" min-h-0 xs:min-h-auto h-8 xs:h-[44px] btn rounded-full aspect-square  p-0 ">
							<IoClose color="#ff6100" className="text-[16px] xs:text-[26px]" />
						</button>}
					</div>
                    <div className="overflow-auto h-full">
                    <div className={`${mode !== "searchpage" ? "px-4 xs:px-12" : "px-4 mt-6"}`}>
                    <TravelCategories mode="searchmode"/>

                    </div>
                   {places !== null &&  <div className={`${mode !== "searchpage" ? "px-4 xs:px-12" : "px-4"} `}>
                        <PopularPlaces  mode="searchmode" places={places}/>

                    </div>}

                    </div>
                    


					
					
				</div>
			</div>
		</div>
	);
}


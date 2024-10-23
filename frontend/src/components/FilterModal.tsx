"use client";

import { myContext, MyContext } from "@/context/Context";
import MultiRangeSlider from "@/utils/MultiRangeSlider";
import Image from "next/image";
import React, {  useContext, useEffect, useState } from "react";


export const FilterModal:React.FC<{count:any,categoryCount:any, setMin:any, setMax:any, setCategory:any, setShowBudgetFilter:any, reFetch:any,location:any, setOpenFilterMobile: any, openFilterMobile: any}> = ({count,categoryCount , setMin, setMax, setCategory,  setShowBudgetFilter, reFetch, location, setOpenFilterMobile, openFilterMobile}) => {


    const urlObj = new URL(`/api/package?location=${location}`, process.env.NEXT_PUBLIC_API_URL);

        const [showBudget, setShowBudget] =useState(false)
 
    const handleFilterChange = (e:any) => {
        if(e.target.value === null) {
            urlObj.searchParams.delete('category')
        }
        urlObj.searchParams.set('category', e.target.value)
        console.log(urlObj)
    }
    const budgetOnchange = (min:number, max:number) =>{
        console.log(min, max)
        if(max-min < 1000){
            setShowBudget(true)
            console.log(showBudget)

        }
        
        urlObj.searchParams.set('minprice', String(min))
        urlObj.searchParams.set('maxprice', String(max))
       
    }
	

    const handleApplyFilters = async(e:any) => {
        setCategory(urlObj.searchParams.get('category'))
        setMin(urlObj.searchParams.get('minprice'))
        setMax(urlObj.searchParams.get('maxprice'))
        if(showBudget){
            setShowBudgetFilter(true)

        }
        e.preventDefault()
        reFetch(urlObj.href.slice(31))
        setOpenFilterMobile(false)

        

    }


   

	
	return (
		<div className={` ${openFilterMobile ? "flex" : " hidden "}   z-[1000001] w-full h-full fixed top-0 left-0 right-0   transition-all duration-300 bottom-0 bg-[#00000096]  justify-center items-center`}>
			<div className={` bg-[white] flex flex-col w-[80%] relative xs:w-[70%]  rounded-[10px] overflow-hidden ${openFilterMobile && "fadein"}`}>
				
            <div className='grow border rounded px-4 py-2 overflow-y-auto  max-h-[50vh]'>
                 
                 <h2 className='font-medium pb-2 font-medium'>Filters</h2>
                 <hr />
        
        
        
        <div className=' text-sm w-[230px] pt-4  '>
           <div className='flex items-center justify-between'>
           <span className='font-semibold text-sm'>Categories</span>

           </div>

            <div className='flex flex-col  py-2 items-stretch'>
            <div  className={` flex justify-between items-center rounded  py-1 cursor-pointer `}>
                        <div className='flex items-center gap-2'>
                            
                            <input type="radio" name="category" onChange={(e)=>{handleFilterChange(e)}} id="" value=""  />
                            <span className={`text-[13px] font-regular `}>All Packages</span>
                        </div>
                        <span>({count})</span>
                        </div>
                {categoryCount?.map((itm:any, index:any)=>(
                    <div key={index} className={` flex justify-between items-center rounded  py-1 cursor-pointer `}>
                        <div className='flex items-center gap-2'>
                            <input type="radio" name="category" id="" value={itm?.category} onChange={(e)=>{handleFilterChange(e)}} />
                            <span className={`capitalize text-[13px] font-regular `}>{itm?.category}</span>
                        </div>
                        <span>({itm?.count})</span>
                        </div>
                ))}
            </div>
         
        </div>
<hr />


        <div className='  text-sm   flex flex-col items-start rounded-[10px]  py-2 w-[230px]'>
           <div className='flex items-center justify-between w-full'>
           <span className='font-semibold text-sm'>Budget (Per Person)</span>

           </div>
           <div className="relative w-full min-h-[70px] mt-8">
           <MultiRangeSlider
      min={0}
      max={1000}
      onChange={({ min, max }: { min: number; max: number }) =>{
        budgetOnchange(min, max)
      }
      }
    />

           </div>
         


            
        </div>


       
        </div>

        <div className="px-4 py-2 flex gap-4">
        <button className='text-[white]  bg-[#ff6100] px-3 py-1 text-sm glass rounded-[5px]' onClick={(e)=>{handleApplyFilters(e)}}>Apply</button>
        <button className='text-[white]  bg-[#ff6100] px-3 py-1 text-sm glass rounded-[5px]' onClick={() => {setOpenFilterMobile(false)}}>Cancel</button>

        </div>
				
				
			</div>
		</div>
	);
}


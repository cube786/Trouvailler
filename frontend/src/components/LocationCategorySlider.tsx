"use client"
import axiosInstance from '@/utils/axiosInstance'
import useFetch from '@/utils/useFetch'

import MultiRangeSlider from '@/utils/MultiRangeSlider'
import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { PackageCard } from './PackageCard'
import { IoIosArrowDown } from "react-icons/io";
import BidCard from './BidCard'
import { myContext, MyContext } from '@/context/Context'
import { FilterModal } from './FilterModal'




export const LocationCategorySlider:React.FC<{location:any, titleImg:any, title:any}> = ({location , titleImg, title}) => {
    const [openFilterMobile, setOpenFilterMobile] = useState(false);

    const [packages, setPackages] = useState<any>()

   

    const [openLocationBanner, setOpenLocationBanner] = useState(false)
    const [category, setCategory] = useState<any>(null)
    const [min, setMin] = useState<any>(null)

    const [max, setMax] = useState<any>(null)

    const {data, loading, error, reFetch} = useFetch(`/package?location=${location}`)
console.log(data)







    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY >= 190) {
            setOpenLocationBanner(true);
          } else {
            setOpenLocationBanner(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [setOpenLocationBanner]);

      const {data:categoryCount, loading:categoryCountLoading, error:categoryCountError} = useFetch(`/package/category/count?location=${location}`)
      console.log(data)
      useEffect(()=>{
        setPackages(data)
      },[data])


      const urlObj = new URL(`/api/package?location=${location}`, process.env.NEXT_PUBLIC_API_URL);
      const handleFilterChange = (e:any) => {
        if(e.target.value === null) {
            urlObj.searchParams.delete('category')
        }
        urlObj.searchParams.set('category', e.target.value)
        console.log(urlObj)
    }
    const budgetOnchange = (min:number, max:number) =>{
        
           
        urlObj.searchParams.set('minprice', String(min))
        urlObj.searchParams.set('maxprice', String(max))
       
    }
  

        const [showBudgetFilter, setShowBudgetFilter] = useState(false)
      const applyCategory = (e:any) => {
        setCategory(urlObj.searchParams.get('category'))
     
        e.preventDefault()
        reFetch(urlObj.href.slice(31))
      }
      const applyBudget = (e:any) => {
        e.preventDefault()
        setMin(urlObj.searchParams.get('minprice'))
        setMax(urlObj.searchParams.get('maxprice'))

        setShowBudgetFilter(true)

        reFetch(urlObj.href.slice(35))
      }



      const clearFilter = () => {
        window.location.reload();
    }
console.log(showBudgetFilter)

    return(
        <>
        			<FilterModal count={packages?.totalCount} categoryCount={categoryCount} setMin={setMin} setMax={setMax} setCategory={setCategory} setShowBudgetFilter={setShowBudgetFilter} reFetch={reFetch} location={location} openFilterMobile={openFilterMobile} setOpenFilterMobile={setOpenFilterMobile}/>

        <div className='   flex flex-col xs:flex-row  xs:gap-[3%]  items-start'>
           

            <div className='w-[300px] hidden xs:flex min-w-[300px] max-h-[calc(100vh-120px)] overflow-hidden no-scrollbar rounded-[10px]  flex-col gap-4 pt-8    sticky top-[60px] '>


                 {/* <div className={`relative top-0  ${openLocationBanner ? " " : " "} w-[30px]  !h-[100px] bg-[red] transition-all duration-300  px-3`}> */}
                {/*
                 <Image src="/images/bg.jpg" alt="" fill priority className=" object-cover fadein rounded-[10px] "></Image>
                <div className='image-cover rounded-[10px]'></div>
                 */}
                {/* </div> */}

       <div className='flex flex-col overflow-hidden'>
       <div className={`bg-[red]  rounded-[10px] ${openLocationBanner ? "open-banner" : "closed-banner"} relative w-full transition-all flex items-end duration-300 `}>
        <div className='absolute top-0 left-0 right-0 bottom-0'>
        <Image src={`https://${titleImg.slice(7)}`} alt="" fill priority className=" object-cover fadein rounded-[10px] "></Image>
        <div className='image-cover rounded-[10px]'></div>

        </div>
        <h1 className='text-[white] tracking-[1px] font-bold relative px-2 z-[100] pb-2'>{title} Packages</h1>

        </div>

                
        <div className='grow border rounded  px-4 py-2 overflow-y-auto scrollbar scrollbar-thin scrollbar-track-rounded-r-full scrollbar-thumb-[#ff6100] scrollbar-track-[#ffede9f7]'>
                 
                 <h2 className='font-medium pb-2 font-medium'>Filters</h2>
                 <hr />
        
        
        
        <div className=' text-sm w-[230px] pt-4  '>
           <div className='flex items-center justify-between'>
           <span className='font-semibold text-sm'>Categories</span>
                        <button className='text-[white]  bg-[#ff6100] px-3 py-1 text-xs glass rounded-[5px]' onClick={(e)=>{applyCategory(e)}}>Apply</button>

           </div>

            <div className='flex flex-col  py-4 items-stretch'>
            <div  className={` flex justify-between items-center rounded  py-1 cursor-pointer `}>
                        <div className='flex items-center gap-2'>
                            
                            <input type="radio" name="category-select" onChange={(e)=>{handleFilterChange(e)}} id="" value=""  />
                            <span className={`text-[13px] font-regular `}>All Packages</span>
                        </div>
                        <span>({packages?.totalCount})</span>
                        </div>
                {categoryCount?.map((itm:any, index:any)=>(
                    <div key={index} className={` flex justify-between items-center rounded  py-1 cursor-pointer `}>
                        <div className='flex items-center gap-2'>
                            
                            <input type="radio" name="category-select" onChange={(e)=>{handleFilterChange(e)}} id="" value={itm?.category}  />
                            <span className={`text-[13px] font-regular capitalize `}>{itm?.category}</span>
                        </div>
                        <span>({itm?.count})</span>
                        </div>
                ))}
            </div>
         
        </div>
<hr />


        <div className='  text-sm   flex flex-col items-start rounded-[10px] pb-20 py-4 w-[230px]'>
           <div className='flex items-center justify-between w-full '>
           <span className='font-semibold text-sm'>Budget (Per Person)</span>
            <button className='text-[white]  bg-[#ff6100] text-xs px-3 py-1 glass rounded-[5px]' onClick={(e)=> {applyBudget(e)}}>Apply</button>

           </div>
           <div className='mt-8 relative  w-full'>
           <MultiRangeSlider
      min={0}
      max={1000}
      onChange={({ min, max }: { min: number; max: number }) =>
      budgetOnchange(min, max)
      }
    />

           </div>
           

            
        </div>
        </div>

       </div>

        
        </div>

        

    

      

        <div className='w-full xs:grow '>


<div className='flex items-center justify-between pb-2 pt-4 xs:pt-8 '>

      <div className='flex items-end gap-4 text-sm xs:text-base font-medium  '>
      <span>{packages?.totalCount} Result found</span>
      <span className='text-[#ff6100] text-[11px] xs:text-[12px] cursor-pointer mb-[-1px] xs:mb-0 ' onClick={clearFilter}>Clear filter</span>


      </div>
      <div className='flex items-center gap-3'>
            <span className=' xs:hidden font-medium text-xs border border-[#ff6100] py-[2px] px-2 rounded' onClick={()=>{setOpenFilterMobile(true)}}>Filters</span>
        
      </div>
</div>

{(category  ||   showBudgetFilter ) ?  <div className='flex my-3 items-center '>
    <span className='text-sm font-medium whitespace-nowrap pr-2'>Filter Applied :</span>
    <div className='flex gap-3 flex-nowrap overflow-x-auto no-scrollbar'>
       { category && <span className='border grow border-orange-500 px-2 py-1 text-xs rounded whitespace-nowrap'>{category}</span>}
       { showBudgetFilter ? <span className='border grow border-orange-500 px-2 py-1 text-xs rounded whitespace-nowrap'>Price: INR {min} - INR {max} </span>: ""}
    </div>
</div> : null}
        
        
<div className='w-full mt-8  flex-wrap gap-[5%] hidden xs:flex'>
    <>

{
    packages?.packages?.slice(0,3)?.map((itm : any, ind: any) => (
        <>
        <div className='hidden xs:block w-[30%]' key={ind} >
            <PackageCard mode="" item={itm}/>
        </div>
       
        </>
    ))
}

{
        packages?.packages?.length >= 3 && 
        <div className='mt-8 mb-12 hidden xs:block'>
            <BidCard />
        </div>
       }


{
    packages?.packages?.slice(3)?.map((itm : any, ind: any) => (
        <>
        <div className='hidden xs:block w-[30%]' key={ind} >
            <PackageCard mode="" item={itm}/>
        </div>
       
        </>
    ))
}



</>

</div>


<div className='xs:hidden mt-8'>

    {packages?.totalCount === 0 && 
    <div >
        <p className='text-xs py-12'>Sorry! We dont have Packagee right now. Please alter filters to show more results.</p>
    </div>
    }


   { packages?.packages?.slice(0,1)?.map((itm : any, ind: any) => (
        <>
        <div className=' xs:hidden w-full ' key={ind} >
            <PackageCard mode="single" item={itm}/>
        </div>
       
        </>
    ))}

{
        packages?.packages?.length >= 1 && 
        <div className='mt-8 mb-12 '>
            <BidCard />
        </div>
       }

{ packages?.packages?.slice(1)?.map((itm : any, ind: any) => (
        <>
        <div className=' xs:hidden w-full' key={ind} >
            <PackageCard mode="single" item={itm}/>
        </div>
       
        </>
    ))}

</div>
        


      




       
        </div>


        
     


    </div></>
    )
  
}


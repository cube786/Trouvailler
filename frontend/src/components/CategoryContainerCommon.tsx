'use client'
import axiosInstance from "@/utils/axiosInstance"
import { useEffect, useState } from "react"
import { CategorySectionTemp } from "./CategorySectionTemp"
import EmiDetails from "./EmiDetails"
import {PopularPlaces} from "./PopularPlaces"


const CategoryContainerCommon: React.FC<{categoryItem:string}> = (categoryItem) => {
    const [category, setCategory] = useState([])

    useEffect(()=>{
        async function getCategories() {
            await axiosInstance.get(`/category/categoryitem/${categoryItem.categoryItem}`)
                .then(res => {
                    setCategory(res.data)
                    console.log(category)
                })
                .catch(err => console.log(err))
            }

            getCategories()



    },[])



    return(
        <div className=" bg-[white] relative z-[101]">
            {category && category?.map((item:any,index)=>{
                    if(item.packages.length > 0){
                        return(
                            <CategorySectionTemp item={item}  key={index}/>

                        )
                    }

})}

            




        </div>
    )
}

export default CategoryContainerCommon
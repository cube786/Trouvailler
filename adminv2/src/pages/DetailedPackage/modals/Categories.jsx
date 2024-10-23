import { useContext, useEffect, useRef, useState } from "react";
import CropEasy from "../../../utils/crop/CropEasy";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../../../utils/axiosInstance";
import useDebounce from "../../../utils/useDebounce";
import { CreatePackageLocation } from "./CreatePackageLocation";
import { IoCloseSharp } from "react-icons/io5";
import { Scrollbar } from "react-scrollbars-custom";
import { useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import useFetch from "../../../utils/useFetch";

export const Categories = ({openCategories, setOpenCategories, pack, reFetch})=> {
  const location = useLocation();

	const [selectedCategories, setSelectedCategories] = useState(pack.categories)
  const [updateCateLoading, setUpdateCateLoading] = useState(false)
  const {data: categories, loading:categoriesLoading, error :categoriesError, reFetch:refetchCategories} = useFetch('/categoryItem')

  useEffect(()=>{
		setSelectedCategories(pack.categories)
	},[pack])

  const handleDelete = (id) => {
    setSelectedCategories(selectedCategories.filter(itm => itm !== id))
    console.log(selectedCategories)
    }


   

    const handleClose = () => {
        setOpenCategories(false);
        document.getElementById("location-tags-form").reset();



      };


      const handleAddtoSelectedCategories = (e) => {
        e.preventDefault()
        const itm = document.querySelector('#category-select-input').value;
        if(selectedCategories.includes(itm)){
          alert('Already existing')
          return;
        }
        setSelectedCategories( ([...selectedCategories, itm] ))
        }
     

   
     
      
      
      const handleSubmit = async (e) => {
        e.preventDefault()
        setUpdateCateLoading(true)
        try {
           
           const res = await axiosInstance.patch(`/package/${pack._id}`, {categories:selectedCategories})
           console.log(res)
            
              setUpdateCateLoading(false)
              setOpenCategories(false)
              document.getElementById("location-tags-form").reset();

              reFetch(`/package/${location.pathname.split("/")[2]}`)

            
            
        } catch (error) {
            alert(error)
            setUpdateCateLoading(false)
        }
      }


      
     
      
    
       
    return(
        <>

        <div className="fixed fadein top-0 left-0 right-0 bottom-0 bg-[#0000005e] z-[100000000] flex justify-center items-center">
      
       
        <div className="relative w-[90%] md:w-[40%] bg-[white] max-h-[500px]  overflow-hidden px-0 py-0 rounded-[5px]">
          <div className="flex items-center justify-between pl-4 pr-2 py-2 ">
                <h1 className="roboto-medium ">Categories</h1>
                <button className="btn btn-sm btn-circle btn-ghost " onClick={() => handleClose()}>
                    ✕
                </button>
            </div>
            <hr />

             <Scrollbar style={{ height:'400px',width:'99.8%', marginTop:"5px", marginBottom:"5px"}}>

         <div>

<div>
    <div className="px-4 py-4 flex flex-wrap   gap-2">
    {selectedCategories &&  <div>
                          <h3>Tagged Categories</h3>
                          <div className="flex items-center flex-wrap gap-4 py-6">
                            {selectedCategories?.map((itm, index)=>(
                              <span className="px-4 py-1 bg-[#dcdcdc] capitalize text-sm rounded-full flex items-center gap-8">
                                {itm} <IoMdClose onClick={()=>{handleDelete(itm)}} size={24} className="cursor-pointer hover:bg-[white] rounded-full p-[5px]"/>
                              </span>
                            ))}
                          </div>
                        </div>}
						
    </div>
    {
							selectedCategories?.length === 0 &&
							<div className="text-xs flex justify-center">
								<span>No categories tagged</span>
							</div>
						}
   

    
</div>
</div>

<div className="px-4 py-8 grow flex flex-col">
<form action="" id="location-tags-form" className="flex grow flex-col h-full justify-between">
<label className="form-control w-full max-w-xs items-start">
  <div className="label">
    <span className="label-text">Select Categories</span>
  </div>
  <select id="category-select-input" className="select select-bordered w-full max-w-xs">
  <option disabled selected>Add from the list</option>
  {categories && categories?.map((itm, index)=>(
    <option key={index} value={itm.title} className="capitalize">{itm.title}</option>
  ))}
</select> 
<button className="text-[white] btn-grad glass px-2 py-1 text-xs mt-3 rounded " onClick={(e) => {handleAddtoSelectedCategories(e)}}>Add</button> 
</label> 

    <div>
    
    <button
      className="btn-grad w-full mt-16 flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]" onClick={handleSubmit}
    >
      Update Categories
      {updateCateLoading && <ClipLoader color="white" size={24} />}
    </button>
    
    </div>
</form>
</div>
         </Scrollbar>
      



      
        </div>
    </div></>
    )
}
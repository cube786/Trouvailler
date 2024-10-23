import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { MyContext } from "../../context/myContext";
import axiosInstance from "../../utils/axiosInstance";
import useFetch from "../../utils/useFetch";
import UpdateLocation from "./UpdateLocation";

function Location() {
   
  const { expand } = useContext(MyContext);
  const {data, loading, error, reFetch} = useFetch('/packagelocations/all')
  const {data: categories, loading:categoriesLoading, error:categoriesError, reFetch:refetchCategories} = useFetch('/categoryItem')

  console.log(data)
  const [openUpdateLocation, setOpenUpdateLocation] = useState(false)
  const [updateIndex, setUpdateIndex] = useState(null)

 const deleteCategory = async (id) => {
    const confirmDelete  =  window.confirm('Do you want to delete this Location? These Location will be removed from all the pakages tagged.')
    if(confirmDelete){
      try {

        await axiosInstance.delete(`/packagelocations/${id}`)
        reFetch('/packagelocations/all')
      } catch (error) {
        console.log(error)
      }
    }
 }
 const updateLocation = (ind) => {
  setUpdateIndex(ind);
  setOpenUpdateLocation(true)
 }



 const breadcrumb = [ 
  {
    name: "Home",
    path: "/"
  },
  {
    name: "Travel Packages",
    path: "/packages"
  },
  {
    name: "Locations",
    path: null
  }
]

 







  return (
    <>{
      openUpdateLocation &&  updateIndex !== null && 
      <UpdateLocation pack={data[updateIndex]} reFetch={reFetch} openUpdateLocation={openUpdateLocation} setOpenUpdateLocation={setOpenUpdateLocation}/>
    }
     
   
    <div className="w-[100vw]  h-[100vh] flex w-full">
        
      <Sidebar />
      <div
        className={` h-full w-full trasition-all  duration-300   ${
          expand ? "ml-[280px]" : "md:ml-[70px] "
        }`}
      >
        <Navbar pageTitle="Travel Packages" breadcrumb={breadcrumb}/>
        <div className="py-4 md:py-12 px-4 md:px-24  w-full bg-base-200 sticky top-[61px] overflow-auto  available-height">
        
          <div className="w-full">
           <div className="flex items-center justify-between pb-4">
           <h3 className="mb-2 roboto-medium text-xl">
              Added Locations
            </h3>                    
          <Link to="/packages/locations/new">
          <button className="px-4 py-2 btn-grad font-medium text-sm rounded-[10px] text-[white] glass"   >Add a new Location</button> 

          </Link>
           </div>
            <hr className="mb-6" />
          { !loading && !error && <div className="flex flex-col gap-4">
            

            {
              data?.map((itm, ind)=>(
                <div key={ind} className="collapse collapse-arrow bg-[white] shadow-lg">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-lg font-bold">
                <div className="flex justify-between">
                <h2>   {itm.location}
            </h2>
            <div className="flex items-center gap-4  z-[1000] relative   text-xs">
              <button className="btn-grad px-4 py-1 rounded-[5px] text-[white] glass roboto-regular" onClick={()=>{deleteCategory(itm._id)}}>Delete</button>
              <Link>
              <button className="btn-grad px-4 py-1 rounded-[5px] text-[white] glass roboto-regular" onClick={()=>{updateLocation(ind)}}>Update</button></Link>
            </div>
                </div>
            <p className="text-sm font-medium mt-4">{itm.description}  </p>  </div>
              <div className="collapse-content">
                <div className="flex gap-4 my-4">
                  {itm.categories?.map((itm, ind)=>(
                    <span className="bg-[#dcdcdc] text-sm px-4 py-2 rounded-full">{categories.find(obj => obj._id === itm)?.title}</span>
                  ))}
                </div>
                <div className="flex">
                  <div className="w-[50%]">
                    <h3>Desktop Banner Image</h3>
                    <img src={itm.desktopImg} alt="" className="w-[80%]" />
                  </div>
                  <div className="w-[50%]">
                  <h3>Mobile Banner Image</h3>
                    <img src={itm.mobileImg} alt="" className="w-[80%]" />
                  </div>
                </div>
              </div>
            </div>
              ))
            }
            </div>}
            {
              loading && 
              <div className="flex justify-center py-20">
                <ClipLoader />
              </div>
            }{!loading && 
              data?.length === 0 && 
              <div>
                <div className="flex flex-col items-center gap-4 py-4">
              <img src="/images/notFound.gif" alt="" className="w-20"/>
              <h1 className="text-[grey]">No Exclusions added</h1>
          </div>
              </div>
            }
          </div>

        
        </div>
      </div>
    </div></>
  );
}

export default Location;

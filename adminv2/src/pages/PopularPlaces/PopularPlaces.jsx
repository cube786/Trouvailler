import React, { useContext, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { MyContext } from "../../context/myContext";
import axiosInstance from "../../utils/axiosInstance";
import useFetch from "../../utils/useFetch";

function PopularPlaces() {
  const { expand } = useContext(MyContext);
  const [info, setInfo] = useState(null)
  const [popularPlaces, setPopularPlaces] = useState([])
  const {data, loading, error, reFetch} = useFetch('/popularplaces');
  const [addPlaceLoading, setAddPlaceLoading] = useState(false)
  useEffect(()=>{
    setPopularPlaces(data)
     
  },[data])
  const {data:locations, loading:locationLoading} = useFetch('/packagelocations')
  const addPopularPlace =  async () => {
    const isLocationExists = popularPlaces.some(place => place.place.location === info.location);
    if(isLocationExists){
      alert("This place is already in the list!")
    }
    else{
      const confirm = window.confirm("Are you sure you want to add this place to the List?")

      if(confirm){
        setAddPlaceLoading(true)
        try {
  
         
          await axiosInstance.post('/popularplaces', {place:info._id});
  setAddPlaceLoading(false)   
       reFetch('/popularplaces');
      
          
        } catch (error) {
          alert(error.message)
          setAddPlaceLoading(false)   
  
        }
      }
    }
    

  }
  const handleLocationChange = (e) => {
    const selectedLocationObj = locations.find(item => item.location === e.target.value);
    setInfo(selectedLocationObj)
    console.log(info)

  }
  const deletePlace = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this place from the List?")
    if(confirm){
        try {
          await axiosInstance.delete(`/popularplaces/${id}`)
          reFetch('/popularplaces');

          
        } catch (error) {
          alert("Something happened. Try again later.")
        }
    }
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
      name: "Popular Places List",
      path: null
    }
  ]

  return (
    <>
   
    <div className="w-[100vw]  h-[100vh] flex w-full">
      <Sidebar />
      <div
        className={` h-full w-full trasition-all  duration-300   ${
          expand ? "ml-[280px]" : "md:ml-[70px] "
        }`}
      >
        <Navbar pageTitle="Popular Places" breadcrumb={breadcrumb}/>
        <div className="py-4 md:py-12 px-4 md:px-24  w-full bg-[#f5f5f55e] sticky top-[61px] overflow-auto  available-height">
          <div className="w-full">
            <h3 className="mb-2 roboto-medium text-base">
              Add new place to the list
            </h3>
            <hr className="mb-6" />
            <div className="   flex flex-col items-start gap-8">
              <select name="popularplace" id="popularplace" className="bg-[white] border border-[2px] px-4 text-sm py-4 rounded-[10px] outline-none w-full" onChange={handleLocationChange}>
              <option value="" disabled selected className="">Select</option>

                {!locationLoading && locations && locations?.map((item, index)=>(
                  <option value={item.location} key={index}>{item.location}</option>
                ))}
              </select> 
              <button className="btn-grad text-xs px-4 py-2 rounded text-[white] flex items-center gap-2" onClick={addPopularPlace}>Add this place to the list {addPlaceLoading && <ClipLoader  color="white" size={20}/>}</button>
            </div>
         
          </div>



          <div className="w-full mt-8">
            <h3 className="mb-2 roboto-medium text-base">
              Current list
            </h3>
            <hr className="mb-6" />
           <div>
           {
            loading ?
              <div className="flex justify-center mt-40"><ClipLoader /></div>
           :
          (           <div className="flex gap-[2%] flex-wrap mt-8 ">
          {popularPlaces && popularPlaces?.map((item, index)=>(
              <div className="w-[49%] md:w-[15%] mb-8 rounded overflow-hidden  relative" key={index} >
                  <div className="aspect-video skeleton">
                    <div className="absolute top-0 left-0 right-0 bottom-0 img-gradient">

                    </div>
                  <img src={item.place.mobileImg} className="w-full"/>
                  </div>
                  <div onClick={()=>deletePlace(item._id)} className="absolute top-2 right-2 z-[1000000000000] btn glass text-white rounded-full p-0 min-h-0 h-8 w-8">
                  <IoCloseSharp  className=" w-8 cursor-pointer " alt="" />

                  </div>
                  <h1 className="absolute text-[white] roboto-medium text-sm bottom-2 left-[50%] translate-x-[-50%] capitalize">{item.place.location}</h1>

              </div>
          ))}
          
          
          {popularPlaces  && popularPlaces.length === 0 &&  <div className="flex flex-col w-full items-center gap-4 py-8">
                    <img src="/images/notFound.gif" alt="" className="w-16"/>
                    <h1 className="text-[grey]">No places added</h1>
                </div>}
          
          
          </div>)}
           </div>
         
          </div>




         

         
        </div>
      </div>
    </div></>
  );
}

export default PopularPlaces;

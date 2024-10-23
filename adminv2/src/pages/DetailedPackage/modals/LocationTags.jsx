import { useContext, useEffect, useRef, useState } from "react";
import CropEasy from "../../../utils/crop/CropEasy";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../../../utils/axiosInstance";
import useDebounce from "../../../utils/useDebounce";
import { CreatePackageLocation } from "./CreatePackageLocation";
import { IoCloseSharp } from "react-icons/io5";
import { Scrollbar } from "react-scrollbars-custom";
import { useLocation } from "react-router-dom";

export const LocationTags = ({openLocationTags, setOpenLocationTags, pack, reFetch})=> {
  const location = useLocation();

    const [updateLocationTagsLoading,setLocationTagsLoading] = useState(false)
    const [locationTags, setLocationTags] = useState([])
    const [locationSelectBoxOpen, setLocationSelectBoxOpen] = useState(false)
    const [locations, setLocations] = useState([])
    const [newLocations, setNewLocations] = useState([])

    const handleAddLocation = (location) => {
        const isLocationExists = newLocations.some(loc => loc === location);
      
        if (isLocationExists) {
          alert('Location already exists!');
        } else {
          setNewLocations(prev => [...prev, location]);
        }
      };



    useEffect(()=>{
        setLocationTags(pack.locations)
    },[pack])
   

    const handleClose = () => {
        setOpenLocationTags(false);
        setNewLocations([])
        document.getElementById("location-tags-form").reset();
        setLocationSelectBoxOpen(false)



      };
      const handleClickExistingLocation = (index) => {
        setLocationTags(locationTags.filter((item,ind)=>(ind !== index)))
      }

      const handleDeleteNewLocation = (index) => {
        setNewLocations(newLocations.filter((item,ind)=>(ind !== index)))
      }
     
      
      
      const handleSubmit = async (e) => {
        e.preventDefault()
        setLocationTagsLoading(true)
        try {
           const data = [
            ...locationTags, ...newLocations
           ]
           console.log(data)
           const res = await axiosInstance.patch(`/package/${pack._id}`, {locations:data})
           console.log(res)
            
              setLocationTagsLoading(false)
              setOpenLocationTags(false)
              document.getElementById("location-tags-form").reset();
              setLocationSelectBoxOpen(false)

              reFetch(`/package/${location.pathname.split("/")[2]}`)
              setNewLocations([])

            
            
        } catch (error) {
            alert(error)
            setLocationTagsLoading(false)
        }
      }




      const [search, setSearch] = useState(null)
      const debouncedSearch = useDebounce(search, 500)

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
      
      const handleSetSearch = (e) => {
        if (e.target.value === '') {
            setLocations([])
            setLocationSelectBoxOpen(false);
          } else {
            setLocationSelectBoxOpen(true);
          }
        setSearch(e.target.value);
      };

      const locationSelectBox = useRef(null);
      useEffect(() => {
        const handleOutsideClick = (event) => {
          
          if (locationSelectBox.current && !locationSelectBox.current.contains(event.target)) {
            // Click occurred outside the menu, hide the menu
            setLocationSelectBoxOpen(false);
           
           
          }
        };
    
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);
    return(
        <>

        <div className="fixed fadein top-0 left-0 right-0 bottom-0 bg-[#0000005e] z-[100000000] flex justify-center items-center">
      
       
        <div className="relative w-[90%] md:w-[40%] bg-[white] max-h-[500px]  overflow-hidden px-0 py-0 rounded-[5px]">
          <div className="flex items-center justify-between pl-4 pr-2 py-2 ">
                <h1 className="roboto-medium ">Primary Locations</h1>
                <button className="btn btn-sm btn-circle btn-ghost " onClick={() => handleClose()}>
                    ✕
                </button>
            </div>
            <hr />

             <Scrollbar style={{ height:'400px',width:'99.8%', marginTop:"5px", marginBottom:"5px"}}>

         <div>

<div>
    <div className="px-4 py-4 flex flex-wrap  gap-2">
    {locationTags && locationTags?.map((item,index)=>(
        <div className=" flex max-w-fit justify-between items-center mb-2  text-[black] gap-6 rounded overflow-hidden border">
        <div className="flex items-center gap-4">
        <h1 className=" text-sm">{item}</h1>
        </div>
        <div className="btn min-h-0 h-6 py-0 px-0 w-6 mr-2">
        <IoCloseSharp className="" onClick={()=>handleClickExistingLocation(index)} />
        </div>
       
    </div>

    ))}
    {
        newLocations && newLocations?.map((item, index)=>(
            <div key={index} className=" flex max-w-fit mb-2 justify-between items-center  gap-12 border">
                <div className="flex items-center gap-4">

                <h1 className=" text-sm">{item}</h1>
                </div>
                <div className="btn min-h-0 h-6 py-0 px-0 w-6 mr-2">
        <IoCloseSharp className="" onClick={()=>handleDeleteNewLocation(index)} />
        </div>
            </div>
        ))
    }
    </div>
   

    {locationTags && newLocations && locationTags.length === 0 && newLocations.length === 0 && <div className="flex flex-col items-center gap-4 py-8">
    <hr className="mx-4"/>
        <img src="/images/notFound.gif" alt="" className="w-20"/>
        <h1 className="text-[grey]">No Primary locations added</h1>
    </div>}
</div>
</div>

<div className="px-4 py-8 grow flex flex-col">
<form action="" id="location-tags-form" className="flex grow flex-col h-full justify-between">
    <div className="flex flex-col gap-4">
        <label htmlFor="" className="text-sm roboto-medium">Search to add Primary Locations</label>
       <div className="relative">
       <input
      className="bg-[white] px-4 py-2 border border-[2px] outline-none rounded w-full"
      type="text"
      onClick={()=> setLocationSelectBoxOpen(true)}
      onChange={handleSetSearch}
    />
    {locationSelectBoxOpen && locations  &&  <div ref={locationSelectBox} className={`absolute top-[100%] z-[100]  bg-white left-0 right-0 ${!locations.length == 0 && "min-h-[150px]"}   shadow-xl`}>
     {!locations.length == 0 && <Scrollbar style={{width:'100%', height:'150px'}} >
     <ul className="bg-[white] w-full">
        {locations && locations?.map((item, index)=>(
            <li className="flex gap-4 items-center py-1 px-4 hover:bg-[#eaeaea] cursor-pointer" onClick={()=>handleAddLocation(item.location)}>{item.location} </li>
        ))}
        {
          locations.length == 0 && 
          <li className="flex gap-4 items-center py-1 px-4 hover:bg-[#eaeaea] cursor-pointer text-sm" >Search to find location  </li>


        }
        
       </ul>
     </Scrollbar>}
    </div>}
       </div>
        
    </div>

    <div>
    
    <button
      className="btn-grad w-full mt-16 flex items-center gap-4 justify-center py-4 cursor-pointer rounded text-[white]" onClick={handleSubmit}
    >
      Update Primary Locations
      {updateLocationTagsLoading && <ClipLoader color="white" size={24} />}
    </button>
    
    </div>
</form>
</div>
         </Scrollbar>
      



      
        </div>
    </div></>
    )
}
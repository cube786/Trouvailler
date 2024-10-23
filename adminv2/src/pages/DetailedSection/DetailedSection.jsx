import React, { useContext, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from "../../components/Navbar";
import PackageCard from "../../components/PackageCard";
import Sidebar from "../../components/Sidebar";
import { MyContext } from "../../context/myContext";
import axiosInstance from "../../utils/axiosInstance";
import useFetch from "../../utils/useFetch";
import { SectionUpdate } from "./models/SectionUpdate";

function DetailedSection() {
    const navigate = useNavigate()
  const { expand } = useContext(MyContext);
  const [packageAddLoading, setPackageAddLoading] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [category, setCategory] = useState(null)
  const [updateSectionOpen, setUpdateSectionOpen] = useState(false)
const [page, setPage] = useState("")
  const [packageDeleteLoading, setPackageDeleteLoading] = useState(false)

  const location = useLocation()
    const id = location.pathname.split('/')[3]
    const {data, loading, error , reFetch} = useFetch(`/category/admin/${id}`)
    const {data:categories, loading:categoriesLoading, error:categoriesError, reFetch:categoriesRefetch} = useFetch('/categoryItem')

    const handleDelete = async (e, packid)=>{
        e.preventDefault()
        const confirmation = window.confirm("Are you sure to remove this package from the list?");

if (confirmation) {
    setPackageDeleteLoading(true);
    try {
        const currentList = data?.packages.map(item => item._id);
        const newList = currentList.filter(item => item !== packid);

        await axiosInstance.patch(`/category/${id}`, { packages: newList });

        reFetch(`/category/admin/${id}`);
        setPackageDeleteLoading(false);
    } catch (error) {
        console.log(error);
        setPackageDeleteLoading(false);
    }
}

    }
    const handleDeleteCategory = async (e, id) => {
        e.preventDefault()
        const confirm = window.confirm("Are you sure to delete this List")
        if(confirm) {
            await axiosInstance.delete(`/category/${id}`)
            navigate('/packages/sections')
        }

    }
    const handleChange = (e) => {
        setSelectedPackage(e.target.value)
    }
    const addToPage = async (e) => {
      console.log("heyyyyy")
        e.preventDefault();
        if(page === ""){
          alert("Select a page to add.")
          return;
        }
        try{
          const res = await axiosInstance.patch(`/category/${id}`, {page})
          reFetch(`/category/admin/${id}`)
         }
         catch(e) {
          console.log(e)
         }
       

    }
    const handleAddPackage = async (e) => {
        e.preventDefault()
        setPackageAddLoading(true)
        try{
            if(category.packages){
                const newList = data?.packages.map(item => item._id);
                console.log("hellooooo", newList)
                if(newList.includes(selectedPackage)){
                    alert("This package is already added")
                }
                else{
                    const res = await axiosInstance.patch(`/category/${id}`,
                {packages: [...category.packages, selectedPackage]})
                console.log(category.packages)
                reFetch(`/category/admin/${id}`)


                }
            }
            
           
                
            
            
        

        }catch(error){
            console.log(error)
            setPackageAddLoading(false)
            

        }
        setPackageAddLoading(false)

        
    }
    const [packages, setPackages] = useState(null)
    const {data:data2, loading:loading2, error:error2 } = useFetch('/package/packagetitles')

    useEffect(()=>{
        setCategory(data)
       
    }, [data])
    useEffect(()=>{
        setPackages(data2)
    }, [data2])


    const handleUpload = async () => {
      console.log(document.querySelector('#uploadedCheck').checked)
      if(document.querySelector('#uploadedCheck').checked === false){
        console.log("im out")
        const confirmOption = window.confirm('Are you sure to Archive this section?')
        if(confirmOption){
          try {
            const res = await axiosInstance.patch(`/category/${id}`,
            {uploaded: false})
            reFetch(`/category/admin/${id}`)
            
          } catch (error) {
            alert("Sorry, some error occured. Please try again later.")
            reFetch(`/category/admin/${id}`)

          }
        }else{
          reFetch(`/category/admin/${id}`)

        }
        
      }
      if(document.querySelector('#uploadedCheck').checked === true){
        console.log('im in')
        const confirmOption = window.confirm('Are you sure to Publish this section?')
        if(confirmOption){
          try {
            const res = await axiosInstance.patch(`/category/${id}`,
            {uploaded: true})
            reFetch(`/category/admin/${id}`)
            
          } catch (error) {
            alert("Sorry, some error occured. Please try again later.")
            reFetch(`/category/admin/${id}`)

          }
        }
        else{
          reFetch(`/category/admin/${id}`)

        }
        
      }
    }
    const handleSelect = (e) =>{
      setPage(e.target.value)
        
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
        name: "Sections",
        path: "/packages/sections"
      },
      {
        name: data.name,
        path: null
      }
    ]
  
  return (
    <>
    {updateSectionOpen ? <SectionUpdate category={category} reFetch={reFetch} updateSectionOpen={updateSectionOpen} setUpdateSectionOpen={setUpdateSectionOpen} />: null}
   
    <div className="w-[100vw]  h-[100vh] flex w-full">
      <Sidebar />
      <div
        className={` h-full w-full trasition-all  duration-300   ${
          expand ? "ml-[280px]" : "md:ml-[70px] "
        }`}
      >
        <Navbar pageTitle={`Sections : ${data.name}`} breadcrumb={breadcrumb} />
        <div className="py-4 md:py-12 px-4 md:px-24  w-full bg-[#f5f5f55e] sticky top-[61px] overflow-auto  available-height">
          <div className="w-full">
          {loading ? (
                <div className={`h-full flex justify-center py-28   `}>
                  <progress className="progress w-56"></progress>
                </div>
              ) : null}


              {data && !loading && !error &&
                <div>
                    <div className="flex items-center justify-between">
                    <h2 className="roboto-medium text-lg mb-2">{data.name}</h2>
                    <input type="checkbox" id="uploadedCheck" className="toggle toggle-success" defaultChecked={data.uploaded} onChange={(e)=>{handleUpload(e)}}/>

                    </div>
                    
                    <p className="text-sm">{data.description}</p>
                    <div className="py-4 flex items-center gap-6">
                        <button className="btn-grad text-[white] px-4 py-1 rounded text-xs" onClick={()=>setUpdateSectionOpen(true)}>Edit Section Details</button>
                        <button className={` ${data._id === "65999e37781eacb0f9723bcc" ? "hidden" : ""} btn-grad text-[white] px-4 py-1 rounded text-xs`} onClick={(e) =>handleDeleteCategory(e, id)}>Delete Section</button>

                    </div>
                </div>
              
              }
           
          
          
          </div>


          <div className="py-6">
            <h2>Select Category page to display section </h2>
            <p className="text-xs">If you add this section to a page, It will not be shown in other pages</p>
            <div className="py-4">
            <select id="category-page-select" className="select select-primary w-full max-w-xs capitalize" onChange={handleSelect}>
  <option disabled selected={data.page === true ? true : false} value="">Select page</option>
  {categories && categories?.length > 0 && categories?.map((itm, ind)=>(
    <option key={ind} className="capitalize" value={itm.title} selected={data.page === itm.title ? true : false}>{itm.title} Page</option>
  ))
  }
  {categories && categories?.length > 0 && 
    <option  className="capitalize" value="null" >Remove from category pages</option>
  
  }
  
  {categories && categories?.length == 0 &&
      <option  value="" disabled>No Category Page</option>
  }
</select>
            </div>
            <button className="btn-grad text-xs px-2 py-1 rounded text-[white]" onClick={(e)=>{addToPage(e)}}>{page === 'null' ? "Remove" : "Tag to Page"}</button>
          </div>




          <div className="w-full mt-12">
            <h3 className="mb-2 roboto-medium text-base">
              Added Packages
            </h3>
            <p className="bg-[#c4dff0] px-4 py-2 rounded my-4">Please not that Unpublished packages will be added to the list but the will not appear in the frontend.</p>
            <div>
            {data && data.packages && data.packages.length === 0 &&
              <div className="flex flex-col items-center  gap-4 py-4">
              <img src="/images/notFound.gif" alt="" className="w-16"/>
              <h1 className="text-[grey]">No Packages added</h1>
          </div>
            }
            <div className="flex flex-wrap gap-[2.5%] w-full">
           
                      {!error &&
                        !loading &&
                        data &&
                        data.packages?.map((item, index) => (
                          <div className="w-[48%] md:w-[18%]  mb-8 relative" key={index}>
                                <button onClick={(e)=>handleDelete(e, item._id)} className="btn glass absolute top-1 right-1 z-10 rounded-full p-0 min-h-0 w-10 h-10 text-[white]"><IoCloseSharp /></button>
                              <PackageCard item={item} />
                              

                          </div>
                        ))}{" "}
                    </div>
            </div>
           <div>
           
            


          
            
          




           </div>
           
          </div>

          <div className="w-full mt-12">
            <h3 className="mb-2 roboto-medium text-base">
              Add new package to the list
            </h3>
            <hr className="mb-6" />
            <div>
            <div>
        <form action="" className=" ">
            <div className="flex flex-col gap-4 my-6 ">
                <label htmlFor="" className=" roboto-medium px-2 !text-sm">Select Package</label>
                <select name="" id="" className="bg-white rounded-[10px] outline-none border border-[2px] px-4 py-4 " onChange={(e)=>handleChange(e)}>
                    <option value="" disabled selected className="">Select</option>
                    {
                        packages && packages !== null && packages?.map((item,index)=>(
                            <option value={item._id} className="" key={index}>{item.title}</option>
                        ))
                    }

                </select>
            </div>
            <div >
                    <button className="btn-grad text-xs px-4 py-2 rounded text-[white] flex gap-4 items-center" onClick={handleAddPackage}>         Add this Package to the List{packageAddLoading && <ClipLoader color="white" size={16} />}
</button>
            </div>
        </form>
    </div>
            </div>
           <div>
           
            


          
            
          




           </div>
           
          </div>

         
        </div>
      </div>
    </div></>
  );
}

export default DetailedSection;

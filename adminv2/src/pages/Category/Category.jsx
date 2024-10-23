import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { MyContext } from "../../context/myContext";
import axiosInstance from "../../utils/axiosInstance";
import useFetch from "../../utils/useFetch";
import UpdateCategory from "./UpdateCategory";

function Category() {


	const {  setExpand } = useContext(MyContext);

  useEffect(()=>{
    setExpand(false)
  }, [])
   
  const { expand } = useContext(MyContext);
  const {data, loading, error, reFetch} = useFetch('/categoryItem')
  const [openUpdateCategory, setOpenUpdateCategory] = useState(false)
  const [updateIndex, setUpdateIndex] = useState(null)

 const deleteCategory = async (id) => {
    const confirmDelete  =  window.confirm('Do you want to delete this category? These category will be removed from all the pakages tagged.')
    if(confirmDelete){
      try {

        await axiosInstance.delete(`/categoryItem/${id}`)
        reFetch('/categoryItem')
      } catch (error) {
        console.log(error)
      }
    }
 }
 const updateCategory = (ind) => {
  setUpdateIndex(ind);
  setOpenUpdateCategory(true)
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
    name: "Categories",
    path: null
  }
]



  return (
    <>{
      openUpdateCategory &&  updateIndex !== null && 
      <UpdateCategory pack={data[updateIndex]} reFetch={reFetch} openUpdateCategory={openUpdateCategory} setOpenUpdateCategory={setOpenUpdateCategory}/>
    }
     
   
    <div className="w-[100vw]  h-[100vh] flex w-full">
        
      <Sidebar />
      <div
        className={` h-full w-full trasition-all  duration-300   ${
          expand ? "ml-[280px]" : "md:ml-[70px] "
        }`}
      >
        <Navbar pageTitle="Travel Packages" breadcrumb={breadcrumb} />
        <div className="py-4 md:py-12 px-4 md:px-24  w-full bg-base-200 sticky top-[61px] overflow-auto  available-height">
        
          <div className="w-full">
           <div className="flex items-center justify-between pb-4">
           <h3 className="mb-2 roboto-medium md:text-xl">
              Added Categories
            </h3>                    
          <Link to="/packages/category/new">
          <button className="px-4 py-2 btn-grad text-xs md:text-base font-medium text-sm rounded-[10px] text-[white] glass"   >Add a new Category</button> 

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
                <h2>   {itm.title}
            </h2>
            <div className="flex items-center gap-4  z-[1000] relative   text-xs">
              <button className="btn-grad px-4 py-1 rounded-[5px] text-[white] glass roboto-regular" onClick={()=>{deleteCategory(itm._id)}}>Delete</button>
              <Link>
              <button className="btn-grad px-4 py-1 rounded-[5px] text-[white] glass roboto-regular" onClick={()=>{updateCategory(ind)}}>Update</button></Link>
            </div>
                </div>
            <p className="text-sm font-medium mt-4">{itm.description}  </p>  </div>
              <div className="collapse-content">
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

export default Category;

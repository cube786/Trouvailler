import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { MyContext } from "../../context/myContext";
import useFetch from "../../utils/useFetch";
import { Section } from "./models/Section";

function Sections() {
  const { expand } = useContext(MyContext);
  const [createSectionOpen, setCreateSectionOpen] = useState(false)

  const [sections, setSections] = useState(null)

  const {data, loading, error, reFetch} = useFetch('/category')
 useEffect(()=>{
  console.log(data)
    setSections(data)
 }, [data])

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
    path: null
  }
]

  

  return (
    <>
    {
      createSectionOpen ? <Section reFetch={reFetch} createSectionOpen={createSectionOpen} setCreateSectionOpen={setCreateSectionOpen} /> :null
    }
    <div className="w-[100vw]  h-[100vh] flex w-full">
      <Sidebar />
      <div
        className={` h-full w-full trasition-all  duration-300   ${
          expand ? "ml-[280px]" : "md:ml-[70px] "
        }`}
      >
        <Navbar pageTitle="Sections" breadcrumb={breadcrumb}/>
        <div className="py-4 md:py-12 px-4 md:px-24  w-full bg-[#f5f5f55e] sticky top-[61px] overflow-auto  available-height">
          <div className="w-full">
            <h3 className="mb-2 roboto-medium text-xl">
              Sections
            </h3>
            <hr className="mb-6" />
           <div>
           <p className="text-sm leading-[24px] mt-6">
                          Using this feature, you can add categorized package
                          sections as carousels to your website.
                           You can create multiple sections, each
                          with a title and description, and add as many packages
                          as you want.
                           You can update the list whenever needed,
                          delete sections, and save the list as a draft without
                          publishing.
                        </p>
           </div>
           <div className="card-actions justify-start mt-4">
                      <button className="btn btn-grad text-xs roboto-regular text-[white]" onClick={()=> setCreateSectionOpen(true)}>
                        Create a new section
                      </button>
                    </div>
          </div>




          <div className="w-full mt-12">
            <h3 className="mb-2 roboto-medium text-base">
              Created Sections
            </h3>
            <hr className="mb-6" />
           <div>
           {loading ? (
                <div className={`h-full flex justify-center py-28   `}>
                  <progress className="progress w-56"></progress>
                </div>
              ) : null}
            


           {
            sections && sections.length !== 0 &&
            sections?.map((item, key)=>(
              <div key={key} className="bg-[white] glass mb-4 rounded px-4 py-4 shadow-xl">
              <div className="flex justify-between items-center mb-4">
              <h3 className="text-base roboto-bold">{item.name}</h3>
              {item.uploaded && <span className={` bg-success text-white px-4 py-1 rounded text-sm rounded-full`}>Published</span>}
              {!item.uploaded && <span className={` bg-[red] text-white px-4 py-1 rounded text-sm rounded-full`}>UnPublished</span>}
              </div>
              <p  className="text-sm text-[#696969] mb-2">{item.description}</p>
              <p className="text-sm roboto-medium">Packages Added : <span>{item.packages.length}</span></p>
              <Link to={`/packages/sections/${item._id}`}>
              <button className="rounded mt-4 btn-grad text-white text-xs px-4 py-1">Manage</button></Link>
            </div>
            ))
           }
            
          




           </div>
           
          </div>

         
        </div>
      </div>
    </div></>
  );
}

export default Sections;

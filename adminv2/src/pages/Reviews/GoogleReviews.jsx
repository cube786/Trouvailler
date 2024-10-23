import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { MyContext } from "../../context/myContext";
import useFetch from "../../utils/useFetch";
import axiosInstance from "../../utils/axiosInstance";

function GoogleReviews() {
  const { expand } = useContext(MyContext);



  const fetchReviews = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const response = await axiosInstance.post('/admin/auth/googlereviews', { token } // Send the access token to backend
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
  
      const data = await response.json();
      console.log("hey success", data)
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };



  





 const breadcrumb = [ 
  {
    name: "Home",
    path: "/"
  },
  {
    name: "Reviews",
    path: null
  },
  {
    name: "Google",
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
        <Navbar pageTitle="Sections" breadcrumb={breadcrumb}/>
        <div className="py-4 md:py-12 px-4 md:px-24  w-full bg-[#f5f5f55e] sticky top-[61px] overflow-auto  available-height">
          <div className="w-full">
            <h3 className="mb-2 roboto-medium text-xl">
              Google Reviews
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
          
          </div>




          <div className="w-full mt-12">


          <button onClick={()=>fetchReviews()}>Fetch Reviews</button>

            
           
       
           
          </div>

         
        </div>
      </div>
    </div></>
  );
}

export default GoogleReviews;

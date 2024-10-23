import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { MyContext } from "../../context/myContext";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaPeopleRoof, FaPlane, FaPlaneArrival } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { FaPersonHiking } from "react-icons/fa6";
import useFetch from "../../utils/useFetch";
import ClipLoader from "react-spinners/ClipLoader";

function Packages() {
  const { expand } = useContext(MyContext);
  const {  setExpand } = useContext(MyContext);

  useEffect(()=>{
    setExpand(false)
  }, [])

  const {data, loading, error} = useFetch('/package/count')
  const breadcrumb = [ 
    {
      name: "Home",
      path: "/"
    },
    {
      name: "Travel Packages Dashboard",
      path: null
    }
  ]


  return (
    <div className="w-[100vw]  h-[100vh] flex w-full">
      <Sidebar />
      <div
        className={` h-full w-full trasition-all  duration-300   ${
          expand ? "ml-[280px]" : "md:ml-[70px] "
        }`}
      >
        <Navbar pageTitle="Travel Packages" breadcrumb={breadcrumb} />
        <div className="py-4 md:py-12 px-4 md:px-24  w-full bg-[#f5f5f55e] sticky top-[61px] overflow-auto  available-height">
          <div className="w-full">
            <h3 className="mb-2 roboto-medium md:text-xl">
              Travel Package statistics
            </h3>
            <hr className="mb-6" />
            {loading && 
            <div className="py-12 flex justify-center">
              <ClipLoader />
            </div>
            }
            {error && 
            <div className="py-12 flex justify-center">
              <span>Internal server Error</span>
            </div>
            }
            {!loading && !error &&  <div
              className={` transition-all duration-300   ${
                expand ? "flex-col " : "flex flex-col md:flex-row "
              } w-full gap-12`}
            >
              <div className="stats shadow-xl">
                <div className="stat place-items-center">
                  <div className="stat-title text-xs md:text-base text-black">
                    Total Travel Packages
                  </div>
                  <div className="stat-value">{data.totalCount}</div>
                  {/* <div className="stat-desc">From January 1st to February 1st</div> */}
                  <Link to="/packages/list" className="text-xs underline">
                    View all packages
                  </Link>
                </div>

                <div className="stat place-items-center">
                  <div className="stat-title text-success text-xs md:text-base">Published</div>
                  <div className="stat-value text-success">{data.published}</div>
                  {/* <div className="stat-desc text-secondary">↗︎ 40 (2%)</div> */}
                  <Link to="/packages/list?uploaded=true" className="text-xs underline">
                    View{" "}
                  </Link>
                </div>

                <div className="stat place-items-center">
                  <div className="stat-title text-error text-xs md:text-base">Unpublished</div>
                  <div className="stat-value text-error">{data.unPublished}</div>
                  {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                  <Link to="/packages/list?uploaded=false" className="text-xs underline">
                    View{" "}
                  </Link>
                </div>
              </div>
              <div
                className={`${
                  expand && "mt-12"
                } md:grow transition-all duration-300`}
              >
                <h4 className="text-sm roboto-medium mb-2">
                  Category wise counts
                </h4>
                <hr className="mb-6" />
                <div className="flex justify-between flex-wrap">
                  <div className="shadow-xl bg-[white] px-4 rounded-[10px] w-[48%] md:w-[24%] mb-4 md:mb-0">
                    <div className="flex justify-between  items-center py-4">
                      <div>
                        <FaPeopleRoof
                          style={{ fontSize: 40, color: "black" }}
                        />
                      </div>
                      <div className="text-right">
                        <h3>Family</h3>
                        <h2 className="text-2xl text-[#ffa534] roboto-black">
                          {data.family}
                        </h2>
                      </div>
                    </div>
                    <hr />
                    <div className="mb-3">
                      <Link to="/packages/list?category=family" className="text-xs underline">
                        View{" "}
                      </Link>
                    </div>
                  </div>{" "}
                  <div className="shadow-xl bg-[white] px-4 rounded-[10px] w-[48%] md:w-[24%]  mb-4 md:mb-0">
                    <div className="flex justify-between  items-center py-4">
                      <div>
                        <HiUserGroup style={{ fontSize: 40, color: "black" }} />
                      </div>
                      <div className="text-right">
                        <h3>Group</h3>
                        <h2 className="text-2xl text-[green] roboto-black">
                          {data.group}
                        </h2>
                      </div>
                    </div>
                    <hr />
                    <div className="mb-3">
                      <Link to="/packages/list?category=group" className="text-xs underline">
                        View{" "}
                      </Link>
                    </div>
                  </div>{" "}
                  <div className="shadow-xl bg-[white] px-4 rounded-[10px] w-[48%] md:w-[24%]  mb-4 md:mb-0">
                    <div className="flex justify-between items-center py-4">
                      <div>
                        <FaPeopleCarryBox
                          style={{ fontSize: 40, color: "black" }}
                        />
                      </div>
                      <div className="text-right">
                        <h3>Honeymoon</h3>
                        <h2 className="text-2xl roboto-black text-[red]">{data.honeymoon}</h2>
                      </div>
                    </div>
                    <hr />
                    <div className="mb-3">
                      <Link to="/packages/list?category=honeymoon" className="text-xs underline">
                        View{" "}
                      </Link>
                    </div>
                  </div>{" "}
                  <div className="shadow-xl bg-[white] px-4 rounded-[10px] w-[48%] md:w-[24%]  mb-4 md:mb-0">
                    <div className="flex justify-between  items-center py-4">
                      <div>
                        <FaPlaneArrival
                          style={{ fontSize: 40, color: "black" }}
                        />
                      </div>
                      <div className="text-right">
                        <h3>International</h3>
                        <h2 className="text-2xl roboto-black text-[#1d62f0]">
                          {data.international}
                        </h2>
                      </div>
                    </div>
                    <hr />
                    <div className="mb-3">
                      <Link to="/packages/list?category=adventure" className="text-xs underline">
                        View{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          </div>

          <div className="w-full mt-16">
            <h3 className="mb-2 roboto-medium md:text-xl">Services</h3>
            <hr className="mb-6" />
            <div className="flex">
              <div className="w-full">
                <div className="card bg-base-100 w-full shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">Create a new Travel Package</h2>
                    <hr />
                    <div className="pl-[12.5px] mt-8">
                      <div className="border-l border-l-[5px]  border-l-[#6c80d6] relative pl-[30px] pb-6">
                        <div className="absolute top-0 left-0  translate-x-[-50%] ml-[-2.5px] text-[white] bg-[#6c80d6] w-[25px] h-[25px] max-h-[25px] rounded-full flex justify-center items-center">
                          <span>1</span>
                        </div>
                        <p className="text-sm">
                          To create a new travel package, start by navigating to
                          the “Create Package” page by clicking the below
                          button. Here, you can set up a basic package by
                          providing a title and an image.
                        </p>
                      </div>
                      <div className="border-l border-l-[5px]  border-l-[#6c80d6] relative pl-[30px] pb-6">
                        <div className="absolute top-0 left-0  translate-x-[-50%] ml-[-2.5px] text-[white] bg-[#6c80d6] w-[25px] h-[25px] max-h-[25px] rounded-full flex justify-center items-center">
                          <span>2</span>
                        </div>
                        <p className="text-sm">
                          Once the package is created, go to the particular
                          Package details page, select your newly created
                          package, and update its details as needed
                        </p>
                      </div>
                      <div className="border-l border-l-[5px]  border-l-[#6c80d6] relative pl-[30px]">
                        <div className="absolute top-0 left-0  translate-x-[-50%] ml-[-2.5px] text-[white] bg-[#6c80d6] w-[25px] h-[25px] max-h-[25px] rounded-full flex justify-center items-center">
                          <span>3</span>
                        </div>
                        <p className="text-sm">
                          Now publish the package and you are ready to go!
                        </p>
                      </div>
                    </div>

                    <div className="card-actions justify-start mt-4">
                      <Link to="/packages/create">
                      <button className="btn btn-grad text-[white]">
                        Create Package
                      </button></Link>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-100 w-full shadow-xl mt-8">
                  <div className="card-body">
                    <div className="flex flex-col md:flex-row mt-4 justify-between">
                      <div className="w-full md:w-[28%] -mt-2">
                        <h2 className="card-title mb-2 ">
                          Configurable sections
                        </h2>
                        <hr />
                        <p className="text-sm mt-6">
                          Using this feature, you can add categorized package
                          sections as carousels to your website.
                          <br /> <br /> You can create multiple sections, each
                          with a title and description, and add as many packages
                          as you want.
                          <br /> <br /> You can update the list whenever needed,
                          delete sections, and save the list as a draft without
                          publishing.
                        </p>
                        <div className="card-actions justify-start mt-4">
                          <Link to="/packages/sections">
                          <button className="btn btn-grad text-sm mb-8 md:mb-0 md:text-bse text-[white]">
                            Go to section management
                          </button>
                          </Link>
                        </div>
                      </div>

                      <div className="w-full md:w-[68%] shadow-xl border rounded-[10px] overflow-hidden">
                        <img
                          src="/images/section.png"
                          alt=""
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-100 w-full shadow-xl mt-8">
                  <div className="card-body">
                    <h2 className="card-title mb-1">Popular Places List</h2>
                    <hr />

                    <div className="flex  justify-between mt-6">
                      <p className="text-sm">
                        Here you can showcase multiple popular places on your
                        website. <br /> Simply add each place along with an
                        image. You can update the list whenever needed to keep
                        it current and engaging.
                      </p>
                    </div>

                    <div className="card-actions justify-start mt-4">
                      <Link to="/packages/popularplaces">
                      <button className="btn btn-grad text-[white]">
                        Go to Popular places List Management
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Packages;

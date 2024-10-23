import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { MyContext } from "../../context/myContext";
import useFetch from "../../utils/useFetch";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../utils/pagination/Pagination";
import PackageCard from "../../components/PackageCard";

function PackagesList() {
  const { expand } = useContext(MyContext);
  const [packages, setPackages] = useState([]);
  const [searchParams] = useSearchParams();
  console.log(searchParams.toString());
  const [url, setUrl] = useState(
    `/package/admin?page=1&pagesize=10&${searchParams.toString()}`
  );
  const { data, loading, error, reFetch } = useFetch(url);
  const [showPublishedFilter, setShowPublishedFilter] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [published, setPublished] = useState(null)
  useEffect(() => {
    if (searchParams.has("uploaded")) {
      setShowPublishedFilter(false);
    }
  }, []);

//   }, [currentPage]);

  const fetchPublished = () => {
    setPublished(true)
    setCurrentPage(1)
    reFetch(
        `/package/admin?page=${currentPage}&pagesize=10&uploaded=true&${searchParams.toString()}`
      );
  }
  const fetchUnpublished = () => {
    setPublished(false)
    setCurrentPage(1)
    reFetch(
        `/package/admin?page=${currentPage}&pagesize=10&uploaded=false&${searchParams.toString()}`
      );
  }

  const fetchAll = () => {
    setPublished(null)
    setCurrentPage(1)
        reFetch(
            `/package/admin?page=${currentPage}&pagesize=10&${searchParams.toString()}`
          ); 
  }
 

  useEffect(() => {
    setPackages(data);
    console.log(data);
  }, [data]);

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
      name: "List",
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
        <Navbar pageTitle="Travel Packages List" breadcrumb={breadcrumb}/>
        <div className="py-4 md:py-12 px-4 md:px-24  w-full bg-[#f5f5f55e] sticky top-[61px] overflow-auto  available-height">
          <div className="w-full h-full">
            <h3 className="mb-2 roboto-medium text-xl" id="text">
              Travel Package List {searchParams.has('category') && " : " + searchParams.get('category').charAt(0).toUpperCase() + searchParams.get('category').slice(1)} {searchParams.has('uploaded') && (searchParams.get('uploaded') == "true" ? " : Published" : " : Unpublished")} 
            </h3>
            <hr className="mb-2" />

            <div className="h-full">
              {loading ? (
                <div className={`h-full flex justify-center py-28   `}>
                  <progress className="progress w-56"></progress>
                </div>
              ) : null}
              
              {!error && !loading && data && (
                <div>
                     {showPublishedFilter && (
                  <div className="flex justify-start items-center flex-wrap py-4 text-sm">
                    <span className="roboto-bold mr-6">Filters :</span>
                    <div className="items-center flex ">
                     
                        <div>
                          <span className={`border px-4 py-2 cursor-pointer rounded-l-[8px] ${published === true ? "bg-[#afeaff] border-[2px]":"bg-[white]"}`} onClick={()=>fetchPublished()}>
                            Published
                          </span>
                          <span className={`border px-4 py-2 cursor-pointer   ${published === false ? "bg-[#afeaff] border-[2px]":"bg-[white]"}`} onClick={()=>fetchUnpublished()}>
                            UnPublished
                          </span>
                          <span className={`border px-4 py-2 cursor-pointer rounded-r-[8px]  ${published === null ? "bg-[#afeaff] border-[2px]":"bg-[white]"}`} onClick={()=>fetchAll()}>
                            All
                          </span>
                        </div>
                    
                    </div>
                  </div>  )}
                  {showPublishedFilter && <hr className="mb-8" />}

                  <div className="w-full pb-12 mt-16 ">
                    <div className="flex flex-wrap gap-[2.5%] w-full">
                      {!error &&
                        !loading &&
                        data &&
                        data.packages?.map((item, index) => (
                          <div className="w-[48%] md:w-[18%] mb-8" key={index}>
                              <PackageCard item={item} />
                          </div>
                        ))}{" "}
                    </div>

                    {!error && data && data.totalCount === 0 && 
                        <div className="flex flex-col items-center">
                            <img src="/images/notfound.gif" alt=""  className="w-20"/>
                            <span>No Packages Found!</span>
                        </div>
                    }

                    {!error && data && data.totalCount >0 && (
                      <div className="mt-12 ">
                        <Pagination
                        reFetch={reFetch}
                        searchParams={searchParams}
                          className="pagination-bar"
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          totalCount={data.totalCount}
                          pageSize={10}
                          onPageChange={(page) => setCurrentPage(page)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackagesList;

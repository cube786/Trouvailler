import React from 'react'
import { Link } from 'react-router-dom'

function PackageCard({item}) {
  return (
    <div
                            className="fadein card bg-base-100 w-full shadow-xl "
                            
                          >
                            <figure className="relative aspect-video">
                              <img src={item.titleImage} alt={item.title} className=" absolute top-0 aspect-video z-[2]"/>
                              <div className="skeleton z-[1] absolute top-0 bottom-0 left-0 right-0 rounded-t rounded-b-[0px]"></div>
                            </figure>
                            <div className="card-body px-2 py-2 w-full flex items-start flex-col">
                              <div>
                                {item.uploaded && <span className="text-[10px] roboto-medium bg-success text-white px-4 py-1 rounded-full">
                                  Published
                                </span>}
                                {!item.uploaded &&<span className="text-[10px] roboto-medium bg-[red] text-white px-4 py-1 rounded-full">
                                  UnPublished
                                </span>}
                              </div>
                              <h2 className="w-full card-title overflow-hidden block  whitespace-nowrap	text-sm roboto-bold	 text-ellipsis		">
                                {item.title}
                              </h2>

                              <p className="leading-[17px] h-[51px] line-clamp-3 text-xs roboto-regular">
                                {item.shortDescription}
                              </p>
                              <div className="mt-4 mb-4  w-full flex justify-between items-end">
                                <div className=" flex flex-col items-start  text-[16px]">
                                  <span className="roboto-bold    flex gap-1 items-center ">
                                    <span className="text-base r">INR</span>
                                    <span>
                                      {item.price
                                        .toString()
                                        .replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                                    </span>
                                  </span>
                                  <span className="text-[10px]     text-[#585858]">
                                    Per Person
                                  </span>
                                </div>

                                <Link
                                  className="  flex justify-end"
                                  to={`/packages/${item._id}`}
                                >
                                  <button className="bg-[#6c6c6c]   text-white  text-[11px] px-6 xs:px-6 rounded-[10px] py-2">
                                    View
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
  )
}

export default PackageCard
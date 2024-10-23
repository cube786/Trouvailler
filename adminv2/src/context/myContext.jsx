'use client'
import { createContext, useEffect, useState } from "react";



 


export  const MyContext = createContext(null);

const  MycontextProvider = ({ children }) => {
  
    const [expand, setExpand] = useState(false)
    const [openPackage, setOpenPackage] = useState(false)

    const [openReviews, setOpenReviews] = useState(false)




    return (
      <MyContext.Provider
       value={{
        expand, setExpand, openPackage, setOpenPackage, openReviews, setOpenReviews
       }}
      >
        {children}
      </MyContext.Provider>
    );
  };


  export default MycontextProvider
import React, { useContext } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { MyContext } from '../../context/myContext'

function Dashboard() {
    const {expand } = useContext(MyContext)

  return (
        <div className='w-[100vw]  h-[100vh] flex w-full'>
             <Sidebar />
             <div
        className={` h-full w-full trasition-all  duration-300   ${
          expand ? "ml-[280px]" : "ml-[70px] "
        }`}
      >
                <Navbar pageTitle={"Dashboard"}/>
            </div>
           
        </div>
    )
}

export default Dashboard
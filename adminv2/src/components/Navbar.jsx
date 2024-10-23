import React, { useContext, useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { MyContext } from '../context/myContext';
import { MdAccountBox } from "react-icons/md";
import Profile from './models/Profile';
import { Link } from 'react-router-dom';

function Navbar({ pageTitle, breadcrumb }) {
    const { expand, setExpand, setOpenPackage } = useContext(MyContext)
    const expandSidebar = (e) => {
        if(e.target.checked){
            setExpand(true)
        }
        else{
            setExpand(false)
            setOpenPackage(false)

        }
    }

    const [profile, setProfile] = useState(false)

    return (
        <>
        {profile ? <Profile profile={profile} setProfile={setProfile} /> : null}
        <div className='  border-b h-[61px] px-4 bg-[white] z-[1000] sticky top-0'>
            <div className='flex justify-between items-center h-full'>
                <div className='flex gap-4 items-center '>
                    <div className='flex gap-3 md:gap-8 items-center'>
                        <label className="btn btn-circle swap swap-rotate">
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" onChange={expandSidebar} checked={expand}/>

                            {/* hamburger icon */}
                            <svg
                                className="swap-off fill-current w-[20px] md:w-[32px] h-[20px] md:h-[32px]"
                                xmlns="http://www.w3.org/2000/svg"
                              
                                viewBox="0 0 512 512">
                                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                            </svg>

                            {/* close icon */}
                            <svg
                                className="swap-on fill-current w-[20px] md:w-[32px] h-[20px] md:h-[32px]"
                                xmlns="http://www.w3.org/2000/svg"
                             
                                viewBox="0 0 512 512">
                                <polygon className=''
                                    points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                            </svg>
                        </label>
                        <div className="breadcrumbs text-xs">
                            <h3 className='text-sm roboto-bold mb-1 font-bold'>{pageTitle}</h3>
                            <ul>
                               
                                {breadcrumb && breadcrumb?.map((item, ind)=>(
                                     <li key={ind}>
                                        <Link to={item.path} className={`${item.path === null && "pointer-events-none"}`}>
                                            <span>{item.name}</span>
                                        </Link>
                                     </li>
                                ))}
                            </ul>
                        </div>
                    </div>


                </div>
                <div className=' gap-4 hidden md:flex mr-8 items-center'>
                    <MdAccountBox style={{ fontSize: 30 }} className="cursor-pointer" onClick={()=>setProfile(true)}/>
                </div>
            </div>
        </div></>
    )
}

export default Navbar
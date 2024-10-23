'use client'
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";


export type myContext = {
    navOpen: boolean;
    setNavOpen:(val:boolean)=> void;
    scrolled : boolean;
    setScrolled : (val:boolean) => void;
    loginOpen: boolean;
    setLoginOpen:(val:boolean) => void;
    searchOpen: boolean;
    setSearchOpen:(val:boolean) => void;
    openShare: boolean;
    setOpenShare:(val:boolean) => void;
    needhelp: boolean;
    setNeedHelp:(val:boolean) => void;

    linkHistoryItem: any;
    setLinkHistoryItem: (val:any) => void;
    

  };

 


export  const MyContext = createContext<myContext | null>(null);

const  MycontextProvider:React.FC<{children: any}> = ({ children }) => {
  const [needhelp, setNeedHelp] = useState(false)

  const [navOpen, setNavOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false);
  const [linkHistoryItem, setLinkHistoryItem] = useState("/")

  const [searchOpen, setSearchOpen] = useState(false)
  const [openShare, setOpenShare] = useState(false)


 







  useEffect(()=>{
    window.history.scrollRestoration = 'manual';
  },[])

   useEffect(()=>{
    if(navOpen == true || loginOpen == true){
        document.body.classList.add('stop-scroll')
    }
    else{
        document.body.classList.remove('stop-scroll')
    }
  }, [navOpen, loginOpen])

  const pathname = usePathname();
useEffect(() => {
    window.scroll(0, 0);
    setScrolled(false)
}, [pathname]);


    return (
      <MyContext.Provider
       value={{
        navOpen, setNavOpen,openShare, setOpenShare, setScrolled, scrolled, loginOpen, setLoginOpen, linkHistoryItem, setLinkHistoryItem, setNeedHelp, needhelp, searchOpen, setSearchOpen
      }}
      >
        {children}
      </MyContext.Provider>
    );
  };


  export default MycontextProvider
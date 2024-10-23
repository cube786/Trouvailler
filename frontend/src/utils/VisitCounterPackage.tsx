"use client"
import React, { useEffect } from 'react'

function VisitCounterPackage() {

    useEffect(() => {
        const visitCount = sessionStorage.getItem('PackagevisitCount') ;

        if(visitCount === null){
            sessionStorage.setItem("PackagevisitCount", "1") 
        }
        else if (visitCount !== null){
            sessionStorage.setItem('PackagevisitCount', String(Number(visitCount) + 1) )
        }
    }, [])
  return null;
}

export default VisitCounterPackage
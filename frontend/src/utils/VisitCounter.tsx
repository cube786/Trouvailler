"use client"
import React, { useEffect } from 'react'

function VisitCounter() {

    useEffect(() => {
        const visitCount = sessionStorage.getItem('visitCount') ;

        if(visitCount === null){
            sessionStorage.setItem("visitCount", "1") 
        }
        else if (visitCount !== null){
            sessionStorage.setItem('visitCount', String(Number(visitCount) + 1) )
        }
    }, [])
  return null;
}

export default VisitCounter
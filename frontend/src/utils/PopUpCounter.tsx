"use client"
import React, { useEffect } from 'react'

function PopUpCounter() {

  useEffect(()=>{
    const popupshowed = sessionStorage.getItem('popupclosed');
    if(popupshowed != null){
      sessionStorage.setItem('popupclosed', String(Number(popupshowed) + 1) )

    }

  },[])


  return null
}

export default PopUpCounter
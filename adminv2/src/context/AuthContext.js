import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

function AuthContextProvider(props) {
    const navigate = useNavigate()


    const [loggedIn, setLoggedIn] = useState(undefined);
    // const loggedIn = true

  async function getLoggedIn() {
    const token = sessionStorage.getItem('token')
    if(token){
      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Use the access token
        },
      });

      if(response.ok){
        setLoggedIn(true)
        navigate("/")
        return;
      }
     
    }

    const loggedInRes = await axiosInstance.get('/admin/auth/loggedin')
    
    setLoggedIn(loggedInRes.data);
    if(loggedInRes.data){
        navigate('/')
    }
    else{
      navigate('/login')
    }

  }

  useEffect(() => {
    getLoggedIn();
  }, []);

 
  
  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, setLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';
import { useGoogleLogin } from '@react-oauth/google';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   const navigate = useNavigate()
    const {loggedIn, setLoggedIn} =useContext(AuthContext)
      useEffect(()=>{
          if(loggedIn === true){
              navigate('/')
          }
      },[loggedIn])
  
    const { getLoggedIn } = useContext(AuthContext);
  const initializeGoogleClient = async () => {
    return new Promise((resolve, reject) => {
      window.gapi.load('client:auth2', async () => {
        try {
          await window.gapi.client.init({
            clientId: 'YOUR_CLIENT_ID', // Replace with your Google Client ID
            scope: 'https://www.googleapis.com/auth/business.manage',
          });
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  };
  
    async function login(e) {
      e.preventDefault();
  
      try {
        const loginData = {
          email,
          password,
        };
  
        // await axios.post("http://localhost:5000/auth/login", loginData);
        await axiosInstance.post(
          '/admin/auth/login',
          loginData
        );
        await getLoggedIn();
      } catch (err) {
        console.error(err);
      }
    }
 
    const glogin = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`, // Use the access token
        },
      });
      if(response.ok){
        const userData = await response.json();
        console.log('User is logged in:', userData);

        // Check if the user's email is the allowed one
        if (userData.email === "trouvaillerapp@gmail.com") {
            sessionStorage.setItem('token', tokenResponse.access_token)
            setLoggedIn(true)
            navigate("/")

          navigate('/'); // Redirect to the home page
          return; // Exit the function
        } else {
          alert('You are not authorized to access the platform');
          sessionStorage.removeItem('token'); // Clear the access token
          navigate('/login'); // Redirect to the login page
          return; // Exit the function
        }
      }
       

      },
      onError: (error) => {
        alert(error)
      },
      scope: 'https://www.googleapis.com/auth/business.manage', // Add scope for Google Business Profile

    });


    return (
        <div className='w-full h-[100vh] flex justify-center items-center'>
            <div className='w-[30%] prose prose-base'>
                <div className='flex gap-4 items-center'>
                    <img src="/images/logos/icon.png" alt="" className='w-8' />
                    <img src="/images/logos/logo.png" alt="" className='h-6'/>

                </div>
                <h1 className='text-3xl'>Welcome back</h1>
                <p>Login using your credentials</p>
                <div>
                    <form action="" className='flex flex-col gap-8 items-start'>
                        <label className="input input-bordered flex items-center gap-2 w-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input type="text" className="grow" placeholder="Email" onChange={(e) => setEmail(e.target.value)}
          value={email}/>
                        </label>
                        <label className="input input-bordered flex items-center gap-2 w-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                            </svg>
                            <input type="password" className="grow"  onChange={(e) => setPassword(e.target.value)}
          value={password} />
                        </label>
                        <button className='btn w-[30%] text-[white] btn-grad' onClick={(e)=> login(e)}>Login</button>
                    </form>


                    <p>or</p>
                    <button onClick={glogin}>Login with Google</button>

                </div>
            </div>
        </div>
    )
}

export default Login
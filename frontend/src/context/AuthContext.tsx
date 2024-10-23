'use client'
import axiosInstance from "@/utils/axiosInstance";
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";


declare global {
  interface Window {
    google: any;
  }
}

 


export  const AuthContext = createContext<any>(null);

const  AuthContextProvider:React.FC<{children: any}> = ({ children }) => {
 
	const router = useRouter();


 
  
  const [user, setUser] = useState<User | null>(null)
console.log(user)

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user || null);
    });
    return () => unsubscribe()
  }, [auth])


  useEffect(() => {
    // Initialize Google One Tap Login
    const handlePageLoad = () => {
      if (!user && window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID, // Google Client ID
          callback: handleCredentialResponse,
          auto_select: true,
          cancel_on_tap_outside: false,
        });

        // Show Google One Tap prompt if no authenticated user
        window.google.accounts.id.prompt();
      }
    };

    // Listen for the window 'load' event (fires after complete page load)
    window.addEventListener("load", handlePageLoad);
  }, []);



  // Callback for Google One Tap response
  const handleCredentialResponse = async (response: any) => {
    const credential = response.credential;  // Get credential from Google One Tap

    // Authenticate with Firebase using Google credentials
    const googleCredential = GoogleAuthProvider.credential(credential);

    try {
      const result = await signInWithCredential(auth, googleCredential);
      console.log("User signed in:", result.user);
      router.push("/");  // Redirect user to dashboard after login
    } catch (error) {
      console.error("Error with Google One Tap login:", error);
    }
  };









   


    return (
      <AuthContext.Provider
       value={{ 
        user, setUser
        
      }}
      >
        {children}
      </AuthContext.Provider>
    );
  };


  export default AuthContextProvider



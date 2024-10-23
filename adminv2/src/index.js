import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import MycontextProvider from './context/myContext';
import { AuthContextProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <AuthContextProvider>

  <MycontextProvider>

  <GoogleOAuthProvider clientId={ process.env.REACT_APP_GOOGLE_CLIENT_ID}> {/* Replace with your actual Client ID */}

    
      <App />
      </GoogleOAuthProvider>

  </MycontextProvider>
  </AuthContextProvider>
      </BrowserRouter>



);

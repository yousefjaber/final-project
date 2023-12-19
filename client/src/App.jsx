import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs.jsx";
import Hourly from "./pages/Hourly.jsx";
import CarList from "./pages/CarList.jsx";
import Blog from "./pages/Blog.jsx";
import RootLayout from "./components/Root";
import SignIn from "./pages/SignIn";
import { ToastContainer, toast } from 'react-toastify';import { AuthProvider } from "./context/AuthContext.jsx";
import 'react-toastify/dist/ReactToastify.css';

const Router =createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    children:[
      { path: "/home",element:<Home/>},
      {path:"/CarList",element:<CarList/>},
      {path:"/Hourly",element:<Hourly/>},
      {path:"/ContactUs",element:<ContactUs/>},
      {path:"/Blog",element:<Blog/>},
      {path:"/SignIn",element:<SignIn/>}


    ]
  }
]);

function App() {
  return (
    
<AuthProvider>
      <RouterProvider router={Router} />
      <ToastContainer />
      </AuthProvider>
      
    
  );
}

export default App;

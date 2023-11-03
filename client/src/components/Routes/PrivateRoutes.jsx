import {useState,useEffect} from 'react'
import {useAuth} from  '../../Context/Auth'
import axios from 'axios'
import {Outlet} from "react-router-dom";
import Loader from "../Loader";
const PrivateRoutes = () => {
    const[isAuthenticated,SetisAuthenticated]=useState(false);
    const[auth,SetAuth]=useAuth();

    useEffect(() => {
      
      const check=async()=>{
        const response =await axios(`${import.meta.env.VITE_API_URL}/api/v1/auth/user-auth`,{
            headers:{
                "Authorization":`${auth.token}`
            }
        });

        if(response.data.status === "ok"){
            SetisAuthenticated(true);
        }
        else{
            SetisAuthenticated(false);
        }

      }

      if(auth?.token) check();
    }, [auth?.token])
    
  return  isAuthenticated ?  <Outlet/> :<Loader/>
}

export default PrivateRoutes
import {useState,useEffect} from 'react'
import {useAdminAuth} from  '../../context/AdminAuth'
import axios from 'axios'
import {Outlet} from "react-router-dom";
import Loader from "../../components/common/index"
// import Loader from "../Loader";
const AdminRoutes = () => {
    const[isAuthenticated,SetisAuthenticated]=useState(false);
    const[adminAuth, setAdminAuth]=useAdminAuth();

    useEffect(() => {
      
      const check=async()=>{
        const response =await axios(`${import.meta.env.VITE_API_URL}/api/v1/auth/admin-auth`,{
            headers:{
                "Authorization":`${adminAuth.token}`
            }
        });

        if(response.data.status === "ok"){

            SetisAuthenticated(true);
        }
        else{
          console.log("fail");
            SetisAuthenticated(false);
        }

      }

      if(adminAuth?.token) check();
    }, [adminAuth?.token])
    
  return  isAuthenticated ? <> <Outlet/><h1>You are admin</h1></> :    <Loader />
}

export default AdminRoutes;
import React,{useState,useEffect} from 'react';
import {useAdminAuth} from  '../context/AdminAuth'// Adjust the import path if needed
import axios from 'axios'
const AdminDetails = () => {
    const[adminAuth, setAdminAuth]=useAdminAuth();// Assuming your admin details are available in auth
    const [positions, setPositions] = useState([]);

    // Function to fetch positions from the API
    const fetchPositions = async () => {
      try {
console.log(adminAuth)
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/position/${adminAuth.user.position}`);
        if (response.data ) {
            console.log(response.data);
          setPositions(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching positions:', error);
      }
    };
  
    // Fetch positions when the component mounts
    useEffect(() => {
       
            fetchPositions();

    
    }, []);
  return (
    <div className="flex-1 p-12">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Admin Info</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {adminAuth?.user?.name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Position</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {positions?.name}
            </dd>
          </div>
         
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Police Station</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {adminAuth?.user?.policeStation}
            </dd>
          </div>
      
        </dl>
      </div>
    </div>
  );
};

export default AdminDetails;

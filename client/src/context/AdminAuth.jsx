// AdminContext.js
import { useEffect, createContext, useContext, useState } from 'react';
import axios from 'axios';

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [adminAuth, setAdminAuth] = useState({
    user: null,
    token: '',
  });

  const data = localStorage.getItem('adminAuth');

  axios.defaults.headers.common['Authorization'] = adminAuth?.token;

  useEffect(() => {
    if (data) {
      const parseData = JSON.parse(data);
      setAdminAuth({
        ...adminAuth,
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, [data]);

  return (
    <AdminContext.Provider value={[adminAuth, setAdminAuth]}>
      {children}
    </AdminContext.Provider>
  );
};

const useAdminAuth = () => useContext(AdminContext);

export { useAdminAuth, AdminProvider };

import { useContext, useState, useEffect } from "react";
import { createContext } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const saveStationToLocalStorage = (stationDetails) => {
    localStorage.setItem("stationDetails", JSON.stringify(stationDetails));
  };

  const setStation = (stationIdPara) => {
    console.log("AuthContext", stationIdPara);
    console.log("Set");
    setStationId(stationIdPara);
    saveStationToLocalStorage(stationIdPara);
  };
  const getStationFromLocalStorage = () => {
    return localStorage.getItem("stationDetails");
  };
  const [stationId, setStationId] = useState(
    getStationFromLocalStorage() || null
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    stationId,
    setStation,
    signOut: () => signOut(auth),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

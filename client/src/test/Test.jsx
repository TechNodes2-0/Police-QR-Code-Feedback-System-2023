import React from "react";
import { useAuth } from "../context/AuthContext";

const test = () => {
  const { stationId } = useAuth();
  console.log(stationId);
  return <div></div>;
};

export default test;

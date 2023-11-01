import React from "react";

export default function InfoDisplay({ selectedPoliceStation, username, mobile }) {
  return (
    <div>
      <h1>Collected Information:</h1>
      <p>Selected Police Station: {selectedPoliceStation}</p>
      <p>Username: {username}</p>
      <p>Mobile Number: {mobile}</p>
    </div>
  );
}

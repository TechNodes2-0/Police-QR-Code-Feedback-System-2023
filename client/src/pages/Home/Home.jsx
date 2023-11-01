// import React from "react";
// import QrReader from 'react-qr-reader'

const Home = () => {
  return (
    <div className="bg-blue-100">
      <div className=" h-screen flex justify-around items-center">
        <div className="p-5 flex-col justify-center items-center text-center font-sans">
          <p>Welcome to Anubhuti !</p>
          <p className="text-3xl font-bold">Gujrat Police feedback system</p>

          <div className="bg-white p-10 border-0 rounded-xl shadow-xl block-none">
            <p className=" font-medium text-xl">Scan QR-code</p>
            <img className="w-36 " src="https://www.askdavetaylor.com/wp-content/uploads/2021/02/chrome-webpage-qr-code-3-291x375.jpg" alt="" />
          </div>
        </div>
        <div className="text-center font-semibold text-3xl">

          <img src="https://gujhome.gujarat.gov.in/portal/images/Home/gujaratpolice.png" className="w-48 h-48" alt="" />
          <p>Gujrat Police</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

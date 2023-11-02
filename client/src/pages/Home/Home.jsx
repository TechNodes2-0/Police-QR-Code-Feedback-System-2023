import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-blue-100 min-h-screen flex justify-evenly max-sm:justify-end items-center max-sm:flex-col-reverse pt-20">
      <div className="p-5 flex-col justify-center items-center text-center font-sans">
        <div className="my-8">
          <p className="my-1">Welcome to Anubhuti!</p>
          <p className="text-3xl max-sm:text-2xl font-bold">Gujarat Police feedback system</p>
        </div>

        <div className="bg-white mx-auto w-64 p-10 border-0 rounded-xl shadow-xl">
          <p className="font-medium text-xl">Scan QR-code</p>
          <img
            className="w-36 mx-auto"
            src="https://www.askdavetaylor.com/wp-content/uploads/2021/02/chrome-webpage-qr-code-3-291x375.jpg"
            alt=""
          />
        </div>

        <button className="w-64 px-5 py-2 my-5 border-0 rounded-xl transition duration-200 shadow-lg text-white font-semibold hover:bg-blue-900 bg-blue-600">Give Your Feedback</button>
      </div>
      <div className="text-center font-semibold text-3xl flex-col justify-center items-center">
        <img
          src="https://gujhome.gujarat.gov.in/portal/images/Home/gujaratpolice.png"
          className="mx-auto w-48 h-48 max-sm:w-20 max-sm:h-20 "
          alt=""
        />
        <p className="max-sm:text-xl">Gujarat Police</p>
      </div>
    </div>
  );
};

export default Home;

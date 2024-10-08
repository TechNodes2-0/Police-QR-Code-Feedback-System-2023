import { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Link, useParams ,useNavigate} from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
// Configure Firebase.
const config = {
  apiKey: "AIzaSyCbxIXw-pXevk9nmq2MEonu86uemZCjvCk",
  authDomain: "policefeedbacksystem-5e031.firebaseapp.com",
  projectId: "policefeedbacksystem-5e031",
  storageBucket: "policefeedbacksystem-5e031.appspot.com",
  messagingSenderId: "641111786552",
  appId: "1:641111786552:web:80f40c0c4098317280d2cd",
  measurementId: "G-1MPYYGTN5S",
};

// Configure FirebaseUI.


function SignInScreen() {
  const navigate=useNavigate();
  firebase.initializeApp(config);
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        console.log('signInSuccessWithAuthResult', authResult);
      navigate('/test');
        return false
      }
    },

    // Popup signin flow rather than redirect flow.
    signInFlow: "redirect",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    // signInSuccessUrl: "/feedback",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
  };
  const { qrCodeId } = useParams();
  const { setStation } = useAuth();

  useEffect(() => {
    const fetchQRCodeDetails = async () => {
      const response = await axios.get(
        `http://localhost:3000/qrcodes/${qrCodeId}`
      );
      const stationId = response.data.data;
      setStation(stationId);
    };
    fetchQRCodeDetails();
  }, [qrCodeId]);

  return (
    <div className="flex justify-center items-center min-h-screen py-5 bg-blue-100 border-black border-2 px-5">
      <div className="bg-white max-sm:px-5 pt-5 pb-14 px-10 border-0 rounded-2xl text-center shadow-xl hover:shadow-2xl">
        <img
          className="h-14 w-14 mx-auto my-auto"
          src="https://gujhome.gujarat.gov.in/portal/images/Home/gujaratpolice.png"
          alt=""
        />
        <Link to="/test">Test</Link>
        <p className=" font-medium text-md ">welcome to</p>
        <p className="mb-14 font-bold text-xl">Gujrat Police Feedback System</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </div>
  );
}

export default SignInScreen;

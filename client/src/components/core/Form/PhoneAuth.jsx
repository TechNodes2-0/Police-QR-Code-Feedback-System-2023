// Import FirebaseAuth and firebase.
import React,{useEffect} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Configure Firebase.
const config = {
  apiKey: "AIzaSyCbxIXw-pXevk9nmq2MEonu86uemZCjvCk",
  authDomain: "policefeedbacksystem-5e031.firebaseapp.com",
  projectId: "policefeedbacksystem-5e031",
  storageBucket: "policefeedbacksystem-5e031.appspot.com",
  messagingSenderId: "641111786552",
  appId: "1:641111786552:web:80f40c0c4098317280d2cd",
  measurementId: "G-1MPYYGTN5S"
};




// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/feedback',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
};

function SignInScreen() {

    firebase.initializeApp(config);

  return (
    <div className='flex justify-center items-center min-h-screen bg-blue-100'>

      <div className='bg-white max-sm:px-2 py-20 px-10 border-0 rounded-2xl shadow-xl hover:shadow-2xl'>

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>

    </div>
  );
}

export default SignInScreen
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbxIXw-pXevk9nmq2MEonu86uemZCjvCk",
  authDomain: "policefeedbacksystem-5e031.firebaseapp.com",
  projectId: "policefeedbacksystem-5e031",
  storageBucket: "policefeedbacksystem-5e031.appspot.com",
  messagingSenderId: "641111786552",
  appId: "1:641111786552:web:80f40c0c4098317280d2cd",
  measurementId: "G-1MPYYGTN5S",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

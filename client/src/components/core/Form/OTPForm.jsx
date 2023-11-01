import React, { useState } from "react";
const SERVER_IP = 'http://localhost:5005';

export default function OTPForm({}) {

  const [phone_number, setPhoneNumber] = useState("")
const [password, setPassword] = useState("")
const [codeSent, setCodeSent] = useState(false)
const [code, setCode] = useState("")
async function sendCode(){
  await fetch(SERVER_IP+'/api/send-code',{
  method: 'POST',
  headers: {
    'Accept':'application/json',
    'Content-Type':'application/json'
  },
  body: JSON.stringify({phone_number:phone_number,password:"123456"})
  }).then(response => {
  console.log(response);
  if(response.ok === true) {
    alert("Verification code sent successfully")
    setCodeSent(true);
  }
  else
  alert("Oh no we have an error")
})
}
async function verifyCode(){
  await fetch(SERVER_IP+'/api/verify-code',{
    method: 'POST',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify({phone_number:phone_number, code:code})
    }).then(response => {
    console.log(response);
    if(response.ok === true) {
      alert("Number verified successfully")
    }
    else
    alert("Oh no we have an error")
  })
  }
  return (
    !codeSent?
    <div style={styles.mainDiv}>
      <h1 style={{margin:20}}>Registration form</h1>
     <input onChange={(e) =>setPhoneNumber(e.target.value)} style={styles.input} placeholder="Enter your phone number with international prefix (+17632736140) "/>
     <input onChange={(e) =>setPassword(e.target.value)} style={styles.input} placeholder="Enter your password" type="password"/>
     <button style={styles.registerButton}
     onClick={async() =>await sendCode()}
     >Register</button>
    </div> :
    <div style={styles.mainDiv}>
    <h1 style={{margin:20}}>Code verification</h1>
    <input onChange={(e) =>setCode(e.target.value)} placeholder="Enter your code" style = {styles.input}></input>
    <button
    onClick={async() =>await verifyCode()}
    style={styles.registerButton}>Verify code</button>
    </div>
  );
}

const styles = {
  mainDiv:{
    display: 'flex',
    flexDirection: 'column',
    padding:30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input:{
    width:500,
    height:50,
    margin:10,
    fontSize:15,
    borderRadius:5,
    fontFamily: 'Arial'
  },
  registerButton:{
    width: 500,
    height:50,
    backgroundColor:"purple",
    color:'white',
    borderRadius:10,
    borderWidth:1,
    borderColor:"white",
    fontWeight:'bold',
    fontFamily:'Sans-Serif',
  }

}
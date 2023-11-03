const express = require('express');
const {
  registerController,
  loginController,
  testController,
  forgotpasswordController,
} = require('../controllers/authController.js');
const { isAdmin, requireSignIn } = require('../middleware/authMiddleware');


//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot PAssword ||post
router.post("/forgotpassword", forgotpasswordController);
//test routes
router.get("/test", requireSignIn, isAdmin, testController);



router.get("/user-auth",requireSignIn,(req,res)=>{
  const{user}=req.body;
  res.status(200).json({status:"ok",user});
}) 
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
  const{user}=req.body;
  res.status(200).json({status:"ok",user});
}) 

module.exports= router;

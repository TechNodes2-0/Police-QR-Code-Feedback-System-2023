const userModel = require('../models/userModel.js');
const { comparePassword, hashPassword } = require('./../helpers/authHelper.js');
const JWT = require('jsonwebtoken');


const registerController = async (req, res) => {
  try {
    const { name, email, password, SecurityAnswer,Position, stationID} = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }
   
    if (!SecurityAnswer) {
      return res.send({ error: "SecurityAnswer is Required" });
    }
    if (!Position) {
      return res.send({ error: "position is Required" });
    } if (!stationID) {
      return res.send({ error: " stationID is Required" });
    } 
    //check user
    const exisitingUser = await userModel.findOne({ email});
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await  userModel.create({
      name, email,
      password: hashedPassword,
      SecurityAnswer,position:Position, stationID
    });

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//POST LOGIN
 const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        adddress: user.address,
        role:user.role
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};


 const forgotpasswordController=async(req,res)=>{
  try {
    const{email, SecurityAnswer,newpassword}=req.body;
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!newpassword) {
      return res.send({ error: "Password is Required" });
    }
    if (!SecurityAnswer) {
      return res.send({ error: "SecurityAnswer is Required" });
    }

    const user=await userModel.findOne({email,SecurityAnswer});
    if(!user)
    {
      return res.status(404).send({
        success: false,
        message: "User Not found",
      });
    }
    const hashed =await hashPassword(newpassword);
    await userModel.findByIdAndUpdate(user._id,{
      password:hashed
    });
    res.status(200).send({
      success: true,
      message: "Password Changed successfully",
    })

  } catch (error) {
    console.log(error);
    res.send("Error found at forgot password",error);
    
  }

}
//test controller
 const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

module.exports = {
  registerController,
  loginController,
  forgotpasswordController,
  testController,
};
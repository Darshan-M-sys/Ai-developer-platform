const bcrypt = require("bcryptjs");
const User = require("../models/User");


/* ===========================
   REGISTER USER
=========================== */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // save in session (auto login after register)
    req.session.user = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role:newUser.role
    };

    res.status(201).json({
      success:true,
      message: "User registered successfully",
      user: req.session.user,
    });
  } catch (error) {
    
    res.status(500).json({ message: error.message });
  }
};


exports.updateUser=async(req,res)=>{
  try {
  const existingUser= await User.findOne({_id:req.session.user.id});
  const {name,bio,phone}=req.body;
  const image= req.file?"http://"+req.host+"/uploads/"+req.file.filename :existingUser.avatar;
  existingUser.avatar=image;
  existingUser.name=name || existingUser.name;
  existingUser.bio=bio || existingUser.bio;
  existingUser.phone=phone || existingUser.phone;
  await existingUser.save();
  res.status(200).json({success:true,message:"Updated"});
  } catch (error) {
    console.log(error.message)
     res.status(500).json({ message: error.message });
  }
}
/* ===========================
   LOGIN USER (SESSION BASED)
=========================== */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if(user.role!=="student" && user.role!=="instructor" ){
 return res.status(400).json({message:"Login Denied!]"})
    }

    // if user signed using GitHub
    if (!user.password) {
      return res.status(400).json({
        message: "This account was created using GitHub. Please login with GitHub.",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // store user in session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role:user.role
    };

    res.status(200).json({
      message: "Login successful",
      success:true,
      user: req.session.user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ===========================
   LOGOUT USER
=========================== */
exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("connect.sid");

    res.status(200).json({
      success:true,
      message: "Logged out successfully",
    });
  });
};


/* ===========================
   GET CURRENT USER
=========================== */
exports.getCurrentUser =async (req, res) => {
  const user_data= await User.findOne({_id:req.session.user.id});
  res.status(200).json({data:user_data});
};


/* ===========================
   GITHUB OAUTH SUCCESS
=========================== */
exports.githubSuccess = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect("http://localhost:3000/login");
    }

    // store user in session
    req.session.user = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    };

    // redirect to frontend dashboard
    res.redirect("http://localhost:3000/dashboard");

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ===========================
   GITHUB OAUTH FAILED
=========================== */
exports.githubFailure = (req, res) => {
  res.redirect("http://localhost:3000/login");
};


exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await User.findOne({ email });
           
    if (!existingAdmin || existingAdmin.role !== "admin") {
      return res.status(401).json({ message: "Admin not found" });
    }
 
    const isPasswordMatch = await bcrypt.compare(password, existingAdmin.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    req.session.user = {
      id: existingAdmin._id,
      name: existingAdmin.name,
      email: existingAdmin.email,
      role: existingAdmin.role
    };

    res.status(200).json({
      success: true,
      message: "Admin Login Successful"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
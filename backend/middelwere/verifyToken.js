const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports  = verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if(token != null){
    const decoded = jwt.verify(token, "secrateCode");
    const user = await User.findOne({ email: decoded.email });
    req.user = user;
    next();
    }else{
        res.status(404).json({ message: "Please Login for This Action" });
    }
  } catch (err){
    res.status(500).json({message : err.message})
  }
}


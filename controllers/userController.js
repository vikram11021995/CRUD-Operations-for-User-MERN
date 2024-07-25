const User = require('../models/user');
const authorization = require("../utils/authorization");

exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({email,password});
      if(!user){
          return res.status(404).json({ "message": "User not found"});
      }
      const token = authorization.generateToken({"id":user.id,"username":user.name});
      return res.status(201).json({ "message": "User Logged In Successfully !", data: user, token: token });
  } catch(err){
      console.log("err : ",err);
      return res.status(404).json({"error":err})
  }
}




exports.createUser = async (req, res) => {
    console.log("data", req.body);
  try {
    const { username, password, email } = req.body;
    console.log("req.body", req.body);
    const user = new User({ username, password, email });
    console.log("user", user);
     await user.save();//db call hai, toh async behave krega
    
    res.status(201).json(user);
  } catch (err) {
    console.log("err", err);
    //koi v line try mei agar execute nahi hua toh catch()
    res.status(400).json({ message: err.message });
  }
}
  
  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      console.log("db", users);
      return res.json(users);
      console.log("debug1");
    } catch (err) {
      console.log("debug2");
      return res.status(500).json({ message: err.message });
    }
  }
  
  exports.updateUser = async (req, res) => {
    try {
      // const { id } = req.params;
      const {id} = req.user;
      console.log("cookies data : ", req.user);
      const { username, password, email } = req.body;
      const user = await User.findById(id);
      if (!user) throw new Error('User not found');
      if (username) user.username = username;
      if (password) user.password = password;
      if (email) user.email = email;
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  
  exports.deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
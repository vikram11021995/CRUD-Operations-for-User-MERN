// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  // friends: [4681,4682,..]
});

module.exports = mongoose.model('User', userSchema);


// fetch post
// - myId = req.body();
// - myUserInfo = User.findOne({_id:myId})
// - let frnds = myUserInfo.friends; => [4681,4682,..]
// - let posts = Post.find({createdBy:{$in:[myUd,4681,4682,..]}})
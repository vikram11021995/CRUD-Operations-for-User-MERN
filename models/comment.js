// models/User.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  message: { type: String, required: true },
  createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model('Comment', commentSchema);

// let comment = new Comment({
//   message,
//   createdBy:"4680"
// })
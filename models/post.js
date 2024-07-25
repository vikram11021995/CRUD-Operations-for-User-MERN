// models/User.js
const mongoose = require('mongoose');

const mongoosePaginate = require('mongoose-paginate-v2');

const postSchema = new mongoose.Schema({
  message: { type: String, required: true },
  comments: [
    // {
    //   "message":"nice picture",
    //   "commentedBy":"4680",
    //   "commentedAt":"9 am"
    // },
    // {
    //   "message":"nice",
    //   "commentedBy":"4681",
    //   "commentedAt":"10 am"
    // }
    // "comment-id-01",
    // "comment-id-02"
    { type: mongoose.Types.ObjectId, ref: 'Comment', required: true }
  ],
  createdBy: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
});

postSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', postSchema);

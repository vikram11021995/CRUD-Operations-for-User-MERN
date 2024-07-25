const Post = require('../models/post');
// const User = require("../models/user");
const mongoose = require("mongoose");

exports.getPostById = async (req, res) => {
  try{
      const postId = req.params.id;
      console.log("postId : ",postId);
      // const post = await Post.aggregate([
      //   {
      //     $match: {
      //       _id: new mongoose.Types.ObjectId(postId)
      //     }
      //   },
      //   {
      //     $lookup: {
      //       from: 'users',
      //       localField: 'createdBy',
      //       foreignField: '_id',
      //       as: 'createdBy'
      //     }
      //   },
      //   {
      //     $project: {
      //       message: 1,
      //       createdBy: {
      //         $arrayElemAt: ['$createdBy', 0]
      //       },
      //       comments: 1
      //     }
      //   },
      //   {
      //     $lookup: {
      //       from: 'comments',
      //       localField: 'comments',
      //       foreignField: '_id',
      //       as: 'comments'
      //     }
      //   }
      // ]);
      // const post = await Post.findOne({_id:postId})
      //   .populate("createdBy")
      //   .populate({path: "comments"});
      const post = await Post.findOne({_id:postId})
        .populate("createdBy")
        .populate({
          path: 'comments',
          populate:{ path: 'createdBy' }
        });
      res.status(201).json(post);
  }
  catch(err){
      console.log("error", err);
      res.status(400).json(err)
  }
}

exports.createPost = async (req, res) => {
    try{
        const {message, createdBy} = req.body;

        const post = new Post({message, createdBy});
        console.log("post", post);
        await post.save();
        res.status(201).json(post);


    } catch(err) {
        console.log("error posts", err);
        res.status(400).json({ message: err.message });
    }
}

// exports.getPostsByUser = async (req, res) => {
//     try{
//         const {userId} = req.query;
//         const post = await Post.find({createdBy: userId});
//         console.log("post data to db req", post);
//         res.status(201).json({posts:post});
//     }
//     catch(err){
//         console.log("error", err);
//         res.status(400).json(err)
//     }
// }

exports.getPostsByUser = async (req, res) => {
  try{
      const {userId, page = 1, limit = 10} = req.query;
      const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10)
      };
      const posts = await Post.paginate({createdBy: userId}, options);
      res.status(200).json(posts);
  }
  catch(err){
      console.log("error", err);
      res.status(400).json(err)
  }
}





exports.updatePost = async (req, res) => {
    try {
      const { id } = req.params;
      const { message, createdBy } = req.body;
      const post = await Post.findById(id);
      if (!post) throw new Error('Post not found');
      if (message) post.message = message;
    //   if (createdBy) post.createdBy = createdBy;
      
      await post.save();
      res.json(post);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  
  exports.deletePost = async (req, res) => {
    try {
      const { id } = req.params;
      await Post.findByIdAndDelete(id);
      res.json({ message: 'Post deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
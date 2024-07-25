const Comment = require('../models/comment');
const Post = require("../models/post");

exports.createComment = async (req, res) => {
    try{
        const {message, createdBy, postId} = req.body;
        console.log("req.body", req.body);
        let post = await Post.findOne({_id:postId});
        if(!post) return res.status(401).json({"message":`Invalid postId ${postId}. Post not found.`});

        const comment = new Comment({message, createdBy});
        console.log("comment", comment);
        await comment.save();
        if(!post.comments) {
            post.comments=[comment._id];
        } else {
            post.comments.push(comment._id);
        }
        
        await post.save();
        res.status(201).json(comment);


    } catch(err) {
        console.log("error posts", err);
        res.status(400).json({ message: err.message });
    }
}

//getCommentById
exports.getCommentById = async (req, res) => {
    try{
        const commentId = req.params.id;
        // console.log("req.query : ",req.query);
        console.log("req.params : ",req.params);
        // const comment = await Comment.findById(commentId);
        const comment = await Comment.findOne({"_id":commentId});
        console.log("fetch comment by comment ID: ",comment);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        console.log('Comment data:', comment);
        res.status(200).json(comment);

    }
    catch(err){
        console.error('Error getting comment by ID:', err);
        res.status(500).json({ message: 'Failed to get comment' });
    }
}


//update comment
exports.updateCommentById = async (req, res) => {
    try {
        const commentId = req.params.id;
        console.log("--------------------------------------------------commentId", commentId);
        const { message } = req.body;
        console.log("-------------------------------------------------------comment req.body", req.body);

        const comment = await Comment.findOne({"_id":commentId});

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // if (comment.createdBy !== createdBy) {
        //     return res.status(403).json({ message: 'Unauthorized to update this comment' });
        // }

        comment.message = message;
        await comment.save();

        res.status(200).json({ message: 'Comment updated successfully', comment });
    } catch (err) {
        console.error('Error updating comment:', err);
        res.status(500).json({ message: 'Failed to update comment' });
    }
};


//delete comment
exports.deleteCommentById = async (req, res) => {
    try {
        const commentId = req.params.id;
        console.log("delete commentId", commentId);

        const comment = await Comment.findOne({"_id":commentId});
        console.log("delete comment", comment);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // if (comment.createdBy !== createdBy) {
        //     return res.status(403).json({ message: 'Unauthorized to delete this comment' });
        // }

        await Comment.findByIdAndDelete(commentId);

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        console.error('Error deleting comment:', err);
        res.status(500).json({ message: 'Failed to delete comment' });
    }
};
const express = require('express');
const {validate} = require('express-validation');
const commentController = require('../controllers/commentsController');
// const commentValidation = require("./validation/comment.validation");
// const authorization = require("../utils/authorization");

const router = express.Router();

router.post('/', commentController.createComment);

router.get('/:id', commentController.getCommentById);

router.put('/:id', commentController.updateCommentById);

router.delete('/:id', commentController.deleteCommentById);


module.exports = router;



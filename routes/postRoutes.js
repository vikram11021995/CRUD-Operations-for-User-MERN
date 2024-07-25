const express = require('express');
const {validate} = require('express-validation');

const postController = require('../controllers/postController');
const postValidation = require("./validation/post.validation");


const router = express.Router();

router.get('/:id', postController.getPostById);
router.post('/', validate(postValidation.createPost), postController.createPost);
router.get('/', postController.getPostsByUser);
router.patch('/:id', validate(postValidation.createPost), postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;

const express = require('express');
const {validate} = require('express-validation');
const userController = require('../controllers/userController');
const userValidation = require("./validation/user.validation");
const authorization = require("../utils/authorization");

const router = express.Router();

router.post("/login", userController.login);

router.post('/', validate(userValidation.createUser), userController.createUser);
router.get('/', authorization.jwtVerifyToken, userController.getAllUsers);
//next() - 
// router.patch('/:id', authorization.jwtVerifyToken, validate(userValidation.createUser), userController.updateUser);
router.patch('/', authorization.jwtVerifyToken, validate(userValidation.createUser), userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;

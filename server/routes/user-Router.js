const express = require('express');
const userControllers = require('../controllers/user-controller');
const userRouter = express.Router();


userRouter.route('/register').post(userControllers?.userCreate);
userRouter.route('/login').post(userControllers?.loginUser);
// userRouter.route('/').get(userControllers?.getAllUser)
userRouter.route('/').get(userControllers?.getUserProfile)

module.exports = userRouter;
// import { Router } from "express";
// import userController from "../controllers/userController";
// import { protect } from "../middleware/authMiddleware";

// const userRoutes: Router = Router();

// userRoutes.post("/register", userController.register);
// userRoutes.post("/login", userController.login);
// userRoutes.get('/getoneuser/:userId',protect,userController.getOneUser)



// export default userRoutes;

const express = require("express");
const userController=  require( "../controllers/userController")
const  protect = require( "../middleware/authMiddleware")

const userRoutes = express.Router();

userRoutes.post("/register", userController.register);
userRoutes.post("/login", userController.login);
userRoutes.get('/getoneuser/:userId', protect, userController.getOneUser);

module.exports = userRoutes;


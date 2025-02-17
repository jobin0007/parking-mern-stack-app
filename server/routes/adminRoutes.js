// import { Router } from "express";
// import adminController from "../controllers/adminControllers";
// import { protect } from "../middleware/authMiddleware";

// const adminRoutes: Router = Router();

// adminRoutes.post("/register", adminController.register);
// adminRoutes.post("/login", adminController.login);
// adminRoutes.get('/getoneadmin/:adminId',protect,adminController.getOneAdmin)



// export default adminRoutes;


const express = require('express')
const adminController = require("../controllers/adminControllers")
const protect = require("../middleware/errorMiddleware")


const adminRoutes = express.Router()


adminRoutes.post("/register", adminController.register);
adminRoutes.post("/login", adminController.login);
adminRoutes.get('/getoneadmin/:adminId', protect, adminController.getOneAdmin);

module.exports= adminRoutes;

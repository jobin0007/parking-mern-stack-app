// import express, { Router } from "express";
// import userRoutes from "./userRoutes"; 
// import parkingRoutes from "./parkingRoutes";
// import adminRoutes from "./adminRoutes"; 
// import parkingSpotRoutes from "./parkingSpotRoutes";
// import paymentRoutes from "./paymentRoutes";


// const routes: Router = express.Router();

// routes.use("/admin", adminRoutes);
// routes.use("/payment",paymentRoutes)
// routes.use("/user", userRoutes);
// routes.use('/parking',parkingRoutes)
// routes.use('/parking-spot',parkingSpotRoutes)

// export default routes;

const express = require('express')
const adminRoutes = require('./adminRoutes')

const  paymentRoutes = require('./paymentRoutes')


const  userRoutes = require('./userRoutes')

const  parkingRoutes = require('./parkingRoutes')
const  parkingSpotRoutes= require('./parkingSpotRoutes')



const routes = express();

routes.use("/admin", adminRoutes);
routes.use("/payment", paymentRoutes);
routes.use("/user", userRoutes);
routes.use('/parking', parkingRoutes);
routes.use('/parking-spot', parkingSpotRoutes);

module.exports = routes;

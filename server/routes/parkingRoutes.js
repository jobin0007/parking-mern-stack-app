// import express from "express";

// import { Router } from "express";
// import parkingControllers from "../controllers/parkingControllers";
// import { protect } from "../middleware/authMiddleware";

// const parkingRoutes: Router = Router();







// parkingRoutes.post("/park/:parkingSpotId", protect,parkingControllers.parkVehicle);



// parkingRoutes.post("/checkout/:bookingId",protect, parkingControllers.checkout );


// export default parkingRoutes


const express = require( "express")
const  protect = require("../middleware/authMiddleware")
const parkingControllers = require( "../controllers/parkingControllers")


const parkingRoutes = express.Router();

parkingRoutes.post("/park/:parkingSpotId", protect, parkingControllers.parkVehicle);

parkingRoutes.post("/checkout/:bookingId", protect, parkingControllers.checkout);

module.exports = parkingRoutes;

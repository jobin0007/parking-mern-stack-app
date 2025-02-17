// import { Router } from "express";
// import { protect } from "../middleware/authMiddleware";
// import parkingSpotControllers from "../controllers/parkingSpotControllers";
// import parkingControllers from "../controllers/parkingControllers";

// const parkingSpotRoutes: Router = Router();

// parkingSpotRoutes.get("/search-spots",parkingSpotControllers.getAvailableParkingSpots);



// parkingSpotRoutes.get('/spot/:spotId/rate', parkingSpotControllers.getParkingSpotRate);


// parkingSpotRoutes.post("/create-parking", protect, parkingSpotControllers.createParkingSpot);


// parkingSpotRoutes.get('/find-my-vehicle',protect, parkingSpotControllers.findMyVehicle);
// parkingSpotRoutes.get('/all-parking-spots', parkingSpotControllers.getAllParkingSpots);
// parkingSpotRoutes.delete('/delete-spot/:spotId',protect,parkingSpotControllers.deleteParkingSpot)

// parkingSpotRoutes.put("/update-parkingspots/:spotId", protect, parkingSpotControllers.updateParkingSpotAvailability);




// export default parkingSpotRoutes;


const express = require("express")
const parkingSpotControllers = require( "../controllers/parkingSpotControllers")
const protect = require("../middleware/authMiddleware")


const parkingSpotRoutes = express.Router()

parkingSpotRoutes.get("/search-spots", parkingSpotControllers.getAvailableParkingSpots);

parkingSpotRoutes.get('/spot/:spotId/rate', parkingSpotControllers.getParkingSpotRate);

parkingSpotRoutes.post("/create-parking", protect, parkingSpotControllers.createParkingSpot);

parkingSpotRoutes.get('/find-my-vehicle', protect, parkingSpotControllers.findMyVehicle);
parkingSpotRoutes.get('/all-parking-spots', parkingSpotControllers.getAllParkingSpots);
parkingSpotRoutes.delete('/delete-spot/:spotId', protect, parkingSpotControllers.deleteParkingSpot);

parkingSpotRoutes.put("/update-parkingspots/:spotId", protect, parkingSpotControllers.updateParkingSpotAvailability);

module.exports = parkingSpotRoutes;

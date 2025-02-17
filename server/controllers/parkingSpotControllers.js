// import { Request, Response } from 'express';
// import asyncHandler from 'express-async-handler';

// import mongoose from "mongoose";
// import { AuthRequest } from '../middleware/authMiddleware';
// import ParkingSpot, { IParkingSpot } from '../models/ParkingSpotSchema';
// import Booking from '../models/bookingSchema';



// interface IRate {
//   firstHour: number;
//   additionalHour: number;
// }

// interface ILocation {
//   address: string;
//   city: string;
//   state?: string;
//   country?: string;
//   postalCode?: string;
// }

// interface ICreateParkingSpotRequest {
//   location: ILocation;
//   vehicleType: 'car' | 'bike';
//   rate: IRate;
// }

// const parkingSpotControllers = {
//       createParkingSpot: asyncHandler(
//           async (req: AuthRequest, res: Response): Promise<void> => {
//             const adminId = req.admin; 
//             const { location, vehicleType, rate } = req.body;
//               console.log("admin",adminId);
              
//             if (!adminId) {
//               res.status(401).json({ message: "Unauthorized" });
//               return;
//             }
    
    
//         if (!location || !vehicleType || !rate) {
//           res.status(400).json({ message: "Location, vehicle type, and rate are required." });
//           return;
//         }

//         if (typeof rate.firstHour !== 'number' || typeof rate.additionalHour !== 'number') {
//           res.status(400).json({ message: "Rate values must be numbers." });
//           return;
//         }

//         if (typeof location.address !== 'string' || typeof location.city !== 'string') {
//           res.status(400).json({ message: "Location must include valid address and city." });
//           return;
//         }

//         const existingSpot = await ParkingSpot.findOne({
//           "location.address": location.address,
//           "location.city": location.city,
//           vehicleType,
//           isAvailable: true,  
//         });

//         if (existingSpot) {
//           res.status(409).json({ message: "A parking spot already exists at this location for the given vehicle type." });
//           return;
//         }

//         const newSpot: IParkingSpot = new ParkingSpot({
//           location,
//           vehicleType,
//           rate,
//         });

//         await newSpot.save();
//   console.log("spot",newSpot)
//         res.status(201).json(newSpot); 
//       }
//     ),
//     getAllParkingSpots : asyncHandler(async (req: Request, res: Response): Promise<void> => {
//       try {
//         const spots = await ParkingSpot.find();
        
//         if (!spots || spots.length === 0) {
//           res.status(404).json({ message: "No parking spots found." });
//           return;
//         }
    
//         res.status(200).json({ spots });
//       } catch (error) {
//         console.error("Error fetching parking spots:", error);
//         res.status(500).json({ message: "Server error." });
//       }
//     }),
//     deleteParkingSpot : asyncHandler(
//       async (req:  AuthRequest, res: Response): Promise<void> => {
//         try {
//           const { spotId } = req.params;
//           const adminId = req.admin; 
//           if (!adminId) {
//             res.status(401).json({ message: "Unauthorized" });
//             return;
//           }
    
//           const spot = await ParkingSpot.findById(spotId);
    
//           if (!spot) {
//             res.status(404).json({ message: "Parking spot not found." });
//             return;
//           }
    
//           await spot.deleteOne(); // Deletes the document from MongoDB
    
//           res.status(200).json({ message: "Parking spot deleted successfully." });
//         } catch (error) {
//           console.error("Error deleting spot:", error);
//           res.status(500).json({ message: "Server error." });
//         }
//       }
//     ),
//     findMyVehicle: asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
//       try {
//           const { vehicleNumber } = req.query;
//           const userId = req.user; 
  
//           if (!userId) {
//               res.status(401).json({ message: "Unauthorized. Please log in." });
//               return;
//           }
  
//           if (!vehicleNumber && !userId) {
//               res.status(400).json({ message: "Please provide either vehicle number or user ID." });
//               return;
//           }
  
    
         
         
//           const booking = await Booking.findOne({ vehicleNumber });
      
  
          
  
//           if (!booking) {
//               res.status(404).json({ message: "Vehicle not found." });
//               return;
//           }
  
//           const spot = await ParkingSpot.findById(booking.parkingSpotId);
//           if (!spot) {
//               res.status(404).json({ message: "Parking spot not found." });
//               return;
//           }
  
//           res.status(200).json({
//               message: "Vehicle found",
//               vehicleDetails: {
//                   bookingId: booking._id,
//                   vehicleNumber: booking.vehicleNumber,
//                   vehicleType:booking.vehicleType,
//                   userId: booking.userId,
//                   parkingSpotId: booking.parkingSpotId,
//                   spotLocation: spot.location,  
//                   startTime: booking.startTime,
//                   endTime:booking.endTime,
//                   isAvailable: spot.isAvailable,
//                   paymentStatus:booking.paymentStatus
//               },
//           });
//       } catch (error) {
//           console.error(error);
//           res.status(500).json({ message: "Internal Server Error" });
//       }
//   }),
  
  
  
// //   findMyVehicle: asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
// //     try {
// //         const { vehicleNumber } = req.body;
// //         const userId = req.user; 

// //         if (!userId) {
// //             res.status(401).json({ message: "Unauthorized. Please log in." });
// //             return;
// //         }

// //         if (!vehicleNumber && !userId) {
// //             res.status(400).json({ message: "Please provide either vehicle number or user ID." });
// //             return;
// //         }

  
// //         let booking;
// //         if (vehicleNumber) {
// //             booking = await Booking.findOne({ vehicleNumber });
// //         }

// //         if (!booking && userId) {
// //             booking = await Booking.findOne({ userId });
// //         }

// //         if (!booking) {
// //             res.status(404).json({ message: "Vehicle not found." });
// //             return;
// //         }

// //         const spot = await ParkingSpot.findById(booking.parkingSpotId);
// //         if (!spot) {
// //             res.status(404).json({ message: "Parking spot not found." });
// //             return;
// //         }

// //         res.status(200).json({
// //             message: "Vehicle found",
// //             vehicleDetails: {
// //                 vehicleNumber: booking.vehicleNumber,
// //                 userId: booking.userId,
// //                 parkingSpotId: booking.parkingSpotId,
// //                 spotLocation: spot.location,  
// //                 startTime: booking.startTime,
// //                 isAvailable: spot.isAvailable,
// //             },
// //         });
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ message: "Internal Server Error" });
// //     }
// // }),
// getAvailableParkingSpots: asyncHandler(async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { location, vehicleType } = req.query;

//     let query: any = { isAvailable: true }; // Only show available spots

//     if (location) {
//       query["location.address"] = location as string;
//     }
//     if (vehicleType) {
//       query.vehicleType = vehicleType as string;
//     }

//     const availableSpots = await ParkingSpot.find(query);

//     if (!availableSpots.length) {
//       res.status(404).json({ message: "No available parking spots found." });
//       return;
//     }

//     res.status(200).json(availableSpots);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error." });
//   }
// }),



//   //  getAvailableParkingSpots : asyncHandler(
//   //   async (req: Request, res: Response): Promise<void> => {
//   //     try {
//   //       const { location, vehicleType } = req.query;
    
//   //       if (!location || !vehicleType) {
//   //         res.status(400).json({ message: "Location and vehicleType are required." });
//   //         return;
//   //       }
    
//   //       const locationStr = location as string;
//   //       const vehicleTypeStr = vehicleType as string;
    
//   //       const availableSpots = await ParkingSpot.find({
//   //         "location.address": locationStr, 
//   //         vehicleType: vehicleTypeStr,
//   //         isAvailable: true, 
//   //       });
    
//   //       if (availableSpots.length === 0) {
//   //         res.status(404).json({ message: "No available parking spots found." });
//   //         return;
//   //       }
    
//   //       res.status(200).json(availableSpots);
//   //     } catch (err) {
//   //       console.error(err);
//   //       res.status(500).json({ message: "Server error." });
//   //     }
//   //   }
//   // ),
//   updateParkingSpotAvailability : asyncHandler(
//     async (req: AuthRequest, res: Response): Promise<void> => {
//     try {
//         const adminId = req.admin; 
//       const { spotId } = req.params;
//       const { isAvailable } = req.body;
//       if (!adminId) {
//         res.status(401).json({ message: "Unauthorized" });
//         return;
//       }
//       if (typeof isAvailable !== "boolean") {
//          res.status(400).json({ message: "isAvailable must be a boolean." });
//          return;
//       }
  
//       const spot = await ParkingSpot.findById(spotId);
  
//       if (!spot) {
//          res.status(404).json({ message: "Parking spot not found." });
//          return;
//       }
  
//       spot.isAvailable = isAvailable;
//       await spot.save();  
  
//       res.status(200).json({ message: "Parking spot availability updated successfully.", spot });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error." });
//     }
//   }),
//   getParkingSpotRate: asyncHandler(async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { spotId } = req.params;
//         const { vehicleType, duration } = req.query;

     
//         if (!mongoose.Types.ObjectId.isValid(spotId)) {
//             res.status(400).json({ message: "Invalid parking spot ID format." });
//             return;
//         }

//         const validVehicleTypes: 'car' | 'bike' = (vehicleType as 'car' | 'bike') || 'car';

//         const parsedDuration = duration ? parseFloat(duration as string) : 1;

//         const spot = await ParkingSpot.findById(spotId);

//         if (!spot) {
//             res.status(404).json({ message: "Parking spot not found." });
//             return;
//         }

//         const rateBoard = {
//             car: { baseRate: 50, additionalRate: 30 },
//             bike: { baseRate: 30, additionalRate: 20 },
//         };

//         const rates = rateBoard[validVehicleTypes];

//         let totalRate = rates.baseRate;
//         if (parsedDuration > 1) {
//             totalRate += (parsedDuration - 1) * rates.additionalRate;
//         }

//         res.status(200).json({
//             rate: totalRate,
//             vehicleType: validVehicleTypes,
//             duration: parsedDuration,
//             details: `₹${rates.baseRate} for the first hour, ₹${rates.additionalRate} for each additional hour.`,
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error." });
//     }
// })
  
// };

// export default parkingSpotControllers;



const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const ParkingSpot = require('../models/ParkingSpotSchema.js');
const Booking = require('../models/bookingSchema.js');

const parkingSpotControllers = {
  createParkingSpot: asyncHandler(
    async (req, res) => {
      const adminId = req.admin;
      const { location, vehicleType, rate } = req.body;
      console.log("admin", adminId);

      if (!adminId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      if (!location || !vehicleType || !rate) {
        res.status(400).json({ message: "Location, vehicle type, and rate are required." });
        return;
      }

      if (typeof rate.firstHour !== 'number' || typeof rate.additionalHour !== 'number') {
        res.status(400).json({ message: "Rate values must be numbers." });
        return;
      }

      if (typeof location.address !== 'string' || typeof location.city !== 'string') {
        res.status(400).json({ message: "Location must include valid address and city." });
        return;
      }

      const existingSpot = await ParkingSpot.findOne({
        "location.address": location.address,
        "location.city": location.city,
        vehicleType,
        isAvailable: true,
      });

      if (existingSpot) {
        res.status(409).json({ message: "A parking spot already exists at this location for the given vehicle type." });
        return;
      }

      const newSpot = new ParkingSpot({
        location,
        vehicleType,
        rate,
      });

      await newSpot.save();
      console.log("spot", newSpot)
      res.status(201).json(newSpot);
    }
  ),
  
  getAllParkingSpots: asyncHandler(async (req, res) => {
    try {
      const spots = await ParkingSpot.find();

      if (!spots || spots.length === 0) {
        res.status(404).json({ message: "No parking spots found." });
        return;
      }

      res.status(200).json({ spots });
    } catch (error) {
      console.error("Error fetching parking spots:", error);
      res.status(500).json({ message: "Server error." });
    }
  }),

  deleteParkingSpot: asyncHandler(
    async (req, res) => {
      try {
        const { spotId } = req.params;
        const adminId = req.admin;
        if (!adminId) {
          res.status(401).json({ message: "Unauthorized" });
          return;
        }

        const spot = await ParkingSpot.findById(spotId);

        if (!spot) {
          res.status(404).json({ message: "Parking spot not found." });
          return;
        }

        await spot.deleteOne();

        res.status(200).json({ message: "Parking spot deleted successfully." });
      } catch (error) {
        console.error("Error deleting spot:", error);
        res.status(500).json({ message: "Server error." });
      }
    }
  ),

  findMyVehicle: asyncHandler(async (req, res) => {
    try {
      const { vehicleNumber } = req.query;
      const userId = req.user;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized. Please log in." });
        return;
      }

      if (!vehicleNumber && !userId) {
        res.status(400).json({ message: "Please provide either vehicle number or user ID." });
        return;
      }

      const booking = await Booking.findOne({ vehicleNumber });

      if (!booking) {
        res.status(404).json({ message: "Vehicle not found." });
        return;
      }

      const spot = await ParkingSpot.findById(booking.parkingSpotId);
      if (!spot) {
        res.status(404).json({ message: "Parking spot not found." });
        return;
      }

      res.status(200).json({
        message: "Vehicle found",
        vehicleDetails: {
          bookingId: booking._id,
          vehicleNumber: booking.vehicleNumber,
          vehicleType: booking.vehicleType,
          userId: booking.userId,
          parkingSpotId: booking.parkingSpotId,
          spotLocation: spot.location,
          startTime: booking.startTime,
          endTime: booking.endTime,
          isAvailable: spot.isAvailable,
          paymentStatus: booking.paymentStatus
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }),

  getAvailableParkingSpots: asyncHandler(async (req, res) => {
    try {
      const { location, vehicleType } = req.query;

      let query = { isAvailable: true };

      if (location) {
        query["location.address"] = location;
      }
      if (vehicleType) {
        query.vehicleType = vehicleType;
      }

      const availableSpots = await ParkingSpot.find(query);

      if (!availableSpots.length) {
        res.status(404).json({ message: "No available parking spots found." });
        return;
      }

      res.status(200).json(availableSpots);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error." });
    }
  }),

  updateParkingSpotAvailability: asyncHandler(
    async (req, res) => {
      try {
        const adminId = req.admin;
        const { spotId } = req.params;
        const { isAvailable } = req.body;

        if (!adminId) {
          res.status(401).json({ message: "Unauthorized" });
          return;
        }
        if (typeof isAvailable !== "boolean") {
          res.status(400).json({ message: "isAvailable must be a boolean." });
          return;
        }

        const spot = await ParkingSpot.findById(spotId);

        if (!spot) {
          res.status(404).json({ message: "Parking spot not found." });
          return;
        }

        spot.isAvailable = isAvailable;
        await spot.save();

        res.status(200).json({ message: "Parking spot availability updated successfully.", spot });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
      }
    }
  ),

  getParkingSpotRate: asyncHandler(async (req, res) => {
    try {
      const { spotId } = req.params;
      const { vehicleType, duration } = req.query;

      if (!mongoose.Types.ObjectId.isValid(spotId)) {
        res.status(400).json({ message: "Invalid parking spot ID format." });
        return;
      }

      const validVehicleTypes = vehicleType || 'car';
      const parsedDuration = duration ? parseFloat(duration) : 1;

      const spot = await ParkingSpot.findById(spotId);

      if (!spot) {
        res.status(404).json({ message: "Parking spot not found." });
        return;
      }

      const rateBoard = {
        car: { baseRate: 50, additionalRate: 30 },
        bike: { baseRate: 30, additionalRate: 20 },
      };

      const rates = rateBoard[validVehicleTypes];

      let totalRate = rates.baseRate;
      if (parsedDuration > 1) {
        totalRate += (parsedDuration - 1) * rates.additionalRate;
      }

      res.status(200).json({
        rate: totalRate,
        vehicleType: validVehicleTypes,
        duration: parsedDuration,
        details: `₹${rates.baseRate} for the first hour, ₹${rates.additionalRate} for each additional hour.`,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error." });
    }
  })
};

module.exports = parkingSpotControllers;

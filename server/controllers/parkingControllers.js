
// import { Request, Response } from "express";
// import asyncHandler from "express-async-handler";
// import mongoose from 'mongoose';
// import ParkingSpot from "../models/ParkingSpotSchema";
// import calculateFee from "./feeCalculation/calculateFee";
// import Booking from "../models/bookingSchema";
// import { AuthRequest } from "../middleware/authMiddleware";





// interface ParkingSpotDocument extends mongoose.Document {
//   rate: number;
//   isAvailable: boolean;
// }

// interface BookingDocument extends mongoose.Document {
//   vehicleNumber: any;
//   bookingId: string;
//   startTime: Date;
//   endTime?: Date;
//   totalFee?: number;
//   parkingSpotId: ParkingSpotDocument;
// }

// const parkingControllers={
  
//     parkVehicle : asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
//         try {
//             const { parkingSpotId } = req.params;
//             const { vehicleNumber } = req.body;
//             const userId = req.user;
    
//             console.log("Parking request received:",  userId );
    
//             // Ensure user is authenticated
//             if (!userId) {
//              res.status(401).json({ message: "Unauthorized: User not found" });
//              return
//             }
    
//             // Validate parkingSpotId format
//             if (!mongoose.Types.ObjectId.isValid(parkingSpotId)) {
//                 res.status(400).json({ message: "Invalid parking spot ID format." });
//                 return
//             }
    
//             // Ensure vehicle number is provided
//             if (!vehicleNumber) {
//                  res.status(400).json({ message: "Vehicle number is required." });
//                  return
//             }
    
//             // Fetch parking spot
//             const spot = await ParkingSpot.findById(parkingSpotId);
//             if (!spot) {
//                 res.status(404).json({ message: "Parking spot not found" });
//                 return
//             }
    
//             // Check availability
//             if (!spot.isAvailable) {
//                 res.status(400).json({ message: "Spot is not available" });
//                 return
//             }
    
//             // Mark parking spot as occupied
//             spot.isAvailable = false;
//             await spot.save();
    
//             console.log("Updated parking spot:", spot);
    
//             // Ensure userId is a valid ObjectId
//             if (!mongoose.Types.ObjectId.isValid(userId.toString())) {
//               res.status(400).json({ message: "Invalid user ID format." });
//               return
//             }
    
//             // Create booking with required vehicleType
//             const booking = new Booking({
//                 userId,
//                 parkingSpotId,
//                 vehicleNumber,
//                 vehicleType: spot.vehicleType, // FIXED: Added vehicleType
//                 startTime: new Date(),
//             });
    
//             await booking.save();
    
//             console.log("Booking created successfully:", booking);
    
//             res.status(201).json({
//                 message: "Vehicle parked successfully",
//                 booking: {
//                     bookingId: booking._id,
//                     userId,
//                     vehicleNumber,
//                     startTime: booking.startTime,
//                     parkingSpot: {
//                         parkingSpotId: spot._id,
//                         location: spot.location,
//                         vehicleType: spot.vehicleType,
//                         rate: spot.rate,
//                         isAvailable: spot.isAvailable,
//                     },
//                 },
//             });
//         } catch (error) {
//             console.error("Error parking vehicle:", error);
//             res.status(500).json({ message: "Internal Server Error", error: (error as Error).message });
//         }
//     }),
    
          
//     checkout : asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
//         try {
//           const { bookingId } = req.params; 
      
//           const booking = await Booking.findById(bookingId)
//             .populate('parkingSpotId') 
//             .exec() as any;  
      
//           if (!booking || booking.endTime) {
//             res.status(400).json({ message: 'Invalid booking or already checked out' });
//             return;
//           }
      
//           booking.endTime = new Date();
      
//           if (booking.parkingSpotId) {
//             const { vehicleType } = booking.parkingSpotId;

//             let { firstHour, additionalHour } = booking.parkingSpotId.rate;
//             if (vehicleType === 'car') {
//                 firstHour = 50; 
//                 additionalHour = 30; 
//             } else if (vehicleType === 'bike') {
//                 firstHour = 30; 
//                 additionalHour = 20; 
//             }
//             console.log('Rate:', firstHour, additionalHour);
      
//             booking.totalFee = calculateFee(booking.startTime, booking.endTime, firstHour, additionalHour);
//           }
      
//           await booking.save();
      
//           const spot = booking.parkingSpotId;
//           if (spot) {
//             spot.isAvailable = true;
//             await spot.save();
//           }
      
//           res.json({
//             message: 'Checkout successful',
//             receipt: {
//                 bookingId: booking._id,
//                 vehicleNumber: booking.vehicleNumber,
//                 parkingSpotId: booking.parkingSpotId._id,
//                 vehicleType: booking.parkingSpotId.vehicleType, 
//                 startTime: booking.startTime,
//                 endTime: booking.endTime,
//                 totalFee: booking.totalFee, 
//                 paymentStatus:booking.paymentStatus
        
//             },
//         });
//         } catch (error) {
//           console.error(error);
//           res.status(500).json({ message: 'Internal Server Error' });
//         }
//       })   
      
        
//     }
      
    
      





 
// export default parkingControllers


const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const ParkingSpot = require("../models/ParkingSpotSchema.js");
const calculateFee = require("./feeCalculation/calculateFee.js");
const Booking = require("../models/bookingSchema.js");

const parkingControllers = {
  parkVehicle: asyncHandler(async (req, res) => {
    try {
      const { parkingSpotId } = req.params;
      const { vehicleNumber } = req.body;
      const userId = req.user;

      console.log("Parking request received:", userId);

      if (!userId) {
        res.status(401).json({ message: "Unauthorized: User not found" });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(parkingSpotId)) {
        res.status(400).json({ message: "Invalid parking spot ID format." });
        return;
      }

      if (!vehicleNumber) {
        res.status(400).json({ message: "Vehicle number is required." });
        return;
      }

      const spot = await ParkingSpot.findById(parkingSpotId);
      if (!spot) {
        res.status(404).json({ message: "Parking spot not found" });
        return;
      }

      if (!spot.isAvailable) {
        res.status(400).json({ message: "Spot is not available" });
        return;
      }

      spot.isAvailable = false;
      await spot.save();

      console.log("Updated parking spot:", spot);

      if (!mongoose.Types.ObjectId.isValid(userId.toString())) {
        res.status(400).json({ message: "Invalid user ID format." });
        return;
      }

      const booking = new Booking({
        userId,
        parkingSpotId,
        vehicleNumber,
        vehicleType: spot.vehicleType, // FIXED: Added vehicleType
        startTime: new Date(),
      });

      await booking.save();

      console.log("Booking created successfully:", booking);

      res.status(201).json({
        message: "Vehicle parked successfully",
        booking: {
          bookingId: booking._id,
          userId,
          vehicleNumber,
          startTime: booking.startTime,
          parkingSpot: {
            parkingSpotId: spot._id,
            location: spot.location,
            vehicleType: spot.vehicleType,
            rate: spot.rate,
            isAvailable: spot.isAvailable,
          },
        },
      });
    } catch (error) {
      console.error("Error parking vehicle:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }),

  checkout: asyncHandler(async (req, res) => {
    try {
      const { bookingId } = req.params;
  
      // Fetch booking and populate parking spot details
      const booking = await Booking.findById(bookingId)
        .populate("parkingSpotId")
        .exec();
  
      if (!booking || booking.endTime) {
        return res.status(400).json({ message: "Invalid booking or already checked out" });
      }
  
      // Set the checkout time as current date/time
      booking.endTime = new Date();
  
      // Get parking spot details for fee calculation
      const { vehicleType } = booking.parkingSpotId;
      let { firstHour, additionalHour } = booking.parkingSpotId.rate;
  
      // Fee calculation logic
      let totalFee = 0;
      const timeDifference = (booking.endTime - booking.startTime) / (1000 * 60 * 60); // Difference in hours
  
      if (vehicleType === "car") {
        if (timeDifference <= 1) {
          totalFee = firstHour; // Fee for first hour or less
        } else {
          totalFee = firstHour + (Math.ceil(timeDifference - 1) * additionalHour); // First hour + additional hours
        }
      } else if (vehicleType === "bike") {
        if (timeDifference <= 1) {
          totalFee = firstHour; // Fee for first hour or less
        } else {
          totalFee = firstHour + (Math.ceil(timeDifference - 1) * additionalHour); // First hour + additional hours
        }
      }
  
      // Save total fee and other updates
      booking.totalFee = totalFee;
      await booking.save();
  
      // Mark the parking spot as available
      const spot = booking.parkingSpotId;
      if (spot) {
        spot.isAvailable = true;
        await spot.save();
      }
  
      // Respond with a successful checkout and receipt
      res.json({
        message: "Checkout successful",
        receipt: {
          bookingId: booking._id,
          vehicleNumber: booking.vehicleNumber,
          parkingSpotId: booking.parkingSpotId._id,
          vehicleType: booking.parkingSpotId.vehicleType,
          startTime: booking.startTime,
          endTime: booking.endTime,
          totalFee: booking.totalFee,
          paymentStatus: booking.paymentStatus,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }),
  
};

module.exports = parkingControllers;

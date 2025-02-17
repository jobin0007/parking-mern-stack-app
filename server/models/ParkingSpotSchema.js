// import mongoose, { Document, Schema } from 'mongoose';

// export interface IParkingSpot extends Document {
//   location: {
//     address: string;
//     city: string;
//   };
//   vehicleType: 'car' | 'bike';
//   isAvailable: boolean;
//   rate: {
//     firstHour: number;
//     additionalHour: number;
//   };
// }

// const parkingSpotSchema: Schema = new Schema<IParkingSpot>(
//   {
//     location: {
//       address: { type: String, required: true }, 
//       city: { type: String, required: true },     
//     },
//     vehicleType: {
//       type: String,
//       enum: ['car', 'bike'],
//       required: true,
//     },
//     isAvailable: {
//       type: Boolean,
//       default: true,
//     },
//     rate: {
//       firstHour: { type: Number, required: true }, 
//       additionalHour: { type: Number, required: true }, 
//     },
//   },
//   { timestamps: true }
// );

// const ParkingSpot = mongoose.model<IParkingSpot>('ParkingSpot', parkingSpotSchema);

// export default ParkingSpot;


const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const parkingSpotSchema = new Schema(
  {
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    vehicleType: {
      type: String,
      enum: ["car", "bike"],
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    rate: {
      firstHour: { type: Number, required: true },
      additionalHour: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const ParkingSpot = model("ParkingSpot", parkingSpotSchema);

module.exports = ParkingSpot;

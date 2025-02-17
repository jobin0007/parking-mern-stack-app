// import mongoose, { Schema, Document } from "mongoose";

// export interface IBooking extends Document {
//   userId: mongoose.Types.ObjectId;
//   parkingSpotId: mongoose.Types.ObjectId;
//   vehicleNumber: string;
//   vehicleType: string;
//   startTime: Date;
//   endTime?: Date;
//   totalFee?: number;
//   paymentStatus: "pending" | "completed" | "failed"; // Added payment status enum
// }

// const bookingSchema = new Schema<IBooking>({
//   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   parkingSpotId: { type: Schema.Types.ObjectId, ref: "ParkingSpot", required: true },
//   vehicleNumber: { type: String, required: true },
//   vehicleType: { type: String, required: true },
//   startTime: { type: Date, default: Date.now },
//   endTime: { type: Date },
//   totalFee: { type: Number },
//   paymentStatus: {
//     type: String,
//     enum: ["pending", "completed", "failed"], // Enum for payment status
//     default: "pending",
//   },
// });

// const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
// export default Booking;



const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  parkingSpotId: { type: Schema.Types.ObjectId, ref: "ParkingSpot", required: true },
  vehicleNumber: { type: String, required: true },
  vehicleType: { type: String, required: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  totalFee: { type: Number },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"], // Enum for payment status
    default: "pending",
  },
});

const Booking = model("Booking", bookingSchema);
module.exports = Booking;

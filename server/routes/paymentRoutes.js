// import express from 'express';

// import { protect } from '../middleware/authMiddleware';
// import paymentControllers from '../controllers/paymentControllers';

// const paymentRoutes = express.Router();

// // Create a new Razorpay order
// paymentRoutes.post('/create-order/:bookingId', protect, paymentControllers.createOrder);

// // Generate a mock payment signature (for testing purposes)
// paymentRoutes.post('/mock-signature', protect, paymentControllers.mockSignature);

// // Verify Razorpay payment
// paymentRoutes.post('/verify-payment', protect, paymentControllers.verifyPayment);

// export default paymentRoutes;


const express =require('express');
const protect = require('../middleware/authMiddleware')
const paymentControllers = require('../controllers/paymentControllers')

const paymentRoutes = express.Router();

// Create a new Razorpay order
paymentRoutes.post('/create-order/:bookingId', protect, paymentControllers.createOrder);

// Generate a mock payment signature (for testing purposes)
paymentRoutes.post('/mock-signature', protect, paymentControllers.mockSignature);

// Verify Razorpay payment
paymentRoutes.post('/verify-payment', protect, paymentControllers.verifyPayment);

module.exports = paymentRoutes;

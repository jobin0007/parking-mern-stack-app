const asyncHandler = require('express-async-handler')
const crypto  =require('crypto')
const dotenv =require('dotenv');
const Booking = require('../models/bookingSchema');
const createRazorpayInstance = require('./razorPayConfig');


dotenv.config();

const paymentControllers = {
    createOrder: asyncHandler(async (req, res) => {
        const userId = req.user;
        const { bookingId } = req.params;

        if (!userId) {
            throw new Error('Authentication Failed');
        }

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            throw new Error('Booking not found');
        }

        const orderPrice = booking.totalFee;
        
        if (orderPrice === undefined || orderPrice <= 0) {
            throw new Error('Invalid order price');
        }

        const options = {
            amount: orderPrice * 100,
            currency: 'INR',
            receipt: `receipt_${bookingId}`,
        };

        const order = await createRazorpayInstance.orders.create(options);
        console.log("ord",order)
        if (!order || !order.id) {
            throw new Error('Payment error found');
        }

        res.status(201).json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
        });
    }),

    mockSignature: asyncHandler(async (req, res) => {
        const userId = req.user;
        if (!userId) {
            throw new Error('User not found');
        }

        const { order_id } = req.body;
        const mockPaymentId = 'pay_test_paymentid';
        const secret = process.env.RAZORPAY_KEY_SECRET;

        const generatedSignature = crypto
            .createHmac('sha256', secret)
            .update(`${order_id}|${mockPaymentId}`)
            .digest('hex');

        console.log(order_id);

        res.json({
            success: true,
            razorpay_order_id: order_id,
            razorpay_payment_id: mockPaymentId,
            razorpay_signature: generatedSignature,
        });
    }),

    verifyPayment: asyncHandler(async (req, res) => {
        const userId = req.user;
        if (!userId) {
            throw new Error('User not found');
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;
        const secret = process.env.RAZORPAY_KEY_SECRET;

        const generatedSignature = crypto
            .createHmac('sha256', secret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        console.log('Signature:', generatedSignature);

        if (generatedSignature === razorpay_signature) {
            await Booking.findByIdAndUpdate(bookingId, { paymentStatus: 'completed' }, { new: true });
            res.json({
                success: true,
                message: 'Payment verified successfully',
            });
        } else {
            throw new Error('Payment verification failed');
        }
    }),
};

module.exports= paymentControllers;

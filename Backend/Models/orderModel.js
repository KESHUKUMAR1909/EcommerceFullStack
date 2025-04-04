const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pinCode: { type: Number, required: true },
        phoneNo: { type: String, required: true }, // Changed to String to preserve leading zeros
    },
    orderItems: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
            product: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    paymentInfo: {
        id: { type: String, required: true },
        status: { type: String, required: true },
        paidAt: { type: Date, required: true },
    },
    itemsPrice: { type: Number, default: 0, required: true }, // Moved out of `paymentInfo`
    taxPrice: { type: Number, default: 0, required: true },
    shippingPrice: { type: Number, default: 0, required: true },
    totalPrice: { type: Number, default: 0, required: true },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
        enum: ["Processing", "Shipped", "Delivered", "Cancelled"], // Added enum for consistency
    },
    deliveredAt: { type: Date, default: null }, // Ensures it's `null` until updated
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Order", orderSchema);

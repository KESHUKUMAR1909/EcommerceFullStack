const Order = require('../Models/orderModel.js');
const Product = require('../Models/productModel.js');
const Errorhandler = require('../Utils/errorHandler.js');
const catchAsyncError = require('../Middleware/catchAsyncError.js');


// create New Order
exports.newOrder = catchAsyncError(async(req, res , next)=>{
    const {shippingInfo , orderItems , paymentInfo , itemsPrice , taxPrice , shippingPrice , totalPrice} = req.body
    const order = await Order.create({
        shippingInfo , orderItems , paymentInfo , itemsPrice , taxPrice , shippingPrice , totalPrice , paidAt:Date.now() , user:req.user._id
    });
    res.status(201).json({
        success:true,
        order
    });

});


// get Single Order

exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user" , "name email");

    if (!order) {
        return next(new Errorhandler("Order Not found" , 404))
    }

    res.status(200).json({
        success: true,
        order
    });
});


// get Logged in orders users
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({user:req.user._id});

    if (!orders) {
        return next(new Errorhandler("Order Not found" , 404))
    }

    res.status(200).json({
        success: true,
        orders
    });
});

//get All orders --->Admin
exports.getAllOrders = catchAsyncError(async(req, res , next)=>{
    const orders = await Order.find();
    let totalAmount =0;
    orders.forEach(order=>{
        totalAmount+=order.totalPrice;
    });

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
});

// update Order Status---->Admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
        return next(new Errorhandler("Order not found", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new Errorhandler("You have already delivered this Order", 400));
    }

    // Updating stock properly with `for...of`
    for (const item of order.orderItems) {
        await updateStock(item.product, item.quantity);
    }

    // Update order status
    order.orderStatus = req.body.status;
    
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave:false}); // Save changes

    res.status(200).json({
        success: true,
        order
    });
});


async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    if (!product) {
        throw new Errorhandler(`Product with ID ${id} not found`, 404);
    }

    if (product.stock < quantity) {
        throw new Errorhandler(`Not enough stock for product ${id}. Available: ${product.stock}`, 400);
    }

    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}



// delete Order---->
exports.deleteOrder = catchAsyncError(async(req, res , next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new Errorhandler('Order not found with this Id' , 404))
    }
    await order.deleteOne();
    res.status(200).json({
        success:true
    })

});
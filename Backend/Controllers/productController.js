const { default: mongoose, mongo } = require('mongoose');
const Product = require('../Models/productModel.js');
const Errorhandler = require('../Utils/errorHandler.js');

const catchAsyncError = require('../Middleware/catchAsyncError.js');
const ApiFeatures = require('../Utils/apiFeature.js');




// create Product---Admin

exports.createproduct = catchAsyncError(
    async (req, res, next) => {
        req.body.user = req.user.id;
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product
        })

    }
)


// get All products

exports.getAllProducts = catchAsyncError(
    async (req, res) => {

        const resultPerPage = 5;

        const productCount = await Product.countDocuments();
        const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
        const products = await apiFeature.query;
        res.status(200).json({
            success: true,
            products,
            productCount,
        })
    }
)


// getSingleProduct
exports.getSingleProduct = catchAsyncError(
    async (req, res, next) => {
        // console.log(req.params.id);
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new Errorhandler("Product not Found", 404))
        }
        return res.status(200).json({
            success: true,
            product
        })
    }
)

// update Product----Admin
exports.updateProduct = catchAsyncError(
    async (req, res) => {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ success: false, message: "Invalid Product ID" });
            }


            // Find product and update
            const product = await Product.findByIdAndUpdate(id, req.body, {
                new: true,        // Return the updated product
                runValidators: true, useFindAndModify: false // Validate updated data
            });

            if (!product) {
                return next(new Errorhandler("Product not Found", 404))
            }

            res.status(200).json({
                success: true,
                message: "Successfully updated the product",
                product
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
);

// delete product ----->Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    console.log("🛑 DELETE Controller: Request Received - ID:", id);

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error("❌ Invalid Product ID:", id);
        return next(new Errorhandler("Invalid Product ID", 400));
    }

    console.log("🔎 Searching for Product with ID:", id);
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
        console.error("❌ Product Not Found");
        throw new Errorhandler("Product not Found", 404);
    }

    console.log("✅ Product Deleted Successfully");
    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    });
});


// Create new Review or Update the review

exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };



    const product = await Product.findById(productId);
    
    if (!product) {
        return next(new Errorhandler("Product not found", 404));
    }
    // Check if user already reviewed this product
    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating;
                rev.comment = comment;
            }
        });
    } else {
        product.reviews.push(review);
    }

    // Update number of reviews
    product.numOfReviews = product.reviews.length;

    // Calculate new average rating
    product.ratings =
        product.reviews.reduce((acc, rev) => acc + rev.rating, 0) /
        product.reviews.length;

    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success: true,
        message: "Review added successfully",
        reviews: product.reviews,
    });
});


// Get All Reviews 
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const products = await Product.find().select("reviews");
    const reviews = products.flatMap(product => product.reviews);

    res.status(200).json({
        success: true,
        reviews,
    });
});
// delete Reviews
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const { productId } = req.params;
    const { reviewId } = req.body; // Assuming review ID is sent in the request body

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
        return next(new Errorhandler("Product not found", 404));
    }

    // Filter out the review
    const reviews = product.reviews.filter(rev => rev._id.toString() !== reviewId);

    // Calculate new average rating
    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    const ratings = reviews.length > 0 ? avg / reviews.length : 0;
    const numOfReviews = reviews.length;

    // Update product
    await Product.findByIdAndUpdate(productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: "Your review has been deleted successfully",
    });
});

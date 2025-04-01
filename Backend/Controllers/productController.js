const { default: mongoose, mongo } = require('mongoose');
const Product = require('../Models/productModel.js');
const Errorhandler = require('../Utils/errorHandler.js');

const catchAsyncError = require('../Middleware/catchAsyncError.js');
const ApiFeatures = require('../Utils/apiFeature.js');




// create Product---Admin

exports.createproduct = catchAsyncError(
    async (req, res, next) => {
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
exports.deleteProduct = catchAsyncError(
    async (req, res) => {
        try {
            const { id } = req.params;

            // Validate if ID is correct format
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ success: false, message: "Invalid Product ID" });
            }

            const deletedProduct = await Product.findByIdAndDelete(id);

            if (!deletedProduct) {
                return next(new Errorhandler("Product not Found", 404))
            }

            res.status(200).json({
                success: true,
                message: "Product deleted successfully",
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    }

)
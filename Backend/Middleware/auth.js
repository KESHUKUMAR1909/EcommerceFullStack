const serverConfig = require('../Config/serverConfig.js');
const User = require('../Models/userModels.js');
const Errorhandler = require('../Utils/errorHandler.js');
const catchAsyncErrors = require('./catchAsyncError.js');
const jwt = require('jsonwebtoken');

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new Errorhandler("Please Login to access this resource", 401));
    }

    const decodedData = jwt.verify(token, serverConfig.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {

        if (!req.user) {

            return next(new Errorhandler("User not authenticated", 401));
        }

        if (!roles.includes(req.user.role)) {
            return next(new Errorhandler(`Role '${req.user.role}' is not allowed`, 403));
        }
        next();  // Ensure next() is called
    };
};

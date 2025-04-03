const Errorhandler = require('../Utils/errorHandler.js');
const User = require('../Models/userModels.js')
const catchAsyncError = require('../Middleware/catchAsyncError.js');
const crypto = require("crypto");
const sendToken = require('../Utils/jwtToken.js');
const sendEmail = require('../Utils/sendEmail.js');

// register a user

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "This is the sample id",
            url: "Profile Photo"
        }
    });
    sendToken(user, 201, res)
});

// login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new Errorhandler("Please Enter Email and Password", 400))
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new Errorhandler("Invalid email or password"), 401);
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new Errorhandler("Invalid email or password"), 401);
    }

    sendToken(user, 200, res);

});

// Logout User

exports.logout = catchAsyncError(async (req, res, next) => {
    res.clearCookie("token", {
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out Successfully",
    });
});



// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    // Get Reset Password Token
    const resetToken = user.getResetPasswordToken();

    // Save user with the new token (disable validation to prevent errors)
    await user.save({ validateBeforeSave: false });

    // Create Reset Password URL
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    // Email message
    const message = `Your Password Reset Token is:\n\n ${resetPasswordUrl} \n\nIf you did not request this, please ignore this email.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Ecommerce Password Reset',
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        // If email fails, remove reset token from the database
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler('Email could not be sent. Please try again later.', 500));
    }
});

// Reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const { password, confirmPassword } = req.body;
    const { token } = req.params;

    // Hash token for secure lookup
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest("hex");

    // Find user with valid token
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new Errorhandler("Reset password token is invalid or expired", 400));
    }

    // Validate password match
    if (password !== confirmPassword) {
        return next(new Errorhandler("Passwords do not match", 400));
    }

    // Update password and clear reset fields
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // Send success response with token
    sendToken(user, 200, res);
});


// Get User Details

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    });

});
// Update User Password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new Errorhandler("Old Password is incorrect"), 400);
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new Errorhandler("Passwords do not match", 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res);


});

// update User profile
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    //  We Will Add Cloduinary later

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    res.status(200).json({
        success: true
    })


});

// Get all users (Admin)
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find(); 
    res.status(200).json({
        success: true,
        users,
    });
});

// Get a single user (Admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new Errorhandler("User does not exist", 404));
    }

    res.status(200).json({
        success: true,
        user,
    });
});


// Update User Role
exports.updateUserRole= catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role:req.body.role
    }

    //  We Will Add Cloduinary later

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    if (!user) {
        return next(new Errorhandler("User not found", 404));
    }
    res.status(200).json({
        success: true
    })
});


// Delete User----->(Admin)
exports.deleteUser = catchAsyncError(async(req, res , next)=>{
    const user = await User.findById(req.params.id);
    // we will remove cloduinary

    if(!user){
        return next( new Errorhandler('User does not exist') , 404);
    }
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({
        success:true,
        message:"Successfully Deleted User"
    })
})



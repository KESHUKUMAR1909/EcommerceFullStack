const Errorhandler = require('../Utils/errorHandler.js');
const User = require('../Models/userModels.js')
const catchAsyncError = require('../Middleware/catchAsyncError.js');
const sendToken = require('../Utils/jwtToken.js');
const sendEmail = require('../Utils/sendEmail.js');

// register a user

exports.registerUser = catchAsyncError(async (req, res, next)=>{
    const {name,email,password} =req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"This is the sample id",
            url:"Profile Photo"
        }
    }) ;
    sendToken(user, 201, res)
});

// login User
exports.loginUser = catchAsyncError(async (req, res, next)=>{
    const {email , password}= req.body;
    if(!email||!password){
        return next(new Errorhandler("Please Enter Email and Password" , 400))
    }
    const user = await User.findOne({email}).select('+password');
    if(!user){
        return next(new Errorhandler("Invalid email or password"),401);
    }
    const isPasswordMatched =await  user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new Errorhandler("Invalid email or password"),401);
    }

    sendToken(user , 200 , res);

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


// forgot password
exports.forgotPassword=catchAsyncError(async(req , res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new Errorhandler("User not Found" , 404))
    }


    // Get Reset Password token

   const resetToken = user.getResetPasswordToken();

   await user.save({validateBeforeSave:false});



   const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

   const message =`Your Password Reset Token is : \n\n ${resetPasswordUrl} \n\n If You have not requested this email then ignore it `
   try{
    await sendEmail({
        email:user.email,
        subject:"Ecommerce Password Reset",
        message,
    });
    res.status(200).json({
        success:true,
        message:`Email sent to ${user.email} Successfully`
    })
   }catch(error){
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save({validateBeforeSave:false});
    return next(new Errorhandler(error.message , 500));
    
   }

});
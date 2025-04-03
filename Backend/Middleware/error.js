const Errorhandler = require('../Utils/errorHandler.js');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if(err.name==="CastError"){
        const message=`Resource Not Found Invalid : ${err.path}`
        err = new Errorhandler(message ,400 )
    }


    // Mongoose Duplicate key Error

    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new Errorhandler(message , 400);
    }

    // Wrong JWT Error

    if(err.name==="JsonwebTokenError"){
        const message=`Json Web Token is Invalid , try again`;
        err = new Errorhandler(message , 400);
    }

    // JWT Expire
    if(err.name==="TokenExpireError"){
        const message=`Json Web Token is Expired , try again`;
        err = new Errorhandler(message , 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,  // Sends only the error message, not the entire error object
    });
};

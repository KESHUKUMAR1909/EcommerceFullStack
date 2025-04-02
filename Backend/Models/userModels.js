const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Server = require('../Config/serverConfig.js');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name Should be Less than 30 characters"],
        minLength: [5, "Name should be greater than 5 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [isEmail, "Please Enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
        minLength: [8, "Password should be at least 8 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        enum:['user' ,'admin'],
        default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// Hash password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// JWT Token
userSchema.methods.getJWTToken = function () {
    const secret = Server.JWT_SECRET || "yourSecretKey"; 
    const expire = Server.JWT_EXPIRE || "1d"; // Default 1-day expiration
    return jwt.sign({ id: this._id }, secret, {
        expiresIn: expire,
    });
};

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


// Generating Passwrod reset token
userSchema.methods.getResetPasswordToken=function(){
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken= crypto.createHash('sha256').update(resetToken).digest('hex');

    this.resetPasswordExpire=Date.now()+15*60*1000;

    return resetToken;
}

module.exports = mongoose.model('User', userSchema);

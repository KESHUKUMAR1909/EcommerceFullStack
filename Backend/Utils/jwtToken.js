const serverConfig = require("../Config/serverConfig.js");

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    const cookieExpire = serverConfig.COOKIE_EXPIRE || 7; // Default 7 days

    const options = {
        expires: new Date(
            Date.now() + cookieExpire * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(statusCode)
        .cookie("token", token, options)
        .json({
            success: true,
            user,
            token,
        });
};

module.exports = sendToken;

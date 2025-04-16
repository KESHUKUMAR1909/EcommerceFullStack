const dotenv = require('dotenv');
dotenv.config();
module.exports={
    PORT:process.env.PORT,
    DB_URL:process.env.DB_URL,
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXPIRE:process.env.JWT_EXPIRE,
    COOKIE_EXPIRE:process.env.COOKIE_EXPIRE,
    SMTP_SERVICE:process.env.SMTP_SERVICE,
    SMTP_MAIL:process.env.SMTP_MAIL,
    SMTP_PASSWORD:process.env.SMTP_PASSWORD,
    CLOUDINARY_NAME:process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET
}
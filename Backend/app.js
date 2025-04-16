const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./Middleware/error.js');
const  bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
app.use(express.json({ limit: '10mb'}));
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Handles form data
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

// Route imports
const product = require('./Routes/productRoute.js');
const user = require('./Routes/userRoute.js');
const order = require('./Routes/orderRoute.js');


app.use("/api/v1", product);
app.use("/api/v1", user);
app.use('/api/v1' , order);

// Test API Route
app.get("/", (req, res) => {
    res.send("API is working!");
});

// Middleware for error handling
app.use(errorMiddleware);

module.exports = app;

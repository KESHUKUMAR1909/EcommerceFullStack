const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./Middleware/error.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Handles form data
app.use(cookieParser());

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

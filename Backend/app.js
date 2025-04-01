const express = require('express');
const app = express();
const errorMiddleware = require('./Middleware/error.js')
app.use(express.json())

// Route imports
const product = require('./Routes/productRoute.js');

app.use("/api/v1",product);

// Middleware for error
app.use(errorMiddleware);

module.exports=app;
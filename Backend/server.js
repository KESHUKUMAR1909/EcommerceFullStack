const app = require('./app.js');
const connectDB = require('./Config/databaseConfig.js');
const serverConfig = require('./Config/serverConfig.js');

// Handling Uncaught Exceptions (e.g., undefined variables, runtime errors)
process.on('uncaughtException', err => {
    console.error(`❌ Uncaught Exception: ${err.message}`);
    console.log("Shutting down the server due to an uncaught exception.");
    process.exit(1); // Exit with failure code
});

const server = app.listen(serverConfig.PORT, async () => {
    await connectDB();
    console.log(`✅ Server is running on PORT http://localhost:${serverConfig.PORT}`);
});

// Handling Unhandled Promise Rejections (e.g., database connection failures)
process.on('unhandledRejection', err => {
    console.error(`❌ Unhandled Promise Rejection: ${err.message}`);
    console.log("Shutting down the server due to an unhandled promise rejection.");

    server.close(() => {
        process.exit(1); // Exit with failure code
    });
});

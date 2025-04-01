const mongoose = require('mongoose')

const serverConfig = require('./serverConfig.js')

//the below function helps us to connect db
async function connectDB() {

    await mongoose.connect(serverConfig.DB_URL)
    console.log("Successfully Connected to the mongo Db Server")

}
module.exports = connectDB;
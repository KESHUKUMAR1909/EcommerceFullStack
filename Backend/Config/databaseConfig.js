const mongoose = require('mongoose')

const serverConfig = require('./serverConfig.js')

//the below function helps us to connect db
async function connectDB() {
    try{
        await mongoose.connect(serverConfig.DB_URL)
        console.log("Successfully Connected to the mongo Db Server")

    }catch(error){
        console.log("Some Error Occured in connecting with the database")
        console.log(error)
    }
}
module.exports= connectDB;
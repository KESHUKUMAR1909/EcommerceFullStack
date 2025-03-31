const app =  require('./app.js')
const connectDB = require('./Config/databaseConfig.js')
const serverConfig = require('./Config/serverConfig.js')

app.listen(serverConfig.PORT,async ()=>{
    await connectDB();
    console.log(`Server is running on PORT http://localhost:${process.env.PORT}`)
})
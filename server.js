require("dotenv").config();
const app = require("./src/app")
const connectDB = require("./src/db/db")

connectDB();













app.listen(3000, function(){
    console.log("Server is connected On port 3000")
})
const mongoose = require("mongoose");

async function connectDB(){

    try{

        await mongoose.connect(
            "mongodb+srv://kaklotaryagna_db_user:yagna12345@nodepractice.wijjgqu.mongodb.net/Ecommerce"
        );

        console.log("DB connected");

    }catch(err){

        console.log(err.message);

    }

}

module.exports = connectDB;
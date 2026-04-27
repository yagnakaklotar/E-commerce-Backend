const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

 name:{
   type:String,
   required:true
 },

 email:{
   type:String,
   required:true,
   unique:true
 },

 password:{
   type:String,
   required:true
 },

 role:{
   type:String,
   enum:["user","admin"],
   default:"user"
 }

},{timestamps:true});



// PASSWORD HASH
userSchema.pre("save", async function(){

 if(!this.isModified("password")){
   return;
 }

 this.password = await bcrypt.hash(
   this.password,
   10
 );

});



// JWT
userSchema.methods.generateAuthToken = function(){

 return jwt.sign(
   {
    _id:this._id,
    email:this.email,
    role:this.role
   },
   process.env.JWT_SECRET,
   {expiresIn:"3d"}
 );

};



// COMPARE PASSWORD

userSchema.methods.comparePassword = async function(password){

 return await bcrypt.compare(
   password,
   this.password
 );

};

const userModel = mongoose.model(
 "user",
 userSchema
);

module.exports = userModel;
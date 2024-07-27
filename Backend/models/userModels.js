import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
   name:{
    type: String,
    required: [true, "Please provide full name"],
    minlength: [3, "must contains atleast 3 characters"],
    maxlength: [30, "must contains atmost 30 characters"],
   },
   email:{
    type: String,
    required: [true, "Please provide email"],
    validate: [validator.isEmail, "Please provide valid Email"],
    minlength: [3, "must contains atleast 3 characters"],
    maxlength: [30, "must contains atmost 30 characters"],
   },
   phone:{
   type: String,
   required: [true, "Please provide phone number"],
   },
   password:{
    type: String,
    required: [true, "Please provide password"],
    minlength: [8, "must contains atleast 8 characters"],
    maxlength: [15, "must contains atmost 15 characters"],
    select: true,
   },
   role:{
    type: String,
    required: [true, "Please provide role"],
    enum: ["Job Seeker", "Job Employer"],
   },
   createdAt:{
    type: Date,
    default: Date.now,
   },
});

// Hashing of Password
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Comparing Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generating a jwt form for authorization 
userSchema.methods.getJWTToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}

export const User= mongoose.model("user", userSchema);
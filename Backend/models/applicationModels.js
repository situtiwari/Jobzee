import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide full name"],
        minlength: [3, "must contains atleast 3 characters"],
        maxlength: [30, "must contains atmost 30 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        validate: [validator.isEmail, "Please provide valid Email"],
        minlength: [3, "must contains atleast 3 characters"],
        maxlength: [30, "must contains atmost 30 characters"],
    },
    phone: {
        type: String,
        required: [true, "Please provide phone number"],
    },
    address: {
        type: String,
        required: [true, "Please provide address"],
    },
    coverLetter: {
        type: String,
        required: [true, "Please provide cover letter"],
    },
    resume: {
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    
    employerID: {
        user:{
             type: mongoose.Schema.Types.ObjectId,
             ref:"User",
             required: true
        },
        role:{
             type: String,
             enum: ["Job Employer"],
             required: true
        }
     },
     applicantID: {
        user:{
             type: mongoose.Schema.Types.ObjectId,
             ref:"User",
             required: true
        },
        role:{
             type: String,
             enum: ["Job Seeker"],
             required: true
        }
     },
});


export const Application = mongoose.model("Application", applicationSchema);
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide job title"],
        minlength: [3, "Job title must contains atleast 3 characters"],
        maxlength: [30, "Job title must contains atmost 30 characters"],
    },
    description: {
        type: String,
        required: [true, "Please provide job description"],
        minlength: [3, "Job discription must contains atleast 3 characters"],
        maxlength: [100, "Job discription must contains atmost 100 characters"],
    },
    category: {
        type: String,
        required: [true, "Job category is required!"],
    },
    country: {
        type: String,
        required: [true, "Job country is required!"],
    },
    city: {
        type: String,
        required: [true, "Job city is required!"],
    },
    location: {
        type: String,
        required: [true, "Job location is required!"],
        minlength: [10, "Job location must contains atleast 10 characters"],
    },
    fixedSalary: {
        type: Number,
        minlength: [4, "Job discription must contains atleast 4 characters"],
        maxlength: [9, "Job discription must contains atmost 9 characters"],
    },
    salaryFrom: {
        type: Number,
        minlength: [4, "Job discription must contains atleast 4 characters"],
        maxlength: [9, "Job discription must contains atmost 9 characters"],
    },
    salaryTo: {
        type: Number,
        minlength: [4, "Job discription must contains atleast 4 characters"],
        maxlength: [9, "Job discription must contains atmost 9 characters"],
    },
    expired:{
        type: Boolean,
        default: false,
    },
    jobPostedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        requiredBy: true,
    },
});



export const Job = mongoose.model("Job", jobSchema);
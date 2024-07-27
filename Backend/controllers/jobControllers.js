import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
import { Job } from "../models/jobModels.js";

export const getAllJobs= catchAsyncError(async (req, res, next) =>{
    
      const jobs = await Job.find({ expired: false});
      res.status(200).json({
        success: true,
        jobs,
     });
});

export const postJobs= catchAsyncError(async (req, res, next) =>{
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("You are not allowed!", 400));
    }
    const {title, description, category, country, city, location, fixedSalary, salaryFrom,
         salaryTo} = req.body;
    if(!title|| !description|| !category|| !country|| !city|| !location){
        return next(new ErrorHandler("Job details missing location!", 400));
    }
    if( !fixedSalary && (!salaryFrom || !salaryTo)){
        return next(new ErrorHandler("salary details missing!", 400));
    }
    if( fixedSalary && (salaryFrom || salaryTo)){
        return next(new ErrorHandler("You can not provide range and fixed salary both!", 400));
    }
    const postedBy = req.user._id;
    const job= await Job.create({
        title, description, category, country, city, location, fixedSalary, salaryFrom,salaryTo, postedBy,
    })

    res.status(200).json({
      success: true,
      message: "Job posted successfully!",
      job,
   });
});


export const getMyJobs= catchAsyncError(async (req, res, next) =>{
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("You are not allowed!", 400));
    }
    const myjobs = await Job.find({ postedBy: req.user._id});

      res.status(200).json({
        success: true,
        myjobs,
     });
});


export const updateJob= catchAsyncError(async (req, res, next) =>{
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("You are not allowed!", 400));
    }
    const {id} = req.params;
     let job= await Job.findById(id);
     if(!job){
        return next(new ErrorHandler("You have posted no job!", 400));
    }
    job = await Job.findByIdAndUpdate(id, req.body,{
        new : true,
        runValidators: true,
        useFindAndModify: false,
    })
      res.status(200).json({
        success: true,
        message: "Job updated Successfully!",
     });
});

export const deleteJob= catchAsyncError(async (req, res, next) =>{
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("You are not allowed!", 400));
    }
    const {id} = req.params;
     let job= await Job.findById(id);
     if(!job){
        return next(new ErrorHandler("Oops no job found!", 400));
    }
     await job.deleteOne();
      res.status(200).json({
        success: true,
        message: "Job deleted Successfully!",
     });
});

export const getSinglejob = catchAsyncError(async(req, res, next)=>
{
    const {id} = req.params;
    try {
        const job = await Job.findById(id);
        if(!job){
            return next(new ErrorHandler("Job not Found", 404));
        }
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        return next(new ErrorHandler("Invalid ID/ Cast Error", 404));
    }
})
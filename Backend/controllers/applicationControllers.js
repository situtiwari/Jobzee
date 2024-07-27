import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationModels.js";
import cloudinary from 'cloudinary';
import { Job } from "../models/jobModels.js";

export const employerGetAllApplication = catchAsyncError(async (req, res, next) => {
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("You are not allowed!", 400));
    }
    const {_id} = req.user;
     let applications = await Application.find({'employerID.user': _id});
     if(!applications){
        return next(new ErrorHandler("Oops, No applications found!", 400));
    }
      res.status(200).json({
        success: true,
        message: "Application for this Job!",
        applications,
     });
});

export const jobSeekerGetAllApplication = catchAsyncError(async (req, res, next) => {
  const {role} = req.user;
  if(role === "Job Employer"){
      return next(new ErrorHandler("You are not allowed!", 400));
  }
  const {_id} = req.user;
   let applications = await Application.find({'applicantID.user': _id});
   if(!applications){
      return next(new ErrorHandler("Oops, No applications found!", 400));
  }
    res.status(200).json({
      success: true,
      message: "Your Application for the Job!",
      applications,
   });
});

export const jobSeekerDeleteApplication = catchAsyncError(async (req, res, next) => {
  const {role} = req.user;
  if(role === "Job Employer"){
      return next(new ErrorHandler("You are not allowed!", 400));
  }
  const {id} = req.params;
   const application = await Application.findById(id);
   if(!application){
      return next(new ErrorHandler("Oops, No applications found!", 400));
  }
  await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Your Application for the Job has been deleted!",
   });
});


export const postApplication = catchAsyncError(async (req, res, next) => {
  const {role} = req.user;
  if(role === "Job Employer"){
      return next(new ErrorHandler("Employers are not allowed to apply for job!", 400));
  }
  if (!req.files || Object.keys(req.files).length === 0){
      return next(new ErrorHandler("Sorry, No resume found!", 400));
  };

   const {resume} = req.files;
   const allowedFormats = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
   if(!allowedFormats.includes(resume.mimetype)){
     ///AudioBufferSourceNode.png
     return next(new ErrorHandler("Invalid file type. Please upload in png, jpg, jpeg, or webp format only!", 400));
   }
   const cloudinaryResponse =  await cloudinary.uploader.upload(resume.tempFilePath);
  console.log(cloudinaryResponse);
    
   if(!cloudinaryResponse || cloudinaryResponse.error){
    console.log("Cloudinary Error", cloudinaryResponse.error || "Unknown Cloudinary Error");
    return next(new ErrorHandler("Failed to upload resume!", 500));
   }

   const {name, email, coverLetter, address, phone, jobID} = req.body;

   const applicantID ={ 
    user : req.user._id,
    role : "Job Seeker"
   }

   if(!jobID){
      return next(new ErrorHandler("Oops, Job not found!", 404));
  }
  const jobDetails = await Job.findById(jobID);
  if(! jobDetails){
    return next(new ErrorHandler("Oops, Job not found!", 404));
  }
 
   const employerID ={ 
    user : jobDetails.postedBy,
    role : "Job Employer"
   }
   if(!name || !email || !coverLetter || !address || !phone || !resume || !employerID || !applicantID){
    return next(new ErrorHandler("Please fill all the fields!", 400));
   }
   const application = await Application.create({
    name, email, coverLetter, address, phone, employerID, applicantID, 
    resume : {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    }
   });
   res.status(200).json({
    success: true,
    message: "Your Application has been Submitted!",
    application,
 });
});
import mongoose from "mongoose";
import validator from "validator";


export const dbConnection =()=>{
     mongoose.connect(process.env.MONGO_URI,{
        dbName : "JOBSEEZE_SITE"
     }).then(()=>{
        console.log('connected to database')
     }).catch((err)=>{
        console.log(` database connection error ${err}`);
     })
}

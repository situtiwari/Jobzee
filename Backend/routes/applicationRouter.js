import express from "express";
import {isAuthorized} from '../middlewares/auth.js';
import {employerGetAllApplication, jobSeekerDeleteApplication, jobSeekerGetAllApplication, postApplication} from '../controllers/applicationControllers.js'


const router = express.Router();

router.get("/Employer/getAll", isAuthorized, employerGetAllApplication);
router.get("/Seeker/getAll", isAuthorized, jobSeekerGetAllApplication);
router.post("/post", isAuthorized, postApplication);
router.delete("/deleteSeeker/:id", isAuthorized, jobSeekerDeleteApplication);

export default router;

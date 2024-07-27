import express from "express";
import { deleteJob, getAllJobs, getMyJobs, postJobs ,updateJob, getSinglejob} from "../controllers/jobControllers.js";
import {isAuthorized} from '../middlewares/auth.js';

const router = express.Router();
router.get("/getAllJobs", getAllJobs);
router.post("/postJobs", isAuthorized, postJobs);
router.get("/getMyJobs", isAuthorized, getMyJobs);
router.get("/:id", isAuthorized, getSinglejob);
router.put("/updateJob/:id", isAuthorized, updateJob);
router.delete("/deleteJob/:id", isAuthorized, deleteJob);

export default router;

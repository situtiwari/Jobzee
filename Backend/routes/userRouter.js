import express from "express";
import { logOut, login, register, getUser } from '../controllers/userControllers.js';
import {isAuthorized} from '../middlewares/auth.js';

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthorized, logOut);
router.get("/getuser", isAuthorized, getUser);

export default router;

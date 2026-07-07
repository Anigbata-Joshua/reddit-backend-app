import express from "express";
import { getUserProfile, updateProfile, uploadAvatar } from "../controllers/user.controller.js";

const router = express.Router();
router.get('/profile', getUserProfile);
router.put('/update-profile', updateProfile);
router.post('/avatar', uploadAvatar);




export default router;
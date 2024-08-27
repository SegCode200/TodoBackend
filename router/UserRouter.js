import express, { Router } from "express";
import {
  changeImage,
  createUser,
  deleteUser,
  getUserProfile,
  loginUser,
  UpdateProfile,
} from "../controller/UserController.js";
import multer from "multer";
const storage = multer.memoryStorage();
const upload1 = multer({ storage });

const router = Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/getuser/:userId").get(getUserProfile);
router.route("/deleteuser/:userId").delete(deleteUser);
router.route("/updateuser/:userId").patch(UpdateProfile);
router
  .route("/changeImage/:userId")
  .patch(upload1.single("image"), changeImage);

export default router;

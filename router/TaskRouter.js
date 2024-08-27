import express, { Router } from "express";
import {
  AddTask,
  EditTask,
  DeleteTask,
  getUserTasks,
  getTaskById,
  getUserTasksByCategory,
  updateUserTaskCompleted,
  getAllTask,
} from "../controller/TaskController.js";

const router = Router();

router.route("/createTask/:userId").post(AddTask);
router.route("/editTask/:userId/:taskId").patch(EditTask);
router
  .route("/updateCompletedTask/:userId/:taskId")
  .patch(updateUserTaskCompleted);
router.route("/deleteTask/:userId/:taskId").delete(DeleteTask);
router.route("/get-one-taskbyId/:taskId").get(getTaskById);
router.route("/get-all-task").get(getAllTask);
router.route("/get-user-taskbyuserId/:userId").get(getUserTasks);
router
  .route("/get-user-taskCategoryId/:userId/:catergory")
  .get(getUserTasksByCategory);

export default router;

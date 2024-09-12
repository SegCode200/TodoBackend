import express from "express";
import UserModel from "../model/UserModel.js";
import TaskModel from "../model/TaskModel.js";
import mongoose from "mongoose";

export const AddTask = async (req, res) => {
  try {
    // Get UserId from Params
    const { userId } = req.params;
    const {
      title,
      description,
      priority,
      catergory,
      startTime,
      endTime,
      dateAndTime,
    } = req.body;

    const user = await UserModel.findById(userId);

    if (
      !title ||
      !description ||
      !catergory ||
      !priority ||
      !dateAndTime ||
      !startTime ||
      !endTime
    ) {
      return res.status(402).json({ message: "Please fill in the fields" });
    }
    if (!user) {
      return res.status(403).json({
        message: "User not found",
      });
    }

    const Task = await TaskModel.create({
      catergory,
      title,
      priority,
      DateandTime: dateAndTime,
      description: description,
      user: userId,
      startTime,
      endTime,
    });
    const taskId = new mongoose.Types.ObjectId(Task.id);
    user.task.push(taskId);
    await user.save();
    return res.status(201).json({ Task });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const EditTask = async (req, res) => {
  try {
    const { taskId, userId } = req.params;
    const {
      title,
      description,
      catergory,
      priority,
      date,
      startTime,
      endTime,
    } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }
    const task = await TaskModel.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
        catergory,
        priority,
        DateandTime: date,
        startTime,
        endTime,
      },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ task });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const DeleteTask = async (req, res) => {
  try {
    const { taskId, userId } = req.params;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }
    const task = await TaskModel.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    // Remove the task from the user's task array using ObjectId comparison
    user.task = user.task.filter(
      (task) => !task.equals(mongoose.Types.ObjectId(taskId))
    );

    // Save the updated user model
    await user.save();
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await TaskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ task });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }
    const tasks = await TaskModel.find({ user: userId });
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getUserTasksByCategory = async (req, res) => {
  try {
    const { userId, catergory } = req.params;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }
    const tasks = await TaskModel.find({ user: userId, catergory: catergory });
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateUserTaskCompleted = async (req, res) => {
  try {
    const { taskId, userId } = req.params;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }
    const task = await TaskModel.findByIdAndUpdate(
      taskId,
      { completed: true },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ task });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const task = await TaskModel.find();
    return res.status(200).json({ data: task });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
// mDT098kRhA2AplUG
// ajayisegun2003

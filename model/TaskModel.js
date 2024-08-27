import mongoose, { Schema } from "mongoose";

const createTask = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    dueDate: Date,
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    startTime: Date,
    endTime: Date,
    DateandTime: {
      type: Date,
      default: Date.now,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    catergory: {
      type: String,
      enum: ["Work", "Personal", "Education", "Others"],
      default: "Personal",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", createTask);

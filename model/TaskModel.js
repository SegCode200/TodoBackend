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
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    DateandTime: {
      type: String,
      required: true,
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

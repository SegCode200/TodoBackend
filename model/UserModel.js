import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dfnysgd1c/image/upload/v1690670356/cwuuda48uio5bnfcz1mn.jpg",
    },
    task: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);

import UserModel from "../model/UserModel.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import ENV from "../config/config.js";
import cloudinary from "../utils/Cloudinary.js";
import streamifier from "streamifier";
import Http from "http";

export const createUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res
        .status(403)
        .send({ success: false, message: "Fill up all the field" });
    }
    const user = await UserModel.findOne({ email: email });
    const existUsername = await UserModel.findOne({ username });
    const hashPassword = await bcrypt.hash(password, 10);

    if (!hashPassword) {
      return res
        .status(403)
        .send({ success: false, message: "Failed to hash password" });
    }

    if (user) {
      return res
        .status(403)
        .send({ success: false, message: "Email already exists" });
    }
    if (existUsername) {
      return res
        .status(403)
        .send({ success: false, message: "Username already exists" });
    }

    const newUser = await UserModel.create({
      email,
      username,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(200).send({
      success: true,
      message: "User created successfully",
      data: { user: newUser },
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(403)
        .send({ success: false, message: "Fill up all the field" });
    }

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res
        .status(403)
        .send({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(403)
        .send({ success: false, message: "Incorrect password" });
    }
    const token = JWT.sign({ id: user._id }, ENV.JWTSECERT);
    res
      .status(200)
      .send({ success: true, message: "Login successful", token: token });
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(403)
        .send({ success: false, message: "No token provided" });
    }
    const authToken = token.split(" ")[1];
    const decoded = JWT.verify(authToken, ENV.JWTSECERT);
    if (!decoded) {
      return res
        .status(401)
        .send({ success: false, message: "Token is invalid" });
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    res.send({ success: true, user });
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message });
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { phoneNumber, username } = req.params;
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(403)
        .send({ success: false, message: "No token provided" });
    }
    const authToken = token.split(" ")[1];
    const decoded = JWT.verify(authToken, ENV.JWTSECERT);
    if (!decoded) {
      return res
        .status(401)
        .send({ success: false, message: "Token is invalid" });
    }
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { phone: phoneNumber, username: username },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    res.send({ success: true, user });
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(403)
        .send({ success: false, message: "No token provided" });
    }
    const authToken = token.split(" ")[1];
    const decoded = JWT.verify(authToken, ENV.JWTSECERT);
    if (!decoded) {
      return res
        .status(401)
        .send({ success: false, message: "Token is invalid" });
    }
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    res.send({ success: true, message: "User deleted successfully" });
  } catch (err) {
    return res.status
      .status(500)
      .send({ success: false, message: err.message });
  }
};

export const changeImage = async (req, res) => {
  try {
    const { userId } = req.params;
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(403)
        .send({ success: false, message: "No token provided" });
    }
    const authToken = token.split(" ")[1];
    const decoded = JWT.verify(authToken, ENV.JWTSECERT);
    if (!decoded) {
      return res
        .status(401)
        .send({ success: false, message: "Token is invalid" });
    }
    const image = req.file;

    let uploadedImageUrl = null;
    if (image) {
      const uploadResponse = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
        streamifier.createReadStream(image.buffer).pipe(stream);
      });

      uploadedImageUrl = uploadResponse.secure_url;
    }
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { avatar: uploadedImageUrl },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    res.send({ success: true, user });
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message });
  }
};

const AddTask = (res) => {};

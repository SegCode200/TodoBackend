import mongoose from "mongoose";

const URL =
  "mongodb+srv://ajayisegun2003:mDT098kRhA2AplUG@cluster0.f7bkt.mongodb.net/TodoDatabase?retryWrites=true&w=majority";

export const dbConfig = async () => {
  // Connect to MongoDB
  try {
    await mongoose
      .connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.log("Failed to connect to MongoDB", error);
      });
  } catch (error) {
    return error;
  }
};

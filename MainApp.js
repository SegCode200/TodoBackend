import express from "express";
import user from "./router/UserRouter.js";
import task from "./router/TaskRouter.js";

export const MainApp = (app) => {
  app.use("/api", user);
  app.use("/api", task);

  app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello, World!" });
  });
};

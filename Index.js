import express from "express";
import { MainApp } from "./MainApp.js";
import { dbConfig } from "./config/db.js";
import cors from "cors";
import morgan from "morgan";
import route from "./router/UserRouter.js";

// Import all routes

const app = express();

app.use("/api/v1/users", route);
app.use(morgan("dev")); // logs all requests to the console
app.use(express.json());
app.use(cors());

const port = 4001;

MainApp(app);

const server = app.listen(port, () => {
  console.clear();
  console.log();
  console.clear();
  console.log(`Server is Live 💥🚀⭐⚡ on ${port}`);
  dbConfig();
});

process.on("uncaughtException", (error) => {
  console.log("Server is shutting downn because of uncaughtException");
  console.log(error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.log("server is shutting down because of unhandledRejection");
  console.log(reason);
  server.close(() => {
    process.exit(1);
  });
});

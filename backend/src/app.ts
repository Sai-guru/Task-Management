import express from "express";
import cors from "cors";
import morgan from "morgan";

import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({success: true,message: "Task Management API is running",});
});

app.use("/api/tasks", taskRoutes);


export default app;
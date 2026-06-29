import { Request, Response } from "express";
import { successResponse } from "../utils/response.js";

import { getAllTasks, createTask, updateTaskStatus,deleteTask} from "../services/taskService.js";
import { TaskStatus } from "../models/taskModel.js";

//get a task..
// @GET /api/tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const { status, search, sort } = req.query;

    const tasks = await getAllTasks(
      status as TaskStatus | undefined,
      search as string | undefined,
      (sort as "ASC" | "DESC") || "DESC"
    );

    res.status(200).json(successResponse("Tasks fetched successfully.", tasks));
  } catch (error) {
    throw new Error("Failed to fetch the tasks");
  }
};

// Crate a new task
// @POST /api/tasks
export const addTask = async (req: Request, res: Response) => {
  try {
    const task = await createTask(req.body);

    res.status(201).json(successResponse("Task created successfully.", task));
  } catch (error) {
    throw new Error("Failed to create the task");
  }
};

// Update a task
// @PUT /api/tasks/:id
export const completeTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await updateTaskStatus(Number(id), status);
    if (!task) throw new Error("Task not found");

    res.status(200).json(successResponse("Task updated successfully",task));
  } catch (error) {
    throw new Error("Failed to update the task");
  }
};

//delete a task
// @DELETE /api/tasks/:id
export const removeTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await deleteTask(Number(id));

    if (!deleted) throw new Error("Task not found");

    res.status(200).json(successResponse("Task deleted success"));
  } catch (error) {
    throw error;
  }
};
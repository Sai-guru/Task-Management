import api from "./api";
import type { CreateTask, TaskStatus } from "../types/task";

export const createTask = async (task: CreateTask) => {
  const res = await api.post("/tasks", task);
  return res.data;
};

export const getTasks = async (status?: TaskStatus,search?: string,sort: "ASC" | "DESC" = "DESC") => {
  const res = await api.get("/tasks", {
    params: {
      status,
      search,
      sort,
    },
  });

  return res.data;
};

export const updateTask = async (id: number, status: TaskStatus) => {

  const res = await api.put(`/tasks/${id}`, {status});

  return res.data;
};

export const deleteTask = async (id: number) => {

  const res = await api.delete(`/tasks/${id}`);

  return res.data;
};


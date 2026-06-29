export type TaskStatus = "Pending" | "In Progress" | "Completed";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateTask {
  title: string;
  description: string;
  status?: TaskStatus;
}
export type TaskStatus = "Pending" | "In Progress" | "Completed";

export interface Task {
  id: number;
  user_id: number | null;
  title: string;
  description: string;
  status: TaskStatus;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTaskDTO {
  title: string;
  description: string;
  status?: Exclude<TaskStatus, "Completed">;
}

export interface UpdateTaskStatusDTO {
  status: TaskStatus;
}

import { pool } from "../config/db.js";
import { Task, CreateTaskDTO, TaskStatus } from "../models/taskModel.js";

export const getAllTasks = async (
  status?: TaskStatus,
  search?: string,
  sort: "ASC" | "DESC" = "DESC",
  userId?: number,
): Promise<Task[]> => {
  let query = "SELECT * FROM tasks";
  const values: (string | TaskStatus | number)[] = [];
  const conditions: string[] = [];

  if (userId) {
    values.push(userId);
    conditions.push(`user_id = $${values.length}`);
  }

  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  if (search) {
    values.push(`%${search}%`);
    conditions.push(
      `(title ILIKE $${values.length} OR description ILIKE $${values.length})`,
    );
  }

  if (conditions.length) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  query += ` ORDER BY created_at ${sort}`;

  const { rows } = await pool.query(query, values);
  return rows;
};

export const createTask = async (
  task: CreateTaskDTO,
  userId?: number,
): Promise<Task> => {
  const columns = ["title", "description"];
  const values: (string | number)[] = [task.title, task.description];

  if (task.status) {
    columns.push("status");
    values.push(task.status);
  }

  if (userId) {
    columns.push("user_id");
    values.push(userId);
  }

  const placeholders = columns.map((_, index) => `$${index + 1}`).join(", ");
  const { rows } = await pool.query(
    `INSERT INTO tasks (${columns.join(", ")}) VALUES (${placeholders}) RETURNING *;`,
    values,
  );

  return rows[0];
};

export const updateTaskStatus = async (
  id: number,
  status: TaskStatus,
  userId?: number,
): Promise<Task | null> => {
  const query = `
    UPDATE tasks
    SET status = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    ${userId ? "AND user_id = $3" : ""}
    RETURNING *;
  `;

  const values = userId ? [status, id, userId] : [status, id];
  const { rows } = await pool.query(query, values);
  return rows[0] ?? null;
};

export const deleteTask = async (
  id: number,
  userId?: number,
): Promise<boolean> => {
  const query = `DELETE FROM tasks WHERE id = $1 ${userId ? "AND user_id = $2" : ""}`;
  const values = userId ? [id, userId] : [id];
  const { rowCount } = await pool.query(query, values);
  return (rowCount ?? 0) > 0;
};

import { pool } from "../config/db.js";
import { Task, CreateTaskDTO, TaskStatus } from "../models/taskModel.js";

export const getAllTasks = async (
  status?: TaskStatus,
  search?: string,
  sort: "ASC" | "DESC" = "DESC"
): Promise<Task[]> => {
  let query = "SELECT * FROM tasks";
  const values: (string | TaskStatus)[] = [];
  const conditions: string[] = [];

  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  if (search) {
    values.push(`%${search}%`);
    conditions.push(`(title ILIKE $${values.length} OR description ILIKE $${values.length})`);
  }

  if (conditions.length) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  query += ` ORDER BY created_at ${sort}`;

  const { rows } = await pool.query(query, values);
  return rows;
};

export const createTask = async (task: CreateTaskDTO): Promise<Task> => {
  if (task.status) {
    const { rows } = await pool.query(`INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *;`,
      [task.title, task.description, task.status]
    );
    return rows[0];
  }

  const { rows } = await pool.query(`INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *;`,
    [task.title, task.description]
  );
  return rows[0];
};

export const updateTaskStatus = async (id: number, status: TaskStatus): Promise<Task | null> => {
  const query = `
    UPDATE tasks
    SET status = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [status, id]);
  return rows[0] ?? null;
};

export const deleteTask = async (id: number): Promise<boolean> => {
  const { rowCount } = await pool.query(`DELETE FROM tasks WHERE id = $1`, [id]);
  return (rowCount ?? 0) > 0;
};
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import TaskCard from "../components/TaskCard";
import { deleteTask, getTasks, updateTask } from "../services/taskService";
import type { Task, TaskStatus } from "../types/task";
import useDebounce from "../hooks/useDebounce";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<TaskStatus | "">("");
  const [sort, setSort] = useState<"ASC" | "DESC">("DESC");

  const debouncedSearch = useDebounce(search);
  
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => t.status === "Pending").length;
  const inProgressTasks = tasks.filter(
    (t) => t.status === "In Progress"
  ).length;
  const completedTasks = tasks.filter(
    (t) => t.status === "Completed"
  ).length;

  const successRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const fetchTasks = async () => {
    try {
      const response = await getTasks(
        status || undefined,
        search || undefined,
        sort
      );

      setTasks(response.data);
    } catch {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [debouncedSearch, status, sort]);

  const handleComplete = async (id: number) => {
    await updateTask(id, "Completed");
    toast.success("Task completed");
    fetchTasks();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    toast.success("Task deleted");
    fetchTasks();
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-white p-4 shadow dark:bg-gray-800">
          <p className="text-sm text-gray-500">Total</p>
          <h2 className="text-3xl font-bold">{totalTasks}</h2>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow dark:bg-gray-800">
          <p className="text-sm text-gray-500">Pending</p>
          <h2 className="text-3xl font-bold">{pendingTasks}</h2>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow dark:bg-gray-800">
          <p className="text-sm text-gray-500">In Progress</p>
          <h2 className="text-3xl font-bold">{inProgressTasks}</h2>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow dark:bg-gray-800">
          <p className="text-sm text-gray-500">Completed</p>
          <h2 className="text-3xl font-bold">{completedTasks}</h2>

          <p className="mt-2 text-green-600">
            Success Rate : {successRate}%
          </p>
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-3 md:flex-row">
        <input
          className="flex-1 rounded-lg border p-3 dark:bg-gray-700 dark:text-white"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="rounded-lg border p-3"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as TaskStatus | "")
          }
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          className="rounded-lg border p-3"
          value={sort}
          onChange={(e) =>
            setSort(e.target.value as "ASC" | "DESC")
          }
        >
          <option value="DESC">Newest</option>
          <option value="ASC">Oldest</option>
        </select>
      </div>

      {tasks.length === 0 ? (
        <h2>No Tasks Found.</h2>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onComplete={handleComplete}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default Dashboard;
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { createTask } from "../services/taskService";
import { taskSchema } from "../utils/taskSchema";
import type { CreateTask } from "../types/task";

const AddTask = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTask>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: "Pending",
    },
  });

  const onSubmit = async (data: CreateTask) => {
    try {
      await createTask(data);

      toast.success("Task created successfully!");

      navigate("/");
    } catch {
      toast.error("Failed to create task.");
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <h1 className="mb-2 text-3xl font-bold">
          Add New Task
        </h1>

        <p className="mb-8 text-gray-500">
          Fill in the details below to create a new task.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Title */}
          <div>
            <label className="mb-2 block font-medium">
              Task Title
            </label>

            <input
              {...register("title")}
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
              placeholder="Enter task title"
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              rows={5}
              {...register("description")}
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
              placeholder="Enter task description"
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block font-medium">
              Status
            </label>

            <select
              {...register("status")}
              className="w-full rounded-lg border p-3 dark:bg-gray-700 dark:text-white"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              {isSubmitting ? "Creating..." : "Create Task"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-lg border px-6 py-3 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
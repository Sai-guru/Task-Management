import type { Task } from "../types/task";

// stable data type ..
interface Props {
  task: Task;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskCard = ({ task, onComplete, onDelete }: Props) => {
  return (
    <div className="mb-4 rounded-lg border bg-white p-5 shadow dark:bg-gray-800">
      <h2 className="text-xl font-semibold">
        {task.title}
      </h2>

      <p className="my-3 text-gray-600">
        {task.description}
      </p>

      <span className="rounded bg-gray-100 px-3 py-1 text-sm">
        {task.status}
      </span>

      <p className="mt-3 text-sm text-gray-500">
        {new Date(task.created_at).toLocaleDateString()}
      </p>

      <div className="mt-4 flex gap-3">
        {task.status !== "Completed" && (
          <button
            onClick={() => onComplete(task.id)}
            className="rounded bg-green-600 px-4 py-2 text-white">
            Complete
          </button>
        )}

        <button onClick={() => onDelete(task.id)} className="rounded bg-red-600 px-4 py-2 text-white">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
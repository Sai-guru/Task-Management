import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <header className="border-b bg-white dark:bg-gray-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-5">
        <h1 className="text-2xl font-bold">
          Task Management Portal
        </h1>

        <div className="flex gap-3">
          <ThemeToggle />
          <Link to="/" className="rounded border px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            Dashboard
          </Link>

          <Link to="/add-task" className="rounded bg-blue-600 px-4 py-2 text-white">
            Add Task
          </Link>
          {/* pages done  */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
import { Link } from "react-router-dom";
import { LogOut, Plus, LayoutDashboard } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-white dark:bg-gray-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <h1 className="text-xl font-semibold">Task Management Portal</h1>
          {user && <p className="text-sm text-gray-500">{user.name}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <ThemeToggle />

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>

          <Link
            to="/add-task"
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus size={16} />
            Add Task
          </Link>

          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { startGoogleLogin } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-800">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Use your Google account to manage your own tasks.
        </p>

        <button
          onClick={startGoogleLogin}
          className="mt-6 w-full rounded-md bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
        >
          Continue with Google
        </button>

        <p className="mt-4 text-xs text-gray-500">
          You will be redirected to Google and then returned here.
        </p>
      </div>
    </div>
  );
};

export default Login;

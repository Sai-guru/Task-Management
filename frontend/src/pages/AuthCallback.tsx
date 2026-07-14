import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const { handleGoogleCallback } = useAuth();
  const [message, setMessage] = useState("Completing Google sign-in...");
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) {
      return;
    }

    const code = searchParams.get("code");

    if (!code) {
      setMessage("Missing authorization code.");
      toast.error("Google callback did not include a code");
      return;
    }

    hasStarted.current = true;

    void handleGoogleCallback(code).catch(() => {
      setMessage("Google sign-in failed.");
      toast.error("Failed to finish Google sign-in");
    });
  }, [handleGoogleCallback, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-800">
        <h1 className="text-2xl font-semibold">Google Sign-In</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {message}
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;

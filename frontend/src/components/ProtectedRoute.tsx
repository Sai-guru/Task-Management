import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { initialized, user } = useAuth();

  if (!initialized) {
    return (
      <div className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%),linear-gradient(135deg,#0a1020,#12182a_45%,#1b1f35)] text-white">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-white/80 backdrop-blur">
          Preparing your workspace...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

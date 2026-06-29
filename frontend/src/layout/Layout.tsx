import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl p-6">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
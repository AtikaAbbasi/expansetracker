import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed md:static z-40">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 min-h-screen ml-0  transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
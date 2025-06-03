import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [slide, setSlide] = useState(false);

  return (
    <>
      {/* Toggle Button (Only on Small Screens) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-yellow-400 p-2 rounded text-black font-bold"
        onClick={() => setSlide(true)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`bg-yellow-400 text-black p-4 w-60 min-h-screen z-40 transform transition-transform duration-300
        fixed top-0 left-0 md:relative md:translate-x-0
        ${slide ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close Button (Only on Small Screens) */}
        <div className="md:hidden flex justify-end">
          <button
            onClick={() => setSlide(false)}
            className="text-black text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-8">My Sidebar</h2>
        <ul className="space-y-4">
          <li id="home"><Link to="/" onClick={() => setSlide(false)} className="hover:text-white" >Home</Link></li>
        <li id="desh"><Link to="/dashboard" onClick={() => setSlide(false)} className="hover:text-white">Dashboard</Link></li>
              <li id="pro"><Link to="/profile" onClick={() => setSlide(false)} className="hover:text-white">Profile</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Log from "./pages/Log";
import Sign from "./pages/Sign";
import NotFound from "./pages/NotFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/dashboard" , element: <Dashboard/>},
      { path: "/profile" , element: <Profile/>},
      { path: "/log" , element: <Log/>},
      { path: "/sign" , element: <Sign/>}
    ],
  },
   { path: "*" , element: <NotFound/>}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

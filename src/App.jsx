import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Ui/Navbar";
import Home from "./Pages/Home";
import SignUp from "./Components/Auth/SignUp";
import Login from "./Components/Auth/Login";
import { UserContext } from "./Utils/UserContext";
import axios from "axios";
import Profile from "./Pages/Profile";

function App() {
  const [user, setUser] = useState("");
  const fetchUser = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/user/auth-user`,
      {
        withCredentials: true,
      }
    );
    setUser(res?.data?.userData);
  };

  const appRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
        {
          path: "/log-in",
          element: <Login />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ]);
  useEffect(() => fetchUser(), []);
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={appRoutes} />
      </UserContext.Provider>
    </>
  );
}

export default App;

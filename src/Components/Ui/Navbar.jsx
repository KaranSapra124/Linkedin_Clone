import React, { useState, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../Utils/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const appLinks = [
    { link: "/", title: "Home" },
    { link: "/aboutus", title: "About" },
    { link: "/contact", title: "Contact" },
  ];

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-700">
            <Link to="/">LinkedIn</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="block lg:hidden p-2 text-gray-600 hover:text-blue-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <div
            className={`lg:flex lg:items-center lg:justify-between lg:space-x-4 transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:space-x-4">
              {appLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.link}
                  className="text-gray-600 hover:text-blue-700 transition-colors duration-300 py-2 px-4"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col lg:flex-row lg:space-x-4 mt-4 lg:mt-0">
              {!user ? (
                <>
                  <Link
                    to="/log-in"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/sign-up"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <Link
                  to="/Profile"
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
                >
                  {user.userName}
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;

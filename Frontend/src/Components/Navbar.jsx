import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  UserRound,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authslice";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // safer selector
  const user = useSelector((state) => state?.auth?.user);

  const loggingout = async (user) => {
    console.log("Logout button clicked");
    dispatch(logoutUser(user));
    console.log("Successfully logout");
  };

  /* -----------------------------
     THEME MODE
  ----------------------------- */

  const [theme, setTheme] = useState("");

  useEffect(() => {
    const isDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "dark" ? "light" : "dark"
    );
  };

  useEffect(() => {
    if (theme) {
      document.body.classList.toggle(
        "dark",
        theme === "dark"
      );
    }
  }, [theme]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-gray-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl text-gray-900 dark:text-white transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="h-20 flex items-center justify-between">

          {/* LEFT - LOGO */}
          <Link to="/" className="shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Explaino <span className="text-blue-500">AI</span>
            </h1>
          </Link>

          {/* CENTER - DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700 dark:text-gray-200">

            {user ? (
              <Link
                to={`/Dashboard/${user?._id}`}
                className="hover:text-red-500 transition"
              >
                Dashboard
              </Link>
            ) : null}

            <Link
              to="/features"
              className="hover:text-blue-500 transition"
            >
              Features
            </Link>

            <Link
              to="/how-it-works"
              className="hover:text-blue-500 transition"
            >
              How it Works
            </Link>

            <Link
              to="/PricingPage"
              className="hover:text-blue-500 transition"
            >
              Pricing
            </Link>
          </nav>

          {/* RIGHT - DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-4">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-800 transition"
              title={`Current Theme: ${theme}`}
            >
              {theme === "dark" ? (
                <Moon
                  size={18}
                  className="text-white"
                />
              ) : (
                <Sun
                  size={18}
                  className="text-gray-800"
                />
              )}
            </button>

            {/* USER / LOGIN */}
            {user ? (
              <div
                onClick={() =>
                  navigate(`/Dashboard/${user?._id}`)
                }
                className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:scale-[1.02] transition-all shadow-sm cursor-pointer"
              >
                {/* Avatar */}
                <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <UserRound
                    size={22}
                    className="text-blue-600 dark:text-blue-300"
                  />
                </div>

                {/* User Info */}
                <div className="leading-tight max-w-[180px]">
                  <p className="font-semibold text-sm truncate text-gray-900 dark:text-white">
                    {user?.name}
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>

                {/* Logout */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    loggingout(user);
                  }}
                  className="p-2 rounded-lg hover:bg-red-400 dark:hover:bg-red-700 transition"
                >
                  <LogOut
                    size={18}
                    className="text-gray-700 dark:text-gray-300"
                  />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">

                <Link to="/user/login">
                  <button className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-blue-500 transition">
                    Login
                  </button>
                </Link>

                <Link to="/user/signup">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition hover:scale-105">
                    Get Started
                  </button>
                </Link>

              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-800 dark:text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden pb-6 pt-2 space-y-5 border-t border-gray-200 dark:border-zinc-800">

            <nav className="space-y-4 pt-4 text-gray-800 dark:text-gray-200">

              {user ? (
                <Link
                  to={`/Dashboard/${user?._id}`}
                  className="block hover:text-red-500 transition"
                >
                  Dashboard
                </Link>
              ) : null}

              <Link
                to="/features"
                className="block hover:text-blue-500 transition"
              >
                Features
              </Link>

              <Link
                to="/how-it-works"
                className="block hover:text-blue-500 transition"
              >
                How it Works
              </Link>

              <Link
                to="/PricingPage"
                className="block hover:text-blue-500 transition"
              >
                Pricing
              </Link>
            </nav>

            {user ? (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">

                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <UserRound
                    size={20}
                    className="text-blue-600 dark:text-blue-300"
                  />
                </div>

                <div className="leading-tight">
                  <p className="font-medium text-sm text-gray-900 dark:text-white">
                    {user?.name}
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">

                <Link to="/user/login">
                  <button className="w-full text-left py-2 font-medium text-gray-800 dark:text-gray-200">
                    Login
                  </button>
                </Link>

                <Link to="/user/signup">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition">
                    Get Started
                  </button>
                </Link>

              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
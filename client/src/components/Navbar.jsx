import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { PiWaveformBold } from "react-icons/pi";
import { HiOutlineSparkles } from "react-icons/hi2";
import {
  HiOutlineClock,
  HiOutlineBolt,
  HiOutlineBars3,
  HiOutlineXMark,
} from "react-icons/hi2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user?.userData);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const credits = userData?.credits ?? 0;

  const handleLogout = async () => {
    try {
      const {data} = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      if (data.success) {
        dispatch(setUserData(null));
        setProfileOpen(false);

        toast.success("Logged out successfully!");

        navigate("/");
      } else {
        toast.error("Failed to logout.");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-bg/85 border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary">
            <PiWaveformBold size={18} color="#FFFFFF" />
          </div>
          <span className="font-semibold text-lg text-text-dark">
            CareerMind
          </span>
        </Link>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          {userData ? (
            <>
              <motion.button
               whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/history")}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition text-text-muted border border-border cursor-pointer"
              >
                <HiOutlineClock size={16} />
                History
              </motion.button>

              <motion.button
              whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/credits")}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gold-light text-gold cursor-pointer"
              >
                <HiOutlineBolt size={16} />
                {credits} credits
              </motion.button>

              <motion.button
                whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/interview")}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold shadow-md bg-primary text-white cursor-pointer"
              >
                <HiOutlineSparkles size={16} />
                Start Interview
              </motion.button>

              <div className="relative">
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm overflow-hidden bg-primary-light text-primary cursor-pointer"
                  title={userData.name}
                >
                  {userData.name?.charAt(0)?.toUpperCase() || "U"}
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-36 rounded-xl bg-white border border-border shadow-lg overflow-hidden z-50"
                    >
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition cursor-pointer"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <motion.button
              whileHover={{ opacity: 0.9, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/auth")}
              className="px-5 py-2 rounded-full text-sm font-semibold shadow-md bg-primary text-white cursor-pointer"
            >
              Sign in
            </motion.button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-text-dark cursor-pointer"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <HiOutlineXMark size={22} />
          ) : (
            <HiOutlineBars3 size={22} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {userData ? (
                <>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/interview");
                    }}
                    className="flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold bg-primary text-white"
                  >
                    <HiOutlineSparkles size={16} />
                    Start Interview
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/history");
                    }}
                    className="flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium border border-border text-text-muted"
                  >
                    <HiOutlineClock size={16} />
                    History
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/credits");
                    }}
                    className="flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium bg-gold-light text-gold"
                  >
                    <HiOutlineBolt size={16} />
                    {credits} credits — Buy more
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/auth");
                  }}
                  className="py-3 rounded-full text-sm font-semibold bg-primary text-white cursor-pointer"
                >
                  Sign in
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;

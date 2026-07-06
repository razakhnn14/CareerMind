import React from "react";
import { PiWaveformBold } from "react-icons/pi";
import { HiOutlineSparkles, HiOutlineXMark } from "react-icons/hi2";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          withCredentials: true,
        },
      );
      if (response.data.success) {
        dispatch(setUserData(response.data.user));
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-6 py-20 bg-bg">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05 }}
        className="relative w-full max-w-lg p-12 rounded-[32px] shadow-2xl bg-card border border-border"
      >
        {/* Close button */}
        <button
          onClick={() => navigate("/")}
          aria-label="Close"
          className="absolute top-5 right-5 p-2 rounded-full text-text-muted hover:bg-primary-light hover:text-primary transition cursor-pointer"
        >
          <HiOutlineXMark size={20} />
        </button>

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary">
            <PiWaveformBold size={18} color="#FFFFFF" />
          </div>
          <h2 className="font-semibold text-lg text-text-dark">
            CareerMind
          </h2>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-center leading-snug mb-4 text-text-dark">
          Step into your
          <span className="px-3 py-1 rounded-full inline-flex items-center gap-2 mt-2 ml-2 bg-primary-light text-primary">
            <HiOutlineSparkles size={16} />
            AI Mock Interview
          </span>
        </h1>

        <p className="text-center text-sm md:text-base leading-relaxed mb-8 text-text-muted">
          Sign in to practice real interview questions, get instant AI
          feedback on every answer, and track how your skills improve over
          time.
        </p>

        <motion.button
          whileHover={{ opacity: 0.9, scale: 1.03 }}
          whileTap={{ opacity: 1, scale: 0.98 }}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-full shadow-md bg-primary text-white cursor-pointer"
          onClick={googleLogin}
        >
          <FcGoogle size={20} />
          Continue with Google
        </motion.button>

        <p className="text-center text-xs mt-6 text-text-faint">
          Your first session is free - no credit card needed.
        </p>
      </motion.div>
    </div>
  );
}

export default Auth;
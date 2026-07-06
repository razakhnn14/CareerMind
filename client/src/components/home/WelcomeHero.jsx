import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineSparkles,
  HiOutlineClock,
  HiOutlineBolt,
} from "react-icons/hi2";
import { fadeUp } from "../../constants/theme";
import { useSelector } from "react-redux";

function WelcomeHero() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user?.userData);

  const firstName = userData?.name?.split(" ")?.[0] ?? "there";

  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
      <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
        <p className="text-sm font-medium mb-2 text-primary">
          Welcome back
        </p>

        <h1 className="text-3xl md:text-4xl font-semibold mb-3 text-text-dark">
          Ready for another round, {firstName}?
        </h1>

        <p className="text-base max-w-xl leading-relaxed text-text-muted">
          Pick up where you left off, review your last session, or jump
          straight into a fresh mock interview.
        </p>
      </motion.div>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-8 flex flex-wrap items-center gap-4"
      >
        <motion.button
          whileHover={{ opacity: 0.9, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/interview")}
          className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold shadow-md bg-primary text-white cursor-pointer"
        >
          <HiOutlineSparkles size={17} />
          Start Interview
        </motion.button>

        <motion.button
        whileHover={{ opacity: 0.9, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/history")}
          className="flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium border border-border bg-card text-text-dark cursor-pointer"
        >
          <HiOutlineClock size={16} />
          View History
        </motion.button>

        <motion.button
        whileHover={{ opacity: 0.9, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/credits")}
          className="flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium bg-gold-light text-gold cursor-pointer"
        >
          <HiOutlineBolt size={16} />
          Buy Credits
        </motion.button>
      </motion.div>
    </section>
  );
}

export default WelcomeHero;
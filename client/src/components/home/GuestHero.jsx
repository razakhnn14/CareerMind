import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { HiOutlineSparkles } from "react-icons/hi2";
import { fadeUp } from "../../constants/theme";

function GuestHero() {
  const navigate = useNavigate();

  return (
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.7 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-primary-light text-primary"
      >
        <HiOutlineSparkles size={15} />
        <span className="text-xs font-semibold tracking-wide">AI MOCK INTERVIEWS</span>
      </motion.div>

      <motion.h1
        {...fadeUp}
        transition={{ duration: 0.8, delay: 0.05 }}
        className="text-4xl md:text-6xl font-semibold leading-tight max-w-3xl mx-auto text-text-dark"
      >
        Walk into your next interview having already done it once.
      </motion.h1>

      <motion.p
        {...fadeUp}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mt-6 text-base md:text-lg max-w-xl mx-auto leading-relaxed text-text-muted"
      >
        CareerMind runs you through realistic mock interviews, listens to
        your answers, and tells you exactly how to sound more confident -
        before it counts for real.
      </motion.p>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <motion.button
          whileHover={{ opacity: 0.9, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/auth")}
          className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold shadow-md bg-primary text-white cursor-pointer"
        >
          <HiOutlineSparkles size={17} />
          Start your first interview — free
        </motion.button>
        <span className="text-xs text-text-faint">No credit card needed</span>
      </motion.div>

      <Waveform />
    </section>
  );
}

function Waveform() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="mt-16 mx-auto max-w-2xl rounded-[28px] p-8 shadow-xl flex items-center justify-center gap-2 bg-card border border-border"
      style={{ height: 96 }} // fixed container height — prevents layout shift
    >
      {Array.from({ length: 28 }).map((_, i) => (
        <motion.span
          key={i}
          className={`w-1.5 rounded-full ${i % 4 === 0 ? "bg-gold" : "bg-primary"}`}
          style={{
            height: 40, // fixed base height — only ever scaled visually
            transformOrigin: "center",
            willChange: "transform",
          }}
          animate={{ scaleY: [0.2, 0.25 + (i % 7) * 0.15, 0.2] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: i * 0.05,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}

export default GuestHero;

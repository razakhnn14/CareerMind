import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineBolt, HiOutlineClock, HiOutlineArrowRight } from "react-icons/hi2";

function StatsGrid() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user?.userData);

  const credits = userData?.credits ?? 0;
  const sessions = userData?.totalSessions ?? 0;

  const stats = [
    {
      icon: HiOutlineBolt,
      label: "Credits remaining",
      value: credits,
      action: { label: "Buy more", onClick: () => navigate("/credits") },
    },
    {
      icon: HiOutlineClock,
      label: "Interviews completed",
      value: sessions,
      action: { label: "View history", onClick: () => navigate("/history") },
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="p-6 rounded-3xl flex flex-col justify-between bg-card border border-border"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary-light">
                <s.icon size={18} className="text-primary" />
              </div>
              <span className="text-2xl font-semibold text-text-dark">{s.value}</span>
            </div>
            <p className="text-sm mb-4 text-text-muted">{s.label}</p>
            <button
              onClick={s.action.onClick}
              className="cursor-pointer flex items-center gap-1 text-xs font-semibold self-start text-primary hover:underline"
            >
              {s.action.label}
              <HiOutlineArrowRight size={13} />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default StatsGrid;

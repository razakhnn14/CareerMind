import React from "react";
import { motion } from "motion/react";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineSparkles,
  HiOutlineArrowTrendingUp,
} from "react-icons/hi2";

const features = [
  {
    icon: HiOutlineChatBubbleLeftRight,
    title: "Real interview questions",
    desc: "Practice with role-specific questions drawn from real interview patterns, not generic flashcards.",
  },
  {
    icon: HiOutlineSparkles,
    title: "Instant AI feedback",
    desc: "Get a clear breakdown of what worked, what didn't, and exactly how to phrase it better - right after you answer.",
  },
  {
    icon: HiOutlineArrowTrendingUp,
    title: "Track your growth",
    desc: "Every session is scored and saved, so you can see your confidence and clarity improve session over session.",
  },
];

function FeatureGrid() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="p-7 rounded-3xl bg-card border border-border"
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 bg-primary-light">
              <f.icon size={20} className="text-primary" />
            </div>
            <h3 className="font-semibold text-base mb-2 text-text-dark">{f.title}</h3>
            <p className="text-sm leading-relaxed text-text-muted">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default FeatureGrid;

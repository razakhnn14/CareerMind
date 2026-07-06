import React from "react";
import { motion } from "motion/react";

const steps = [
  { label: "Pick a role", desc: "Choose the job title and level you're interviewing for." },
  { label: "Answer out loud", desc: "Respond to live questions the way you would in a real interview." },
  { label: "Get scored", desc: "Receive instant feedback on content, clarity, and delivery." },
];

function HowItWorks() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-semibold text-center mb-12 text-text-dark"
      >
        Three steps to a sharper interview
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="text-center"
          >
            <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center font-semibold mb-4 bg-primary text-white">
              {i + 1}
            </div>
            <h4 className="font-semibold mb-2 text-text-dark">{s.label}</h4>
            <p className="text-sm leading-relaxed max-w-xs mx-auto text-text-muted">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;

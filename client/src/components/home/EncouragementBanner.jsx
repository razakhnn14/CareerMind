import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function EncouragementBanner() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user?.userData);

  const credits = userData?.credits ?? 0;
  const sessions = userData?.totalSessions ?? 0;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-[32px] p-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-primary"
      >
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
            {sessions === 0
              ? "Your first session is the hardest one — let's get it out of the way."
              : "Consistency beats intensity. One more session this week?"}
          </h3>
          <p className="text-sm text-primary-light">
            {credits > 0
              ? `You have ${credits} credit${credits === 1 ? "" : "s"} ready to use.`
              : "You're out of credits — top up to keep practicing."}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(credits > 0 ? "/interview" : "/credits")}
          className="px-6 py-3 rounded-full text-sm font-semibold shadow-md whitespace-nowrap bg-white text-primary cursor-pointer"
        >
          {credits > 0 ? "Start Interview" : "Buy Credits"}
        </motion.button>
      </motion.div>
    </section>
  );
}

export default EncouragementBanner;

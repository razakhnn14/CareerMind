import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PiWaveformBold } from "react-icons/pi";

function ClosingCTA() {
  const navigate = useNavigate();

  return (
    <section className="max-w-4xl mx-auto px-6 py-20 text-center">
      <div className="rounded-[32px] p-12 bg-primary">
        <PiWaveformBold size={28} color="#FFFFFF" className="mx-auto mb-4" />
        <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">
          Your next interview deserves a dry run.
        </h3>
        <p className="text-sm md:text-base mb-8 text-primary-light">
           Sign in and start practicing in under a minute.
        </p>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={()=>{navigate("/Auth")}}
          className="px-7 py-3.5 rounded-full text-sm font-semibold shadow-md bg-white text-primary cursor-pointer"
        >
          Get started free
        </motion.button>
      </div>
    </section>
  );
}

export default ClosingCTA;

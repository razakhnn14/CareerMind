import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import axios from "axios";
import {
  HiOutlineBolt,
  HiOutlineSparkles,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { setUserData } from "../redux/userSlice";

function Credits() {
  const plans = [
    {
      credits: 10,
      price: 99,
    },
    {
      credits: 30,
      price: 249,
    },
    {
      credits: 75,
      price: 499,
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user?.userData);
  const [selectedPlan, setSelectedPlan] = useState(plans[1].credits);
  const credits = userData?.credits ?? 0;

  useEffect(() => {
    if (!userData) {
      toast.error("Log in first");
      navigate("/auth");
    }
  }, [userData, navigate]);

  const handlePayment = async (plan) => {
    try {
      const orderRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`,
        {
          amount: plan.price,
        },
        {
          withCredentials: true,
        },
      );

      const { order } = orderRes.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "CareerMind",
        description: `Purchase ${plan.credits} Credits`,
        order_id: order.id,

        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/payment/verify`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                credits: plan.credits,
                price: plan.price,
              },
              {
                withCredentials: true,
              },
            );

            if (verifyRes.data.success) {
              // 🔑 use the `dispatch` returned by useDispatch(), not the hook itself
              dispatch(
                setUserData({
                  ...userData,
                  credits: verifyRes.data.credits,
                }),
              );
              toast.success("Payment Successful!");
            } else {
              toast.error(verifyRes.data.message);
            }
          } catch (err) {
            console.error(err);
            toast.error("Payment verification failed");
          }
        },

        prefill: {
          name: userData?.name || "",
          email: userData?.email || "",
        },
        theme: {
          color: "#16A34A",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Error creating Razorpay order");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-primary font-medium mb-2">Credits</p>

            <h1 className="text-4xl font-bold text-text-dark">
              Manage Your Interview Credits
            </h1>

            <p className="mt-3 max-w-2xl text-text-muted">
              Every AI mock interview consumes credits. Purchase more anytime
              and continue practicing without interruptions.
            </p>
          </motion.div>

          {/* Current Credits */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-10 rounded-3xl bg-card border border-border p-8 flex flex-col md:flex-row items-center justify-between"
          >
            <div>
              <p className="text-text-muted mb-2">Available Credits</p>

              <div className="flex items-center gap-3">
                <HiOutlineBolt className="text-gold text-4xl" />

                <span className="text-5xl font-bold text-text-dark">
                  {credits}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Plans */}
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => {
              const isSelected = selectedPlan === plan.credits;

              return (
                <motion.div
                  key={plan.credits}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedPlan(plan.credits)}
                  className={`rounded-3xl border p-8 transition-all duration-300 ${
                    isSelected
                      ? "bg-primary text-white border-primary shadow-xl scale-105"
                      : "bg-card border-border hover:border-primary hover:shadow-lg"
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 mb-4 ${
                      isSelected ? "text-yellow-300" : "text-gold"
                    }`}
                  >
                    <HiOutlineBolt />
                    <span className="font-semibold">
                      {plan.credits} Credits
                    </span>
                  </div>

                  <h2
                    className={`text-4xl font-bold ${
                      isSelected ? "text-white" : "text-text-dark"
                    }`}
                  >
                    ₹{plan.price}
                  </h2>

                  <div
                    className={`mt-6 space-y-3 ${
                      isSelected ? "text-white/90" : "text-text-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <HiOutlineCheckCircle />
                      AI Mock Interviews
                    </div>

                    <div className="flex items-center gap-2">
                      <HiOutlineCheckCircle />
                      Instant AI Feedback
                    </div>

                    <div className="flex items-center gap-2">
                      <HiOutlineCheckCircle />
                      Performance Analytics
                    </div>
                  </div>

                  <button
                    className={`mt-8 w-full py-3 rounded-full font-semibold transition cursor-pointer ${
                      isSelected
                        ? "bg-white text-primary"
                        : "bg-primary text-white hover:opacity-90"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();

                      if (isSelected) {
                        handlePayment(plan);
                      } else {
                        setSelectedPlan(plan.credits);
                      }
                    }}
                  >
                    {isSelected ? "Buy Now" : "Select Plan"}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Info */}
          <div className="mt-16 rounded-3xl bg-primary-light border border-border p-8">
            <div className="flex items-center gap-3 mb-3">
              <HiOutlineSparkles className="text-primary text-2xl" />
              <h3 className="text-xl font-semibold text-text-dark">
                How Credits Work
              </h3>
            </div>

            <ul className="space-y-3 text-text-muted">
              <li>• One AI interview session consumes one credit.</li>
              <li>• Credits never expire.</li>
              <li>• Buy more anytime.</li>
              <li>• Your interview history remains available forever.</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Credits;

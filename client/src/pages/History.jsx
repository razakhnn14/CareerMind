import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlineClock, HiOutlineChevronRight } from "react-icons/hi2";
import { PiWaveformBold } from "react-icons/pi";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STATUS_STYLES = {
  completed: { label: "Completed", className: "bg-primary-light text-primary" },
  abandoned: { label: "Abandoned", className: "bg-border text-text-muted" },
};

function History() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user?.userData);

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData){
      toast.error("Please Login First")
      navigate("/Auth");
    }

    const fetchHistory = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/interview/history`,
          { withCredentials: true }
        );
        if (data.success) {
          setInterviews(data.interviews);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userData]);

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />

      <main className="flex-1 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-primary">
              <PiWaveformBold size={18} color="#FFFFFF" />
            </div>
            <h1 className="text-2xl font-semibold text-text-dark">Interview History</h1>
          </div>

          {loading ? (
            <p className="text-text-muted">Loading history...</p>
          ) : interviews.length === 0 ? (
            <div className="p-10 rounded-3xl text-center bg-card border border-border">
              <p className="text-text-muted">You haven't taken any interviews yet.</p>
              <button
                onClick={() => navigate("/interview")}
                className="mt-5 px-6 py-3 rounded-full bg-primary text-white hover:opacity-90 transition"
              >
                Start Your First Interview
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {interviews.map((interview) => {
                const status = STATUS_STYLES[interview.status] || STATUS_STYLES.abandoned;
                const isCompleted = interview.status === "completed";

                return (
                  <div
                    key={interview._id}
                    onClick={() => isCompleted && navigate(`/report/${interview._id}`)}
                    className={`p-6 rounded-2xl flex items-center justify-between gap-4 bg-card border border-border transition ${
                      isCompleted ? "cursor-pointer hover:border-primary" : "cursor-default opacity-70"
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-sm mb-1 text-text-dark">
                        {interview.role}
                      </p>
                      <p className="text-xs flex items-center gap-1.5 text-text-faint">
                        <HiOutlineClock size={14} />
                        {new Date(interview.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                        {" "}&middot; {interview.experience} yrs exp
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      {isCompleted && (
                        <span className="text-sm font-bold px-3 py-1.5 rounded-full bg-primary-light text-primary">
                          {interview.report?.overallScore ?? "--"}
                        </span>
                      )}
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${status.className}`}>
                        {status.label}
                      </span>
                      {isCompleted && (
                        <HiOutlineChevronRight size={18} className="text-text-faint" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default History;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
// 👇 adjust this import + action name to match your actual user slice
import { setUserData } from "../redux/userSlice";

function StartInterview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.user?.userData);

  useEffect(() => {
    if (!userData) {
      toast.error("Login in First");
      navigate("/auth");
    }
  }, [userData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role || !experience || !resume) {
      toast.error("Please fill all fields and upload your resume");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("role", role);
      formData.append("experience", experience);
      formData.append("resume", resume);

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/interview/start`,
        formData,
        { withCredentials: true }
      );

      if (data.success) {
        dispatch(setUserData({ ...userData, credits: data.credits , totalSessions: data.totalSessions }));

        navigate(`/interview/${data.interviewId}`, {
          state: { questions: data.questions },
        });
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />

      <main className="flex-1 px-6 py-16">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-semibold text-text-dark mb-8">
            Start a New Interview
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-3xl p-8 flex flex-col gap-5"
          >
            <div>
              <label className="text-sm text-text-muted mb-1 block">Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Frontend Developer"
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-text-dark outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm text-text-muted mb-1 block">
                Years of Experience
              </label>
              <input
                type="number"
                min="0"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g. 2"
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-text-dark outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm text-text-muted mb-1 block">Resume (PDF)</label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setResume(e.target.files[0])}
                className="w-full text-sm text-text-muted"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 px-6 py-3 rounded-full bg-primary text-white hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Generating Questions..." : "Start Interview"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default StartInterview;

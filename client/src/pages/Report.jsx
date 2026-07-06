import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi2";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ScoreGauge({ score }) {
  const data = [{ value: score, fill: "#0E6E5C" }];

  return (
    <div className="relative w-40 h-40">
      <RadialBarChart
        width={160}
        height={160}
        cx="50%"
        cy="50%"
        innerRadius="75%"
        outerRadius="100%"
        barSize={12}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "#EDE7DA" }} />
      </RadialBarChart>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-text-dark">{score}</span>
        <span className="text-xs text-text-muted">out of 100</span>
      </div>
    </div>
  );
}

function Report() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/interview/${id}/report`,
          { withCredentials: true }
        );
        if (data.success) {
          setInterview(data.interview);
        } else {
          toast.error(data.message);
          navigate("/history");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
        navigate("/history");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-bg">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-text-muted">Loading report...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!interview) return null;

  const { role, experience, questions, answers, report } = interview;

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />

      <main className="flex-1 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <p className="text-primary font-medium mb-1">Interview Report</p>
            <h1 className="text-3xl font-bold text-text-dark">{role}</h1>
            <p className="text-text-muted mt-1">{experience} years of experience</p>
          </div>

          {/* Score with gauge */}
          <div className="bg-card border border-border rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 mb-8">
            <ScoreGauge score={report?.overallScore ?? 0} />
            <div>
              <p className="text-text-muted text-sm mb-1">Overall Performance</p>
              <p className="text-text-dark text-lg font-medium">
                {report?.overallScore >= 80
                  ? "Excellent work!"
                  : report?.overallScore >= 60
                  ? "Good, with room to grow"
                  : "Keep practicing"}
              </p>
              {report?.summary && (
                <p className="text-text-muted text-sm mt-2">{report.summary}</p>
              )}
            </div>
          </div>

          {/* Strengths / Improvements */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {report?.strengths?.length > 0 && (
              <div className="bg-primary-light border border-border rounded-3xl p-6">
                <h3 className="text-md font-semibold text-text-dark mb-3">Strengths</h3>
                <ul className="space-y-2">
                  {report.strengths.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-muted text-sm">
                      <HiOutlineCheckCircle className="text-primary mt-0.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {report?.improvements?.length > 0 && (
              <div className="bg-gold-light border border-border rounded-3xl p-6">
                <h3 className="text-md font-semibold text-text-dark mb-3">
                  Areas to Improve
                </h3>
                <ul className="space-y-2">
                  {report.improvements.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-muted text-sm">
                      <HiOutlineXCircle className="text-gold mt-0.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Q&A Breakdown */}
          <div className="bg-card border border-border rounded-3xl p-8">
            <h2 className="text-lg font-semibold text-text-dark mb-5">
              Questions & Answers
            </h2>
            <div className="flex flex-col gap-6">
              {questions.map((q, i) => (
                <div key={i} className="border-b border-border pb-5 last:border-0 last:pb-0">
                  <p className="text-sm font-semibold text-text-dark mb-2">
                    Q{i + 1}. {q}
                  </p>
                  <p className="text-sm text-text-muted">
                    {answers?.[i] || "(no answer provided)"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate("/history")}
            className="mt-8 px-6 py-3 rounded-full bg-primary text-white hover:opacity-90 transition"
          >
            Back to History
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Report;
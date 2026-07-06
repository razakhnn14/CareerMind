import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { CiMicrophoneOn } from "react-icons/ci";
import { HiSpeakerWave } from "react-icons/hi2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Interview() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const questions = state?.questions || [];
  const hasQuestions = questions.length > 0;

  const userData = useSelector((state) => state.user?.userData);
  const userName = userData?.name || "guest";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [submitting, setSubmitting] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const submittingRef = useRef(false);
  const recognitionRef = useRef(null);
  const hasGreetedRef = useRef(false); 

  // computer speak
  const speak = (text, onEnd) => {
    if (!("speechSynthesis" in window)) return; 
    window.speechSynthesis.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    if (onEnd) utterance.onend = onEnd;
    window.speechSynthesis.speak(utterance);
  };

  // user speak
  const startListening = () => {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      toast.error("Voice input isn't supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "en-US";
    recognition.interimResults = false; 
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setAnswer((prev) => (prev ? prev + " " + spokenText : spokenText));
    };

    recognition.onerror = () => {
      toast.error("Couldn't hear that clearly. Please try again.");
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  useEffect(() => {
    if (!hasQuestions) {
      toast.error("Interview was abandoned. Please start a new one.");
      navigate("/interview");
    }
  }, [hasQuestions,navigate]);

  useEffect(() => {
    if (!hasQuestions) return;

    const handleBeforeUnload = (e) => {
      if (submittingRef.current) return;
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasQuestions]);

  useEffect(() => {
    if (!hasQuestions || hasGreetedRef.current) return;
    hasGreetedRef.current = true;

    speak(`Hello ${userName}, let's begin your interview.`, () => {
      speak(questions[0]);
    });
  }, [hasQuestions]);

  useEffect(() => {
    if (!hasQuestions || currentIndex === 0) return;
    speak(questions[currentIndex]);
  }, [currentIndex]);

  // Timer
  useEffect(() => {
    if (!hasQuestions) return;
    if (submittingRef.current) return;

    if (timeLeft === 0) {
      handleNext();
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);

  }, [timeLeft, hasQuestions]);

  const handleNext = () => {
    stopListening(); // stop mic if it's still active when moving on
    window.speechSynthesis.cancel(); // stop the question audio if still playing

    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);
    setAnswer("");

    const isLast = currentIndex + 1 >= questions.length;

    if (!isLast) {
      setTimeLeft(60);
      setCurrentIndex((i) => i + 1);
    } else {
      submittingRef.current = true;
      submitInterview(updatedAnswers);
    }
  };

  const submitInterview = async (finalAnswers) => {
    setSubmitting(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/interview/${id}/submit`,
        { answers: finalAnswers },
        { withCredentials: true }
      );

      if (data.success) {
        navigate(`/report/${id}`);
      } else {
        toast.error(data.message);
        submittingRef.current = false;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      submittingRef.current = false;
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this interview? Your progress won't be saved."
    );
    if (!confirmed) return;

    window.speechSynthesis.cancel();
    stopListening();
    toast.info("Interview abandoned.");
    navigate("/history");
  };

  if (!hasQuestions) return null;

  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />

      <main className="flex-1 px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-text-muted text-sm">
              Question {currentIndex + 1} of {questions.length}
            </p>
            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-semibold px-3 py-1.5 rounded-full ${
                  timeLeft <= 10
                    ? "bg-gold-light text-gold"
                    : "bg-primary-light text-primary"
                }`}
              >
                {timeLeft}s
              </span>
              <button
                onClick={handleCancel}
                disabled={submitting}
                className="text-sm font-medium text-text-muted hover:text-red-500 transition disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8">
            <div className="flex items-start justify-between gap-3 mb-6">
              <p className="text-lg font-medium text-text-dark">
                {questions[currentIndex]}
              </p>
              <button
                onClick={() => speak(questions[currentIndex])}
                title="Hear question again"
                className="shrink-0 text-primary hover:opacity-70 transition"
              >
                <HiSpeakerWave className="w-5 h-5" />

              </button>
            </div>

            <div className="relative">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={6}
                placeholder="Type your answer here, or use the mic..."
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-text-dark outline-none focus:border-primary resize-none"
              />
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-primary-light text-primary hover:opacity-80"
                }`}
                title={isListening ? "Stop recording" : "Speak your answer"}
              >

    <CiMicrophoneOn className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={handleNext}
              disabled={submitting}
              className="mt-6 px-6 py-3 rounded-full bg-primary text-white hover:opacity-90 transition disabled:opacity-50"
            >
              {submitting
                ? "Submitting..."
                : isLastQuestion
                ? "Submit Interview"
                : "Next Question"}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Interview;
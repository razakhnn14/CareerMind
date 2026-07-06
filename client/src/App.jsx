import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import StartInterview from "./pages/StartInterview";
import Interview from "./pages/Interview";
import Report from "./pages/Report";
import History from "./pages/History";
import Credits from "./pages/Credits";
import { setUserData } from "./redux/userSlice"; // 👈 adjust this path/name to match your actual slice

function App() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/me`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        if (data.success) {
          dispatch(setUserData(data.user));
        }
      })
      .catch(() => {})
      .finally(() => setAuthChecked(true));
  }, [dispatch]);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Auth" element={<Auth />} />
      <Route path="/interview" element={<StartInterview />} />
      <Route path="/interview/:id" element={<Interview />} />
      <Route path="/report/:id" element={<Report />} />
      <Route path="/history" element={<History />} />
      <Route path="/credits" element={<Credits />} />
    </Routes>
  );
}

export default App;
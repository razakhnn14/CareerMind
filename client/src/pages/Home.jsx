import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GuestHero from "../components/home/GuestHero";
import FeatureGrid from "../components/home/FeatureGrid";
import HowItWorks from "../components/home/HowItWorks";
import ClosingCTA from "../components/home/ClosingCTA";
import WelcomeHero from "../components/home/WelcomeHero";
import StatsGrid from "../components/home/StatsGrid";
import EncouragementBanner from "../components/home/EncouragementBanner";

function Home() {
  const userData = useSelector((state) => state.user?.userData);

  return (
    <div className="w-full min-h-screen flex flex-col bg-bg">
      <Navbar />

      <main className="flex-1">
        {userData ? (
          <>
            <WelcomeHero />
            <StatsGrid />
            <EncouragementBanner />
          </>
        ) : (
          <>
            <GuestHero />
            <FeatureGrid />
            <HowItWorks />
            <ClosingCTA />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Home;

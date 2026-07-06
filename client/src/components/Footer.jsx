import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-14">

        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-border">
          <p className="text-xs text-text-faint">
            © {year} CareerMind. All rights reserved.
          </p>
          <p className="text-xs text-text-faint">
            Built for people who want their next interview to feel familiar.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
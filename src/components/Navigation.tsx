"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Kineto", icon: "K" },
  { id: "team", label: "Team", icon: "1" },
  { id: "problem", label: "Problem", icon: "2" },
  { id: "vision", label: "Vision", icon: "3" },
  { id: "data", label: "Data", icon: "4" },
  { id: "cf", label: "CF Models", icon: "5" },
  { id: "content", label: "Content", icon: "6" },
  { id: "nlp", label: "NLP", icon: "7" },
  { id: "hybrid", label: "Hybrid", icon: "8" },
  { id: "architecture", label: "Architecture", icon: "9" },
  { id: "demo", label: "Demo", icon: "10" },
  { id: "performance", label: "Performance", icon: "11" },
  { id: "business", label: "Business", icon: "12" },
  { id: "financials", label: "Financials", icon: "13" },
  { id: "roadmap", label: "Future", icon: "14" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navClasses = isOpen ? "translate-x-0" : "-translate-x-full";

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-zinc-900/80 backdrop-blur border border-zinc-800 md:hidden"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Navigation sidebar */}
      <nav className={`fixed left-0 top-0 h-full z-40 transition-transform duration-300 md:translate-x-0 ${navClasses}`}>
        <div className="h-full py-4 px-2 bg-zinc-950/95 backdrop-blur border-r border-zinc-800 flex flex-col justify-center">
          <ul className="space-y-1">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-all ${
                    activeSection === id
                      ? "bg-indigo-600 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50 origin-left"
        style={{
          scaleX: sections.findIndex((s) => s.id === activeSection) / (sections.length - 1),
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}

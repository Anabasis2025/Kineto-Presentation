"use client";

import { motion } from "framer-motion";
import ScrollSection from "@/components/ScrollSection";
import Navigation from "@/components/Navigation";
import { VisionSection, DataSection, CFSection, ContentSection, NLPSection, HybridSection } from "@/components/sections";
import { ArchitectureSection, DemoSection, PerformanceSection, BusinessSection, FinancialsSection, RoadmapSection } from "@/components/sections/more";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <div className="md:ml-24">
        {/* HERO */}
        <section id="hero" className="section min-h-screen flex items-center justify-center relative overflow-hidden grid-bg">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent" />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center z-10 px-4">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-8">
              <h1 className="text-7xl md:text-9xl font-bold gradient-text mb-4">Kineto</h1>
              <p className="text-2xl md:text-3xl text-zinc-400 font-light">AI-Powered Movie Recommendations</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }} className="space-y-4">
              <p className="text-xl text-zinc-300">A Six-Signal Hybrid Recommendation System</p>
              <p className="text-lg text-zinc-500">Northwestern University MSDS Capstone | Fall 2025</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="mt-12 flex flex-wrap gap-4 justify-center">
              <div className="stat-card"><div className="text-3xl font-bold text-indigo-400">3.5M+</div><div className="text-sm text-zinc-400">User Interactions</div></div>
              <div className="stat-card"><div className="text-3xl font-bold text-purple-400">43,858</div><div className="text-sm text-zinc-400">Movies Indexed</div></div>
              <div className="stat-card"><div className="text-3xl font-bold text-pink-400">6</div><div className="text-sm text-zinc-400">Signal Fusion</div></div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }} className="mt-16">
              <a href="#team" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                <span>Scroll to explore</span>
                <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* TEAM */}
        <ScrollSection id="team" className="bg-zinc-950">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">The Team</h2>
            <p className="text-xl text-zinc-400 mb-12">Northwestern University MSDS Candidates</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { name: "Ally Stills", role: "NLP & Query Parsing", focus: "SpaCy NER, Situation/Outcome" },
                { name: "Kyle Krug", role: "System Architecture", focus: "Hybrid Engine, Deployment" },
                { name: "Niki Lazaris", role: "Data Engineering", focus: "ETL Pipeline, Processing" },
                { name: "Patrick Steed", role: "ML Models", focus: "SVD, NeuMF, CF" },
                { name: "Satvik Vagnamurthy", role: "Content Analysis", focus: "LDA, BERT, Zero-Shot" },
              ].map((member, i) => (
                <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="glass rounded-xl p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold">{member.name.split(" ").map(n => n[0]).join("")}</div>
                  <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-indigo-400 text-sm mb-2">{member.role}</p>
                  <p className="text-zinc-500 text-xs">{member.focus}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollSection>

        {/* PROBLEM */}
        <ScrollSection id="problem" className="bg-zinc-900">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">The Problem</h2>
            <p className="text-xl text-zinc-400 mb-12">Why current movie recommenders fall short</p>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-xl p-6"><h3 className="text-xl font-semibold text-red-400 mb-3">Cold Start Problem</h3><p className="text-zinc-400">Traditional CF systems cannot recommend to new users without rating history.</p></motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="glass rounded-xl p-6"><h3 className="text-xl font-semibold text-orange-400 mb-3">Limited Signal Usage</h3><p className="text-zinc-400">Most systems rely on 1-2 signals. They miss emotional context and situational needs.</p></motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="glass rounded-xl p-6"><h3 className="text-xl font-semibold text-yellow-400 mb-3">Poor Query Understanding</h3><p className="text-zinc-400">Keyword search fails for nuanced requests.</p></motion.div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border-4 border-dashed border-zinc-700 flex items-center justify-center"><div className="text-center"><div className="text-6xl font-bold text-zinc-600">?</div><p className="text-zinc-500 mt-2">User Intent Lost</p></div></div>
              </div>
            </div>
          </div>
        </ScrollSection>

        <VisionSection />
        <DataSection />
        <CFSection />
        <ContentSection />
        <NLPSection />
        <HybridSection />
        <ArchitectureSection />
        <DemoSection />
        <PerformanceSection />
        <BusinessSection />
        <FinancialsSection />
        <RoadmapSection />
      </div>
    </main>
  );
}

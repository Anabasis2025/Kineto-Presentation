"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollSection from "@/components/ScrollSection";
import Modal, { ClickableCard } from "@/components/Modal";

const stacks = [
  {
    category: "Frontend",
    items: ["Streamlit", "Custom CSS", "Responsive UI"],
    color: "from-blue-500 to-cyan-500",
    details: {
      description: "Streamlit provides rapid prototyping with Python-native UI components.",
      specifics: [
        { item: "Streamlit 1.28+", note: "Session state for user preferences" },
        { item: "Custom CSS", note: "Dark theme, glass morphism effects" },
        { item: "Responsive Grid", note: "Poster cards adapt to screen size" }
      ]
    }
  },
  {
    category: "Backend",
    items: ["Python 3.11", "Pandas", "NumPy"],
    color: "from-green-500 to-emerald-500",
    details: {
      description: "High-performance data processing with vectorized operations.",
      specifics: [
        { item: "Python 3.11", note: "30% faster than 3.10" },
        { item: "Pandas 2.0", note: "PyArrow backend for speed" },
        { item: "NumPy", note: "Matrix operations for scoring" }
      ]
    }
  },
  {
    category: "ML/NLP",
    items: ["PyTorch", "SpaCy", "Transformers"],
    color: "from-purple-500 to-violet-500",
    details: {
      description: "State-of-the-art models for understanding and classification.",
      specifics: [
        { item: "PyTorch 2.0", note: "NeuMF training + inference" },
        { item: "SpaCy en_core_web_sm", note: "Fast NER extraction" },
        { item: "HuggingFace Transformers", note: "BERT, BART models" }
      ]
    }
  },
  {
    category: "Deployment",
    items: ["Docker", "HuggingFace Spaces", "Git LFS"],
    color: "from-yellow-500 to-orange-500",
    details: {
      description: "Containerized deployment with large file handling.",
      specifics: [
        { item: "Docker", note: "Consistent environment" },
        { item: "HF Spaces", note: "Free GPU for inference" },
        { item: "Git LFS", note: "500MB+ model files" }
      ]
    }
  }
];

// Current: Query-Based Foundation (works for everyone)
const queryFoundation = [
  { signal: "NLP Query Parsing", desc: "Understands intent, mood, context from natural language", icon: "💬", active: true },
  { signal: "Content Matching", desc: "TF-IDF, metadata, genre similarity", icon: "📝", active: true },
  { signal: "Theme Analysis", desc: "15 LDA topics from review corpus", icon: "📊", active: true },
  { signal: "Sentiment Signals", desc: "BERT 7-emotion classification", icon: "❤️", active: true },
  { signal: "Zero-Shot Tags", desc: "322 semantic labels via BART", icon: "🏷️", active: true },
  { signal: "CF Quality Scores", desc: "Movie-level ratings (not personalized yet)", icon: "⭐", active: true }
];

// Future: Personalization Layer (user profiles)
const futurePersonalization = [
  { feature: "User Profiles", desc: "Local storage of preferences and history", status: "Shell built" },
  { feature: "Behavior Learning", desc: "Track interactions to refine recommendations", status: "Planned" },
  { feature: "Personalized CF", desc: "SVD+NeuMF predictions tailored to individual users", status: "Planned" },
  { feature: "Watchlist Sync", desc: "Save and organize movies across sessions", status: "Planned" }
];

export function InteractiveArchitectureSection() {
  const [selectedStack, setSelectedStack] = useState<typeof stacks[0] | null>(null);
  const [showColdStartModal, setShowColdStartModal] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <ScrollSection id="architecture" className="bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">System Architecture</h2>
        <p className="text-xl text-zinc-400 mb-12">Scalable deployment on Hugging Face Spaces</p>

        {/* Tech Stack Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stacks.map((stack, i) => (
            <ClickableCard
              key={stack.category}
              onClick={() => setSelectedStack(stack)}
              className="glass rounded-xl p-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stack.color} flex items-center justify-center text-xl font-bold mb-4`}>
                  {stack.category[0]}
                </div>
                <h3 className="text-lg font-semibold text-indigo-400 mb-4">{stack.category}</h3>
                <ul className="space-y-2">
                  {stack.items.map((item) => (
                    <li key={item} className="text-zinc-300 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </ClickableCard>
          ))}
        </div>

        {/* Request Flow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass rounded-xl p-8 mb-12"
        >
          <h3 className="text-xl font-semibold text-center mb-8">Request Flow</h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {[
              { label: "User Query", icon: "👤" },
              { label: "Streamlit UI", icon: "🖥️" },
              { label: "Query Parser", icon: "⚙️" },
              { label: "Hybrid Engine", icon: "🔮" },
              { label: "Results", icon: "🎬" },
            ].map((node, i, arr) => (
              <div key={node.label} className="flex items-center gap-4">
                <div className="flow-node">
                  <div className="text-2xl mb-2">{node.icon}</div>
                  <div className="text-sm font-medium">{node.label}</div>
                </div>
                {i < arr.length - 1 && (
                  <svg className="w-8 h-8 text-indigo-500 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Query-Based Architecture Section */}
        <ClickableCard onClick={() => setShowColdStartModal(true)} className="glass rounded-xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-green-400 mb-2">Query-Based Architecture</h3>
              <p className="text-zinc-400 text-sm">Intelligent recommendations for everyone - no profile required</p>
            </div>
            <div className="text-4xl">🚀</div>
          </div>
          <div className="mt-6">
            <div className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Active Today</div>
            <div className="flex flex-wrap gap-2">
              {queryFoundation.map((item) => (
                <span key={item.signal} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm flex items-center gap-1">
                  <span>{item.icon}</span> {item.signal}
                </span>
              ))}
            </div>
          </div>
        </ClickableCard>

        {/* Stack Detail Modal */}
        <Modal
          isOpen={!!selectedStack}
          onClose={() => setSelectedStack(null)}
          title={selectedStack?.category}
        >
          {selectedStack && (
            <div className="space-y-6">
              <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${selectedStack.color} flex items-center justify-center text-3xl font-bold mx-auto`}>
                {selectedStack.category[0]}
              </div>

              <p className="text-zinc-300 text-center">{selectedStack.details.description}</p>

              <div>
                <h5 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-3">Stack Details</h5>
                <div className="space-y-3">
                  {selectedStack.details.specifics.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg">
                      <span className="text-zinc-300 font-medium">{spec.item}</span>
                      <span className="text-zinc-500 text-sm">{spec.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Query-Based Architecture Modal */}
        <Modal
          isOpen={showColdStartModal}
          onClose={() => { setShowColdStartModal(false); setActiveStep(null); }}
          title="Query-Based Architecture"
        >
          <div className="space-y-6">
            {/* Current Foundation */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <h5 className="text-sm font-semibold text-green-400 uppercase tracking-wide">Active Today</h5>
              </div>
              <p className="text-zinc-400 text-sm mb-4">
                The NLP + Six-Signal system delivers intelligent recommendations for every user,
                no account or rating history required:
              </p>
              <div className="space-y-2">
                {queryFoundation.map((item, i) => (
                  <motion.div
                    key={item.signal}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="text-zinc-200 text-sm font-medium">{item.signal}</div>
                      <div className="text-zinc-500 text-xs">{item.desc}</div>
                    </div>
                    <span className="text-green-400 text-xs">Active</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Future Personalization */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 bg-indigo-500 rounded-full" />
                <h5 className="text-sm font-semibold text-indigo-400 uppercase tracking-wide">Future Enhancement</h5>
              </div>
              <p className="text-zinc-400 text-sm mb-4">
                User profile shell is built. Future updates will add personalization on top of the query-based foundation:
              </p>
              <div className="space-y-2">
                {futurePersonalization.map((item, i) => (
                  <motion.div
                    key={item.feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg border border-zinc-700/50"
                  >
                    <div className="flex-1">
                      <div className="text-zinc-300 text-sm font-medium">{item.feature}</div>
                      <div className="text-zinc-500 text-xs">{item.desc}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${item.status === "Shell built" ? "bg-indigo-500/20 text-indigo-400" : "bg-zinc-700 text-zinc-400"}`}>
                      {item.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <h5 className="text-sm font-semibold text-green-400 mb-2">Why This Works</h5>
              <p className="text-zinc-400 text-sm">
                Unlike traditional recommenders that require extensive user history, Kineto delivers
                great results from the first query. The NLP understands what you want right now -
                user profiles will enhance this, not replace it.
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </ScrollSection>
  );
}

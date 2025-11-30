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

// Cold Start Fallback Hierarchy
const coldStartSteps = [
  {
    step: 1,
    name: "Check CF Availability",
    question: "Does user have rating history?",
    yesAction: "Use full hybrid (CF weight 25%)",
    noAction: "Proceed to fallback",
    icon: "👤",
    color: "bg-blue-500"
  },
  {
    step: 2,
    name: "Content-Based Matching",
    question: "Can we match movie metadata?",
    yesAction: "Boost content weight to 35%",
    noAction: "Proceed to themes",
    icon: "📝",
    color: "bg-green-500"
  },
  {
    step: 3,
    name: "Theme Analysis",
    question: "Does movie have LDA topics?",
    yesAction: "Boost theme weight to 25%",
    noAction: "Proceed to sentiment",
    icon: "📊",
    color: "bg-purple-500"
  },
  {
    step: 4,
    name: "Sentiment Matching",
    question: "Does movie have BERT emotions?",
    yesAction: "Boost sentiment weight to 25%",
    noAction: "Proceed to tags",
    icon: "❤️",
    color: "bg-pink-500"
  },
  {
    step: 5,
    name: "Zero-Shot Tags",
    question: "Does movie have semantic tags?",
    yesAction: "Boost tags weight to 30%",
    noAction: "Use popularity fallback",
    icon: "🏷️",
    color: "bg-indigo-500"
  },
  {
    step: 6,
    name: "Popularity Fallback",
    question: "Final safety net",
    yesAction: "Return popular movies in matching genres",
    noAction: "Return global popular movies",
    icon: "⭐",
    color: "bg-yellow-500"
  }
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

        {/* Cold Start Section */}
        <ClickableCard onClick={() => setShowColdStartModal(true)} className="glass rounded-xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">Cold Start Fallback System</h3>
              <p className="text-zinc-400 text-sm">6-step graceful degradation for new users and sparse data</p>
            </div>
            <div className="text-4xl">❄️</div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {coldStartSteps.map((step) => (
              <span key={step.step} className={`px-3 py-1 ${step.color}/20 text-white rounded-full text-sm`}>
                {step.name}
              </span>
            ))}
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

        {/* Cold Start Modal */}
        <Modal
          isOpen={showColdStartModal}
          onClose={() => { setShowColdStartModal(false); setActiveStep(null); }}
          title="Cold Start Fallback Hierarchy"
        >
          <div className="space-y-6">
            <p className="text-zinc-400 text-sm">
              When collaborative filtering is unavailable (new users), the system gracefully falls back
              through content-based signals. Click each step to see details:
            </p>

            <div className="space-y-3">
              {coldStartSteps.map((step) => (
                <div key={step.step}>
                  <motion.button
                    onClick={() => setActiveStep(activeStep === step.step ? null : step.step)}
                    className={`w-full p-4 rounded-lg ${step.color} text-left flex items-center gap-4`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="text-2xl">{step.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-white">Step {step.step}: {step.name}</div>
                      <div className="text-white/70 text-sm">{step.question}</div>
                    </div>
                    <svg
                      className={`w-5 h-5 text-white transition-transform ${activeStep === step.step ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.button>

                  <AnimatePresence>
                    {activeStep === step.step && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 bg-zinc-800/50 rounded-b-lg space-y-3">
                          <div className="flex items-start gap-2">
                            <span className="text-green-400 text-sm font-semibold">YES:</span>
                            <span className="text-zinc-300 text-sm">{step.yesAction}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-red-400 text-sm font-semibold">NO:</span>
                            <span className="text-zinc-300 text-sm">{step.noAction}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <h5 className="text-sm font-semibold text-yellow-400 mb-2">Why This Matters</h5>
              <p className="text-zinc-400 text-sm">
                Unlike traditional CF systems that fail completely for new users, Kineto provides
                intelligent recommendations from day one using content signals. As users rate movies,
                CF gradually takes over with better personalization.
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </ScrollSection>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollSection from "@/components/ScrollSection";
import Modal, { ClickableCard } from "@/components/Modal";

// Query type presets showing how weights adjust dynamically
const queryPresets = [
  {
    name: "Default Balanced",
    description: "Standard query with no specific signals",
    example: "good movies",
    weights: { cf: 25, content: 20, theme: 15, sentiment: 15, tags: 15, query: 10 },
    color: "from-zinc-600 to-zinc-700"
  },
  {
    name: "Entity Query",
    description: "Director, actor, or specific movie referenced",
    example: "Christopher Nolan films",
    weights: { cf: 10, content: 30, theme: 10, sentiment: 5, tags: 10, query: 35 },
    color: "from-blue-600 to-cyan-600"
  },
  {
    name: "Emotional/Situational",
    description: "User expresses mood or situation",
    example: "feeling sad, need something uplifting",
    weights: { cf: 10, content: 10, theme: 15, sentiment: 30, tags: 25, query: 10 },
    color: "from-pink-600 to-rose-600"
  },
  {
    name: "Theme-Heavy",
    description: "Specific themes or topics requested",
    example: "dark psychological thrillers",
    weights: { cf: 15, content: 15, theme: 30, sentiment: 10, tags: 25, query: 5 },
    color: "from-purple-600 to-violet-600"
  },
  {
    name: "Similarity Query",
    description: "Movies similar to a specific film",
    example: "movies like Inception",
    weights: { cf: 20, content: 35, theme: 20, sentiment: 5, tags: 15, query: 5 },
    color: "from-green-600 to-emerald-600"
  },
  {
    name: "Cold Start (No CF)",
    description: "New user with no rating history",
    example: "Any query from new user",
    weights: { cf: 0, content: 25, theme: 20, sentiment: 20, tags: 25, query: 10 },
    color: "from-yellow-600 to-orange-600"
  }
];

const signalDescriptions = {
  cf: { name: "Collaborative Filtering", desc: "User-item rating patterns from SVD+NeuMF", icon: "👥" },
  content: { name: "Content Similarity", desc: "TF-IDF, metadata, genre matching", icon: "📝" },
  theme: { name: "Theme Analysis", desc: "LDA topic distributions (15 themes)", icon: "📊" },
  sentiment: { name: "Sentiment", desc: "BERT 7-emotion classification", icon: "❤️" },
  tags: { name: "Zero-Shot Tags", desc: "322 semantic labels via BART-mnli", icon: "🏷️" },
  query: { name: "Query Relevance", desc: "NLP parsed entities and intent", icon: "🔍" }
};

export function InteractiveHybridSection() {
  const [selectedPreset, setSelectedPreset] = useState(queryPresets[0]);
  const [showFormulaModal, setShowFormulaModal] = useState(false);

  return (
    <ScrollSection id="hybrid" className="bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">The Hybrid Engine</h2>
        <p className="text-xl text-zinc-400 mb-12">Intelligent fusion of six signals with dynamic weighting</p>

        {/* Formula Card */}
        <ClickableCard onClick={() => setShowFormulaModal(true)} className="glass rounded-xl p-8 mb-12">
          <h3 className="text-xl font-semibold text-center mb-6">Unified Scoring Formula</h3>
          <div className="text-center font-mono text-lg md:text-xl text-indigo-400 overflow-x-auto">
            score = Σ (w_i × signal_i × boost_i) / Σ w_i
          </div>
          <p className="text-center text-zinc-400 mt-4 text-sm">Click for detailed breakdown</p>
        </ClickableCard>

        {/* Dynamic Weight Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-xl p-6 mb-12"
        >
          <h3 className="text-xl font-semibold mb-2">Dynamic Weight Adjustment</h3>
          <p className="text-zinc-400 text-sm mb-6">Select a query type to see how signal weights adapt:</p>

          {/* Query Type Selector */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {queryPresets.map((preset) => (
              <motion.button
                key={preset.name}
                onClick={() => setSelectedPreset(preset)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-3 rounded-lg text-left transition-all ${
                  selectedPreset.name === preset.name
                    ? `bg-gradient-to-r ${preset.color} ring-2 ring-white/30`
                    : "bg-zinc-800 hover:bg-zinc-700"
                }`}
              >
                <div className="font-semibold text-white text-sm">{preset.name}</div>
                <div className="text-xs text-white/60 mt-1 truncate">{preset.example}</div>
              </motion.button>
            ))}
          </div>

          {/* Selected Query Info */}
          <div className="p-4 bg-zinc-800/50 rounded-lg mb-6">
            <div className="text-zinc-400 text-sm mb-1">{selectedPreset.description}</div>
            <code className="text-indigo-400 text-sm">&quot;{selectedPreset.example}&quot;</code>
          </div>

          {/* Weight Bars */}
          <div className="space-y-4">
            {Object.entries(selectedPreset.weights).map(([key, value], i) => {
              const signal = signalDescriptions[key as keyof typeof signalDescriptions];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{signal.icon}</span>
                      <span className="text-zinc-300 text-sm">{signal.name}</span>
                    </div>
                    <span className={`font-mono font-bold ${value >= 25 ? "text-green-400" : value >= 15 ? "text-yellow-400" : value > 0 ? "text-zinc-400" : "text-red-400"}`}>
                      {value}%
                    </span>
                  </div>
                  <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className={`h-full rounded-full ${
                        value >= 25 ? "bg-gradient-to-r from-green-500 to-emerald-500" :
                        value >= 15 ? "bg-gradient-to-r from-yellow-500 to-orange-500" :
                        value > 0 ? "bg-gradient-to-r from-zinc-500 to-zinc-600" :
                        "bg-red-500/30"
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Total */}
          <div className="mt-6 pt-4 border-t border-zinc-700 flex justify-between items-center">
            <span className="text-zinc-400">Total Weight</span>
            <span className="text-xl font-bold text-white">
              {Object.values(selectedPreset.weights).reduce((a, b) => a + b, 0)}%
            </span>
          </div>
        </motion.div>

        {/* Key Innovations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "6-Signal Fusion", desc: "First system combining CF, content, LDA, BERT, zero-shot, and NLP" },
            { title: "Situation+Outcome", desc: "Novel query understanding beyond simple keyword matching" },
            { title: "Dynamic Weights", desc: "Context-aware signal prioritization in real-time" },
            { title: "Rare Tag Boost", desc: "Surfacing hidden gems matching specific preferences" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-4 text-center"
            >
              <div className="text-lg font-semibold text-indigo-400 mb-2">{item.title}</div>
              <p className="text-sm text-zinc-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Formula Modal */}
        <Modal isOpen={showFormulaModal} onClose={() => setShowFormulaModal(false)} title="Scoring Formula">
          <div className="space-y-6">
            <div className="p-4 bg-zinc-800 rounded-lg font-mono text-center">
              <div className="text-indigo-400 text-lg">score = Σ (w_i × signal_i × boost_i) / Σ w_i</div>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-semibold text-zinc-500 uppercase mb-2">Components</h5>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <span className="text-zinc-300 font-mono">w_i</span>
                    <span className="text-zinc-400 text-sm">Dynamic weight for signal i (0-100)</span>
                  </div>
                  <div className="flex justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <span className="text-zinc-300 font-mono">signal_i</span>
                    <span className="text-zinc-400 text-sm">Normalized score [0, 1] from each system</span>
                  </div>
                  <div className="flex justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <span className="text-zinc-300 font-mono">boost_i</span>
                    <span className="text-zinc-400 text-sm">Rare tag multiplier (1.0 - 2.5x)</span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-zinc-500 uppercase mb-2">Signal Normalization</h5>
                <div className="space-y-2 text-sm text-zinc-400">
                  <p><span className="text-indigo-400">CF:</span> Predicted rating scaled to [0, 1]</p>
                  <p><span className="text-indigo-400">Content:</span> TF-IDF cosine similarity</p>
                  <p><span className="text-indigo-400">Theme:</span> LDA topic overlap (Jensen-Shannon)</p>
                  <p><span className="text-indigo-400">Sentiment:</span> Emotion profile cosine similarity</p>
                  <p><span className="text-indigo-400">Tags:</span> Jaccard similarity with query tags</p>
                  <p><span className="text-indigo-400">Query:</span> Entity match + keyword overlap</p>
                </div>
              </div>

              <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                <h5 className="text-sm font-semibold text-indigo-400 mb-2">Why Weighted Average?</h5>
                <p className="text-zinc-400 text-sm">
                  Unlike simple addition, weighted averaging ensures that scores remain interpretable
                  and that disabling a signal (weight=0) doesnt affect the final score range.
                </p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </ScrollSection>
  );
}

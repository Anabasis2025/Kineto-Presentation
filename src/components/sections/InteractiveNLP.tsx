"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollSection from "@/components/ScrollSection";
import Modal, { ClickableCard } from "@/components/Modal";

// ============================================
// QUERY TRANSFORMATION EXAMPLES
// ============================================
const queryExamples = [
  {
    input: "My dog died, need something to cheer me up",
    type: "Situational + Emotional",
    steps: [
      { stage: "Raw Input", output: "My dog died, need something to cheer me up" },
      { stage: "Situation Detection", output: "SITUATION: 'dog died' → grief/loss context", highlight: "red" },
      { stage: "Outcome Detection", output: "OUTCOME: 'cheer me up' → seeking comfort", highlight: "green" },
      { stage: "Emotion Inference", output: "Negative: grief → Add positive tags", highlight: "yellow" },
      { stage: "Tag Expansion", output: "['uplifting', 'heartwarming', 'feel-good', 'comforting', 'hopeful']", highlight: "purple" }
    ],
    weights: { cf: 10, content: 15, theme: 15, sentiment: 25, tags: 25, query: 10 }
  },
  {
    input: "Christopher Nolan movies like Inception",
    type: "Entity + Similarity",
    steps: [
      { stage: "Raw Input", output: "Christopher Nolan movies like Inception" },
      { stage: "NER Extraction", output: "PERSON: Christopher Nolan, WORK: Inception", highlight: "blue" },
      { stage: "Entity Lookup", output: "Director ID: 525, Movie: tt1375666", highlight: "cyan" },
      { stage: "Similarity Mode", output: "'like Inception' → find similar films", highlight: "green" },
      { stage: "Final Query", output: "director=Nolan + similar_to=Inception + genre=sci-fi,thriller", highlight: "purple" }
    ],
    weights: { cf: 5, content: 30, theme: 10, sentiment: 5, tags: 10, query: 40 }
  },
  {
    input: "dark psychological thrillers with twist endings",
    type: "Semantic/Theme",
    steps: [
      { stage: "Raw Input", output: "dark psychological thrillers with twist endings" },
      { stage: "Keyword Extract", output: "['dark', 'psychological', 'thrillers', 'twist', 'endings']", highlight: "blue" },
      { stage: "Genre Match", output: "genre: thriller, psychological-thriller", highlight: "yellow" },
      { stage: "Tag Match", output: "tags: ['dark', 'psychological', 'twist-ending', 'mind-bending']", highlight: "purple" },
      { stage: "Theme Boost", output: "LDA topics: Thriller & Tension (topic 10) +50%", highlight: "green" }
    ],
    weights: { cf: 15, content: 20, theme: 25, sentiment: 5, tags: 30, query: 5 }
  },
  {
    input: "something fun for date night",
    type: "Situational Context",
    steps: [
      { stage: "Raw Input", output: "something fun for date night" },
      { stage: "Context Detection", output: "CONTEXT: 'date night' → romantic setting", highlight: "pink" },
      { stage: "Mood Detection", output: "MOOD: 'fun' → lighthearted, entertaining", highlight: "yellow" },
      { stage: "Audience Filter", output: "Exclude: horror, heavy drama, kids movies", highlight: "red" },
      { stage: "Tag Expansion", output: "['romantic-comedy', 'feel-good', 'lighthearted', 'charming']", highlight: "purple" }
    ],
    weights: { cf: 20, content: 15, theme: 15, sentiment: 20, tags: 25, query: 5 }
  }
];

// ============================================
// QUERY EXPANSION CATEGORIES
// ============================================
const expansionCategories = [
  {
    trigger: "supernatural",
    expansions: ["ghost", "haunted house", "possession", "witchcraft", "paranormal", "zombie", "vampire", "werewolf", "demon", "curse", "occult"],
    color: "from-gray-600 to-gray-800"
  },
  {
    trigger: "feel-good",
    expansions: ["inspiring", "uplifting", "comforting", "heartwarming", "hope", "redemption", "friendship", "optimistic", "joyful", "wholesome"],
    color: "from-yellow-500 to-orange-500"
  },
  {
    trigger: "crime",
    expansions: ["mafia", "organized crime", "gangster", "mob", "noir", "heist", "detective", "serial killer", "corruption", "investigation"],
    color: "from-slate-600 to-slate-800"
  },
  {
    trigger: "sports",
    expansions: ["football", "basketball", "baseball", "boxing", "soccer", "hockey", "olympics", "wrestling", "racing", "underdog"],
    color: "from-green-500 to-emerald-600"
  },
  {
    trigger: "LGBTQ+",
    expansions: ["lgbtq", "lgbt", "queer", "gay", "lesbian", "transgender", "bisexual", "coming out", "pride", "diverse"],
    color: "from-pink-500 via-purple-500 to-blue-500"
  },
  {
    trigger: "mind-bending",
    expansions: ["twist ending", "psychological", "unreliable narrator", "time loop", "reality bending", "inception-like", "complex plot", "nonlinear"],
    color: "from-purple-600 to-violet-700"
  }
];

// ============================================
// MOOD KEYWORDS
// ============================================
const moodKeywords = {
  negative: ["depressed", "sad", "anxious", "angry", "hurt", "guilt", "shame", "overwhelmed", "exhausted", "lonely", "hopeless", "frustrated", "stressed", "grief", "heartbroken"],
  positive: ["happy", "excited", "thrilled", "joyful", "motivated", "inspired", "energized", "confident", "peaceful", "grateful", "hopeful", "content", "optimistic", "relaxed"],
  contextual: ["broke up", "died", "lost my job", "fired", "divorced", "failed", "rejected", "sick", "promoted", "graduated", "new job", "wedding", "birthday", "holiday"]
};

export function InteractiveNLPSection() {
  const [selectedExample, setSelectedExample] = useState<typeof queryExamples[0] | null>(null);
  const [showExpansionModal, setShowExpansionModal] = useState(false);
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const pipeline = [
    { step: "Input", desc: "Raw query", time: "0ms", icon: "💬", details: "Natural language text from user" },
    { step: "SpaCy NER", desc: "Entity extraction", time: "15ms", icon: "🔍", details: "Extracts actors, directors, years, movie titles" },
    { step: "Query Parser", desc: "Intent classification", time: "25ms", icon: "⚙️", details: "Detects mood, genre, keywords, context" },
    { step: "BERT Classifier", desc: "Situation/Outcome", time: "65ms", icon: "🧠", details: "Novel: detects 'why' and 'what you want'" },
    { step: "Semantic Expand", desc: "Tag expansion", time: "10ms", icon: "🌐", details: "Expands keywords to related concepts" },
  ];

  return (
    <ScrollSection id="nlp" className="bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">NLP Pipeline</h2>
        <p className="text-xl text-zinc-400 mb-12">Understanding natural language movie requests in ~115ms</p>

        {/* Pipeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
          {pipeline.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-4 text-center group relative"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="font-semibold text-white">{item.step}</div>
              <div className="text-sm text-zinc-400">{item.desc}</div>
              <div className="text-xs text-indigo-400 mt-2">{item.time}</div>
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-800 rounded-lg text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.details}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Three Pipelines with more detail */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { name: "Entity Pipeline", desc: "Actor/director/year queries with direct database lookup", example: "Christopher Nolan films", icon: "👤", color: "border-blue-500" },
            { name: "Semantic Pipeline", desc: "Theme/mood/genre queries with zero-shot tag matching", example: "dark psychological thriller", icon: "🎭", color: "border-purple-500" },
            { name: "Situational Pipeline", desc: "Context-aware queries with outcome extraction", example: "something fun for date night", icon: "💭", color: "border-pink-500" },
          ].map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`glass rounded-xl p-6 border-t-4 ${p.color}`}
            >
              <div className="text-3xl mb-3">{p.icon}</div>
              <h4 className="text-lg font-semibold text-white mb-2">{p.name}</h4>
              <p className="text-zinc-400 text-sm mb-3">{p.desc}</p>
              <code className="text-xs text-zinc-500 italic">&quot;{p.example}&quot;</code>
            </motion.div>
          ))}
        </div>

        {/* Interactive Query Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-xl p-6 mb-12"
        >
          <h3 className="text-xl font-semibold mb-4">Query Transformation Examples</h3>
          <p className="text-zinc-400 text-sm mb-6">Click to see step-by-step processing:</p>
          <div className="grid md:grid-cols-2 gap-4">
            {queryExamples.map((ex, i) => (
              <motion.button
                key={i}
                onClick={() => setSelectedExample(ex)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-zinc-800/50 rounded-lg text-left hover:bg-zinc-800 transition-colors"
              >
                <div className="text-indigo-400 text-xs font-semibold mb-1">{ex.type}</div>
                <div className="text-zinc-300 text-sm">&quot;{ex.input}&quot;</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <ClickableCard onClick={() => setShowExpansionModal(true)} className="glass rounded-xl p-6">
            <h4 className="text-lg font-semibold text-purple-400 mb-2">🌳 Query Expansion Tree</h4>
            <p className="text-zinc-400 text-sm mb-3">See how keywords expand to 10+ related concepts</p>
            <div className="flex flex-wrap gap-1">
              {["supernatural → 11 tags", "feel-good → 10 tags", "crime → 10 tags"].map(t => (
                <span key={t} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">{t}</span>
              ))}
            </div>
          </ClickableCard>

          <ClickableCard onClick={() => setShowMoodModal(true)} className="glass rounded-xl p-6">
            <h4 className="text-lg font-semibold text-pink-400 mb-2">💭 Mood Detection</h4>
            <p className="text-zinc-400 text-sm mb-3">52 mood keywords + 40 contextual triggers</p>
            <div className="flex flex-wrap gap-1">
              {["15 negative", "14 positive", "14 contextual"].map(t => (
                <span key={t} className="px-2 py-1 bg-pink-500/20 text-pink-400 rounded text-xs">{t}</span>
              ))}
            </div>
          </ClickableCard>
        </div>

        {/* Total Latency */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3">
            <span className="text-zinc-400">Total Pipeline Latency:</span>
            <span className="text-2xl font-bold text-green-400">~115ms</span>
          </div>
        </motion.div>

        {/* ============================================ */}
        {/* QUERY TRANSFORMATION MODAL */}
        {/* ============================================ */}
        <Modal isOpen={!!selectedExample} onClose={() => setSelectedExample(null)} title="Query Processing">
          {selectedExample && (
            <div className="space-y-6">
              <div className="p-4 bg-zinc-800 rounded-lg">
                <div className="text-xs text-zinc-500 mb-1">Input Query ({selectedExample.type})</div>
                <div className="text-lg text-white">&quot;{selectedExample.input}&quot;</div>
              </div>

              <div className="space-y-3">
                <h5 className="text-sm font-semibold text-zinc-500 uppercase">Processing Steps</h5>
                {selectedExample.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-zinc-400 text-sm font-medium">{step.stage}</div>
                      <div className={`text-sm mt-1 p-2 rounded ${
                        step.highlight === 'red' ? 'bg-red-500/20 text-red-400' :
                        step.highlight === 'green' ? 'bg-green-500/20 text-green-400' :
                        step.highlight === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                        step.highlight === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                        step.highlight === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' :
                        step.highlight === 'pink' ? 'bg-pink-500/20 text-pink-400' :
                        step.highlight === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-zinc-800 text-zinc-300'
                      }`}>
                        {step.output}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div>
                <h5 className="text-sm font-semibold text-zinc-500 uppercase mb-3">Adjusted Signal Weights</h5>
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  {Object.entries(selectedExample.weights).map(([key, value]) => (
                    <div key={key} className="p-2 bg-zinc-800 rounded">
                      <div className="text-zinc-500 text-xs">{key.toUpperCase()}</div>
                      <div className={`font-bold ${value >= 25 ? 'text-green-400' : value >= 15 ? 'text-yellow-400' : 'text-zinc-400'}`}>
                        {value}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* ============================================ */}
        {/* EXPANSION TREE MODAL */}
        {/* ============================================ */}
        <Modal isOpen={showExpansionModal} onClose={() => { setShowExpansionModal(false); setExpandedCategory(null); }} title="Query Expansion Tree">
          <div className="space-y-6">
            <p className="text-zinc-400 text-sm">When you search for a keyword, the system automatically expands it to include related concepts:</p>

            <div className="space-y-3">
              {expansionCategories.map((cat) => (
                <div key={cat.trigger}>
                  <motion.button
                    onClick={() => setExpandedCategory(expandedCategory === cat.trigger ? null : cat.trigger)}
                    className={`w-full p-3 rounded-lg bg-gradient-to-r ${cat.color} text-left flex justify-between items-center`}
                  >
                    <span className="font-semibold text-white">&quot;{cat.trigger}&quot;</span>
                    <span className="text-white/70 text-sm">→ {cat.expansions.length} tags</span>
                  </motion.button>
                  <AnimatePresence>
                    {expandedCategory === cat.trigger && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 bg-zinc-800/50 rounded-b-lg flex flex-wrap gap-2">
                          {cat.expansions.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-zinc-700 rounded text-sm text-zinc-300">{tag}</span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </Modal>

        {/* ============================================ */}
        {/* MOOD KEYWORDS MODAL */}
        {/* ============================================ */}
        <Modal isOpen={showMoodModal} onClose={() => setShowMoodModal(false)} title="Mood Detection Keywords">
          <div className="space-y-6">
            <p className="text-zinc-400 text-sm">The system detects emotional context from 52 mood keywords and 40+ contextual triggers:</p>

            <div>
              <h5 className="text-sm font-semibold text-red-400 mb-2">Negative Emotions ({moodKeywords.negative.length})</h5>
              <div className="flex flex-wrap gap-2">
                {moodKeywords.negative.map((word) => (
                  <span key={word} className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm">{word}</span>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-sm font-semibold text-green-400 mb-2">Positive Emotions ({moodKeywords.positive.length})</h5>
              <div className="flex flex-wrap gap-2">
                {moodKeywords.positive.map((word) => (
                  <span key={word} className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">{word}</span>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-sm font-semibold text-yellow-400 mb-2">Contextual Triggers ({moodKeywords.contextual.length})</h5>
              <div className="flex flex-wrap gap-2">
                {moodKeywords.contextual.map((word) => (
                  <span key={word} className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-sm">{word}</span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-zinc-800/50 rounded-lg">
              <h5 className="text-sm font-semibold text-zinc-400 mb-2">How It Works</h5>
              <p className="text-zinc-500 text-sm">Negative emotions trigger addition of uplifting/comforting tags. Contextual triggers like &quot;broke up&quot; infer emotional state without explicit mood words.</p>
            </div>
          </div>
        </Modal>
      </div>
    </ScrollSection>
  );
}

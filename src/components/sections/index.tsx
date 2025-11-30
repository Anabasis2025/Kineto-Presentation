"use client";
import { motion } from "framer-motion";
import ScrollSection from "@/components/ScrollSection";

export function VisionSection() {
  const signals = [
    { num: 1, title: "Collaborative Filtering", desc: "SVD + NeuMF ensemble", weight: "25%" },
    { num: 2, title: "Content Similarity", desc: "TF-IDF + metadata matching", weight: "20%" },
    { num: 3, title: "Theme Analysis", desc: "LDA topic modeling (15 topics)", weight: "15%" },
    { num: 4, title: "Sentiment Analysis", desc: "BERT 7-emotion classification", weight: "15%" },
    { num: 5, title: "Zero-Shot Tags", desc: "322 semantic labels via BART", weight: "15%" },
    { num: 6, title: "Query Relevance", desc: "NLP parsed user intent", weight: "10%" },
  ];

  return (
    <ScrollSection id="vision" className="bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Our Vision</h2>
        <p className="text-xl text-zinc-400 mb-12">Six signals, one intelligent recommendation</p>
        <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} className="w-48 h-48 mx-auto mb-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
          <div className="text-center"><div className="text-3xl font-bold">Kineto</div><div className="text-sm opacity-80">Hybrid Engine</div></div>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {signals.map((signal, i) => (
            <motion.div key={signal.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="glass rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xl font-bold mb-4">{signal.num}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{signal.title}</h3>
              <p className="text-zinc-400 text-sm mb-3">{signal.desc}</p>
              <div className="text-xs text-zinc-500">Base Weight: <span className="text-indigo-400">{signal.weight}</span></div>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}

export function DataSection() {
  const sources = [
    { name: "Rotten Tomatoes", count: "1.13M", type: "Critic & User Reviews" },
    { name: "Amazon Reviews", count: "4.6M", type: "Product Reviews" },
    { name: "Netflix Prize", count: "200K", type: "User Ratings" },
    { name: "TMDB", count: "43,858", type: "Movie Metadata" },
  ];

  return (
    <ScrollSection id="data" className="bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Data Foundation</h2>
        <p className="text-xl text-zinc-400 mb-12">Multi-source data fusion powering intelligent recommendations</p>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-6">Primary Data Sources</h3>
            {sources.map((source, i) => (
              <motion.div key={source.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="glass rounded-xl p-4 flex items-center gap-4">
                <div className="flex-1"><div className="font-semibold text-white">{source.name}</div><div className="text-sm text-zinc-400">{source.type}</div></div>
                <div className="text-xl font-bold text-indigo-400">{source.count}</div>
              </motion.div>
            ))}
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6">Processing Pipeline</h3>
            <div className="space-y-4">
              {["Ingestion: Multi-source ETL", "Normalization: Title matching", "Feature Engineering: Aggregation", "Index Building: Embeddings"].map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center font-bold">{i + 1}</div>
                  <div className="flex-1 glass rounded-lg p-3 text-zinc-300">{item}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ value: "5.9M+", label: "Total Reviews" }, { value: "17,668", label: "LDA Movies" }, { value: "322", label: "Zero-Shot Tags" }, { value: "15", label: "LDA Topics" }].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="stat-card text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-zinc-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}

export function CFSection() {
  return (
    <ScrollSection id="cf" className="bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Collaborative Filtering</h2>
        <p className="text-xl text-zinc-400 mb-12">SVD + NeuMF ensemble for personalized predictions</p>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-xl p-8">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">SVD (Matrix Factorization)</h3>
            <p className="text-zinc-400 mb-6">Factorizes user-item rating matrix into latent factors, capturing hidden preferences and item characteristics.</p>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between"><span className="text-zinc-500">Latent Factors</span><span className="text-white font-mono">100</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Regularization</span><span className="text-white font-mono">0.02</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Learning Rate</span><span className="text-white font-mono">0.005</span></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="glass rounded-xl p-8">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">NeuMF (Neural CF)</h3>
            <p className="text-zinc-400 mb-6">Combines GMF and MLP pathways to learn both linear and non-linear user-item interactions.</p>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between"><span className="text-zinc-500">Embedding Dim</span><span className="text-white font-mono">64</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">MLP Layers</span><span className="text-white font-mono">[128, 64, 32]</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Dropout</span><span className="text-white font-mono">0.2</span></div>
            </div>
          </motion.div>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-12">
          <div className="stat-card text-center"><div className="text-4xl font-bold text-green-400">0.9684</div><div className="text-sm text-zinc-400 mt-2">Ensemble RMSE</div></div>
          <div className="stat-card text-center"><div className="text-4xl font-bold text-yellow-400">19.3%</div><div className="text-sm text-zinc-400 mt-2">Improvement vs Baseline</div></div>
          <div className="stat-card text-center"><div className="text-4xl font-bold text-blue-400">60/40</div><div className="text-sm text-zinc-400 mt-2">SVD/NeuMF Blend</div></div>
        </div>
      </div>
    </ScrollSection>
  );
}

export function ContentSection() {
  return (
    <ScrollSection id="content" className="bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Content Understanding</h2>
        <p className="text-xl text-zinc-400 mb-12">LDA topics, BERT sentiment, and zero-shot classification</p>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-xl p-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-2xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-yellow-400 mb-3">LDA Topic Modeling</h3>
            <p className="text-zinc-400 text-sm mb-4">15 thematic categories extracted from movie reviews and descriptions.</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-zinc-500">Topics</span><span className="text-white">15 categories</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Coverage</span><span className="text-white">17,668 movies</span></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="glass rounded-xl p-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-2xl mb-4">❤️</div>
            <h3 className="text-xl font-bold text-pink-400 mb-3">BERT Sentiment</h3>
            <p className="text-zinc-400 text-sm mb-4">7 emotional categories for nuanced sentiment understanding.</p>
            <div className="flex flex-wrap gap-1 mt-4">
              {["Joy", "Sadness", "Fear", "Anger", "Surprise", "Disgust", "Neutral"].map(e => (
                <span key={e} className="px-2 py-1 bg-pink-500/20 text-pink-400 rounded text-xs">{e}</span>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="glass rounded-xl p-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-2xl mb-4">🏷️</div>
            <h3 className="text-xl font-bold text-purple-400 mb-3">Zero-Shot Tags</h3>
            <p className="text-zinc-400 text-sm mb-4">322 semantic labels via BART-large-mnli classification.</p>
            <div className="flex flex-wrap gap-1 mt-4">
              {["coming-of-age", "dark-humor", "mind-bending", "heartwarming", "slow-burn"].map(t => (
                <span key={t} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 glass rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Rare Tag Boosting</h3>
          <p className="text-zinc-400 max-w-2xl mx-auto">Tags appearing on fewer than 100 movies receive a 1.5x-2.5x relevance boost, helping surface hidden gems.</p>
        </motion.div>
      </div>
    </ScrollSection>
  );
}

export function NLPSection() {
  const pipeline = [
    { step: "Input", desc: "Raw query", time: "0ms" },
    { step: "SpaCy NER", desc: "Entity extraction", time: "15ms" },
    { step: "Query Parser", desc: "Intent classification", time: "25ms" },
    { step: "BERT Classifier", desc: "Situation/Outcome", time: "65ms" },
    { step: "Semantic Expand", desc: "Tag expansion", time: "10ms" },
  ];

  return (
    <ScrollSection id="nlp" className="bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">NLP Pipeline</h2>
        <p className="text-xl text-zinc-400 mb-12">Understanding natural language movie requests in ~115ms</p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
          {pipeline.map((item, i) => (
            <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="glass rounded-xl p-4 text-center">
              <div className="font-semibold text-white">{item.step}</div>
              <div className="text-sm text-zinc-400">{item.desc}</div>
              <div className="text-xs text-indigo-400 mt-2">{item.time}</div>
            </motion.div>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Entity Pipeline", desc: "Actor/director/year queries with direct lookup", example: "Christopher Nolan films" },
            { name: "Semantic Pipeline", desc: "Theme/mood/genre queries with tag matching", example: "dark psychological thriller" },
            { name: "Situational Pipeline", desc: "Context-aware queries with outcome extraction", example: "something fun for date night" },
          ].map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="glass rounded-xl p-6">
              <h4 className="text-lg font-semibold text-indigo-400 mb-2">{p.name}</h4>
              <p className="text-zinc-400 text-sm mb-3">{p.desc}</p>
              <code className="text-xs text-zinc-500 italic">&quot;{p.example}&quot;</code>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3">
            <span className="text-zinc-400">Total Pipeline Latency:</span>
            <span className="text-2xl font-bold text-green-400">~115ms</span>
          </div>
        </motion.div>
      </div>
    </ScrollSection>
  );
}

export function HybridSection() {
  return (
    <ScrollSection id="hybrid" className="bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">The Hybrid Engine</h2>
        <p className="text-xl text-zinc-400 mb-12">Intelligent fusion of six signals with dynamic weighting</p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-xl p-8 mb-12">
          <h3 className="text-xl font-semibold text-center mb-6">Unified Scoring Formula</h3>
          <div className="text-center font-mono text-lg md:text-xl text-indigo-400 overflow-x-auto">
            score = Σ (w_i × signal_i × boost_i) / Σ w_i
          </div>
          <p className="text-center text-zinc-400 mt-4 text-sm">Where w_i = dynamic weight, signal_i = normalized score [0,1], boost_i = rare tag multiplier</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "6-Signal Fusion", desc: "First system combining CF, content, LDA, BERT, zero-shot, and NLP" },
            { title: "Situation+Outcome", desc: "Novel query understanding beyond simple keyword matching" },
            { title: "Dynamic Weights", desc: "Context-aware signal prioritization in real-time" },
            { title: "Rare Tag Boost", desc: "Surfacing hidden gems matching specific preferences" },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="glass rounded-xl p-4 text-center">
              <div className="text-lg font-semibold text-indigo-400 mb-2">{item.title}</div>
              <p className="text-sm text-zinc-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}

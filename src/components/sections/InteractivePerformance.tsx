"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollSection from "@/components/ScrollSection";
import Modal, { ClickableCard } from "@/components/Modal";

interface Metric {
  value: string;
  label: string;
  color: string;
  details: {
    description: string;
    breakdown: { component: string; value: string; note?: string }[];
    comparison?: { baseline: string; improvement: string };
  };
}

const metrics: Metric[] = [
  {
    value: "0.9684",
    label: "RMSE (CF)",
    color: "text-green-400",
    details: {
      description: "Root Mean Square Error measures the average prediction error on a 1-5 rating scale. Lower is better.",
      breakdown: [
        { component: "SVD alone", value: "0.9865", note: "Surprise library" },
        { component: "NeuMF alone", value: "0.9702", note: "PyTorch (sweep)" },
        { component: "Ensemble (30/70 SVD/NeuMF)", value: "0.9684", note: "Best blend" }
      ],
      comparison: { baseline: "1.20 (naive avg)", improvement: "19.3% reduction" }
    }
  },
  {
    value: "~2.3s",
    label: "Avg Response",
    color: "text-blue-400",
    details: {
      description: "Total end-to-end latency from query submission to recommendation display.",
      breakdown: [
        { component: "Query parsing + NER", value: "20ms" },
        { component: "Situation/Outcome BERT", value: "50ms" },
        { component: "Semantic expansion", value: "30ms" },
        { component: "Score computation", value: "1800ms" },
        { component: "Result ranking", value: "100ms" }
      ]
    }
  },
  {
    value: "115ms",
    label: "NLP Latency",
    color: "text-purple-400",
    details: {
      description: "Time to fully parse and understand a natural language query.",
      breakdown: [
        { component: "SpaCy tokenization", value: "5ms" },
        { component: "Named entity recognition", value: "10ms" },
        { component: "Query type classification", value: "15ms" },
        { component: "BERT inference", value: "65ms" },
        { component: "Tag expansion", value: "10ms" },
        { component: "Query validation", value: "10ms" }
      ]
    }
  },
  {
    value: "43,858",
    label: "Movies Indexed",
    color: "text-yellow-400",
    details: {
      description: "Total movies in the recommendation index with full metadata and signals.",
      breakdown: [
        { component: "With CF scores", value: "12,450", note: "Users with ratings" },
        { component: "With LDA topics", value: "17,668", note: "10+ reviews" },
        { component: "With zero-shot tags", value: "43,858", note: "All movies" },
        { component: "With BERT sentiment", value: "35,000+", note: "With reviews" }
      ]
    }
  }
];

interface ModelRow {
  model: string;
  rmse: string;
  mae: string;
  time: string;
  details: {
    hyperparameters: { param: string; value: string }[];
    notes: string;
  };
}

const modelComparison: ModelRow[] = [
  {
    model: "Naive Average",
    rmse: "1.20",
    mae: "0.95",
    time: "-",
    details: {
      hyperparameters: [{ param: "Method", value: "Global mean rating" }],
      notes: "Baseline model predicting the global average rating for all movies."
    }
  },
  {
    model: "SVD (Surprise)",
    rmse: "0.9865",
    mae: "0.77",
    time: "~2 min",
    details: {
      hyperparameters: [
        { param: "n_factors", value: "100" },
        { param: "n_epochs", value: "20" },
        { param: "lr_all", value: "0.005" },
        { param: "reg_all", value: "0.02" }
      ],
      notes: "Matrix factorization using the Surprise library. Captures latent user/item factors."
    }
  },
  {
    model: "NeuMF (PyTorch)",
    rmse: "0.9702",
    mae: "0.76",
    time: "~15 min",
    details: {
      hyperparameters: [
        { param: "embedding_dim", value: "64" },
        { param: "mlp_layers", value: "[128, 64, 32]" },
        { param: "dropout", value: "0.2" },
        { param: "learning_rate", value: "0.001" }
      ],
      notes: "Neural collaborative filtering combining GMF and MLP pathways for non-linear patterns."
    }
  },
  {
    model: "Ensemble (30/70 SVD/NeuMF)",
    rmse: "0.9684",
    mae: "0.76",
    time: "-",
    details: {
      hyperparameters: [
        { param: "SVD weight", value: "0.3" },
        { param: "NeuMF weight", value: "0.7" },
        { param: "Blend method", value: "Weighted average" }
      ],
      notes: "Optimal blend found via grid search. Combines SVD's stability with NeuMF's expressiveness."
    }
  }
];

export function InteractivePerformanceSection() {
  const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelRow | null>(null);

  return (
    <ScrollSection id="performance" className="bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Performance & KPIs</h2>
        <p className="text-xl text-zinc-400 mb-12">Benchmarks, latency, and system metrics</p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, i) => (
            <ClickableCard
              key={metric.label}
              onClick={() => setSelectedMetric(metric)}
              className="stat-card text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`text-3xl font-bold ${metric.color}`}>{metric.value}</div>
                <div className="text-sm text-zinc-400 mt-1">{metric.label}</div>
              </motion.div>
            </ClickableCard>
          ))}
        </div>

        {/* Model Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-xl p-6 mb-12 overflow-x-auto"
        >
          <h3 className="text-xl font-semibold mb-6">Collaborative Filtering Comparison</h3>
          <p className="text-zinc-400 text-sm mb-4">Click any row for detailed hyperparameters</p>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="py-3 text-zinc-400">Model</th>
                <th className="py-3 text-zinc-400">RMSE</th>
                <th className="py-3 text-zinc-400">MAE</th>
                <th className="py-3 text-zinc-400">Training Time</th>
              </tr>
            </thead>
            <tbody>
              {modelComparison.map((row) => (
                <motion.tr
                  key={row.model}
                  onClick={() => setSelectedModel(row)}
                  whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.1)" }}
                  className="border-b border-zinc-800 cursor-pointer transition-colors"
                >
                  <td className="py-3 text-white font-medium">{row.model}</td>
                  <td className="py-3 text-indigo-400">{row.rmse}</td>
                  <td className="py-3 text-purple-400">{row.mae}</td>
                  <td className="py-3 text-zinc-400">{row.time}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Latency Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-6">Latency Breakdown (per request)</h3>
          <div className="space-y-4">
            {[
              { component: "Query Parsing + NER", time: 20, color: "from-blue-500 to-cyan-500" },
              { component: "Situation/Outcome BERT", time: 50, color: "from-purple-500 to-pink-500" },
              { component: "Semantic Expansion", time: 30, color: "from-green-500 to-emerald-500" },
              { component: "Score Computation", time: 1800, color: "from-yellow-500 to-orange-500" },
              { component: "Result Ranking", time: 100, color: "from-red-500 to-pink-500" },
            ].map((item, i) => (
              <motion.div
                key={item.component}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <div className="w-48 text-sm text-zinc-400">{item.component}</div>
                <div className="flex-1 h-6 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(item.time / 2000) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                  />
                </div>
                <div className="w-16 text-right text-white font-mono text-sm">{item.time}ms</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-700 flex justify-between items-center">
            <span className="text-zinc-400">Total</span>
            <span className="text-2xl font-bold text-green-400">~2.3s</span>
          </div>
        </motion.div>

        {/* Metric Modal */}
        <Modal
          isOpen={!!selectedMetric}
          onClose={() => setSelectedMetric(null)}
          title={selectedMetric?.label}
        >
          {selectedMetric && (
            <div className="space-y-6">
              <div className="text-center">
                <div className={`text-5xl font-bold ${selectedMetric.color}`}>{selectedMetric.value}</div>
              </div>

              <p className="text-zinc-300 leading-relaxed">{selectedMetric.details.description}</p>

              <div>
                <h5 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-3">Breakdown</h5>
                <div className="space-y-3">
                  {selectedMetric.details.breakdown.map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg">
                      <div>
                        <span className="text-zinc-300">{item.component}</span>
                        {item.note && <span className="text-zinc-500 text-sm ml-2">({item.note})</span>}
                      </div>
                      <span className="font-semibold text-indigo-400">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedMetric.details.comparison && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Baseline: {selectedMetric.details.comparison.baseline}</span>
                    <span className="text-green-400 font-semibold">{selectedMetric.details.comparison.improvement}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal>

        {/* Model Modal */}
        <Modal
          isOpen={!!selectedModel}
          onClose={() => setSelectedModel(null)}
          title={selectedModel?.model}
        >
          {selectedModel && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-400">{selectedModel.rmse}</div>
                  <div className="text-sm text-zinc-400">RMSE</div>
                </div>
                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">{selectedModel.mae}</div>
                  <div className="text-sm text-zinc-400">MAE</div>
                </div>
                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">{selectedModel.time}</div>
                  <div className="text-sm text-zinc-400">Training</div>
                </div>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-3">Hyperparameters</h5>
                <div className="space-y-2">
                  {selectedModel.details.hyperparameters.map((hp, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg font-mono text-sm">
                      <span className="text-zinc-400">{hp.param}</span>
                      <span className="text-indigo-400">{hp.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-zinc-800/30 rounded-lg border border-zinc-700">
                <p className="text-zinc-400 text-sm">{selectedModel.details.notes}</p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </ScrollSection>
  );
}

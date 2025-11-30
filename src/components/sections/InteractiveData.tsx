"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollSection from "@/components/ScrollSection";
import Modal, { ClickableCard } from "@/components/Modal";

interface DataSource {
  name: string;
  count: string;
  type: string;
  icon: string;
  color: string;
  details: {
    description: string;
    fields: string[];
    preprocessing: string[];
    challenges: string[];
  };
}

const dataSources: DataSource[] = [
  {
    name: "Rotten Tomatoes",
    count: "1.13M",
    type: "Critic & User Reviews",
    icon: "🍅",
    color: "from-red-500 to-orange-500",
    details: {
      description: "Professional critic and audience reviews providing rich textual sentiment data for movies spanning multiple decades.",
      fields: ["Review text", "Critic score", "Audience score", "Review date", "Critic name", "Movie metadata"],
      preprocessing: ["HTML tag removal", "Unicode normalization", "Duplicate detection", "Review length filtering (min 50 chars)"],
      challenges: ["Inconsistent critic naming", "Missing scores for older films", "Review spam detection"]
    }
  },
  {
    name: "Amazon Reviews",
    count: "4.6M",
    type: "Product Reviews",
    icon: "📦",
    color: "from-yellow-500 to-amber-500",
    details: {
      description: "Large-scale user review dataset capturing consumer sentiment and detailed product feedback for movies.",
      fields: ["Review text", "Star rating (1-5)", "Helpful votes", "Review date", "Verified purchase", "Product ASIN"],
      preprocessing: ["ASIN to movie title mapping", "Rating normalization", "Verified review filtering", "Language detection"],
      challenges: ["Title disambiguation (multiple editions)", "Review authenticity", "Rating distribution skew"]
    }
  },
  {
    name: "Netflix Prize",
    count: "200K",
    type: "User Ratings",
    icon: "📺",
    color: "from-red-600 to-red-500",
    details: {
      description: "The famous Netflix Prize competition dataset containing high-quality user-movie rating interactions.",
      fields: ["User ID", "Movie ID", "Rating (1-5)", "Rating date"],
      preprocessing: ["User ID anonymization", "Cold user filtering (min 20 ratings)", "Temporal train/test split"],
      challenges: ["Dataset age (2005-2009)", "Title mapping to modern catalogs", "Rating scale consistency"]
    }
  },
  {
    name: "TMDB",
    count: "43,858",
    type: "Movie Metadata",
    icon: "🎬",
    color: "from-blue-500 to-cyan-500",
    details: {
      description: "The Movie Database API providing comprehensive metadata, cast/crew information, and movie relationships.",
      fields: ["Title", "Release date", "Genres", "Cast/crew", "Overview", "Runtime", "Budget", "Revenue", "Poster URL"],
      preprocessing: ["API rate limiting handling", "Missing data imputation", "Genre standardization", "Title normalization"],
      challenges: ["API quota management", "Incomplete data for indie films", "Language/region variants"]
    }
  }
];

interface Stat {
  value: string;
  label: string;
  details: {
    breakdown: { label: string; value: string }[];
    notes: string;
  };
}

const stats: Stat[] = [
  {
    value: "5.9M+",
    label: "Total Reviews",
    details: {
      breakdown: [
        { label: "Amazon", value: "4.6M reviews" },
        { label: "Rotten Tomatoes", value: "1.13M reviews" },
        { label: "Avg per movie", value: "~135 reviews" }
      ],
      notes: "After deduplication and quality filtering. Original raw count was 7.2M."
    }
  },
  {
    value: "17,668",
    label: "LDA Movies",
    details: {
      breakdown: [
        { label: "With 10+ reviews", value: "17,668 movies" },
        { label: "Topics assigned", value: "15 categories" },
        { label: "Avg topics/movie", value: "2.3 topics" }
      ],
      notes: "Movies needed minimum 10 reviews to generate reliable topic distributions."
    }
  },
  {
    value: "322",
    label: "Zero-Shot Tags",
    details: {
      breakdown: [
        { label: "V1 Labels", value: "~100 tags" },
        { label: "V2 Labels", value: "~200 tags" },
        { label: "Unique combined", value: "322 tags" }
      ],
      notes: "Semantic labels like 'coming-of-age', 'mind-bending', 'dark-humor' classified via BART-large-mnli."
    }
  },
  {
    value: "15",
    label: "LDA Topics",
    details: {
      breakdown: [
        { label: "Action/Thriller", value: "12.3% of movies" },
        { label: "Romance/Drama", value: "18.7% of movies" },
        { label: "Comedy", value: "15.2% of movies" },
        { label: "Horror/Suspense", value: "8.9% of movies" }
      ],
      notes: "Topics discovered via Latent Dirichlet Allocation on combined review corpus."
    }
  }
];

export function InteractiveDataSection() {
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);
  const [selectedStat, setSelectedStat] = useState<Stat | null>(null);

  return (
    <ScrollSection id="data" className="bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Data Foundation</h2>
        <p className="text-xl text-zinc-400 mb-12">Multi-source data fusion powering intelligent recommendations</p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Data Sources */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-6">Primary Data Sources</h3>
            {dataSources.map((source, i) => (
              <ClickableCard
                key={source.name}
                onClick={() => setSelectedSource(source)}
                className="glass rounded-xl p-4"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${source.color} flex items-center justify-center text-2xl`}>
                    {source.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{source.name}</div>
                    <div className="text-sm text-zinc-400">{source.type}</div>
                  </div>
                  <div className="text-xl font-bold text-indigo-400">{source.count}</div>
                </motion.div>
              </ClickableCard>
            ))}
          </div>

          {/* Processing Pipeline */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Processing Pipeline</h3>
            <div className="space-y-4">
              {[
                { step: "Ingestion", desc: "Multi-source ETL with validation", details: "Parallel data loading from APIs and static files" },
                { step: "Normalization", desc: "Title matching & deduplication", details: "Fuzzy matching with 98% accuracy" },
                { step: "Feature Engineering", desc: "Rating aggregation & scoring", details: "Sentiment scores, topic vectors, embeddings" },
                { step: "Index Building", desc: "Vector embeddings & matrices", details: "Precomputed similarity for fast retrieval" }
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 glass rounded-lg p-3">
                    <div className="font-semibold text-white">{item.step}</div>
                    <div className="text-sm text-zinc-400">{item.desc}</div>
                    <div className="text-xs text-zinc-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{item.details}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <ClickableCard
              key={stat.label}
              onClick={() => setSelectedStat(stat)}
              className="stat-card text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-zinc-400">{stat.label}</div>
              </motion.div>
            </ClickableCard>
          ))}
        </div>

        {/* Data Source Modal */}
        <Modal
          isOpen={!!selectedSource}
          onClose={() => setSelectedSource(null)}
          title={selectedSource?.name}
        >
          {selectedSource && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedSource.color} flex items-center justify-center text-3xl`}>
                  {selectedSource.icon}
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{selectedSource.count}</div>
                  <div className="text-zinc-400">{selectedSource.type}</div>
                </div>
              </div>

              <p className="text-zinc-300 leading-relaxed">{selectedSource.details.description}</p>

              <div>
                <h5 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-3">Data Fields</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedSource.details.fields.map((field) => (
                    <span key={field} className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">{field}</span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-3">Preprocessing Steps</h5>
                <ul className="space-y-2">
                  {selectedSource.details.preprocessing.map((step, i) => (
                    <li key={i} className="flex items-center gap-2 text-zinc-300 text-sm">
                      <span className="text-green-400">✓</span> {step}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-3">Challenges Addressed</h5>
                <ul className="space-y-2">
                  {selectedSource.details.challenges.map((challenge, i) => (
                    <li key={i} className="flex items-center gap-2 text-zinc-300 text-sm">
                      <span className="text-yellow-400">⚡</span> {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Modal>

        {/* Stat Modal */}
        <Modal
          isOpen={!!selectedStat}
          onClose={() => setSelectedStat(null)}
          title={selectedStat?.label}
        >
          {selectedStat && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold gradient-text">{selectedStat.value}</div>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-3">Breakdown</h5>
                <div className="space-y-3">
                  {selectedStat.details.breakdown.map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg">
                      <span className="text-zinc-300">{item.label}</span>
                      <span className="font-semibold text-indigo-400">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-zinc-800/30 rounded-lg border border-zinc-700">
                <p className="text-zinc-400 text-sm italic">{selectedStat.details.notes}</p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </ScrollSection>
  );
}

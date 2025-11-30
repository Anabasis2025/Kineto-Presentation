"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollSection from "@/components/ScrollSection";
import Modal, { ClickableCard } from "@/components/Modal";

interface TeamMember {
  name: string;
  role: string;
  focus: string;
  bio: string;
  contributions: string[];
  linkedIn?: string;
  color: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Ally Stills",
    role: "NLP & Query Parsing",
    focus: "SpaCy NER, Situation/Outcome Classification",
    bio: "Ally led the natural language processing pipeline development, creating the innovative situation/outcome classification system that enables Kineto to understand complex user queries.",
    contributions: [
      "Designed and implemented SpaCy NER pipeline",
      "Built BERT-based situation/outcome classifier",
      "Created semantic query expansion system",
      "Developed mood and emotion keyword vocabularies"
    ],
    color: "from-pink-500 to-rose-500"
  },
  {
    name: "Kyle Krug",
    role: "System Architecture",
    focus: "Hybrid Engine, Integration, Deployment",
    bio: "Kyle architected the six-signal hybrid recommendation engine and led the system integration efforts, bringing all components together into a cohesive deployment.",
    contributions: [
      "Designed hybrid scoring algorithm",
      "Implemented dynamic weight adjustment",
      "Built Streamlit frontend interface",
      "Deployed to HuggingFace Spaces with Docker"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Niki Lazaris",
    role: "Data Engineering",
    focus: "ETL Pipeline, Data Processing",
    bio: "Niki built the robust data infrastructure that powers Kineto, processing millions of reviews and ratings from multiple sources into unified datasets.",
    contributions: [
      "Built multi-source ETL pipeline",
      "Processed 5.9M+ reviews from RT, Amazon, Netflix",
      "Implemented title normalization with 98% accuracy",
      "Created data validation and quality checks"
    ],
    color: "from-green-500 to-emerald-500"
  },
  {
    name: "Patrick Steed",
    role: "ML Models",
    focus: "SVD, NeuMF, Collaborative Filtering",
    bio: "Patrick developed the collaborative filtering ensemble that achieved 19.3% improvement over baseline, combining traditional SVD with neural approaches.",
    contributions: [
      "Trained SVD model using Surprise library",
      "Built NeuMF with PyTorch (GMF + MLP)",
      "Optimized 60/40 ensemble blend ratio",
      "Achieved 0.9684 RMSE on test set"
    ],
    color: "from-yellow-500 to-orange-500"
  },
  {
    name: "Satvik Vagnamurthy",
    role: "Content Analysis",
    focus: "LDA, BERT Sentiment, Zero-Shot",
    bio: "Satvik created the content understanding pipeline, extracting themes, emotions, and semantic tags from movie data to enable rich content-based recommendations.",
    contributions: [
      "Trained LDA topic model (15 themes)",
      "Fine-tuned BERT for 7-emotion classification",
      "Implemented zero-shot tagging (322 labels)",
      "Built rare tag boosting algorithm"
    ],
    color: "from-purple-500 to-violet-500"
  }
];

export function InteractiveTeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <ScrollSection id="team" className="bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">The Team</h2>
        <p className="text-xl text-zinc-400 mb-12">Northwestern University MSDS Candidates</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {teamMembers.map((member, i) => (
            <ClickableCard
              key={member.name}
              onClick={() => setSelectedMember(member)}
              className="glass rounded-xl p-6 text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Avatar with gradient */}
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-2xl font-bold shadow-lg`}>
                  {member.name.split(" ").map(n => n[0]).join("")}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-indigo-400 text-sm mb-2">{member.role}</p>
                <p className="text-zinc-500 text-xs">{member.focus}</p>
              </motion.div>
            </ClickableCard>
          ))}
        </div>

        {/* Team Member Modal */}
        <Modal
          isOpen={!!selectedMember}
          onClose={() => setSelectedMember(null)}
          title={selectedMember?.name}
        >
          {selectedMember && (
            <div className="space-y-6">
              {/* Header with avatar */}
              <div className="flex items-center gap-6">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${selectedMember.color} flex items-center justify-center text-3xl font-bold shadow-lg`}>
                  {selectedMember.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-indigo-400">{selectedMember.role}</h4>
                  <p className="text-zinc-400">{selectedMember.focus}</p>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h5 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-2">About</h5>
                <p className="text-zinc-300 leading-relaxed">{selectedMember.bio}</p>
              </div>

              {/* Contributions */}
              <div>
                <h5 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-3">Key Contributions</h5>
                <ul className="space-y-2">
                  {selectedMember.contributions.map((contribution, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 text-zinc-300"
                    >
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedMember.color} mt-2 flex-shrink-0`} />
                      {contribution}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Placeholder for photo */}
              <div className="mt-6 p-4 border border-dashed border-zinc-700 rounded-lg text-center">
                <div className="text-zinc-500 text-sm">
                  📷 Photo placeholder - Add team photos to <code className="text-indigo-400">/public/team/</code>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </ScrollSection>
  );
}

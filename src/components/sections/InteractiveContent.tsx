"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollSection from "@/components/ScrollSection";
import Modal, { ClickableCard } from "@/components/Modal";

// ============================================
// ZERO-SHOT TAG DATA (322 tags in 10 categories)
// ============================================
const tagCategories = [
  {
    name: "Genres",
    color: "from-blue-500 to-cyan-500",
    count: 20,
    tags: ["action", "adventure", "animation", "comedy", "crime", "documentary", "drama", "fantasy", "horror", "mystery", "romance", "sci-fi", "thriller", "war", "western", "musical", "noir", "biographical", "historical", "indie"]
  },
  {
    name: "Emotional/Tonal",
    color: "from-pink-500 to-rose-500",
    count: 35,
    tags: ["dark", "uplifting", "heartwarming", "gritty", "contemplative", "intense", "suspenseful", "melancholic", "whimsical", "satirical", "bleak", "hopeful", "bittersweet", "nostalgic", "feel-good", "thought-provoking", "emotional", "lighthearted", "tense", "atmospheric"]
  },
  {
    name: "Thematic",
    color: "from-purple-500 to-violet-500",
    count: 50,
    tags: ["heist", "revenge", "betrayal", "coming-of-age", "redemption", "survival", "identity", "loss", "grief", "love-triangle", "forbidden-love", "self-discovery", "justice", "corruption", "friendship", "family-drama", "road-trip", "time-travel", "apocalyptic", "dystopian"]
  },
  {
    name: "Settings/Period",
    color: "from-green-500 to-emerald-500",
    count: 30,
    tags: ["medieval", "victorian-era", "1920s", "1950s", "1980s", "post-apocalyptic", "small-town", "urban", "rural", "futuristic", "space", "underwater", "desert", "jungle", "prison", "high-school", "college", "hospital", "courtroom", "military-base"]
  },
  {
    name: "Character Types",
    color: "from-yellow-500 to-orange-500",
    count: 20,
    tags: ["strong-female-lead", "male-protagonist", "anti-hero", "underdog", "ensemble-cast", "unlikely-hero", "villain-protagonist", "child-protagonist", "elderly-lead", "buddy-duo", "lone-wolf", "reluctant-hero", "femme-fatale", "mentor-figure", "unreliable-narrator", "complex-villain"]
  },
  {
    name: "Professions",
    color: "from-indigo-500 to-blue-500",
    count: 25,
    tags: ["lawyer", "doctor", "cop", "detective", "soldier", "teacher", "journalist", "scientist", "artist", "musician", "chef", "athlete", "spy", "assassin", "politician", "priest", "nurse", "firefighter", "pilot", "astronaut"]
  },
  {
    name: "Supernatural/Horror",
    color: "from-red-500 to-pink-500",
    count: 25,
    tags: ["zombie", "vampire", "ghost", "werewolf", "paranormal", "witchcraft", "demon", "possession", "haunted-house", "slasher", "psychological-horror", "body-horror", "folk-horror", "cosmic-horror", "monster", "curse", "occult", "supernatural-thriller"]
  },
  {
    name: "Sports/Activities",
    color: "from-teal-500 to-cyan-500",
    count: 20,
    tags: ["boxing", "football", "basketball", "baseball", "hockey", "soccer", "martial-arts", "racing", "wrestling", "olympics", "swimming", "tennis", "golf", "skating", "surfing", "climbing", "extreme-sports"]
  },
  {
    name: "Style/Pacing",
    color: "from-amber-500 to-yellow-500",
    count: 80,
    tags: ["fast-paced", "slow-burn", "visually-stunning", "cerebral", "dialogue-heavy", "action-packed", "minimalist", "epic-scale", "intimate", "nonlinear", "twist-ending", "open-ended", "ensemble", "character-study", "plot-driven", "experimental", "stylized", "realistic", "surreal", "dreamlike"]
  },
  {
    name: "Demographics",
    color: "from-fuchsia-500 to-pink-500",
    count: 17,
    tags: ["family-friendly", "kids", "teen", "adult", "mature", "LGBTQ+", "diverse-cast", "female-focused", "male-focused", "multicultural", "international", "foreign-language", "silent-film", "black-and-white", "classic"]
  }
];

// ============================================
// LDA TOPIC DATA (15 topics)
// ============================================
const ldaTopics = [
  { id: 0, name: "Family & Home", keywords: ["family", "home", "mother", "father", "child", "parents", "house", "growing up"], examples: ["Little Miss Sunshine", "The Incredibles", "Boyhood"], color: "bg-pink-500" },
  { id: 1, name: "Action & Adventure", keywords: ["action", "fight", "battle", "hero", "mission", "chase", "explosive", "stunt"], examples: ["Mad Max: Fury Road", "John Wick", "Mission Impossible"], color: "bg-red-500" },
  { id: 2, name: "Romance & Relationships", keywords: ["love", "romance", "relationship", "heart", "kiss", "wedding", "couple", "passion"], examples: ["The Notebook", "Before Sunrise", "Pride & Prejudice"], color: "bg-rose-500" },
  { id: 3, name: "Crime & Mystery", keywords: ["murder", "police", "crime", "detective", "investigation", "suspect", "evidence", "killer"], examples: ["Se7en", "Zodiac", "Knives Out"], color: "bg-slate-500" },
  { id: 4, name: "Comedy & Humor", keywords: ["funny", "comedy", "laugh", "humor", "joke", "hilarious", "witty", "slapstick"], examples: ["Superbad", "The Hangover", "Bridesmaids"], color: "bg-yellow-500" },
  { id: 5, name: "Drama & Character", keywords: ["drama", "emotional", "powerful", "moving", "intense", "character", "performance", "acting"], examples: ["The Shawshank Redemption", "12 Years a Slave", "Moonlight"], color: "bg-indigo-500" },
  { id: 6, name: "Horror & Suspense", keywords: ["scary", "horror", "terrifying", "creepy", "haunted", "nightmare", "fear", "tension"], examples: ["The Conjuring", "Hereditary", "Get Out"], color: "bg-gray-700" },
  { id: 7, name: "Sci-Fi & Future", keywords: ["space", "alien", "planet", "future", "technology", "robot", "dystopia", "science"], examples: ["Interstellar", "Blade Runner 2049", "Arrival"], color: "bg-cyan-500" },
  { id: 8, name: "War & Military", keywords: ["war", "soldier", "battle", "army", "military", "combat", "veteran", "battlefield"], examples: ["Saving Private Ryan", "1917", "Dunkirk"], color: "bg-green-700" },
  { id: 9, name: "Historical & Period", keywords: ["history", "period", "era", "century", "historical", "costume", "royal", "ancient"], examples: ["The King's Speech", "Gladiator", "The Favourite"], color: "bg-amber-600" },
  { id: 10, name: "Thriller & Tension", keywords: ["thriller", "suspense", "tension", "twist", "psychological", "paranoid", "gripping", "edge"], examples: ["Gone Girl", "Prisoners", "Nightcrawler"], color: "bg-purple-600" },
  { id: 11, name: "Animation & Fantasy", keywords: ["animated", "animation", "fantasy", "magical", "fairy tale", "enchanted", "whimsical", "imagination"], examples: ["Spirited Away", "Coco", "How to Train Your Dragon"], color: "bg-violet-500" },
  { id: 12, name: "Documentary & Real", keywords: ["documentary", "real", "true story", "footage", "interview", "reality", "factual", "informative"], examples: ["Won't You Be My Neighbor?", "Free Solo", "The Social Dilemma"], color: "bg-blue-600" },
  { id: 13, name: "Music & Performance", keywords: ["music", "song", "musical", "band", "concert", "singing", "dance", "performer"], examples: ["Whiplash", "La La Land", "Bohemian Rhapsody"], color: "bg-fuchsia-500" },
  { id: 14, name: "Sports & Competition", keywords: ["sports", "game", "championship", "athlete", "coach", "team", "winning", "underdog"], examples: ["Rocky", "Remember the Titans", "Moneyball"], color: "bg-emerald-500" }
];

// ============================================
// BERT EMOTION DATA (7 emotions)
// ============================================
const bertEmotions = [
  { emotion: "Happy/Joy", percentage: 42, color: "bg-yellow-400", description: "Excitement, contentment, satisfaction", movieTypes: ["Comedies", "Feel-good films", "Adventures", "Romances"] },
  { emotion: "Surprise", percentage: 18, color: "bg-purple-400", description: "Shock, unexpected twists, revelation", movieTypes: ["Thrillers", "Mystery", "Plot-twist films"] },
  { emotion: "Sad", percentage: 15, color: "bg-blue-400", description: "Melancholy, grief, emotional depth", movieTypes: ["Dramas", "Tragedies", "Character studies"] },
  { emotion: "Angry", percentage: 12, color: "bg-red-400", description: "Frustration, rage, intensity", movieTypes: ["Action", "Revenge films", "Crime dramas"] },
  { emotion: "Fear", percentage: 8, color: "bg-gray-500", description: "Dread, horror, suspense", movieTypes: ["Horror", "Thrillers", "Psychological films"] },
  { emotion: "Neutral", percentage: 3, color: "bg-zinc-400", description: "Objective, balanced tone", movieTypes: ["Documentaries", "Educational"] },
  { emotion: "Disgust", percentage: 2, color: "bg-green-600", description: "Revulsion, discomfort", movieTypes: ["Horror", "Dark comedies", "Satire"] }
];

export function InteractiveContentSection() {
  const [showTagModal, setShowTagModal] = useState(false);
  const [showLdaModal, setShowLdaModal] = useState(false);
  const [showEmotionModal, setShowEmotionModal] = useState(false);
  const [selectedTagCategory, setSelectedTagCategory] = useState<typeof tagCategories[0] | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<typeof ldaTopics[0] | null>(null);

  return (
    <ScrollSection id="content" className="bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Content Understanding</h2>
        <p className="text-xl text-zinc-400 mb-12">LDA topics, BERT sentiment, and zero-shot classification</p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* LDA Topics Card */}
          <ClickableCard onClick={() => setShowLdaModal(true)} className="glass rounded-xl p-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-2xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-yellow-400 mb-3">LDA Topic Modeling</h3>
              <p className="text-zinc-400 text-sm mb-4">15 thematic categories extracted from movie reviews and descriptions.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-zinc-500">Topics</span><span className="text-white">15 categories</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Coverage</span><span className="text-white">17,668 movies</span></div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1">
                {["Family", "Crime", "Romance", "Sci-Fi", "+11 more"].map(t => (
                  <span key={t} className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">{t}</span>
                ))}
              </div>
            </motion.div>
          </ClickableCard>

          {/* BERT Sentiment Card */}
          <ClickableCard onClick={() => setShowEmotionModal(true)} className="glass rounded-xl p-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-2xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-pink-400 mb-3">BERT Sentiment</h3>
              <p className="text-zinc-400 text-sm mb-4">7 emotional categories for nuanced sentiment understanding.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-zinc-500">Emotions</span><span className="text-white">7 categories</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Model</span><span className="text-white">BERT-base</span></div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1">
                {bertEmotions.slice(0, 5).map(e => (
                  <span key={e.emotion} className="px-2 py-1 bg-pink-500/20 text-pink-400 rounded text-xs">{e.emotion.split('/')[0]}</span>
                ))}
              </div>
            </motion.div>
          </ClickableCard>

          {/* Zero-Shot Tags Card */}
          <ClickableCard onClick={() => setShowTagModal(true)} className="glass rounded-xl p-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-2xl mb-4">🏷️</div>
              <h3 className="text-xl font-bold text-purple-400 mb-3">Zero-Shot Tags</h3>
              <p className="text-zinc-400 text-sm mb-4">322 semantic labels via BART-large-mnli classification.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-zinc-500">Tags</span><span className="text-white">322 labels</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Categories</span><span className="text-white">10 groups</span></div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1">
                {["coming-of-age", "dark-humor", "mind-bending", "+319"].map(t => (
                  <span key={t} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">{t}</span>
                ))}
              </div>
            </motion.div>
          </ClickableCard>
        </div>

        {/* Rare Tag Boosting */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 glass rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Rare Tag Boosting</h3>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-6">Tags appearing on fewer than 100 movies receive a 1.5x-2.5x relevance boost, helping surface hidden gems.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="px-4 py-2 bg-purple-500/20 rounded-lg">
              <span className="text-purple-400 font-semibold">2.5x boost</span>
              <span className="text-zinc-500 text-sm ml-2">&lt;20 movies</span>
            </div>
            <div className="px-4 py-2 bg-purple-500/15 rounded-lg">
              <span className="text-purple-400 font-semibold">2.0x boost</span>
              <span className="text-zinc-500 text-sm ml-2">20-50 movies</span>
            </div>
            <div className="px-4 py-2 bg-purple-500/10 rounded-lg">
              <span className="text-purple-400 font-semibold">1.5x boost</span>
              <span className="text-zinc-500 text-sm ml-2">50-100 movies</span>
            </div>
          </div>
        </motion.div>

        {/* ============================================ */}
        {/* ZERO-SHOT TAGS MODAL */}
        {/* ============================================ */}
        <Modal isOpen={showTagModal} onClose={() => { setShowTagModal(false); setSelectedTagCategory(null); }} title="322 Zero-Shot Tags">
          <div className="space-y-6">
            <p className="text-zinc-400">BART-large-mnli classifies movies into semantic labels without task-specific training. Tags are organized into 10 categories:</p>

            {!selectedTagCategory ? (
              <div className="grid grid-cols-2 gap-3">
                {tagCategories.map((cat) => (
                  <motion.button
                    key={cat.name}
                    onClick={() => setSelectedTagCategory(cat)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl bg-gradient-to-br ${cat.color} text-left`}
                  >
                    <div className="font-semibold text-white">{cat.name}</div>
                    <div className="text-white/70 text-sm">{cat.count} tags</div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div>
                <button onClick={() => setSelectedTagCategory(null)} className="text-indigo-400 text-sm mb-4 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  Back to categories
                </button>
                <div className={`p-4 rounded-xl bg-gradient-to-br ${selectedTagCategory.color} mb-4`}>
                  <div className="font-bold text-white text-xl">{selectedTagCategory.name}</div>
                  <div className="text-white/70">{selectedTagCategory.count} tags in this category</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTagCategory.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 bg-zinc-800 rounded-full text-sm text-zinc-300 hover:bg-zinc-700 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal>

        {/* ============================================ */}
        {/* LDA TOPICS MODAL */}
        {/* ============================================ */}
        <Modal isOpen={showLdaModal} onClose={() => { setShowLdaModal(false); setSelectedTopic(null); }} title="15 LDA Topics">
          <div className="space-y-6">
            <p className="text-zinc-400">Latent Dirichlet Allocation extracts thematic categories from 5.9M+ reviews. Each movie has a distribution across all 15 topics.</p>

            {!selectedTopic ? (
              <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                {ldaTopics.map((topic) => (
                  <motion.button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`p-3 rounded-lg ${topic.color} text-left`}
                  >
                    <div className="font-semibold text-white text-sm">{topic.name}</div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div>
                <button onClick={() => setSelectedTopic(null)} className="text-indigo-400 text-sm mb-4 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  Back to topics
                </button>
                <div className={`p-4 rounded-xl ${selectedTopic.color} mb-4`}>
                  <div className="font-bold text-white text-xl">Topic {selectedTopic.id}: {selectedTopic.name}</div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-zinc-500 uppercase mb-2">Key Terms</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedTopic.keywords.map((kw) => (
                        <span key={kw} className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">{kw}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-zinc-500 uppercase mb-2">Example Movies</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedTopic.examples.map((movie) => (
                        <span key={movie} className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm">{movie}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>

        {/* ============================================ */}
        {/* BERT EMOTIONS MODAL */}
        {/* ============================================ */}
        <Modal isOpen={showEmotionModal} onClose={() => setShowEmotionModal(false)} title="7-Emotion BERT Classification">
          <div className="space-y-6">
            <p className="text-zinc-400">Fine-tuned BERT classifies movie reviews into 7 emotional categories. Distribution shows typical emotion breakdown across all movies:</p>

            {/* Emotion Bar Chart */}
            <div className="space-y-3">
              {bertEmotions.map((emotion, i) => (
                <motion.div
                  key={emotion.emotion}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-zinc-300">{emotion.emotion}</span>
                    <span className="text-zinc-400">{emotion.percentage}%</span>
                  </div>
                  <div className="h-8 bg-zinc-800 rounded-lg overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${emotion.percentage * 2}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className={`h-full ${emotion.color} rounded-lg`}
                    />
                    <div className="absolute inset-0 flex items-center px-3">
                      <span className="text-xs text-zinc-400 truncate">{emotion.description}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {emotion.movieTypes.map((type) => (
                      <span key={type} className="text-xs text-zinc-500">{type}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 bg-zinc-800/50 rounded-lg">
              <h5 className="text-sm font-semibold text-zinc-400 mb-2">How It Works</h5>
              <p className="text-zinc-500 text-sm">Each movie&apos;s reviews are aggregated to create an emotion profile. When you search for &quot;feel-good movies,&quot; we prioritize films with high Happy/Joy scores.</p>
            </div>
          </div>
        </Modal>
      </div>
    </ScrollSection>
  );
}

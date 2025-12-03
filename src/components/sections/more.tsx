"use client";
import { motion } from "framer-motion";
import ScrollSection from "@/components/ScrollSection";

export function ArchitectureSection() {
  const stacks = [
    { category: "Frontend", items: ["Streamlit", "Custom CSS", "Responsive UI"] },
    { category: "Backend", items: ["Python 3.11", "Pandas", "NumPy"] },
    { category: "ML/NLP", items: ["PyTorch", "SpaCy", "Transformers"] },
    { category: "Deployment", items: ["Docker", "HuggingFace Spaces", "Git LFS"] },
  ];

  return (
    <ScrollSection id="architecture" className="bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">System Architecture</h2>
        <p className="text-xl text-zinc-400 mb-12">Scalable deployment on Hugging Face Spaces</p>
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stacks.map((stack, i) => (
            <motion.div key={stack.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="glass rounded-xl p-6">
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
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass rounded-xl p-8">
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
      </div>
    </ScrollSection>
  );
}

export function DemoSection() {
  return (
    <ScrollSection id="demo" className="bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Live Demo</h2>
        <p className="text-xl text-zinc-400 mb-12">Experience Kineto in action on Hugging Face Spaces</p>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
          <div className="text-6xl mb-6">🎬</div>
          <h3 className="text-2xl font-semibold mb-4">Interactive Demonstration</h3>
          <p className="text-zinc-400 mb-8">Try natural language queries like &quot;feel-good movies for a rainy day&quot; or &quot;Christopher Nolan thrillers&quot;</p>
          <a href="https://huggingface.co/spaces/krugger2025/kineto-movie-recommender" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all">
            <span>Launch Demo</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
        <div className="mt-12 grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            '"movies like Inception but more emotional"',
            '"something to watch with my teenage kids"',
            '"underrated sci-fi from the 2010s"',
          ].map((query, i) => (
            <motion.div key={query} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="glass rounded-lg p-4">
              <code className="text-sm text-indigo-400">{query}</code>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}

export function PerformanceSection() {
  return (
    <ScrollSection id="performance" className="bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Performance & KPIs</h2>
        <p className="text-xl text-zinc-400 mb-12">Benchmarks, latency, and system metrics</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { value: "0.9684", label: "RMSE (CF)" },
            { value: "~500ms", label: "Avg Response" },
            { value: "115ms", label: "NLP Latency" },
            { value: "43,858", label: "Movies Indexed" },
          ].map((metric, i) => (
            <motion.div key={metric.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="stat-card text-center">
              <div className="text-3xl font-bold text-white">{metric.value}</div>
              <div className="text-sm text-zinc-400 mt-1">{metric.label}</div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-xl p-6 mb-12 overflow-x-auto">
          <h3 className="text-xl font-semibold mb-6">Collaborative Filtering Comparison</h3>
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
              {[
                { model: "Naive Average", rmse: "1.20", mae: "0.95", time: "-" },
                { model: "SVD (Surprise)", rmse: "0.98", mae: "0.77", time: "~2 min" },
                { model: "NeuMF (PyTorch)", rmse: "0.99", mae: "0.78", time: "~15 min" },
                { model: "Ensemble (60/40)", rmse: "0.9684", mae: "0.76", time: "-" },
              ].map((row) => (
                <tr key={row.model} className="border-b border-zinc-800">
                  <td className="py-3 text-white">{row.model}</td>
                  <td className="py-3 text-indigo-400">{row.rmse}</td>
                  <td className="py-3 text-purple-400">{row.mae}</td>
                  <td className="py-3 text-zinc-400">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </ScrollSection>
  );
}

export function BusinessSection() {
  return (
    <ScrollSection id="business" className="bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Business Model</h2>
        <p className="text-xl text-zinc-400 mb-12">Freemium strategy with enterprise expansion</p>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-xl p-6 border-t-4 border-zinc-500">
            <h3 className="text-xl font-bold text-zinc-300 mb-2">Free Tier</h3>
            <div className="text-3xl font-bold text-white mb-4">$0<span className="text-sm text-zinc-400">/mo</span></div>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 10 queries/day</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Basic recommendations</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Standard response time</li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="glass rounded-xl p-6 border-t-4 border-indigo-500 scale-105">
            <h3 className="text-xl font-bold text-indigo-400 mb-2">Pro</h3>
            <div className="text-3xl font-bold text-white mb-4">$9.99<span className="text-sm text-zinc-400">/mo</span></div>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Unlimited queries</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Priority processing</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Watchlist sync</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Advanced filters</li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="glass rounded-xl p-6 border-t-4 border-purple-500">
            <h3 className="text-xl font-bold text-purple-400 mb-2">Enterprise</h3>
            <div className="text-3xl font-bold text-white mb-4">Custom</div>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> API access</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> White-label solution</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Custom integrations</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Dedicated support</li>
            </ul>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-6">Revenue Streams</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { stream: "Subscriptions", pct: "60%", icon: "💳" },
              { stream: "Affiliate Links", pct: "20%", icon: "🔗" },
              { stream: "API Licensing", pct: "15%", icon: "⚡" },
              { stream: "Data Insights", pct: "5%", icon: "📊" },
            ].map((item) => (
              <div key={item.stream} className="text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-2xl font-bold text-indigo-400">{item.pct}</div>
                <div className="text-sm text-zinc-400">{item.stream}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </ScrollSection>
  );
}

export function FinancialsSection() {
  return (
    <ScrollSection id="financials" className="bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Financial Projections</h2>
        <p className="text-xl text-zinc-400 mb-12">5-year cost/revenue analysis and break-even</p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-xl p-6 mb-12 overflow-x-auto">
          <h3 className="text-xl font-semibold mb-6">5-Year Financial Forecast</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="py-3 text-zinc-400">Metric</th>
                <th className="py-3 text-zinc-400 text-right">Year 1</th>
                <th className="py-3 text-zinc-400 text-right">Year 2</th>
                <th className="py-3 text-zinc-400 text-right">Year 3</th>
                <th className="py-3 text-zinc-400 text-right">Year 4</th>
                <th className="py-3 text-zinc-400 text-right">Year 5</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800">
                <td className="py-3 text-white">Users (K)</td>
                <td className="py-3 text-right text-zinc-300">1</td>
                <td className="py-3 text-right text-zinc-300">10</td>
                <td className="py-3 text-right text-zinc-300">50</td>
                <td className="py-3 text-right text-zinc-300">150</td>
                <td className="py-3 text-right text-zinc-300">500</td>
              </tr>
              <tr className="border-b border-zinc-800">
                <td className="py-3 text-white">Revenue ($K)</td>
                <td className="py-3 text-right text-green-400">$5</td>
                <td className="py-3 text-right text-green-400">$25</td>
                <td className="py-3 text-right text-green-400">$100</td>
                <td className="py-3 text-right text-green-400">$500</td>
                <td className="py-3 text-right text-green-400">$1,250</td>
              </tr>
              <tr className="border-b border-zinc-800">
                <td className="py-3 text-white">Operating Costs ($K)</td>
                <td className="py-3 text-right text-red-400">$25</td>
                <td className="py-3 text-right text-red-400">$34</td>
                <td className="py-3 text-right text-red-400">$70</td>
                <td className="py-3 text-right text-red-400">$160</td>
                <td className="py-3 text-right text-red-400">$280</td>
              </tr>
              <tr className="border-b border-zinc-800">
                <td className="py-3 text-white">Net Income ($K)</td>
                <td className="py-3 text-right text-red-400">-$20</td>
                <td className="py-3 text-right text-red-400">-$9</td>
                <td className="py-3 text-right text-green-400">$30</td>
                <td className="py-3 text-right text-green-400">$340</td>
                <td className="py-3 text-right text-green-400">$970</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="stat-card text-center">
            <div className="text-4xl font-bold text-green-400">Year 3</div>
            <div className="text-sm text-zinc-400 mt-2">Break-Even Point</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="stat-card text-center">
            <div className="text-4xl font-bold text-indigo-400">$1.25M</div>
            <div className="text-sm text-zinc-400 mt-2">Year 5 Revenue</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="stat-card text-center">
            <div className="text-4xl font-bold text-purple-400">500K</div>
            <div className="text-sm text-zinc-400 mt-2">Year 5 Users</div>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
}

export function RoadmapSection() {
  const phases = [
    { phase: "Phase 1", title: "User Feedback Loop", items: ["Implicit feedback collection", "Rating integration", "Preference learning"], timeline: "Q1 2026" },
    { phase: "Phase 2", title: "Advanced Personalization", items: ["User embeddings", "Session-based recommendations", "Multi-user profiles"], timeline: "Q2 2026" },
    { phase: "Phase 3", title: "Platform Expansion", items: ["Mobile apps (iOS/Android)", "Browser extension", "Smart TV integration"], timeline: "Q3 2026" },
    { phase: "Phase 4", title: "Enterprise Features", items: ["B2B API marketplace", "White-label solutions", "Analytics dashboard"], timeline: "Q4 2026" },
  ];

  return (
    <ScrollSection id="roadmap" className="bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Future Roadmap</h2>
        <p className="text-xl text-zinc-400 mb-12">Next steps and planned enhancements</p>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {phases.map((phase, i) => (
            <motion.div key={phase.phase} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="glass rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-sm font-bold">{phase.timeline}</div>
                <div>
                  <div className="text-indigo-400 text-sm font-semibold">{phase.phase}</div>
                  <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                </div>
              </div>
              <ul className="space-y-2 ml-20">
                {phase.items.map((item) => (
                  <li key={item} className="text-zinc-400 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">Challenges Overcome</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { challenge: "Title Normalization", solution: "Custom fuzzy matching with 98% accuracy" },
              { challenge: "Cold Start Problem", solution: "Content-based fallback with zero-shot matching" },
              { challenge: "Model Size Limits", solution: "Git LFS + lazy loading for HuggingFace" },
              { challenge: "Query Ambiguity", solution: "Situation/Outcome classification + expansion" },
            ].map((item) => (
              <div key={item.challenge} className="flex gap-4">
                <div className="w-2 bg-gradient-to-b from-red-500 to-green-500 rounded-full" />
                <div>
                  <div className="text-red-400 text-sm">Challenge: {item.challenge}</div>
                  <div className="text-green-400 text-sm mt-1">Solution: {item.solution}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-center">
          <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-6">Thank You</h2>
          <p className="text-xl text-zinc-400 mb-8">Kineto: Bringing intelligence to movie discovery</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://github.com/Anabasis2025/Capstone_Movie_Recommender_Final" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 glass rounded-lg hover:bg-zinc-800 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span>GitHub</span>
            </a>
            <a href="https://huggingface.co/spaces/krugger2025/kineto-movie-recommender" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all">
              <span>Try Kineto</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
          </div>
          <div className="mt-12 text-zinc-500 text-sm">Northwestern University MSDS Capstone | Fall 2025</div>
        </motion.div>
      </div>
    </ScrollSection>
  );
}

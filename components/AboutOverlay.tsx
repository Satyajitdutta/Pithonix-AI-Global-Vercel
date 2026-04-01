import React, { useEffect, useState } from 'react';

interface AboutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutOverlay: React.FC<AboutOverlayProps> = ({ isOpen, onClose }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small delay to allow render before animating in
      setTimeout(() => setActive(true), 10);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      setActive(false);
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col bg-obsidian transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Header / Navigation Bar within Overlay */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-white/10 bg-obsidian/90 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-cyan"></div>
            <div>
                <h2 className="font-heading font-black text-2xl text-white tracking-widest">PITHONIX INTELLIGENCE</h2>
                <p className="text-xs text-teal font-mono uppercase">Organizational Intelligence Briefing</p>
            </div>
        </div>
        <button 
            onClick={onClose}
            className="group flex items-center gap-2 text-silver hover:text-cyan transition-colors"
        >
            <span className="text-xs font-bold uppercase tracking-widest group-hover:mr-2 transition-all">Close Interface</span>
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12">
        <div className="max-w-5xl mx-auto space-y-20 pb-20">

            {/* Section 1: Introduction */}
            <section className="animate-fade-in-up">
                <h1 className="font-heading font-black text-4xl md:text-6xl text-white mb-8 leading-tight">
                    MOST ENTERPRISE SOFTWARE STORES INFORMATION. <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-teal">
                        PITHONIX AI UNDERSTANDS IT.
                    </span>
                </h1>
                <div className="grid md:grid-cols-2 gap-12 text-lg text-silver/80 leading-relaxed">
                    <p>
                        We are building a new category of enterprise intelligence—one that focuses not on evaluating people, but on understanding the systems, roles, and contexts in which people work.
                    </p>
                    <div className="border-l-2 border-teal/30 pl-6">
                        <p className="mb-4">
                            At the core is <strong className="text-white">JEET</strong> (Just In Time Emotionally Empowered Technology), our proprietary Intelligence Orchestration Layer. 
                        </p>
                        <p>
                            JEET functions as a workforce operating system: continuously sensing organizational signals, detecting emerging risk, and translating complexity into decision-ready intelligence.
                        </p>
                    </div>
                </div>
                <div className="mt-8 inline-block px-6 py-3 border border-cyan/30 rounded bg-cyan/5 text-cyan font-bold tracking-widest text-sm uppercase">
                    This is not HR software. This is organizational intelligence.
                </div>
            </section>

            {/* Section 2: Why We Exist */}
            <section className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-charcoal via-teal to-charcoal"></div>
                <h3 className="font-heading font-bold text-3xl text-white mb-6 pl-6">WHY WE EXIST</h3>
                <div className="pl-6 max-w-3xl">
                    <p className="text-xl text-silver mb-6">
                        Modern organizations are complex systems. Yet most tools treat them like static databases—digital filing cabinets that rely on humans to connect the dots after problems surface.
                    </p>
                    <p className="text-silver/70 mb-8">
                        By the time attrition spikes, delivery slips, or burnout becomes visible, the real damage has already been done. PITHONIX AI exists to close that gap.
                    </p>
                    <div className="glass-panel p-8 rounded-xl border-l-4 border-l-cyan">
                        <h4 className="text-teal font-bold mb-2 uppercase tracking-wider text-sm">Our Mission</h4>
                        <p className="text-2xl text-white font-light italic">
                            "Reduce organizational surprise by helping leaders understand what is unfolding—early, responsibly, and with confidence."
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 3: Differentiators (Grid) */}
            <section>
                <div className="flex items-center gap-4 mb-10">
                    <h3 className="font-heading font-bold text-3xl text-white">WHAT MAKES US DIFFERENT</h3>
                    <div className="h-px flex-1 bg-white/10"></div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 hover:bg-white/10 p-8 rounded-xl transition-colors border border-white/5">
                        <div className="w-12 h-12 bg-cyan/10 rounded flex items-center justify-center text-cyan mb-4">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        </div>
                        <h4 className="text-white font-bold text-xl mb-2">Intelligence, Not Dashboards</h4>
                        <p className="text-silver/70 text-sm">PITHONIX AI does not generate reports or chase perfect data. It works with real-world, imperfect inputs to surface patterns, variance, and structural risk before they appear on traditional metrics.</p>
                    </div>

                    <div className="bg-white/5 hover:bg-white/10 p-8 rounded-xl transition-colors border border-white/5">
                        <div className="w-12 h-12 bg-teal/10 rounded flex items-center justify-center text-teal mb-4">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        <h4 className="text-white font-bold text-xl mb-2">Context Over Individuals</h4>
                        <p className="text-silver/70 text-sm">We do not track or score people. JEET reasons at the level of roles, tenure bands, teams, and functional contexts, ensuring insights are privacy-safe, legally defensible, and trusted.</p>
                    </div>

                    <div className="bg-white/5 hover:bg-white/10 p-8 rounded-xl transition-colors border border-white/5">
                        <div className="w-12 h-12 bg-purple-500/10 rounded flex items-center justify-center text-purple-400 mb-4">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>
                        <h4 className="text-white font-bold text-xl mb-2">Designed for Reality</h4>
                        <p className="text-silver/70 text-sm">Organizations rarely start with full data transparency. PITHONIX AI is designed to scale with trust starting with essential inputs and expanding over time without breaking intelligence quality.</p>
                    </div>

                    <div className="bg-white/5 hover:bg-white/10 p-8 rounded-xl transition-colors border border-white/5">
                        <div className="w-12 h-12 bg-yellow-500/10 rounded flex items-center justify-center text-yellow-400 mb-4">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                        </div>
                        <h4 className="text-white font-bold text-xl mb-2">Explainable by Design</h4>
                        <p className="text-silver/70 text-sm">Every insight comes with boundaries, confidence, and reasoning context. JEET is decision-support, not decision-making augmenting leadership judgment rather than replacing it.</p>
                    </div>
                </div>
            </section>

            {/* Section 4: Platform Deliverables */}
            <section className="bg-gradient-to-r from-teal/10 to-transparent p-8 md:p-12 rounded-2xl border border-teal/20">
                <h3 className="font-heading font-bold text-2xl text-white mb-8">WHAT THE PLATFORM DELIVERS</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <span className="text-cyan mt-1">✦</span>
                            <span className="text-silver">Detect early signals of attrition, productivity drift, and capability decay.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-cyan mt-1">✦</span>
                            <span className="text-silver">Understand whether challenges stem from role design, workload, or skill mismatch.</span>
                        </li>
                    </ul>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <span className="text-cyan mt-1">✦</span>
                            <span className="text-silver">Distinguish burnout from disengagement to apply the right intervention.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-cyan mt-1">✦</span>
                            <span className="text-silver">Act earlier, with less friction and fewer reactive decisions.</span>
                        </li>
                    </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                    <p className="text-white font-bold text-lg">
                        Instead of isolated metrics, leaders receive <span className="text-cyan">coherent intelligence</span>.
                    </p>
                    <p className="text-sm text-silver/60">Connected insights that explain why something is happening, not just what happened.</p>
                </div>
            </section>

            {/* Section 5: Trust & Belief */}
            <div className="grid md:grid-cols-2 gap-12">
                <section>
                    <h3 className="font-heading font-bold text-2xl text-white mb-6">BUILT TO BE TRUSTED</h3>
                    <div className="space-y-4 text-silver/80">
                        <p>From day one, PITHONIX AI has been designed to withstand legal, privacy, and works-council scrutiny—particularly in complex regulatory environments.</p>
                        <p>We intentionally avoid clinical labels and individual surveillance. Our language, architecture, and governance model are built to protect both the organization and the people within it.</p>
                        <p className="text-white font-bold border-l-2 border-cyan pl-4 mt-4">
                            Trust is not a feature. It is the foundation.
                        </p>
                    </div>
                </section>

                <section>
                    <h3 className="font-heading font-bold text-2xl text-white mb-6">OUR BELIEF</h3>
                    <div className="space-y-4 text-silver/80">
                        <p>Organizations don’t fail suddenly.</p>
                        <p>They drift quietly, gradually, and invisibly until leaders are forced to react.</p>
                        <p>PITHONIX AI exists to make that drift visible early.</p>
                        <p className="text-white font-bold border-l-2 border-teal pl-4 mt-4">
                            JEET does not remove risk. It reduces surprise.
                        </p>
                    </div>
                </section>
            </div>

        </div>
      </div>
    </div>
  );
};

export default AboutOverlay;
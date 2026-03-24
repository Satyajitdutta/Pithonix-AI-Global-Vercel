import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const Innovation: React.FC = () => {
    return (
        <section id="innovation" className="py-24 px-6 relative overflow-hidden min-h-screen">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-b from-charcoal/0 via-charcoal/20 to-charcoal/0 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10 pt-20">
                <ScrollReveal>
                    <div className="border-l-4 border-cyan pl-6 mb-16">
                        <h2 className="font-heading font-black text-4xl md:text-5xl text-white mb-2">INNOVATION HUB</h2>
                        <p className="text-teal font-mono tracking-widest uppercase">The Architecture of Resolution</p>
                    </div>
                </ScrollReveal>

                <div className="mb-20">
                    <p className="text-xl text-silver/80 max-w-3xl leading-relaxed">
                        We address the core challenges of modern enterprises—Attrition, Burnout, Skill Gaps, and many more intricate issues—not through manual intervention, but through <span className="text-cyan">algorithmic prediction</span>.
                    </p>
                </div>

                {/* Core Pillars */}
                <div className="grid md:grid-cols-3 gap-6 mb-20">
                    <ScrollReveal delay={300}>
                        <div className="p-6 border border-white/5 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group h-full">
                            <div className="w-12 h-12 bg-cyan/10 rounded mb-4 flex items-center justify-center text-cyan group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            </div>
                            <h4 className="text-white font-bold text-lg mb-2">Zero-Surveillance</h4>
                            <p className="text-sm text-silver/70">We analyze aggregated patterns, never individual identifiers. Privacy is not a feature; it is the architecture.</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={400}>
                        <div className="p-6 border border-white/5 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group h-full">
                            <div className="w-12 h-12 bg-teal/10 rounded mb-4 flex items-center justify-center text-teal group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            </div>
                            <h4 className="text-white font-bold text-lg mb-2">Semantic Intelligence</h4>
                            <p className="text-sm text-silver/70">Beyond keywords. Our NLP engines understand context, sarcasm, stress, and burnout from unstructured data streams.</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={500}>
                        <div className="p-6 border border-white/5 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group h-full">
                            <div className="w-12 h-12 bg-purple-500/10 rounded mb-4 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <h4 className="text-white font-bold text-lg mb-2">Action Velocity</h4>
                            <p className="text-sm text-silver/70">From raw data to "Decision-Ready" insights in milliseconds. We close the gap between detection and correction.</p>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Framework Visualization */}
                <ScrollReveal delay={600}>
                    <div className="glass-panel p-8 rounded-2xl relative">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="font-heading font-black text-2xl text-white mb-2">THE <span className="text-cyan">JEET FRAMEWORK</span></h3>
                                <p className="text-teal font-bold text-xs uppercase tracking-widest mb-4">Just-in-Time Emotionally Empowered Technology</p>
                                <p className="text-silver/80 mb-6">
                                    Powered by the <strong className="text-white">HARI (Human Augmented Realistic Intelligence)</strong> algorithm. Our proprietary architecture consists of three distinct layers of intelligence, ensuring that no raw data ever reaches the decision layer without context.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded bg-charcoal flex items-center justify-center text-xs font-bold text-silver">01</div>
                                        <div>
                                            <strong className="text-white block">Layer 1: Ingestion</strong>
                                            <span className="text-xs text-silver/50">Normalization of heterogeneous data streams.</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded bg-charcoal flex items-center justify-center text-xs font-bold text-silver">02</div>
                                        <div>
                                            <strong className="text-white block">Layer 2: Contextualization</strong>
                                            <span className="text-xs text-silver/50">Applying role-tenure-project vectors to raw logs.</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded bg-charcoal flex items-center justify-center text-xs font-bold text-cyan">03</div>
                                        <div>
                                            <strong className="text-cyan block">Layer 3: Signal Generation</strong>
                                            <span className="text-xs text-silver/50">Outputting high-fidelity strategic directives.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Visual Graphic */}
                            <div className="h-64 relative bg-black/20 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 opacity-50">
                                    <div className="w-48 h-1 bg-cyan/20 animate-pulse"></div>
                                    <div className="w-64 h-1 bg-cyan/40 animate-pulse delay-75"></div>
                                    <div className="w-56 h-1 bg-cyan/60 animate-pulse delay-150"></div>
                                    <div className="w-32 h-1 bg-cyan/80 animate-pulse delay-200"></div>
                                </div>
                                <div className="z-10 text-center">
                                    <div className="w-24 h-24 rounded-full border-2 border-cyan/50 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(102,252,241,0.2)] bg-obsidian/80">
                                        <svg className="w-10 h-10 text-cyan animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                    <div className="text-xs font-mono text-cyan tracking-widest">SIGNAL LOCK</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default Innovation;

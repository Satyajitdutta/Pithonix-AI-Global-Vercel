import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { JEET_AGENTS } from '../constants';
import UseCasesSection from '../src/components/briefing/UseCasesSection';
import TechStackSection from '../src/components/briefing/TechStackSection';

const Competencies: React.FC = () => {
    return (
        <section id="services" className="py-24 px-6 bg-charcoal/30 min-h-screen">
            <div className="max-w-7xl mx-auto pt-20">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="font-heading font-black text-4xl md:text-5xl text-white mb-4">COMPETENCIES</h2>
                        <p className="text-silver max-w-2xl mx-auto">
                            The JEET Framework deploys specialized agents across layers. From normalizing data to building context.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {JEET_AGENTS.map((agent, idx) => (
                        <ScrollReveal key={agent.id} delay={idx * 100}>
                            <div className="glass-panel p-6 rounded-xl h-full hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-sm font-mono font-bold text-cyan border border-cyan/50 px-3 py-1 rounded-sm bg-cyan/5">
                                        {agent.id.toString().padStart(2, '0')}
                                    </span>
                                    <svg className="w-6 h-6 text-silver/40 group-hover:text-cyan transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                                <h3 className="font-heading font-bold text-xl text-white mb-2 group-hover:text-cyan transition-colors">
                                    {agent.name}
                                </h3>
                                <p className="text-xs text-silver/60 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                                    {agent.layer}
                                </p>
                                <p className="text-sm text-silver mb-4 leading-relaxed">
                                    {agent.attributes}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-teal font-mono">
                                    <span className="opacity-50">ANALOGY:</span>
                                    <span>{agent.analogy}</span>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                <div className="briefing-root" style={{ marginTop: '5rem' }}>
                    <UseCasesSection />
                    <TechStackSection />
                </div>
            </div>
        </section>
    );
};

export default Competencies;

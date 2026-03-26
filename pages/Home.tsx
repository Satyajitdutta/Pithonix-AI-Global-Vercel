import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import DynamicTagline from '../components/DynamicTagline';
import { COMPANY_INFO } from '../constants';
import CircuitBackground from '../components/CircuitBackground';
import BriefingHero from '../src/components/briefing/BriefingHero';
import TransformationSection from '../src/components/briefing/TransformationSection';

interface HomeProps {
    openBooking: () => void;
}

const Home: React.FC<HomeProps> = ({ openBooking }) => {
    return (
        <>
            <main className="briefing-root">
                <section className="relative min-h-screen">
                    <CircuitBackground />
                    <div className="z-10 relative">
                        <BriefingHero />
                    </div>
                </section>
                
                <TransformationSection />
            </main>

            {/* About Us Teaser */}
            <section className="py-24 px-6 relative overflow-hidden bg-white/5">
                <div className="max-w-7xl mx-auto relative z-10">
                    <ScrollReveal>
                        <div className="border-l-4 border-teal pl-6 mb-16">
                            <h2 className="font-heading font-black text-4xl md:text-5xl text-white mb-2 uppercase">About PITHONIX AI</h2>
                            <p className="text-teal font-mono tracking-widest uppercase">Organizational Intelligence</p>
                        </div>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-12 gap-12">
                        <div className="md:col-span-12">
                            <ScrollReveal delay={100}>
                                <h3 className="text-2xl font-bold text-white mb-6 uppercase">Information to Intelligence</h3>
                                <div className="space-y-6 text-silver/80 text-lg leading-relaxed max-w-3xl">
                                    <p className="text-xl text-white">
                                        Most enterprise software stores information. <span className="text-cyan font-bold">PITHONIX AI understands what that information means.</span>
                                    </p>
                                    <button
                                        onClick={() => window.dispatchEvent(new CustomEvent('nexus-activate'))}
                                        className="group mt-6 inline-flex items-center gap-3 px-8 py-4 border-2 border-cyan/50 rounded-lg hover:bg-cyan hover:text-obsidian transition-all duration-300"
                                    >
                                        <span className="font-bold tracking-widest uppercase text-sm">Initiate Intelligence Briefing</span>
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;

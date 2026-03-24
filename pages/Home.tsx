import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import DynamicTagline from '../components/DynamicTagline';
import { COMPANY_INFO } from '../constants';

interface HomeProps {
    openBooking: () => void;
}

const Home: React.FC<HomeProps> = ({ openBooking }) => {
    return (
        <>
            {/* Hero Section - Streamlined & Elevated (Logo/Name removed per user request) */}
            <section className="relative min-h-screen flex flex-col items-center justify-start px-6 pt-32 pb-20">
                <div className="max-w-6xl w-full text-center z-10 mt-6 md:mt-12">
                    <ScrollReveal>
                        <div className="mb-16 flex flex-col items-center">
                            {/* i2i Tagline is now the Hero Lead element - UPSIZED */}
                            <div className="relative">
                                <DynamicTagline className="text-cyan font-bold tracking-[0.3em] text-2xl md:text-4xl" delay={300} />
                                {/* Underline decoration */}
                                <div className="h-px w-48 bg-gradient-to-r from-transparent via-cyan to-transparent mx-auto mt-6" />
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={500}>
                        <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-[min(8vw,4.5rem)] leading-[1.1] text-white mb-10 tracking-tight lg:pr-24">
                            Problems do not appear suddenly.<br />
                            They grow quietly.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-teal ">
                                We make them visible.
                            </span>
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={700}>
                        <p className="text-lg md:text-xl text-silver/70 max-w-2xl mx-auto mb-14 font-light leading-relaxed">
                            Empowering Enterprises with Semantic Intelligence.<br />
                            Moving from surveillance to signals with the JEET Framework.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={900}>
                        <div className="flex flex-col md:flex-row gap-8 justify-center">
                            <button
                                onClick={() => window.open('https://pithonix-simulator-public.vercel.app/', '_blank')}
                                className="px-12 py-5 bg-cyan text-obsidian font-black tracking-widest rounded hover:bg-white transition-all shadow-[0_0_20px_rgba(102,252,241,0.3)] hover:shadow-[0_0_40px_rgba(102,252,241,0.5)] uppercase"
                            >
                                Initiate Protocol
                            </button>
                            <a
                                href="/innovation"
                                className="px-12 py-5 border-2 border-teal/40 text-teal font-black tracking-widest rounded hover:bg-teal hover:text-obsidian transition-all uppercase inline-block"
                            >
                                Learn More
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

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

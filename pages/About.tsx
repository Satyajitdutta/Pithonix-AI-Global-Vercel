import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const About: React.FC = () => {
    return (
        <section id="about-us" className="py-24 px-6 relative overflow-hidden min-h-screen">
            <div className="max-w-7xl mx-auto relative z-10 pt-20">
                <ScrollReveal>
                    <div className="border-l-4 border-teal pl-6 mb-16">
                        <h2 className="font-heading font-black text-4xl md:text-5xl text-white mb-2">ABOUT PITHONIX AI</h2>
                        <p className="text-teal font-mono tracking-widest uppercase">Organizational Intelligence</p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-12 gap-12">
                    <div className="md:col-span-7 flex flex-col justify-center">
                        <ScrollReveal delay={100}>
                            <h3 className="text-2xl font-bold text-white mb-6">INFORMATION TO INTELLIGENCE</h3>
                            <div className="space-y-6 text-silver/80 text-lg leading-relaxed">
                                <p className="text-xl text-white">
                                    Most enterprise software stores information. <span className="text-cyan font-bold">PITHONIX AI understands what that information means.</span>
                                </p>
                                <p>
                                    We are building a new category of enterprise intelligence—one that focuses not on evaluating people, but on understanding the systems, roles, and contexts in which people work.
                                </p>
                                <p>
                                    Our mission is to empower decision-makers with high-fidelity signals derived from semantic analysis of organizational data, moving beyond simple metrics to true contextual understanding.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>

                    <div className="md:col-span-5">
                        <ScrollReveal delay={200}>
                            <div className="glass-panel p-8 rounded-2xl h-full flex flex-col justify-center relative overflow-hidden">
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-teal/10 rounded-full blur-2xl"></div>

                                <h4 className="font-mono text-teal text-sm mb-6 border-b border-white/10 pb-2">OPERATIONAL METRICS</h4>
                                <ul className="space-y-6">
                                    <li className="flex justify-between items-center">
                                        <span className="text-silver">Model Accuracy</span>
                                        <span className="font-heading font-black text-2xl text-white">99.8%</span>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <span className="text-silver">Processing Latency</span>
                                        <span className="font-heading font-black text-2xl text-white">&lt; 120ms</span>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <span className="text-silver">Privacy Compliance</span>
                                        <span className="font-heading font-black text-2xl text-cyan">GDPR/DPDP</span>
                                    </li>
                                </ul>

                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-teal">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        </div>
                                        <div>
                                            <div className="text-xs text-silver/50 uppercase">Headquarters</div>
                                            <div className="text-white font-bold">Hyderabad, India</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

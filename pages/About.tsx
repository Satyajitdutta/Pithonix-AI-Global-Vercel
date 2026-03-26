import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import ProblemSection from '../src/components/briefing/ProblemSection';
import ROISection from '../src/components/briefing/ROISection';

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
                    <div className="md:col-span-12 flex flex-col justify-center">
                        <ScrollReveal delay={100}>
                            <h3 className="text-2xl font-bold text-white mb-6 uppercase">Information to Intelligence</h3>
                            <div className="space-y-6 text-silver/80 text-lg leading-relaxed">
                                <p className="text-xl text-white">
                                    Most enterprise software stores information. <span className="text-cyan font-bold">PITHONIX AI understands what that information means.</span>
                                </p>
                                <p>
                                    We are building a new category of enterprise intelligence—one that focuses not on evaluating people, but on understanding the systems, roles, and contexts in which people work.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>

            <div className="briefing-root">
                <ProblemSection />
                <ROISection />
            </div>
        </section>
    );
};

export default About;

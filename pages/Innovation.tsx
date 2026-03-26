import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import FrameworkSection from '../src/components/briefing/FrameworkSection';
import ArchitectureSection from '../src/components/briefing/ArchitectureSection';
import ProtocolSection from '../src/components/briefing/ProtocolSection';

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
                        We address the core challenges of modern enterprises—Attrition, Burnout, Skill Gaps, and many more intricate issues—not through manual intervention, but through <span className="text-cyan uppercase">algorithmic prediction</span>.
                    </p>
                </div>

                <div className="briefing-root">
                    <FrameworkSection />
                    <ArchitectureSection />
                    <ProtocolSection />
                </div>
            </div>
        </section>
    );
};

export default Innovation;

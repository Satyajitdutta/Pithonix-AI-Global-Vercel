import React from 'react';
import ScrollReveal from '../../../components/ScrollReveal';

const BriefingHero: React.FC = () => {
  return (
    <section className="hero-briefing">
      <div className="hero-pre">Architectural Briefing // Ver 1.0</div>
      
      {/* Merged messaging from previous hero */}
      <ScrollReveal>
        <div className="mb-6 flex flex-col items-center">
           <h2 className="font-heading font-black text-white/40 uppercase tracking-[0.4em] text-[10px] md:text-xs">
             Problems do not appear suddenly. They grow quietly.
           </h2>
        </div>
      </ScrollReveal>

      <h1>Architecting the<br /><span className="lc">Enterprise Nervous System</span></h1>
      
      <p className="hero-desc">We make the invisible visible. Moving from surveillance to signals with the JEET Framework—a unified protocol for the modern enterprise.</p>
      
      <div className="hero-tag">Information → Intelligence</div>
      
      <div className="hero-target">
        <span>CTO</span><span>CHRO</span><span>CIO</span>
      </div>
      <div className="hero-scroll"><span>Scroll</span><div className="scroll-line"></div></div>
    </section>
  );
};

export default BriefingHero;

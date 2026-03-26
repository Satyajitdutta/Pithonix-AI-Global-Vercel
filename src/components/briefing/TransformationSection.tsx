import React from 'react';
import ScrollReveal from '../../../components/ScrollReveal';

const TransformationSection: React.FC = () => {
  return (
    <section>
      <ScrollReveal className="fi">
        <span className="sl">The I2I Transformation</span>
        <h2 className="st">From <span className="ac">Information</span> to Intelligence</h2>
      </ScrollReveal>
      
      <div className="pcg">
        <ScrollReveal className="gl pc" delay={100}>
          <h4 style={{ color: 'var(--silver-d)' }}>Information</h4>
          <p className="pl">What you have today</p>
          <ul className="cl">
            <li><span className="mk mb">•</span> Raw data sitting in silos</li>
            <li><span className="mk mb">•</span> Backward-looking reports and dashboards</li>
            <li><span className="mk mb">•</span> Requires human interpretation</li>
            <li><span className="mk mb">•</span> Shows symptoms, not root causes</li>
          </ul>
        </ScrollReveal>
        
        <ScrollReveal className="gl pc" style={{ borderColor: 'rgba(102,252,241,.2)' }} delay={300}>
          <h4>Intelligence</h4>
          <p className="pl">What you'll have with JEET</p>
          <ul className="cl">
            <li><span className="mk mg">✓</span> Connected insights across all systems</li>
            <li><span className="mk mg">✓</span> Forward-looking predictions (2–3 months early)</li>
            <li><span className="mk mg">✓</span> Automated analysis — no human glue</li>
            <li><span className="mk mg">✓</span> Root causes with actionable intervention maps</li>
          </ul>
        </ScrollReveal>
      </div>
      
      <ScrollReveal className="fi" delay={500}>
        <div className="ud" style={{ maxWidth: '700px', margin: '2rem auto', textAlign: 'center', padding: '1.2rem' }}>
          Information: "Sarah quit today." → Intelligence: "Seismic activity detected 3 months ago: Manager left + Project cancelled + Calendar gaps. 80% attrition risk. Intervene now."
        </div>
      </ScrollReveal>
    </section>
  );
};

export default TransformationSection;

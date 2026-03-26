import React from 'react';
import ScrollReveal from '../../../components/ScrollReveal';

const ProblemSection: React.FC = () => {
  return (
    <section id="problem">
      <ScrollReveal className="fi">
        <span className="sl">The $100B Problem</span>
        <h2 className="st">The Human <span className="ac">Glue</span> Crisis</h2>
        <p className="ss">Enterprises have strong organs but no nervous system. Highly paid humans act as manual API connectors between siloed applications.</p>
      </ScrollReveal>

      <div className="cg">
        <ScrollReveal className="fi gl" delay={200}>
          <h4 style={{ color: 'var(--orange)', marginBottom: '1rem' }}>Current State</h4>
          <ul className="cl">
            <li><span className="mk mb">✗</span> Data entry bottlenecks between systems</li>
            <li><span className="mk mb">✗</span> Siloed decisions — HR doesn't know Finance constraints</li>
            <li><span className="mk mb">✗</span> Insights delayed by days of manual synthesis</li>
            <li><span className="mk mb">✗</span> Strategic blindspots from fragmented data</li>
            <li><span className="mk mb">✗</span> Delayed decisions waiting on human middleware</li>
          </ul>
        </ScrollReveal>
        
        <div className="ca">→</div>
        
        <ScrollReveal className="fi gl" delay={400}>
          <h4 style={{ color: 'var(--cyan)', marginBottom: '1rem' }}>Pithonix State</h4>
          <ul className="cl">
            <li><span className="mk mg">✓</span> Autonomous orchestration across all systems</li>
            <li><span className="mk mg">✓</span> Cognitive synthesis — connected intelligence</li>
            <li><span className="mk mg">✓</span> Proactive intelligence delivered in real-time</li>
            <li><span className="mk mg">✓</span> Cross-functional visibility and pattern detection</li>
            <li><span className="mk mg">✓</span> Decision-ready action maps, not dashboards</li>
          </ul>
        </ScrollReveal>
      </div>

      <div className="pg">
        <ScrollReveal className="gl sc" delay={100}>
          <div className="sn">₹200K</div>
          <div className="slab">Average cost to replace a senior engineer</div>
          <div className="ssrc">Source: SHRM, 2024</div>
        </ScrollReveal>
        <ScrollReveal className="gl sc" delay={300}>
          <div className="sn">10×</div>
          <div className="slab">Cost of fixing at "Failure Stage" vs "Signal Stage"</div>
          <div className="ssrc">Source: Gartner Research</div>
        </ScrollReveal>
        <ScrollReveal className="gl sc" delay={500}>
          <div className="sn">15–20%</div>
          <div className="slab">Annual attrition rate in fast-growth IT/ITES</div>
          <div className="ssrc">Source: Deloitte India</div>
        </ScrollReveal>
      </div>

      <ScrollReveal className="qb" delay={600}>
        <blockquote className="italic">"For a 5,000-person organization with 15% attrition, you're replacing 750 people annually. At ₹200K per replacement, that's ₹15 Crores bleeding out every year."</blockquote>
      </ScrollReveal>
    </section>
  );
};

export default ProblemSection;

import React from 'react';
import ScrollReveal from '../../../components/ScrollReveal';

const FrameworkSection: React.FC = () => {
  return (
    <section id="framework">
      <ScrollReveal className="fi">
        <span className="sl">Progressive Augmentation</span>
        <h2 className="st">The 3-Layer Path to <span className="ac">Enterprise AI</span></h2>
        <p className="ss">Automate First, Intelligentise Second. A framework for successful enterprise AI adoption, moving from process chaos to AI reasoning.</p>
      </ScrollReveal>
      
      <div className="ls">
        <ScrollReveal className="gl lc-card" delay={100}>
          <div className="lb lb1">1</div>
          <div>
            <h3 className="lt">Process Automation (n8n)</h3>
            <p className="ld">The foundation layer that converts manual workflows into reliable, machine-triggered, and logged events. Automate 3–4 high-volume workflows like HR onboarding or invoice processing.</p>
            <div className="ltl">Weeks 1–6 · Establish the Foundation</div>
          </div>
        </ScrollReveal>
        
        <ScrollReveal className="gl lc-card" delay={300}>
          <div className="lb lb2">2</div>
          <div>
            <h3 className="lt">Data Intelligence</h3>
            <p className="ld">A structured store that normalizes automation logs into queryable, time-stamped operational data. Build the knowledge base that makes patterns visible and queryable.</p>
            <div className="ltl">Weeks 7–8 · Build the Knowledge Base</div>
          </div>
        </ScrollReveal>
        
        <ScrollReveal className="gl lc-card" delay={500}>
          <div className="lb lb3">3</div>
          <div>
            <h3 className="lt">AI Reasoning (JEET / Claude)</h3>
            <p className="ld">The "brain" that uses clean Layer 2 data to perform complex judgment-based tasks. Deploy targeted AI skills that provide tangible ROI using actual enterprise data.</p>
            <div className="ltl">Week 12+ · Activate AI Reasoning</div>
          </div>
        </ScrollReveal>
      </div>
      
      {/* LOGIC COMPARE CARDS */}
      <div className="spa-logic-grid" style={{ marginTop: '3rem' }}>
          <div className="spa-logic-card spa-deterministic">
              <div className="spa-logic-h">Deterministic Logic</div>
              <div className="spa-logic-sub">n8n — The Nervous System</div>
              <p className="spa-logic-desc">Handles rule-based "If-Then" workflows and data routing. Structured, precise execution.</p>
          </div>
          <div className="spa-logic-card spa-reasoning">
              <div className="spa-logic-h">Reasoning Logic</div>
              <div className="spa-logic-sub">JEET / Claude — The Brain</div>
              <p className="spa-logic-desc">Handles "Why and What Now" — context, judgment, and predictions. Conversational, fuzzy logic.</p>
          </div>
      </div>
    </section>
  );
};

export default FrameworkSection;

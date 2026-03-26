import React from 'react';
import ScrollReveal from '../../../components/ScrollReveal';

const UseCasesSection: React.FC = () => {
  return (
    <section id="use-cases">
      <ScrollReveal className="fi">
        <span className="sl">Strategic Nodes</span>
        <h2 className="st">High-Impact <span className="ac">Intelligence</span> Use Cases</h2>
        <p className="ss">Targeted deployments that bridge the gap from siloed information to decision-ready intelligence.</p>
      </ScrollReveal>

      <div className="ug">
        <ScrollReveal className="gl uc uc1" delay={100}>
          <div className="ui">📉</div>
          <h4>Attrition & Exit Impact</h4>
          <p>Predicting turnover 3 months before it happens. Analyzing systemic triggers like "Cluster Exits" and "Manager Proximity Risk."</p>
          <div className="ud">Outcome: ₹1.5 Cr reduction in high-value replacement costs</div>
        </ScrollReveal>

        <ScrollReveal className="gl uc uc2" delay={300}>
          <div className="ui">🔥</div>
          <h4>Burnout vs. Disengagement</h4>
          <p>Differentiating "High Effort + High Volatility" (Burnout) from "Low Effort + High Flatness" (Disengagement) — with clear intervention maps.</p>
          <div className="ud">Outcome: Stabilized productivity levels across critical teams</div>
        </ScrollReveal>

        <ScrollReveal className="gl uc uc3" delay={500}>
          <div className="ui">📊</div>
          <h4>Skill Decay & Role Resilience</h4>
          <p>Calculates "Skill Half-Life" for your organization. Identifies skills that are rusting vs. those that are becoming market-essential.</p>
          <div className="ud">Outcome: 25% faster upskilling path to future-fit roles</div>
        </ScrollReveal>
      </div>

      <div className="fi gl" style={{ marginTop: '3rem', padding: '2.5rem' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', fontFamily: 'Montserrat', color: 'var(--white)' }}>Strategic Bottleneck Detection</h3>
        <div className="bt">
          <div className="bp">
            <div className="bph">Supply Chain</div>
            <h4>Process Stalling</h4>
            <ul>
              <li>Jira → SAP friction</li>
              <li>Approval latencies</li>
              <li>Data-reentry leaks</li>
            </ul>
            <div className="bo">₹2.4 Cr Gap</div>
          </div>
          
          <div className="bp">
            <div className="bph">Workforce</div>
            <h4>Talent Resonance</h4>
            <ul>
              <li>Skill-market mismatch</li>
              <li>Role over-saturation</li>
              <li>Leadership vacuum</li>
            </ul>
            <div className="bo">₹1.8 Cr Gap</div>
          </div>
          
          <div className="bp">
            <div className="bph">Operational</div>
            <h4>Cognitive Leakage</h4>
            <ul>
              <li>Meeting saturation</li>
              <li>Siloed context loss</li>
              <li>Decision fatigue</li>
            </ul>
            <div className="bo">₹3.2 Cr Gap</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;

import React from 'react';
import ScrollReveal from '../../../components/ScrollReveal';

const GovernanceSection: React.FC = () => {
  return (
    <section id="governance">
      <ScrollReveal className="fi">
        <span className="sl">Trust & Resilience</span>
        <h2 className="st">Privacy by <span className="ac">Design</span></h2>
        <p className="ss">Enterprise intelligence doesn't mean enterprise surveillance. JEET is built with a zero-trust, role-level context approach.</p>
      </ScrollReveal>

      <div className="gp">
        <ScrollReveal className="gl gpc" delay={100}>
          <div className="gpi">🛡️</div>
          <h4>Zero Surveillance</h4>
          <p>We analyze "Role x Tenure" clusters, never individuals. Firewall Layer 2 prevents agents from seeing name-level data.</p>
          <div className="gpd">Role-Context Privacy Layer</div>
        </ScrollReveal>

        <ScrollReveal className="gl gpc" delay={300}>
          <div className="gpi">🇮🇳</div>
          <h4>India-First Reliability</h4>
          <p>Tested against India's massive scale and complexity. Built for billion-record datasets and hybrid-workforce dynamics.</p>
          <div className="gpd">Vibrant Labs Stress-Tested</div>
        </ScrollReveal>

        <ScrollReveal className="gl gpc" delay={500}>
          <div className="gpi">📜</div>
          <h4>Decision Logging</h4>
          <p>Every decision, query, and analysis is logged for audit. "XAI" (Explainable AI) ensures you know the *why* behind every signal.</p>
          <div className="gpd">SOC2 / GDDR Compliance Mapping</div>
        </ScrollReveal>
      </div>

      <div className="sb" style={{ marginTop: '2.5rem' }}>
        <h5>Governance Guardrails</h5>
        <p>JEET enforces "Maximum Allowable Variance" — an automated circuit breaker that flags anomalies in critical HR and Ops decisions instantly.</p>
      </div>
    </section>
  );
};

export default GovernanceSection;

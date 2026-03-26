import React from 'react';
import ScrollReveal from '../../../components/ScrollReveal';

const ProtocolSection: React.FC = () => {
  return (
    <section id="protocols">
      <ScrollReveal className="fi">
        <span className="sl">Standardization</span>
        <h2 className="st">Unified <span className="ac">Agentic</span> Protocols</h2>
        <p className="ss">Moving from "Point-to-Point" APIs to a standardized Agentic Communication Layer (A2A).</p>
      </ScrollReveal>

      <div className="pcg">
        <ScrollReveal className="gl pc" delay={100}>
          <h4>MCP vs. A2A Strategy</h4>
          <p className="pl">Model Context Protocol</p>
          <div className="pm">"A single source of context for every AI interaction."</div>
          <p className="pd">We implement specialized MCP servers for your legacy systems, ensuring models have full, secure context of your enterprise data without duplicative storage.</p>
        </ScrollReveal>

        <ScrollReveal className="gl pc" delay={300} style={{ borderColor: 'var(--purple-d)' }}>
          <h4>Cross-Silo Orchestration</h4>
          <p className="pl">Layer 0 Governance</p>
          <div className="pm">"The decision logs are as important as the decisions."</div>
          <p className="pd">JEET Orchestrators ensure that when an Agent in HR makes a suggestion, it accounts for constraints in Finance and Ops through a shared semantic space.</p>
        </ScrollReveal>
      </div>

      <ScrollReveal className="sb" style={{ marginTop: '2rem' }} delay={500}>
        <h5 style={{ fontFamily: 'Montserrat', fontWeight: 700 }}>Beyond the Chatbot</h5>
        <p>This is not about asking a bot questions. It's about a <strong>Self-Regulating System</strong> that monitors its own health and alerts you to potential organ failure before it happens.</p>
      </ScrollReveal>
    </section>
  );
};

export default ProtocolSection;

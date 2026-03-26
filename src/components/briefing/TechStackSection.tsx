import React from 'react';
import ScrollReveal from '../../../components/ScrollReveal';

const TechStackSection: React.FC = () => {
  return (
    <section id="tech-stack">
      <ScrollReveal className="fi">
        <span className="sl">Infrastructure Logic</span>
        <h2 className="st">The Pithonix <span className="ac">Architecture</span> Stack</h2>
        <p className="ss">A robust, scalable, and secure deployment model for enterprise AI environments.</p>
      </ScrollReveal>

      <div className="sg">
        <ScrollReveal className="gl skc" delay={100}>
          <h4>Infrastructure</h4>
          <div className="si"><span className="sic">›</span><div className="sid"><strong>Cloud Native</strong>: AWS / Azure / GCP Hybrid</div></div>
          <div className="si"><span className="sic">›</span><div className="sid"><strong>Serverless</strong>: Vercel / Cloud Run Edge Computing</div></div>
          <div className="si"><span className="sic">›</span><div className="sid"><strong>Real-time</strong>: gRPC / WebSockets Streaming</div></div>
        </ScrollReveal>

        <ScrollReveal className="gl skc" delay={300}>
          <h4>Core Intelligence</h4>
          <div className="si"><span className="sic">›</span><div className="sid"><strong>LLMs</strong>: Claude 3.5 Sonnet / Gemini 1.5 Pro / Sarvam Bulbul</div></div>
          <div className="si"><span className="sic">›</span><div className="sid"><strong>Orchestration</strong>: n8n / JEET Layer 0 / Python Typed Agents</div></div>
          <div className="si"><span className="sic">›</span><div className="sid"><strong>Knowledge Base</strong>: Supabase Vector / Pinecone / PostgreSQL</div></div>
        </ScrollReveal>

        <ScrollReveal className="gl skc" delay={500}>
          <h4>Security & Ops</h4>
          <div className="si"><span className="sic">›</span><div className="sid"><strong>Encryption</strong>: TLS 1.3 / AES-256 at Rest</div></div>
          <div className="si"><span className="sic">›</span><div className="sid"><strong>Audit</strong>: Logflare / Datadog Tracing</div></div>
          <div className="si"><span className="sic">›</span><div className="sid"><strong>Governance</strong>: Role-based Access Control (RBAC) + Zero-Trust</div></div>
        </ScrollReveal>
      </div>

      <ScrollReveal className="cta-briefing" delay={600}>
        <h2>Ready to Architect?</h2>
        <p className="cta-d">Let's move your organization from Information to Intelligence.</p>
        <div className="cta-cs">
          <div className="cta-c"><div className="cta-cl">Location</div>Hyderabad // India</div>
          <div className="cta-c"><div className="cta-cl">Protocol</div>info@pithonix.ai</div>
          <div className="cta-c"><div className="cta-cl">Status</div>Active // Ver 1.0</div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default TechStackSection;

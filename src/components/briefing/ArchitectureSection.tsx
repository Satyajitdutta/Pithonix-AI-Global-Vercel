import React from 'react';
import ScrollReveal from '../../../components/ScrollReveal';

const ArchitectureSection: React.FC = () => {
  const sensors = [['Ss', 'Stability Signal'], ['Ed', 'Engagement Delta'], ['Pv', 'Performance Variance'], ['Ag', 'Role Signal'], ['Br', 'Connection Strategy'], ['Sk', 'Skill Signal'], ['Ei', 'Effort Intensity'], ['Se', 'Sentiment Shift'], ['Rff', 'Role Future Fit'], ['Cf', 'Burnout Classifier']];
  const processors = [['Cr', 'Context Risk Score'], ['Pb', 'Productivity Baseline'], ['Sd', 'Skill Decay'], ['Be', 'Burnout Classified'], ['Ri', 'Role Intelligence']];
  const doctors = [['RS', 'Action & Intervention'], ['Rs', 'Retention Strategy'], ['Og', 'Outcome Feedback'], ['Si', 'Skill Intervention'], ['Rr', 'Role Redesign']];

  const pipeline = [
    { s: '1', t: 'Ingest', d: 'Data from Workday, SAP, Jira, Surveys' },
    { s: '2', t: 'Anonymize', d: 'Remove names → Create role contexts' },
    { s: '3', t: 'Analyze', d: '25 agents detect patterns & risks' },
    { s: '4', t: 'Alert', d: 'Decision-ready action maps' }
  ];

  return (
    <section id="architecture">
      <ScrollReveal className="fi">
        <span className="sl">The JEET Framework</span>
        <h2 className="st">Layered <span className="ac">Intelligence</span> Architecture</h2>
        <p className="ss">JEET deploys specialized agents across layers — from normalizing data to building context to delivering decision-ready action maps.</p>
      </ScrollReveal>

      <div className="al">
        <ScrollReveal className="gl alc" delay={100}><div className="aln">0</div><h4>Orchestration & Governance</h4><div className="am">The Air Traffic Controller</div><p>Routes data, logs decisions, enforces governance policies across the entire intelligence mesh.</p></ScrollReveal>
        <ScrollReveal className="gl alc" delay={300}><div className="aln">1</div><h4>Data Intake & Normalization</h4><div className="am">The Universal Adapter</div><p>Standardizes roles, aligns dates, and normalizes incoming data from Workday, SAP, Jira, and other sources.</p></ScrollReveal>
        <ScrollReveal className="gl alc" delay={500}><div className="aln">2</div><h4>Context Aggregation</h4><div className="am">The Puzzle Sorter</div><p>Groups data into "Role × Tenure" clusters. A firewall ensures no downstream agent sees individual data.</p></ScrollReveal>
      </div>

      {/* AGENTS */}
      <div className="fi" style={{ marginTop: '3rem' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '.5rem', color: 'var(--white)', fontFamily: 'Montserrat' }}>25 Specialized Intelligence Nodes</h3>
        <p style={{ color: 'var(--silver-d)', fontSize: '.9rem', marginBottom: '2rem' }}>Specialized agents prevent hallucination by keeping scopes narrow and distinct.</p>

        <div className="at">
          <div className="atl ts"><span className="td" /> Signal Extraction — Sensors</div>
          <div className="ag">
            {sensors.map(([code, name]) => (
              <div key={code} className="ac-chip">
                <div className="ac-code">[{code}]</div>
                <div className="ac-name">{name}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="at">
          <div className="atl tp"><span className="td" /> Analysis & Context — Processors</div>
          <div className="ag">
            {processors.map(([code, name]) => (
              <div key={code} className="ac-chip">
                <div className="ac-code">[{code}]</div>
                <div className="ac-name">{name}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="at">
          <div className="atl tdo"><span className="td" /> Action & Intervention — Doctors</div>
          <div className="ag">
            {doctors.map(([code, name]) => (
              <div key={code} className="ac-chip">
                <div className="ac-code">[{code}]</div>
                <div className="ac-name">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline */}
      <div className="g4" style={{ marginTop: '3rem' }}>
        {pipeline.map((p) => (
          <ScrollReveal key={p.s} className="gl" style={{ padding: '1.5rem', textAlign: 'center' }} delay={parseInt(p.s) * 100}>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '2rem', color: 'var(--cyan)', opacity: .3 }}>{p.s}</div>
            <h4 style={{ fontSize: '1rem', margin: '.5rem 0 .3rem', color: 'var(--white)', fontFamily: 'Montserrat' }}>{p.t}</h4>
            <p style={{ fontSize: '.8rem', color: 'var(--silver-d)' }}>{p.d}</p>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="sb" style={{ marginTop: '2rem', borderColor: 'var(--teal)', background: 'rgba(69,162,158,.05)' }} delay={600}>
        <h5 style={{ color: 'var(--teal)', fontFamily: 'Montserrat', fontWeight: 700 }}>Privacy by Design</h5>
        <p>We analyze "roles & contexts", NOT individuals. No surveillance. No individual tracking. Enterprise-safe from day one.</p>
      </ScrollReveal>
    </section>
  );
};

export default ArchitectureSection;

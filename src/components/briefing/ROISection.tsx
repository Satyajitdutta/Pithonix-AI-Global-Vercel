import React from 'react';
import ScrollReveal from '../../../components/ScrollReveal';

const ROISection: React.FC = () => {
  return (
    <section id="roi">
      <ScrollReveal className="fi">
        <span className="sl">Economic Impact</span>
        <h2 className="st">The <span className="ac">43x</span> ROI Principle</h2>
        <p className="ss">Small improvements in attrition and productivity in a large organization lead to massive, multi-crore bottom-line impacts.</p>
      </ScrollReveal>

      <ScrollReveal className="gl sc" style={{ maxWidth: '400px', margin: '0 auto 3rem' }}>
        <div className="sn" style={{ color: 'var(--cyan)' }}>₹22 Cr</div>
        <div className="slab">Potential Annual Savings</div>
        <div className="ssrc">For a 5,000-person Enterprise // 2.5% Attrition Reduction</div>
      </ScrollReveal>

      <div className="fi gl" style={{ overflowX: 'auto' }}>
        <table className="rt">
          <thead>
            <tr>
              <th>Strategic Pillar</th>
              <th>Impact Vector</th>
              <th>Conservative ROI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ color: 'var(--white)' }}>Retention Intelligence</td>
              <td>2.5% reduction in high-value attrition</td>
              <td className="rv">₹15.0 Cr</td>
            </tr>
            <tr>
              <td style={{ color: 'var(--white)' }}>Productivity Baseline</td>
              <td>2% gain in mid-tier output velocity</td>
              <td className="rv">₹4.5 Cr</td>
            </tr>
            <tr>
              <td style={{ color: 'var(--white)' }}>Acquisition Resonance</td>
              <td>15% reduction in "Bad Hire" costs</td>
              <td className="rv">₹2.2 Cr</td>
            </tr>
            <tr>
              <td style={{ color: 'var(--white)' }}>Skill Gap Velocity</td>
              <td>Compressed training path for new roles</td>
              <td className="rv">₹0.8 Cr</td>
            </tr>
          </tbody>
        </table>
        
        <div className="rtot">
          <div className="rtl">Total Estimated Operational Alpha</div>
          <div className="rtv">₹22.5 Cr / yr</div>
        </div>
      </div>

      <ScrollReveal className="qb" delay={400}>
        <blockquote className="italic">"We don't sell 'software.' We sell a 43x return on your investment by stopping the quiet bleeding in your organization."</blockquote>
        <cite>— Pithonix AI Strategy Briefing</cite>
      </ScrollReveal>
    </section>
  );
};

export default ROISection;

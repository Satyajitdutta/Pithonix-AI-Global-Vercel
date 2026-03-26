import { Agent } from './types';

export const JEET_AGENTS: Agent[] = [
  {
    id: 1,
    name: "JEET Orchestrator",
    layer: "Layer 0: Orchestration",
    attributes: "Controls execution order, enforces boundaries, logs decisions.",
    analogy: "Air Traffic Controller"
  },
  {
    id: 2,
    name: "Data Intake Agent",
    layer: "Layer 1: Ingestion",
    attributes: "Receives raw HRMS exports without inferring meaning.",
    analogy: "The Mail Sorter"
  },
  {
    id: 3,
    name: "Context Aggregation Agent",
    layer: "Layer 2: Context",
    attributes: "Groups data into 'Role x Tenure' clusters; ensures anonymity.",
    analogy: "The Puzzle Sorter"
  },
  {
    id: 4,
    name: "Stability Signal Agent",
    layer: "Use Case 1: Attrition",
    attributes: "Monitors role changes and organizational restructure flags.",
    analogy: "The Seismograph"
  },
  {
    id: 5,
    name: "Engagement Delta Agent",
    layer: "Use Case 1: Attrition",
    attributes: "Tracks survey score drops and sentiment shifts.",
    analogy: "Digital Thermometer"
  },
  {
    id: 6,
    name: "Contextual Risk Scoring",
    layer: "Use Case 1: Attrition",
    attributes: "Aggregates signals to assign risk bands (Stable, Critical).",
    analogy: "Early Warning Siren"
  },
  {
    id: 7,
    name: "Productivity Baseline Agent",
    layer: "Use Case 2: Productivity",
    attributes: "Establishes 'expected range' by removing outliers.",
    analogy: "Thermostat Setting"
  },
  {
    id: 8,
    name: "Skill Decay Agent",
    layer: "Use Case 3: Skills",
    attributes: "Calculates skill 'half-life' based on volatility and lack of use.",
    analogy: "Rust Detector"
  },
  {
    id: 9,
    name: "Role Future Fit Agent",
    layer: "Use Case 4: Mismatch",
    attributes: "Calculates 'skill gap velocity' against market requirements.",
    analogy: "GPS Navigation"
  },
  {
    id: 10,
    name: "Burnout-Disengagement",
    layer: "Use Case 5: Burnout",
    attributes: "High effort + Volatility = Burnout; Low effort + Flatness = Disengagement.",
    analogy: "Diagnostic Lab Result"
  },
  {
    id: 11,
    name: "Talent Resonance Agent",
    layer: "Use Case 6: Acquisition",
    attributes: "Matches external profiles against internal 'Success DNA' patterns.",
    analogy: "The Headhunter"
  },
  {
    id: 12,
    name: "Outcome Velocity Agent",
    layer: "Use Case 7: Performance",
    attributes: "Tracks speed of delivery against quality benchmarks, ignoring hours worked.",
    analogy: "Speedometer"
  }
];

export const COMPANY_INFO = {
  name: "PITHONIX AI INDIA PRIVATE LIMITED",
  tagline: "Information to Intelligence",
  description: "An elite AI-first engineering lab specializing in Semantic Intelligence. We empower enterprises with the JEET Framework—moving from surveillance to signals, providing decision-ready intelligence without compromising privacy.",
  location: "Hyderabad",
  email: "info@pithonix.ai",
  branding: {
    symbol: "/branding/logo_symbol.png",
    text: "/branding/logo_text.png",
    tagline: "/branding/tagline_text.png"
  },
  // SARVAM AI CONFIGURATION (VOICE AGENT)
  // @ts-ignore
  sarvamKey: import.meta.env.VITE_SARVAM_KEY || "",
  // @ts-ignore
  sarvamVoice: import.meta.env.VITE_SARVAM_VOICE || "ritu", // High-fidelity female voice (Sarvam v3 Supported)
  stats: [
    { label: "Accuracy", value: "99.8%" },
    { label: "Agents", value: "25+" },
    { label: "Layers", value: "3" }
  ],
  social: {
    linkedin: "https://www.linkedin.com/company/pithonix-ai/",
    twitter: "https://x.com/Pithonix_ai"
  }
};
import React, { useState, useEffect, useRef } from 'react';
import { COMPANY_INFO, JEET_AGENTS } from '../../constants';
import PithonixLogo from '../../components/PithonixLogo';
import DynamicTagline from '../../components/DynamicTagline';
import '../styles/spa.css';

const BriefingSPA: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [heroPhase, setHeroPhase] = useState(0); // Sequence: 0, 1, 2 (intro lines), 3 (wipe), 4 (main)
    const [jevaInput, setJevaInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'jeva', content: "Hello! I'm JEVA — Pithonix.ai's autonomous enterprise voice intelligence. I can tell you about our platform, demonstrate how I handle real sales conversations, or show you exactly what I'd say to your first enterprise client. What would you like to explore?" }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const isMounted = useRef(false);
    const currentAudioRef = useRef<HTMLAudioElement | null>(null);
    const isFetchingAudioRef = useRef(false);

    // ROI Calculator State
    const [headcount, setHeadcount] = useState(2500);
    const [attritionRate, setAttritionRate] = useState(2);
    const [currency, setCurrency] = useState('INR');

    const formatCurrency = (val: number) => {
        const conversionRate = 83.5;
        const actualVal = currency === 'USD' ? val / conversionRate : val;
        return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0
        }).format(actualVal);
    };

    // Data for dynamic sections
    const sensors = [['Ss', 'Stability Signal'], ['Ed', 'Engagement Delta'], ['Pv', 'Performance Variance'], ['Ag', 'Role Signal'], ['Br', 'Connection Strategy'], ['Sk', 'Skill Signal'], ['Ei', 'Effort Intensity'], ['Se', 'Sentiment Shift'], ['Rff', 'Role Future Fit'], ['Cf', 'Burnout Classifier']];
    const processors = [['Cr', 'Context Risk Score'], ['Pb', 'Productivity Baseline'], ['Sd', 'Skill Decay'], ['Be', 'Burnout Classified'], ['Ri', 'Role Intelligence']];
    const doctors = [['RS', 'Action & Intervention'], ['Rs', 'Retention Strategy'], ['Og', 'Outcome Feedback'], ['Si', 'Skill Intervention'], ['Rr', 'Role Redesign']];
    const pipe = [
        { s: '1', t: 'Ingest', d: 'Data from Workday, SAP, Jira, Surveys' },
        { s: '2', t: 'Anonymize', d: 'Remove names → Create role contexts' },
        { s: '3', t: 'Analyze', d: '25 agents detect patterns & risks' },
        { s: '4', t: 'Alert', d: 'Decision-ready action maps' }
    ];
    const ragGates = [
        { t: 'Ingestion & Structure', d: 'Structure-aware chunking of PDFs, HTML, and enterprise docs' },
        { t: 'Hybrid Storage', d: 'Vector embeddings + relational metadata for precise retrieval' },
        { t: 'Reasoning Engine', d: 'The Planner + Hybrid Search for contextual query resolution' },
        { t: 'Validation Gates', d: 'Gatekeeper (Relevance?) → Auditor (Grounded?) → Strategist (Aligned?)' }
    ];

    // Hero Sequence Logic
    useEffect(() => {
        if (heroPhase < 3) {
            const timer = setTimeout(() => setHeroPhase(prev => prev + 1), 2200);
            return () => clearTimeout(timer);
        } else if (heroPhase === 3) {
            const timer = setTimeout(() => setHeroPhase(4), 1200);
            return () => clearTimeout(timer);
        }
    }, [heroPhase]);

    // Intersection Observer for scroll reveal
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('vis');
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll('.spa-fi').forEach(el => observer.observe(el));
        
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSendMessage = async (text?: string) => {
        const input = text || jevaInput;
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setJevaInput('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/jeva', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input, history: newMessages })
            });
            const data = await response.json();
            if (response.ok && data.reply) {
                setMessages([...newMessages, { role: 'jeva', content: data.reply }]);
            } else {
                const errorMsg = data.message || data.error?.message || "I'm having trouble connecting to my neural core right now. Please try again.";
                throw new Error(errorMsg);
            }
        } catch (error: any) {
            console.error("JEVA Error:", error);
            setMessages([...newMessages, { role: 'jeva', content: error.message }]);
        } finally {
            setIsTyping(false);
        }
    };

    const speak = async (text: string) => {
        if (isFetchingAudioRef.current) return;
        isFetchingAudioRef.current = true;

        // Stop any currently playing audio before starting a new one
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current.src = '';
            currentAudioRef.current = null;
        }

        setIsPlaying(true);
        try {
            const response = await fetch('/api/speak', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });
            const data = await response.json();
            if (data.error) throw new Error(JSON.stringify(data.error));
            if (!data.audio) throw new Error("No audio data received");

            const audioUrl = `data:audio/wav;base64,${data.audio}`;
            const audio = new Audio(audioUrl);
            currentAudioRef.current = audio;
            audio.onended = () => {
                currentAudioRef.current = null;
                isFetchingAudioRef.current = false;
                setIsPlaying(false);
            };
            audio.onerror = (e) => {
                console.error("Audio Playback Error:", e);
                currentAudioRef.current = null;
                isFetchingAudioRef.current = false;
                setIsPlaying(false);
            };
            await audio.play();
        } catch (error) {
            console.error("TTS Error:", error);
            currentAudioRef.current = null;
            isFetchingAudioRef.current = false;
            setIsPlaying(false);
        }
    };

    const renderAgentGrid = (list: string[][]) => (
        <div className="spa-ag">
            {list.map(([code, name]) => (
                <div key={code} className="spa-ac-chip">
                    <div className="spa-ac-code">[{code}]</div>
                    <div className="spa-ac-name">{name}</div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="spa-root">
            {/* NAVIGATION - Hidden during intro reveal */}
            <nav className={`spa-nav ${scrolled ? 'scrolled' : ''}`} style={{ opacity: heroPhase === 4 ? 1 : 0, pointerEvents: heroPhase === 4 ? 'auto' : 'none', transition: 'opacity 1s ease-in' }}>
                <div className="spa-nav-logo">
                    <PithonixLogo size={40} className="mr-2" />
                    PITHONIX <span>AI</span>
                </div>
                <ul className="spa-nav-links">
                    <li><a href="#problem">Problem</a></li>
                    <li><a href="#product-center">Product Centre</a></li>
                    <li><a href="#scenarios">Scenarios</a></li>
                    <li><a href="#framework">Framework</a></li>
                    <li><a href="#architecture">Architecture</a></li>
                    <li><a href="#usecases">Workflows</a></li>
                    <li><a href="#governance">Governance</a></li>
                    <li><a href="#roi">ROI</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>

            {/* HERO SECTION - REFACTORED PHASED REVEAL */}
            {heroPhase < 4 ? (
                <section className="spa-hero spa-hero-intro">
                    <div className="spa-intro-container">
                        <div className={`spa-intro-line ${heroPhase >= 0 ? 'visible' : ''}`}>Problems do not appear suddenly.</div>
                        <div className={`spa-intro-line ${heroPhase >= 1 ? 'visible' : ''}`}>They grow quietly.</div>
                        <div className={`spa-intro-line ${heroPhase >= 2 ? 'visible' : ''} spa-ac`}>We make them visible.</div>
                    </div>
                </section>
            ) : (
                <section className="spa-hero spa-fade-transition">
                    <div className="spa-hero-pre">Architectural Briefing // Ver 1.5</div>
                    <h1 className="spa-fi vis">Problems do not appear suddenly.<br />They grow quietly.<br /><span className="spa-ac">We make them visible.</span></h1>
                    <h2 className="spa-fi vis" style={{ fontSize: '1.8rem', color: 'var(--white)', marginTop: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>Empowering Enterprises with <span className="spa-lc">Semantic Intelligence</span></h2>
                    <p className="spa-hero-desc spa-fi vis" style={{ marginTop: '0' }}>Moving from surveillance to signals with the JEET Framework.</p>
                    
                    <div className="mb-12 spa-fi vis">
                        <DynamicTagline className="text-xl" />
                    </div>

                    <div className="spa-hero-target spa-fi vis">
                        <span>CTO</span><span>CHRO</span><span>CIO</span>
                    </div>
                </section>
            )}

            {/* PROBLEM SECTION */}
            <section id="problem">
                <div className="spa-fi">
                    <span className="spa-sl">The $100B Problem</span>
                    <h2 className="spa-st">The Human <span className="spa-ac">Glue</span> Crisis</h2>
                    <p className="spa-ss">Enterprises have strong organs but no nervous system. Highly paid humans act as manual API connectors between siloed applications.</p>
                </div>

                <div className="spa-fi spa-cg">
                    <div className="spa-gl">
                        <h4 style={{ color: 'var(--orange)', marginBottom: '1rem' }}>Current State</h4>
                        <ul className="spa-cl">
                            <li><span className="spa-mk spa-mb">✗</span> Data entry bottlenecks between systems</li>
                            <li><span className="spa-mk spa-mb">✗</span> Siloed decisions — HR doesn't know Finance constraints</li>
                            <li><span className="spa-mk spa-mb">✗</span> Insights delayed by days of manual synthesis</li>
                            <li><span className="spa-mk spa-mb">✗</span> Strategic blindspots from fragmented data</li>
                            <li><span className="spa-mk spa-mb">✗</span> Delayed decisions waiting on human middleware</li>
                        </ul>
                    </div>
                    <div className="spa-ca">→</div>
                    <div className="spa-gl">
                        <h4 style={{ color: 'var(--cyan)', marginBottom: '1rem' }}>Pithonix State</h4>
                        <ul className="spa-cl">
                            <li><span className="spa-mk spa-mg">✓</span> Autonomous orchestration across all systems</li>
                            <li><span className="spa-mk spa-mg">✓</span> Cognitive synthesis — connected intelligence</li>
                            <li><span className="spa-mk spa-mg">✓</span> Proactive intelligence delivered in real-time</li>
                            <li><span className="spa-mk spa-mg">✓</span> Cross-functional visibility and pattern detection</li>
                            <li><span className="spa-mk spa-mg">✓</span> Decision-ready action maps, not dashboards</li>
                        </ul>
                    </div>
                </div>

                <div className="spa-fi spa-pg">
                    <div className="spa-gl sc">
                        <div className="spa-sn">₹2,00,000</div>
                        <div className="spa-slab">Average cost to replace a senior engineer</div>
                        <div className="spa-ssrc">Source: <a href="https://www.shrm.org/" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>SHRM, 2024</a></div>
                    </div>
                    <div className="spa-gl sc">
                        <div className="spa-sn">10×</div>
                        <div className="spa-slab">Cost of fixing at "Failure Stage" vs "Signal Stage"</div>
                        <div className="spa-ssrc">Source: <a href="https://www.gartner.com/en/research/methodologies/gartner-hype-cycle" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Gartner Research</a></div>
                    </div>
                    <div className="spa-gl sc">
                        <div className="spa-sn">15–20%</div>
                        <div className="spa-slab">Annual attrition rate in fast-growth IT/ITES</div>
                        <div className="spa-ssrc">Source: <a href="https://www2.deloitte.com/in/en/pages/human-capital/articles/talent-outlook-survey.html" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Deloitte India</a></div>
                    </div>
                </div>

                <div className="spa-fi spa-qb">
                    <blockquote className="spa-root">"For a 5,000-person organization with 15% attrition, you're replacing 750 people annually. At ₹2,00,000 per replacement, that's ₹15 Crores bleeding out every year."</blockquote>
                </div>
            </section>

            {/* I2I TRANSFORMATION */}
            <section>
                <div className="spa-fi">
                    <span className="spa-sl">The I2I Transformation</span>
                    <h2 className="spa-st">From <span className="spa-ac">Information</span> to Intelligence</h2>
                </div>
                <div className="spa-fi spa-pcg">
                    <div className="spa-gl spa-pc">
                        <h4 style={{ color: 'var(--silver-d)' }}>Information</h4>
                        <p className="spa-sl">What you have today</p>
                        <ul className="spa-cl">
                            <li><span className="spa-mk spa-mb">•</span> Raw data sitting in silos</li>
                            <li><span className="spa-mk spa-mb">•</span> Backward-looking reports and dashboards</li>
                            <li><span className="spa-mk spa-mb">•</span> Requires human interpretation</li>
                            <li><span className="spa-mk spa-mb">•</span> Shows symptoms, not root causes</li>
                        </ul>
                    </div>
                    <div className="spa-gl spa-pc" style={{ borderColor: 'rgba(102,252,241,.2)' }}>
                        <h4>Intelligence</h4>
                        <p className="spa-sl">What you'll have with JEET</p>
                        <ul className="spa-cl">
                            <li><span className="spa-mk spa-mg">✓</span> Connected insights across all systems</li>
                            <li><span className="spa-mk spa-mg">✓</span> Forward-looking predictions (2–3 months early)</li>
                            <li><span className="spa-mk spa-mg">✓</span> Automated analysis — no human glue</li>
                            <li><span className="spa-mk spa-mg">✓</span> Root causes with actionable intervention maps</li>
                        </ul>
                    </div>
                </div>
                <div className="spa-fi">
                    <div className="spa-ud" style={{ maxWidth: '700px', margin: '2rem auto', textAlign: 'center', padding: '1.2rem' }}>
                        Information: "Sarah quit today." → Intelligence: "Seismic activity detected 3 months ago: Manager left + Project cancelled + Calendar gaps. 80% attrition risk. Intervene now."
                    </div>
                </div>
            </section>

            {/* 3-LAYER FRAMEWORK */}
            <section id="framework">
                <div className="spa-fi">
                    <span className="spa-sl">Progressive Augmentation</span>
                    <h2 className="spa-st">The 3-Layer Path to <span className="spa-ac">Enterprise AI</span></h2>
                    <p className="spa-ss">Automate First, Intelligentise Second. A framework for successful enterprise AI adoption, moving from process chaos to AI reasoning.</p>
                </div>

                <div className="spa-ls">
                    <div className="spa-fi spa-gl spa-lc-card">
                        <div className="spa-lb spa-lb1">1</div>
                        <div>
                            <h3 className="spa-lt">Process Automation (n8n)</h3>
                            <p className="spa-ld">The foundation layer that converts manual workflows into reliable, machine-triggered, and logged events. Automate 3–4 high-volume workflows like HR onboarding or invoice processing.</p>
                            <div className="spa-ltl">Weeks 1–6 · Establish the Foundation</div>
                        </div>
                    </div>
                    <div className="spa-fi spa-gl spa-lc-card">
                        <div className="spa-lb spa-lb2">2</div>
                        <div>
                            <h3 className="spa-lt">Data Intelligence</h3>
                            <p className="spa-ld">A structured store that normalizes automation logs into queryable, time-stamped operational data. Build the knowledge base that makes patterns visible and queryable.</p>
                            <div className="spa-ltl">Weeks 7–8 · Build the Knowledge Base</div>
                        </div>
                    </div>
                    <div className="spa-fi spa-gl spa-lc-card">
                        <div className="spa-lb spa-lb3">3</div>
                        <div>
                            <h3 className="spa-lt">AI Reasoning (JEET / Claude)</h3>
                            <p className="spa-ld">The "brain" that uses clean Layer 2 data to perform complex judgment-based tasks. Deploy targeted AI skills that provide tangible ROI using actual enterprise data.</p>
                            <div className="spa-ltl">Week 12+ · Activate AI Reasoning</div>
                        </div>
                    </div>
                </div>

                {/* LOGIC COMPARE CARDS - Immediate visibility for restoration */}
                <div className="spa-logic-grid">
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

            {/* ARCHITECTURE SECTION */}
            <section id="architecture">
                <div className="spa-fi">
                    <span className="spa-sl">The JEET Framework</span>
                    <h2 className="spa-st">Layered <span className="spa-ac">Intelligence</span> Architecture</h2>
                    <p className="spa-ss">JEET deploys specialized agents across layers — from normalizing data to building context to delivering decision-ready action maps.</p>
                </div>

                <div className="spa-fi spa-al">
                    <div className="spa-gl spa-alc"><div className="spa-aln">0</div><h4>Orchestration & Governance</h4><div className="spa-am">The Air Traffic Controller</div><p>Routes data, logs decisions, enforces governance policies across the entire intelligence mesh.</p></div>
                    <div className="spa-gl spa-alc"><div className="spa-aln">1</div><h4>Data Intake & Normalization</h4><div className="spa-am">The Universal Adapter</div><p>Standardizes roles, aligns dates, and normalizes incoming data from Workday, SAP, Jira, and other sources.</p></div>
                    <div className="spa-gl spa-alc"><div className="spa-aln">2</div><h4>Context Aggregation</h4><div className="spa-am">The Puzzle Sorter</div><p>Groups data into "Role × Tenure" clusters. A firewall ensures no downstream agent sees individual data.</p></div>
                </div>

                {/* AGENTS */}
                <div className="spa-fi" style={{ marginTop: '3rem' }}>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '.5rem' }}>25 Specialized Intelligence Nodes</h3>
                    <p style={{ color: 'var(--silver-d)', fontSize: '.9rem', marginBottom: '2rem' }}>Specialized agents prevent hallucination by keeping scopes narrow and distinct.</p>

                    <div className="spa-at">
                        <div className="spa-atl spa-ts"><span className="spa-td"></span> Signal Extraction — Sensors</div>
                        {renderAgentGrid(sensors)}
                    </div>
                    <div className="spa-at">
                        <div className="spa-atl spa-tp"><span className="spa-td"></span> Analysis & Context — Processors</div>
                        {renderAgentGrid(processors)}
                    </div>
                    <div className="spa-at">
                        <div className="spa-atl spa-tdo"><span className="spa-td"></span> Action & Intervention — Doctors</div>
                        {renderAgentGrid(doctors)}
                    </div>
                </div>

                {/* PIPELINE */}
                <div className="spa-fi spa-g4" style={{ marginTop: '3rem' }}>
                    {pipe.map(p => (
                        <div key={p.s} className="spa-gl" style={{ padding: '1.5rem', textAlign: 'center' }}>
                            <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '2rem', color: 'var(--cyan)', opacity: '.3' }}>{p.s}</div>
                            <h4 style={{ fontSize: '1rem', margin: '.5rem 0 .3rem' }}>{p.t}</h4>
                            <p style={{ fontSize: '.8rem', color: 'var(--silver-d)' }}>{p.d}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* PRODUCT CENTRE - JEVA LIVE DEMO */}
            <section id="product-center" className="spa-fi">
                <span className="spa-sl">Product Centre // Intelligence Core</span>
                <h2 className="spa-st">JEVA <span className="spa-ac">Neural Mesh</span></h2>
                
                <div className="spa-gl spa-g2">
                    <div className="flex flex-col gap-6">
                        <p className="text-silver-d">JEVA is powered by a hybrid architecture: **Sarvam AI** for local phonetic intelligence and **Google Gemini** for reasoning. It manages intent, sentiment, and enterprise context in real-time.</p>
                        <div className="flex flex-wrap gap-2">
                            {["What is JEVA?", "Handle an objection", "ROI calculation", "Enterprise RAG"].map(q => (
                                <button key={q} onClick={() => handleSendMessage(q)} className="px-4 py-2 bg-glass border border-gb rounded-full text-xs text-cyan hover:bg-gbh transition-all">
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-char-l rounded-2xl border border-cyan-d overflow-hidden flex flex-col h-[500px]">
                        <div className="p-4 bg-cyan/5 border-bottom border-cyan/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-cyan flex items-center justify-center text-obs">🎙</div>
                                <div>
                                    <div className="text-xs font-bold text-white uppercase tracking-tighter">JEVA Core</div>
                                    <div className="text-[10px] text-cyan uppercase">{isPlaying ? 'Outputting Audio...' : 'Neural Ready'}</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-xl text-sm ${m.role === 'user' ? 'bg-char border border-gb text-silver' : 'bg-cyan/10 border border-cyan/20 text-white'}`}>
                                        {m.content}
                                        {m.role === 'jeva' && (
                                            <button
                                                onClick={() => speak(m.content)}
                                                disabled={isPlaying}
                                                className="mt-2 block text-[10px] text-cyan/60 hover:text-cyan disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                {isPlaying ? '⏳ Loading audio...' : '🔊 Hear Response'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isTyping && <div className="text-xs text-cyan/40 animate-pulse">JEVA is processing...</div>}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="p-4 border-t border-gb bg-obs flex gap-2">
                            <input
                                value={jevaInput}
                                onChange={e => setJevaInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Query the nervous system..."
                                className="flex-1 border border-gb rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan"
                                style={{ backgroundColor: '#f0f4f8', color: '#1a1a2e' }}
                            />
                            <button onClick={() => handleSendMessage()} className="bg-cyan text-obs p-2 rounded-lg hover:brightness-125 transition-all">
                                ➤
                            </button>
                        </div>
                    </div>
                </div>
            </section>
 
            {/* INTELLIGENCE WORKFLOWS - PRIORITY RESTORATION */}
            <section id="usecases">
                <div className="spa-fi vis">
                    <span className="spa-sl">Intelligence Workflows</span>
                    <h2 className="spa-st">What JEET <span className="spa-ac">Sees</span> That You Can't</h2>
                    <p className="spa-ss">Three workflows that demonstrate JEET's ability to detect, differentiate, and act on organizational signals — before they become crises.</p>
                </div>
                <div className="spa-ug">
                    <div className="spa-fi vis spa-gl spa-uc spa-uc1">
                        <div className="spa-ui">🌋</div>
                        <h4>The Exit Impact Engine</h4>
                        <p>When an employee resignation triggers in Workday, JEET simultaneously queries HR for role and tenure, Salesforce for client relationship risk, SAP for replacement cost, and Jira for project delay impact.</p>
                        <div className="spa-ud">Unified Impact Score: 85/100. Mitigation Plan auto-generated and sent to stakeholders across HR, Sales, Finance, and Project Management.</div>
                    </div>
                    <div className="spa-fi vis spa-gl spa-uc spa-uc2">
                        <div className="spa-ui">🔬</div>
                        <h4>Burnout vs. Disengagement</h4>
                        <p>JEET differentiates exhaustion from lack of motivation. Effort Intensity and Sentiment Shift agents feed into the Performance Pattern agent for classification.</p>
                        <div className="spa-ud">High Effort + Volatility = Burnout → Capacity Redesign. Low Effort + Flatness = Disengagement → Role Alignment. Right diagnosis, right intervention.</div>
                    </div>
                    <div className="spa-fi vis spa-gl spa-uc spa-uc3">
                        <div className="spa-ui">📐</div>
                        <h4>Skill Decay & Future-Role Fit</h4>
                        <p>JEET measures the velocity at which internal skill freshness diverges from external market demand speed. The growing gap triggers a re-skill vs. hire recommendation.</p>
                        <div className="spa-ud">The gap is quantified in real-time velocity, not static proficiency. Market Signal Agent tracks demand. Skill Usage Agent tracks internal freshness.</div>
                    </div>
                </div>

                <div className="spa-fi vis" style={{ marginTop: '5rem', textAlign: 'center' }}>
                    <p style={{ fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--silver)', opacity: '.7' }}>"Insights do not remove risk. They reduce surprise."</p>
                    <div style={{ fontStyle: 'italic', fontSize: '.75rem', color: 'var(--teal)', marginTop: '.5rem', opacity: '.8', letterSpacing: '2px', textTransform: 'uppercase' }}>— JEET Design Principle</div>
                </div>
            </section>

            {/* JEVA SCENARIOS - NARRATIVE CASE STUDIES */}
            <section id="scenarios">
                <div className="spa-fi vis">
                    <span className="spa-sl">JEVA in Action</span>
                    <h2 className="spa-st">Reasoning-First <span className="spa-ac">Narratives</span></h2>
                    <p className="spa-ss">Stories of operational leakage and the intelligent intervention of JEVA + GOT under the JEET Framework.</p>
                </div>

                <div className="spa-scenarios-grid">
                    {/* HEALTHCARE SCENARIO */}
                    <div className="spa-fi vis spa-scenario-card spa-scenario-h">
                        <div className="spa-scenario-meta">Healthcare // Hyderabad Hub</div>
                        <h3 className="spa-scenario-title">The Hospital That Was Losing Patients Before They Even Arrived</h3>
                        <div className="spa-story-body">
                            <p>Meet Dr. Ramesh. Chief Operating Officer at a 400-bed multi-specialty hospital in Hyderabad. Every month, his hospital spends <span className="math">₹8 lakhs</span> on ads. Those ads generate roughly <span className="math">1,200 enquiries</span> a month — people asking about knee replacement, cancer screening, or maternity packages.</p>
                            <p>Here's what actually happens: <strong>340</strong> come in after 6pm. <strong>280</strong> come in on weekends. Nobody calls back until Monday. Of the ones that do get called back, <strong>40%</strong> get a busy signal.</p>
                            <p>By the time a human from Dr. Ramesh's team has a meaningful conversation — that patient has already spoken to 2 other hospitals. One of them was faster. The patient booked there.</p>
                            <p><strong>Here is where JEVA + GOT changes everything:</strong></p>
                            <p>Before any call is made, GOT analyses the primary emotional state: <em>anxiety about outcomes, not price sensitivity.</em> JEVA calls within 3 minutes of the enquiry — at 11pm if needed. It doesn't open with a script. It opens with: <em>"I know waiting for a callback when you're in pain is really difficult. I wanted to reach you quickly."</em></p>
                            <div className="outcome">
                                <h5>JEVA Impact Score</h5>
                                <p>• 1,200 enquiries per month, all responded to within <strong>3 minutes, 24/7</strong><br />
                                • Conversion rate moves from <strong>12% toward 28-32%</strong><br />
                                • At ₹2.5 lakhs average procedure value — that's the difference between <strong>₹3.6 crore and ₹8 crore</strong> monthly revenue.<br />
                                • Zero additional agents hired.</p>
                            </div>
                        </div>
                    </div>

                    {/* GCC SCENARIO */}
                    <div className="spa-fi vis spa-scenario-card spa-scenario-g">
                        <div className="spa-scenario-meta">Recruitment // Pune GCC</div>
                        <h3 className="spa-scenario-title">The Centre That Was Interviewing Hundreds to Hire Twelve</h3>
                        <div className="spa-story-body">
                            <p>Meet Priya. Head of Talent Acquisition at a GCC in Pune. Her centre needs to hire 45 people this quarter. They receive <span className="math">800 applications</span>. With 3 recruiters, it takes <strong>33 working days</strong> just to screen everyone. More than 6 weeks.</p>
                            <p>By week 3, the best candidates — the ones who are performing well and casually exploring — have accepted offers elsewhere. Because another company moved in 5 days, not 33.</p>
                            <p><strong>Here is where JEVA + GOT changes everything:</strong></p>
                            <p>GOT analyses the candidate profile before the first word is spoken. It knows a senior data engineer's hidden concern: <em>"Am I walking into a team that maintains legacy code, or is there actual engineering scope?"</em></p>
                            <p>JEVA screens all 800 candidates in <strong>4 days</strong>, not 33. Every candidate gets a 12-minute personalized conversation. GOT then identifies who is actually motivated vs. who is just using the offer as a negotiation lever.</p>
                            <div className="outcome">
                                <h5>JEVA Impact Score</h5>
                                <p>• Time to shortlist drops from <strong>6 weeks to 4 days</strong><br />
                                • Offer acceptance rate improves as top talent is engaged instantly<br />
                                • Shortlist is not just technically screened, but <strong>psychologically profiled</strong>.</p>
                            </div>
                        </div>
                    </div>

                    {/* BFSI SCENARIO */}
                    <div className="spa-fi vis spa-scenario-card spa-scenario-b">
                        <div className="spa-scenario-meta">Finance // Chennai NBFC</div>
                        <h3 className="spa-scenario-title">The Loan Officer Who Was Always a Day Too Late</h3>
                        <div className="spa-story-body">
                            <p>Meet Arvind. Regional Sales Manager at an NBFC in Chennai. His loan officers start Monday with <strong>70 leads</strong>. By Friday, they've spoken to 25. The remaining 45? A competitor's DSA called them Monday afternoon. Arvind's conversion rate is <strong>6.8%</strong>. Industry average is 14-18%.</p>
                            <p><strong>Here is where JEVA + GOT changes everything:</strong></p>
                            <p>JEVA calls within 4 minutes. GOT reasons that for a Sunday-night enquiry, timing and fear of rejection are the blockers, not interest rates. JEVA opens with: <em>"Before we talk about rates, let me show you the simplest way to know in 5 minutes whether you'd qualify."</em></p>
                            <p>GOT also flags what NOT to do: <em>"Do not push for documentation yet. The goal is trust, not paperwork."</em></p>
                            <div className="outcome">
                                <h5>JEVA Impact Score</h5>
                                <p>• Every lead gets a first call within <strong>4 minutes, 24/7</strong><br />
                                • conversion moves from <strong>6.8% toward 14-16%</strong><br />
                                • Doubling conversion <strong>doubles revenue</strong> without adding headcount.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="spa-fi vis spa-sb" style={{ marginTop: '4rem', background: 'rgba(102,252,241,.03)', border: '1px solid var(--gb)' }}>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Design Partner Call</h4>
                    <p style={{ color: 'var(--silver)', marginBottom: '1.5rem' }}>If you lead a team in Healthcare, GCC, or BFSI and these stories feel familiar — I'm looking for <strong>3 design partners</strong> to build this specifically for your environment. This is a framework looking for the right problems to solve.</p>
                    <a href="https://jeva.pithonix.ai" className="spa-btn spa-btn-cyan">Connect to JEVA Neural Mesh →</a>
                </div>
            </section>

            {/* PROTOCOL */}
            <section>
                <div className="spa-fi">
                    <span className="spa-sl">Protocol Strategy</span>
                    <h2 className="spa-st">Vertical Tools vs. <span className="spa-ac">Horizontal Brains</span></h2>
                </div>
                <div className="spa-fi spa-pcg">
                    <div className="spa-gl spa-pc">
                        <h4>Vertical Integration</h4>
                        <p className="spa-sl">Protocol: MCP (Model Context Protocol)</p>
                        <div className="spa-pm">"The USB-C for AI" — Standardizes how AI connects to databases, GitHub, Jira, and enterprise tools.</div>
                        <p className="spa-pd">The Mechanic. Structured, precise execution. MCP provides the hands — connecting siloed applications through a universal adapter protocol.</p>
                    </div>
                    <div className="spa-gl spa-pc">
                        <h4>Horizontal Integration</h4>
                        <p className="spa-sl">Protocol: A2A (Agent-to-Agent)</p>
                        <div className="spa-pm">The Collaboration Layer — Orchestrates complex, multi-turn workflows and negotiations between agents.</div>
                        <p className="spa-pd">The Manager. Conversational, fuzzy logic. A2A provides the brains — enabling context-aware agents to coordinate across organizational boundaries.</p>
                    </div>
                </div>
            </section>

            {/* GOVERNANCE */}
            <section id="governance">
                <div className="spa-fi">
                    <span className="spa-sl">Governance & Trust</span>
                    <h2 className="spa-st">The <span className="spa-ac">'India-First'</span> Stress Test</h2>
                    <p className="spa-ss">Built for the most scrutinized enterprise environments. Three pillars ensure JEET earns trust before it earns data.</p>
                </div>
                <div className="spa-fi spa-gp">
                    <div className="spa-gl spa-gpc"><div className="spa-gpi">🚫</div><h4>No Surveillance</h4><p>Intelligence derived from Aggregated Contexts (Role × Tenure), not personal monitoring.</p><div className="spa-gpd">Aggregation Level: Role × Tenure Only</div></div>
                    <div className="spa-gl spa-gpc"><div className="spa-gpi">📊</div><h4>No Performance Ratings</h4><p>Measurement of "Productivity Baselines" and "Variance", not individual appraisals.</p><div className="spa-gpd">Metric Type: Baseline & Variance (System-Wide)</div></div>
                    <div className="spa-gl spa-gpc"><div className="spa-gpi">🔒</div><h4>Data Minimization</h4><p>Tiered Access Control. Tier 1 (Structure) → Tier 2 (Engagement) → Tier 3 (Sentiment).</p><div className="spa-gpd">Access Model: Tiered</div></div>
                </div>
                <div className="spa-fi spa-sb"><h5>Human-in-the-Loop</h5><p>No auto-firing. Critical actions require manual approval. JEET recommends — humans decide.</p></div>

                <div className="spa-fi spa-gl" style={{ marginTop: '3rem', padding: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Enterprise RAG: Preventing Hallucination via Logic Gates</h3>
                    <div className="spa-g4">
                        {ragGates.map(r => (
                            <div key={r.t} style={{ padding: '.5rem 0' }}>
                                <h5 style={{ fontSize: '.85rem', color: 'var(--white)', marginBottom: '.3rem' }}>{r.t}</h5>
                                <p style={{ fontSize: '.78rem', color: 'var(--silver-d)' }}>{r.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BOT MODEL */}
            <section>
                <div className="spa-fi">
                    <span className="spa-sl">Execution Model</span>
                    <h2 className="spa-st">Build — Operate — <span className="spa-ac">Transfer</span></h2>
                    <p className="spa-ss">A structured phased approach ensures value realization before full ownership transfer, de-risking the implementation.</p>
                </div>
                <div className="spa-fi spa-bt">
                    <div className="spa-gl spa-bp"><div className="spa-bph">Phase 1 · Month 0–6</div><h4>Prove the Value</h4><ul><li>MCP Connectors (Workday / Jira)</li><li>Exit Impact Agent deployment</li></ul><div className="spa-bo">Prevent One Major Surprise Exit</div></div>
                    <div className="spa-gl spa-bp"><div className="spa-bph">Phase 2 · Month 6–12</div><h4>Expand the Mesh</h4><ul><li>A2A Orchestration enabled</li><li>Compliance Agents activated</li></ul><div className="spa-bo">Automated Regulatory Compliance</div></div>
                    <div className="spa-gl spa-bp"><div className="spa-bph">Phase 3 · Month 12–18+</div><h4>Scale & Transfer</h4><ul><li>Full Pithonix Transfer</li><li>Advanced L&D Ecosystem</li></ul><div className="spa-bo">Client Operates Independently</div></div>
                </div>
            </section>

            {/* ROI */}
            <section id="roi">
                {(() => {
                    const resignationsAtRisk = Math.round(headcount * (attritionRate / 100));
                    const valueHC = resignationsAtRisk * 2400000;
                    const valueComp = headcount * 4800;
                    const valueVel = headcount * 18080;
                    const totalValue = valueHC + valueComp + valueVel;
                    const dynamicLicense = Math.max(2000000, totalValue * 0.05); 
                    const roiMultiplier = (totalValue / dynamicLicense).toFixed(1);
                    
                    return (
                        <>
                            <div className="spa-fi vis">
                                <span className="spa-sl">Business Value</span>
                                <h2 className="spa-st">The ROI <span className="spa-ac">Calculator</span></h2>
                                <p className="spa-ss">Adjust your organization's parameters below to see the projected impact of JEET.</p>
                            </div>

                            {/* CONTROLS */}
                            <div className="spa-fi vis spa-gl" style={{ marginBottom: '3rem', padding: '2rem', background: 'rgba(102,252,241,.03)', display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', border: '1px solid var(--gb)' }}>
                                <div style={{ flex: 1, minWidth: '250px' }}>
                                    <div className="flex justify-between mb-3">
                                        <span className="spa-sl" style={{ marginBottom: 0 }}>Organization Size</span>
                                        <span className="text-cyan font-mono" style={{ fontSize: '1.1rem' }}>{headcount.toLocaleString()} Employees</span>
                                    </div>
                                    <input type="range" min="500" max="10000" step="100" value={headcount} onChange={(e) => setHeadcount(Number(e.target.value))} style={{ width: '100%', height: '4px', cursor: 'pointer' }} />
                                </div>
                                <div style={{ flex: 1, minWidth: '250px' }}>
                                    <div className="flex justify-between mb-3">
                                        <span className="spa-sl" style={{ marginBottom: 0 }}>At-Risk Attrition</span>
                                        <span className="text-cyan font-mono" style={{ fontSize: '1.1rem' }}>{attritionRate}%</span>
                                    </div>
                                    <input type="range" min="2" max="15" step="0.5" value={attritionRate} onChange={(e) => setAttritionRate(Number(e.target.value))} style={{ width: '100%', height: '4px', cursor: 'pointer' }} />
                                </div>
                                <div style={{ display: 'flex', background: 'rgba(0,0,0,.3)', padding: '4px', borderRadius: '8px', border: '1px solid var(--gb)' }}>
                                    <button onClick={() => setCurrency('INR')} style={{ padding: '8px 20px', borderRadius: '6px', fontSize: '.9rem', fontWeight: 600, transition: 'all .3s', background: currency === 'INR' ? 'var(--cyan)' : 'transparent', color: currency === 'INR' ? 'var(--obs)' : 'var(--silver)' }}>₹ INR</button>
                                    <button onClick={() => setCurrency('USD')} style={{ padding: '8px 20px', borderRadius: '6px', fontSize: '.9rem', fontWeight: 600, transition: 'all .3s', background: currency === 'USD' ? 'var(--cyan)' : 'transparent', color: currency === 'USD' ? 'var(--obs)' : 'var(--silver)' }}>$ USD</button>
                                </div>
                            </div>

                            <div className="spa-fi vis spa-rh" style={{ marginBottom: '3rem' }}>
                                <div className="spa-rn">{roiMultiplier}×</div>
                                <div className="spa-rl">Projected Annual ROI</div>
                                <p style={{ color: 'var(--silver-d)', fontSize: '.9rem', marginTop: '.8rem', fontStyle: 'italic' }}>*Based on addressing ~{resignationsAtRisk} critical signals via JEET Intelligence Workflows.</p>
                            </div>

                            <div className="spa-fi vis spa-gl" style={{ padding: '2.5rem', borderRadius: '16px' }}>
                                <table className="spa-rt">
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: 'left' }}>Category</th>
                                            <th style={{ textAlign: 'left' }}>Impact & Action</th>
                                            <th style={{ textAlign: 'right' }}>Annual Value ({currency})</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ fontWeight: 600, color: 'var(--white)' }}>Human Capital</td>
                                            <td style={{ color: 'var(--silver)' }}>Predictive Retention: Addressing ~{resignationsAtRisk} key resignations</td>
                                            <td className="spa-rv" style={{ textAlign: 'right', fontWeight: 700 }}>+ {formatCurrency(valueHC)}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: 600, color: 'var(--white)' }}>Compliance</td>
                                            <td style={{ color: 'var(--silver)' }}>Data Integrity: Mitigating leakage via governance agents</td>
                                            <td className="spa-rv" style={{ textAlign: 'right', fontWeight: 700 }}>+ {formatCurrency(valueComp)}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: 600, color: 'var(--white)' }}>Velocity</td>
                                            <td style={{ color: 'var(--silver)' }}>Operational Efficiency: {headcount.toLocaleString()} automated agents</td>
                                            <td className="spa-rv" style={{ textAlign: 'right', fontWeight: 700 }}>+ {formatCurrency(valueVel)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                
                                <div style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid var(--gb)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
                                    <div>
                                        <div className="spa-rtl" style={{ fontSize: '1rem', marginBottom: '.5rem', opacity: .8 }}>Total Annual Value Delivered</div>
                                        <div className="spa-rtv" style={{ fontSize: '2.4rem', color: 'var(--cyan)', textShadow: '0 0 20px rgba(102,252,241,.3)' }}>{formatCurrency(totalValue)}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div className="spa-rtl" style={{ color: 'var(--teal)', fontSize: '1rem', marginBottom: '.5rem' }}>Dynamic License (Success Fee)</div>
                                        <div className="spa-rtv" style={{ fontSize: '1.6rem', color: 'var(--white)', opacity: .9 }}>{formatCurrency(dynamicLicense)}</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                })()}
            </section>

            {/* TECH STACK */}
            <section>
                <div className="spa-fi">
                    <span className="spa-sl">Technical Specifications</span>
                    <h2 className="spa-st">The <span className="spa-ac">Stack</span></h2>
                </div>
                <div className="spa-fi spa-sg">
                    <div className="spa-gl spa-skc"><h4>Infrastructure</h4>
                        <div className="spa-si"><span className="spa-sic">⚙</span><div className="spa-sid"><strong>Orchestration:</strong> LangChain / LangGraph</div></div>
                        <div className="spa-si"><span className="sic">⚙</span><div className="spa-sid"><strong>Database:</strong> Serverless Postgres + pgvector</div></div>
                    </div>
                    <div className="spa-gl spa-skc"><h4>Models & Protocols</h4>
                        <div className="spa-si"><span className="spa-sic">🧠</span><div className="spa-sid"><strong>LLMs:</strong> OpenAI GPT-4 / Anthropic Claude</div></div>
                        <div className="spa-si"><span className="spa-sic">🧠</span><div className="spa-sid"><strong>Protocols:</strong> MCP + A2A</div></div>
                    </div>
                    <div className="spa-gl spa-skc"><h4>Security</h4>
                        <div className="spa-si"><span className="spa-sic">🔐</span><div className="spa-sid"><strong>Encryption:</strong> Field-level AES-256</div></div>
                        <div className="spa-si"><span className="spa-sic">🔐</span><div className="spa-sid"><strong>Access:</strong> RBAC / Tiered IAM</div></div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer id="contact" className="spa-foot">
                <div className="spa-nav-logo spa-foot-logo justify-center">
                    <PithonixLogo size={50} />
                </div>
                <div className="spa-foot-links flex items-center justify-center gap-8 mb-8">
                    <a href="https://x.com/Pithonix_ai" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-silver hover:text-cyan transition-colors">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/>
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/company/pithonix-ai/" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-silver hover:text-cyan transition-colors">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
                        </svg>
                    </a>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="hover:scale-110 transition-transform">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-silver hover:text-cyan transition-colors">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                        </svg>
                    </a>
                </div>
                <p className="text-[10px] text-silver-d uppercase tracking-[4px]">
                    {COMPANY_INFO.name} · Hyderabad, India
                </p>
            </footer>
        </div>
    );
};

export default BriefingSPA;

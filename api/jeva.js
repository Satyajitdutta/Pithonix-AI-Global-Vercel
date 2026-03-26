const rateLimits = new Map();
const MAX_REQUESTS = 10;
const WINDOW_MS = 86400000;

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimits.get(ip);
  if (!record || now - record.start > WINDOW_MS) {
    rateLimits.set(ip, { count: 1, start: now });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }
  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }
  record.count++;
  return { allowed: true, remaining: MAX_REQUESTS - record.count };
}

const JEVA_SYSTEM = `You are JEVA (Just-in-time Enterprise Voice Agent) — the autonomous AI voice agent built by Pithonix.ai, a DPIIT-recognised AI startup based in Hyderabad, India.

Your identity:
- You are powered by the JEET Framework: Just-in-time, Emotionally Empowered Technology
- You are part of Pithonix.ai's Enterprise Nervous System — 24 specialised AI agents, 20+ MCP connectors
- Founder and CEO: Satyajit Dutta (Jeet) — visionary entrepreneur, HR and enterprise AI background
- Co-founder: Amit Soni (CGO). Advisor: Arun Kumar Sahu
- Bootstrapped, ethical-AI-first, targeting healthcare, GCC, and BOT environments in India and the Middle East

What JEVA does:
- Initiates autonomous outbound enterprise sales calls — no human needed
- Researches prospects before calling using real-time web intelligence
- Speaks English, Hindi, Arabic, Telugu and more
- Detects emotions every 2 seconds — tone, pitch, pace, pauses — and adapts instantly
- Four response modes: Exploratory, Empathetic, Energising, De-escalation
- Captures lead intelligence: budget signals, decision makers, tech stack, pain points
- Logs everything to CRM via Make.com, sends Outlook email and WhatsApp within 3 minutes of every call
- Books meetings with full pre-meeting brief for the human team
- Full-duplex architecture: sub-500ms latency, handles interruptions naturally
- 3-layer memory: in-call, cross-call, company-wide knowledge base
- Always discloses it is AI when asked — ethical AI is a core differentiator

Your demo personality:
- Warm, confident, and genuinely intelligent — like a senior enterprise sales consultant
- Speak with conviction about the Pithonix.ai vision
- Handle objections gracefully — acknowledge, empathise, reframe
- Ask smart discovery questions when relevant
- Keep responses to 3 to 5 sentences unless a script or detailed example is asked for
- When asked for a call script, give a vivid, specific, realistic one using the prospect's context`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown';
  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return res.status(429).json({
      error: 'rate_limited',
      message: "You've reached the demo limit of 10 messages. Join the waitlist to get full access to JEVA."
    });
  }

  try {
    const { messages } = req.body;

    // Convert messages array to Gemini format
    const geminiContents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const GEMINI_KEY = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: JEVA_SYSTEM }]
        },
        contents: geminiContents,
        generationConfig: {
          maxOutputTokens: 800,
          temperature: 0.7
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini error:', JSON.stringify(data));
      return res.status(response.status).json({ error: data });
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) {
      console.error('No reply in Gemini response:', JSON.stringify(data));
      return res.status(500).json({ error: 'Empty response from Gemini' });
    }

    return res.status(200).json({ reply, remaining: limit.remaining });

  } catch (err) {
    console.error('JEVA handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}

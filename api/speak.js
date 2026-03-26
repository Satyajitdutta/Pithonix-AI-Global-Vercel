export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'No text' });

    const cleanText = text
      .replace(/[*#_`•]/g, '')
      // Fix pronunciation: JEVA → Jay-va, Pithonix → Pi-tho-nix
      .replace(/\bJEVA\b/g, 'Jay-va')
      .replace(/\bPithonix\b/gi, 'Pi-tho-nix')
      .replace(/\bJEET\b/g, 'Jeet')
      .slice(0, 500);

    const response = await fetch('https://api.sarvam.ai/text-to-speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-subscription-key': process.env.SARVAM_API_KEY || process.env.VITE_SARVAM_KEY
      },
      body: JSON.stringify({
        text: cleanText,
        target_language_code: 'en-IN',
        speaker: 'ishita',
        model: 'bulbul:v3',
        pace: 0.9,
        temperature: 0.4,
        speech_sample_rate: 24000
      })
    });

    const raw = await response.text();
    console.log('SARVAM_STATUS:', response.status);

    let data;
    try { data = JSON.parse(raw); }
    catch(e) { return res.status(500).json({ error: 'Bad JSON', raw }); }

    if (!response.ok) return res.status(response.status).json({ error: data });

    const audio = data?.audios?.[0];
    if (!audio) return res.status(500).json({ error: 'No audio', data });

    return res.status(200).json({ audio, format: 'wav' });

  } catch (err) {
    console.error('ERROR:', err.message);
    return res.status(500).json({ error: err.message });
  }
}

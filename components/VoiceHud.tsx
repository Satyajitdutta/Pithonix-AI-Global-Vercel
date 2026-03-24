import React, { useState, useEffect, useCallback, useRef } from 'react';
import { COMPANY_INFO, JEET_AGENTS } from '../constants';

interface VoiceHudProps {
    onOpenBooking: () => void;
}

const VoiceHud: React.FC<VoiceHudProps> = ({ onOpenBooking }) => {
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [status, setStatus] = useState("Nexus Core | Offline");

    const isSessionActiveRef = useRef(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const lastSpokenRef = useRef<string>("");
    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

    // --- SARVAM AI HELPERS ---

    const fetchSarvamTTS = async (text: string) => {
        try {
            const response = await fetch('https://api.sarvam.ai/text-to-speech', {
                method: 'POST',
                headers: {
                    'api-subscription-key': COMPANY_INFO.sarvamKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text,
                    target_language_code: "en-IN",
                    speaker: COMPANY_INFO.sarvamVoice || "ritu",
                    model: "bulbul:v3"
                })
            });
            if (!response.ok) {
                setStatus("Nexus Core | Config Error");
                return null;
            }
            const data = await response.json();
            if (data.audio_content) {
                // Convert base64 to ArrayBuffer for AudioContext
                const binary = window.atob(data.audio_content);
                const buffer = new ArrayBuffer(binary.length);
                const view = new Uint8Array(buffer);
                for (let i = 0; i < binary.length; i++) view[i] = binary.charCodeAt(i);

                // Return original base64 to try multiple playback methods
                return data.audio_content;
            }
        } catch (error) {
            console.error("Sarvam TTS Error:", error);
        }
        return null;
    };

    const fetchSarvamSTT = async (audioBlob: Blob) => {
        try {
            const formData = new FormData();
            formData.append('file', audioBlob, 'recording.wav');
            formData.append('language_code', 'en-IN');
            formData.append('model', 'saaras:v1');

            const response = await fetch('https://api.sarvam.ai/speech-to-text', {
                method: 'POST',
                headers: {
                    'api-subscription-key': COMPANY_INFO.sarvamKey
                },
                body: formData
            });
            const data = await response.json();
            return data.transcript || "";
        } catch (error) {
            console.error("Sarvam STT Error:", error);
        }
        return "";
    };

    // --- CORE LOGIC ---

    const stopListening = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
            setIsListening(false);
        }
    };

    const startListening = async () => {
        if (isSpeaking) return;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                setStatus("Nexus Core | Decoding...");
                const text = await fetchSarvamSTT(audioBlob);
                if (text && text.trim().length > 1) {
                    setTranscript(text);
                    handleCommand(text);
                } else if (isSessionActiveRef.current) {
                    setStatus("Nexus Core | Standing by...");
                    setTimeout(() => {
                        if (isSessionActiveRef.current && !isSpeaking) startListening();
                    }, 1000);
                }
            };

            mediaRecorder.start();
            setIsListening(true);
            setStatus("Nexus Core | Listening...");
        } catch (err) {
            console.error("Mic Access Error:", err);
            setStatus("Nexus Core | Mic Error");
        }
    };

    const speak = useCallback(async (text: string, callback?: () => void) => {
        stopListening();
        lastSpokenRef.current = text;
        setIsSpeaking(true);
        setStatus("Nexus Core | Synthesizing...");

        const base64Audio = await fetchSarvamTTS(text);
        if (base64Audio) {
            try {
                // Method 1: AudioContext Decoding (High Reliability)
                const binary = window.atob(base64Audio);
                const buffer = new ArrayBuffer(binary.length);
                const view = new Uint8Array(buffer);
                for (let i = 0; i < binary.length; i++) view[i] = binary.charCodeAt(i);

                const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                if (audioCtx.state === 'suspended') {
                    console.log("Nexus Core: AudioContext suspended, resuming...");
                    await audioCtx.resume();
                }

                const audioBuffer = await audioCtx.decodeAudioData(buffer);

                const source = audioCtx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioCtx.destination);

                setStatus("Nexus Core | Transmitting...");
                source.onended = () => {
                    setIsSpeaking(false);
                    if (callback) {
                        callback();
                        isSessionActiveRef.current = false;
                    } else if (isSessionActiveRef.current) {
                        startListening();
                    } else {
                        setStatus("Nexus Core | Idle");
                    }
                };
                source.start(0);
            } catch (playError) {
                console.error("AudioContext failed, trying fallback:", playError);
                // Method 2: Fallback to simple Audio element with Data URI
                const isWav = base64Audio.startsWith("UklGR");
                const audio = new Audio(`data:audio/${isWav ? 'wav' : 'mpeg'};base64,${base64Audio}`);
                audio.onplay = () => setStatus("Nexus Core | Transmitting...");
                audio.onended = () => {
                    setIsSpeaking(false);
                    if (callback) {
                        callback();
                        isSessionActiveRef.current = false;
                    } else if (isSessionActiveRef.current) {
                        startListening();
                    } else {
                        setStatus("Nexus Core | Idle");
                    }
                };
                audio.onerror = () => {
                    setIsSpeaking(false);
                    setStatus("Nexus Core | Offline");
                    if (isSessionActiveRef.current) startListening();
                };
                audio.play().catch(() => {
                    setIsSpeaking(false);
                    setStatus("Nexus Core | Error");
                    if (isSessionActiveRef.current) startListening();
                });
            }
        } else {
            setIsSpeaking(false);
            setStatus("Nexus Core | Error");
            if (isSessionActiveRef.current) startListening();
        }
    }, [onOpenBooking]);

    const processQueryLocal = (userQuery: string) => {
        setStatus("Nexus Core | Computing...");
        const lowerQuery = userQuery.toLowerCase().trim();
        let spokenText = "";
        let action = "NONE";

        // --- Intelligence Repository (High Fidelity Responses) ---
        if (lowerQuery.match(/(attrition|turnover|leaving|quit|retention|retain)/i)) {
            spokenText = "Attrition is a leading indicator of organizational friction. I see high volatility in current models. Our Stability Signal Agent detects these shifts months in advance by analyzing role changes and engagement deltas. We provide you with the exact risk hierarchy.";
        }
        else if (lowerQuery.match(/(burnout|stress|tired|exhaustion|health|wellness)/i)) {
            spokenText = "Using the J E E T framework, I distinguish between Burnout and Disengagement. Burnout is high effort with high volatility. Disengagement is low effort with flatness. We isolate these signals through metadata, ensuring privacy while delivering precise fatigue alerts.";
        }
        else if (lowerQuery.match(/(leadership|manager|management|boss|leader|supervisor)/i)) {
            spokenText = "I isolate Manager Impact Factor from systemic org friction. We can determine if a team is struggling due to specific leadership gaps or external resource constraints. This allows for surgical intervention rather than sweeping policy changes.";
        }
        else if (lowerQuery.match(/(silo|collaboration|communication|cross-functional|connect|teamwork)/i)) {
            spokenText = "Org charts are static, but information is dynamic. I use Network Analysis to map how value actually flows through your company. I identify broken bridges and isolated silos that are currently slowing your innovation velocity.";
        }
        else if (lowerQuery.match(/(productivity|performance|efficiency|output|slow|speed)/i)) {
            spokenText = "Traditional productivity tracking is flawed. We measure Outcome Velocity—the speed of value delivery against quality benchmarks—ignoring hours worked.";
        }
        else if (lowerQuery.match(/(location|where|office|headquarters)/i)) {
            spokenText = `We are headquartered in ${COMPANY_INFO.location}. However, our intelligence nexus is distributed globally across digital infrastructures.`;
        }
        else if (lowerQuery.match(/^(hello|hi|hey|greetings|nexus|how are you)/i)) {
            spokenText = "Nexus Core online. I am connected to the Pithonix Semantic Intelligence layer via Sarvam A I. I am ready to analyze your organizational signals. What challenge shall we solve today?";
        }
        else if (lowerQuery.match(/(join|sign|book|schedule|contact|list|meeting|call)/i)) {
            spokenText = "Understood. Accessing secure lead protocols. Opening the intellectual list interface for your confirmation.";
            action = "BOOK_CALL";
        }
        else {
            spokenText = "That touches on complex organizational variables. I am analyzing the semantic overlap now. For a precise diagnostic, I recommend viewing our competencies or joining the intellectual list.";
        }

        if (action === "BOOK_CALL") {
            speak(spokenText, onOpenBooking);
        } else {
            speak(spokenText);
        }
    };

    const handleCommand = useCallback((command: string) => {
        if (!command || command.trim().length < 2) {
            if (isSessionActiveRef.current) startListening();
            return;
        }

        const lowerCmd = command.toLowerCase().trim();
        if (lowerCmd.match(/stop|quiet|cancel|shh|goodbye|terminate|exit/)) {
            speak("Session terminated. Nexus Core entering idle mode.");
            isSessionActiveRef.current = false;
            return;
        }

        processQueryLocal(command);
    }, [speak, onOpenBooking]);

    const toggleInteraction = () => {
        // --- AUDIO UNLOCK (CRITICAL FOR AUTOPLAY) ---
        // Playing a silent sound immediately in the click handler context
        // allows subsequent async audio.play() calls to work.
        const unlockAudio = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFRm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAA+v/6v8=");
        unlockAudio.volume = 0.1;
        unlockAudio.play().catch(e => console.log("Unlock failed:", e));

        if (isSessionActiveRef.current) {
            isSessionActiveRef.current = false;
            stopListening();
            if (audioPlayerRef.current) {
                audioPlayerRef.current.pause();
                audioPlayerRef.current = null;
            }
            setStatus("Nexus Core | Paused");
        } else {
            isSessionActiveRef.current = true;

            // Initiation sound effect (Digital beep)
            const beep = new Audio("data:audio/wav;base64,UklGRl9vT1ReadyAAAABmQAFAAAABWAAQACABAAZGF0YQAAAADv/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+++++");
            beep.volume = 0.3;
            beep.play().catch(() => { });

            // Welcome sequence with explicit logic check
            const welcomeText = "Nexus Core initialized. I am your interface to Pithonix Semantic Intelligence. How may I assist your organizational strategy today?";
            console.log("Nexus Core: Initiating Welcome Sequence...");
            speak(welcomeText);
        }
    };

    // --- EVENT LISTENERS ---
    useEffect(() => {
        const handleActivate = () => {
            if (!isSessionActiveRef.current) {
                // Ensure the container is visible first
                const container = document.getElementById('nexus-core-container');
                if (container) {
                    container.scrollIntoView({ behavior: 'smooth' });
                    // Small delay to ensure scroll starts before interaction
                    setTimeout(toggleInteraction, 300);
                }
            }
        };
        window.addEventListener('nexus-activate', handleActivate);
        return () => window.removeEventListener('nexus-activate', handleActivate);
    }, []);

    const isIdle = !isListening && !isSpeaking && !transcript && !isSessionActiveRef.current;

    return (
        <div id="nexus-core-container" className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
            <div className={`transition-all duration-500 ease-out transform ${true ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {isIdle ? (
                    <div className="glass-panel px-4 py-2 rounded-xl text-right bg-obsidian/80 border border-cyan/30 shadow-[0_0_15px_rgba(102,252,241,0.1)] mb-2 animate-bounce cursor-pointer" onClick={toggleInteraction}>
                        <p className="text-xs font-bold text-cyan">
                            Tap to engage Nexus Core
                        </p>
                    </div>
                ) : (
                    <div className="glass-panel px-6 py-3 rounded-tr-xl rounded-tl-xl rounded-bl-xl text-right max-w-xs bg-obsidian/90 mb-2">
                        <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${isListening ? 'text-cyan animate-pulse' : 'text-teal'}`}>
                            {status}
                        </p>
                        {transcript && !isSpeaking && !isListening && <p className="text-silver text-sm italic mb-1">"{transcript}"</p>}
                    </div>
                )}
            </div>

            <button
                onClick={toggleInteraction}
                className={`relative group w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 border ${isSpeaking
                    ? 'bg-red-900/50 border-red-500 animate-pulse'
                    : isListening
                        ? 'bg-cyan border-cyan shadow-[0_0_30px_#66fcf1]'
                        : 'bg-charcoal hover:bg-obsidian border-cyan hover:shadow-[0_0_20px_#66fcf1]'
                    }`}
            >
                {isListening && (
                    <span className="absolute inset-0 rounded-full bg-cyan opacity-30 animate-ping"></span>
                )}

                {isSessionActiveRef.current ? (
                    isListening ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-obsidian" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-cyan group-hover:text-white transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default VoiceHud;
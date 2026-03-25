import React from 'react';

const CircuitBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 select-none">
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="xMidYMid slice"
                className="w-full h-full"
            >
                <defs>
                    <linearGradient id="pulse-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="#66fcf1" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>

                {/* Circuit Traces - Background Grid */}
                <g stroke="#45a29e" strokeWidth="0.5" fill="none" className="opacity-20">
                    <path d="M 0 50 H 1000 M 0 150 H 1000 M 0 250 H 1000 M 0 350 H 1000 M 0 450 H 1000 M 0 550 H 1000 M 0 650 H 1000 M 0 750 H 1000 M 0 850 H 1000 M 0 950 H 1000" />
                    <path d="M 50 0 V 1000 M 150 0 V 1000 M 250 0 V 1000 M 350 0 V 1000 M 450 0 V 1000 M 550 0 V 1000 M 650 0 V 1000 M 750 0 V 1000 M 850 0 V 1000 M 950 0 V 1000" />
                </g>

                {/* Primary Traces */}
                <g stroke="#66fcf1" strokeWidth="1" fill="none" className="opacity-10">
                    <path d="M 100 100 H 900 V 900 H 100 Z" />
                    <path d="M 200 200 H 800 V 800 H 200 Z" />
                    <path d="M 300 300 H 700 V 700 H 300 Z" />
                    <path d="M 400 400 H 600 V 600 H 400 Z" />
                </g>

                {/* Flowing Pulses - High Visibility */}
                <g className="circuit-pulses">
                    {/* Multi-directional flows */}
                    <path d="M 0 100 H 1000" className="animate-circuit-flow-1" stroke="#66fcf1" strokeWidth="2" strokeDasharray="150 850" />
                    <path d="M 1000 300 H 0" className="animate-circuit-flow-reverse" stroke="#66fcf1" strokeWidth="2" strokeDasharray="200 800" />
                    <path d="M 500 0 V 1000" className="animate-circuit-flow-2" stroke="#66fcf1" strokeWidth="2" strokeDasharray="120 880" />
                    <path d="M 800 1000 V 0" className="animate-circuit-flow-reverse" stroke="#66fcf1" strokeWidth="2" strokeDasharray="180 820" />

                    {/* Diagonal Pulse */}
                    <path d="M 100 100 L 900 900" className="animate-circuit-flow-3" stroke="#66fcf1" strokeWidth="2" strokeDasharray="100 900" />
                    <path d="M 900 100 L 100 900" className="animate-circuit-flow-3" stroke="#66fcf1" strokeWidth="2" strokeDasharray="100 900" />
                </g>

                {/* Pulsing Nodes */}
                <g fill="#66fcf1">
                    {[100, 300, 500, 700, 900].map(x =>
                        [100, 300, 500, 700, 900].map(y => (
                            <circle key={`${x}-${y}`} cx={x} cy={y} r="2" className="animate-pulse" />
                        ))
                    )}
                </g>
            </svg>
        </div>
    );
};

export default CircuitBackground;

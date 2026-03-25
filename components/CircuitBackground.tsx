import React from 'react';

const CircuitBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 select-none">
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

                {/* Circuit Traces */}
                <g stroke="rgba(102, 252, 241, 0.1)" strokeWidth="0.5" fill="none">
                    {/* Horizontal/Vertical Grid Base */}
                    <path d="M 0 100 H 1000 M 0 300 H 1000 M 0 500 H 1000 M 0 700 H 1000 M 0 900 H 1000" />
                    <path d="M 100 0 V 1000 M 300 0 V 1000 M 500 0 V 1000 M 700 0 V 1000 M 900 0 V 1000" />

                    {/* Diagonal Connections */}
                    <path d="M 100 100 L 200 200 M 500 300 L 600 400 M 800 100 L 900 200" />
                    <path d="M 300 700 L 400 800 M 700 500 L 800 600" />
                </g>

                {/* Flowing Pulses */}
                <g className="circuit-pulses">
                    {/* Row 1 */}
                    <path d="M 0 100 H 1000" className="animate-circuit-flow-1" stroke="url(#pulse-grad)" strokeWidth="2" strokeDasharray="100 900" />
                    {/* Col 2 */}
                    <path d="M 300 0 V 1000" className="animate-circuit-flow-2" stroke="url(#pulse-grad)" strokeWidth="2" strokeDasharray="100 900" />
                    {/* Diagonal 1 */}
                    <path d="M 100 100 L 500 500" className="animate-circuit-flow-3" stroke="url(#pulse-grad)" strokeWidth="2" strokeDasharray="50 450" />
                    {/* Row 3 */}
                    <path d="M 1000 500 H 0" className="animate-circuit-flow-reverse" stroke="url(#pulse-grad)" strokeWidth="2" strokeDasharray="150 850" />
                    {/* Col 4 */}
                    <path d="M 700 1000 V 0" className="animate-circuit-flow-reverse" stroke="url(#pulse-grad)" strokeWidth="2" strokeDasharray="120 880" />
                </g>

                {/* Static Glowing Nodes at intersections */}
                <g fill="#66fcf1" className="opacity-40">
                    <circle cx="100" cy="100" r="2" />
                    <circle cx="300" cy="300" r="2" />
                    <circle cx="500" cy="500" r="2" />
                    <circle cx="700" cy="700" r="2" />
                    <circle cx="900" cy="900" r="2" />
                    <circle cx="500" cy="300" r="2" />
                    <circle cx="300" cy="700" r="2" />
                </g>
            </svg>
        </div>
    );
};

export default CircuitBackground;

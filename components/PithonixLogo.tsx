import React from 'react';
import { COMPANY_INFO } from '../constants';

const PithonixLogo: React.FC<{ className?: string, size?: number, animate?: boolean }> = ({ className, size = 120, animate = true }) => {
    return (
        <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
            {/* Official Logo Asset with Flutter Animation */}
            <div className={`w-full h-full ${animate ? 'animate-logo-flutter' : ''}`}>
                <img
                    src={COMPANY_INFO.branding.symbol}
                    alt="Pithonix AI Logo"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(102,252,241,0.5)]"
                />
            </div>

            <style>{`
                @keyframes logo-flutter {
                    0% {
                        transform: perspective(500px) rotateY(0deg) skew(0deg, 0deg);
                    }
                    25% {
                        transform: perspective(500px) rotateY(5deg) skew(2deg, 1deg);
                    }
                    50% {
                        transform: perspective(500px) rotateY(0deg) skew(-1deg, -2deg);
                    }
                    75% {
                        transform: perspective(500px) rotateY(-5deg) skew(1deg, 2deg);
                    }
                    100% {
                        transform: perspective(500px) rotateY(0deg) skew(0deg, 0deg);
                    }
                }
                .animate-logo-flutter {
                    animation: logo-flutter 4s ease-in-out infinite;
                    transform-origin: left center;
                }
            `}</style>
        </div>
    );
};

export default PithonixLogo;

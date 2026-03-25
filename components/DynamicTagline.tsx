import React, { useState, useEffect, useCallback } from 'react';

interface DynamicTaglineProps {
    className?: string;
}

const DynamicTagline: React.FC<DynamicTaglineProps> = ({ className }) => {
    const targetText = "Information to Intelligence";
    const [displayText, setDisplayText] = useState('i2i');
    const [phase, setPhase] = useState<'i2i' | 'scramble' | 'full'>('i2i');
    const [isAnimating, setIsAnimating] = useState(false);

    const chars = "!<>-_\\|[]{}—=+*^?#%&@0123456789";

    const scramble = useCallback(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(prev => {
                return targetText
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return targetText[index];
                        }
                        if (char === " ") return " ";
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("");
            });

            if (iteration >= targetText.length) {
                clearInterval(interval);
                setIsAnimating(false);
                setPhase('full');
            }

            iteration += 1 / 3;
        }, 30);
    }, [targetText]);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (phase === 'i2i') {
            timer = setTimeout(() => {
                setIsAnimating(true);
                setPhase('scramble');
                scramble();
            }, 3000);
        } else if (phase === 'full') {
            timer = setTimeout(() => {
                setDisplayText('i2i');
                setPhase('i2i');
            }, 6000);
        }

        return () => clearTimeout(timer);
    }, [phase, scramble]);

    return (
        <div className={`relative flex flex-col min-h-[1.5em] ${className}`}>
            <span
                className={`font-mono transition-all duration-300 font-bold tracking-wider inline-block whitespace-nowrap
                    ${isAnimating || phase === 'full' ? 'text-cyan scale-105 brightness-125' : 'text-cyan/60 scale-100'}`}
            >
                {displayText}
            </span>

            {/* Subtle scanning line effect during animation */}
            {isAnimating && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/20 to-transparent w-full h-full animate-scan pointer-events-none"></div>
            )}

            {/* Underline aesthetic - centered */}
            <div className={`h-[1.5px] bg-cyan/40 transition-all duration-1000 mt-1
                ${phase === 'full' ? 'w-full opacity-100' : 'w-8 opacity-40'}`}></div>
        </div>
    );
};

export default DynamicTagline;

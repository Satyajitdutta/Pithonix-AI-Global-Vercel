import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ParticleNetwork from './ParticleNetwork';
import VoiceHud from './VoiceHud';
import LeadFormModal from './LeadFormModal';
import AboutOverlay from './AboutOverlay';
import DynamicTagline from './DynamicTagline';
import PithonixLogo from './PithonixLogo';
import { COMPANY_INFO } from '../constants';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const openBooking = () => setIsBookingOpen(true);

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { name: 'About Us', path: '/about' },
        { name: 'Innovation Hub', path: '/innovation' },
        { name: 'Competencies', path: '/competencies' },
        { name: 'Infrastructure', path: '/infrastructure' },
    ];

    return (
        <div className="relative min-h-screen text-silver font-sans selection:bg-cyan selection:text-obsidian">
            {/* Background & Particles */}
            <div className="fixed inset-0 bg-obsidian z-[-1]"></div>
            <ParticleNetwork />

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-40 backdrop-blur-md border-b border-white/5 bg-obsidian/80">
                <div className="w-full px-12 h-32 flex items-center justify-between">

                    {/* Rigid Branding Block - Independent of Nav Flow */}
                    <div className="flex-shrink-0 w-[400px]">
                        <Link to="/" className="flex items-start gap-6 group">
                            <div className="relative w-24 h-24 flex-shrink-0">
                                <PithonixLogo size={96} animate={false} />
                            </div>
                            <div className="flex flex-col items-start gap-1 flex-shrink-0 pt-1">
                                <img src={COMPANY_INFO.branding.text} alt="PITHONIX AI" className="h-10 w-auto object-contain" />
                                <div className="h-8 flex items-center justify-start border-b border-cyan/30 w-full overflow-hidden">
                                    <DynamicTagline className="whitespace-nowrap text-[13px] tracking-[0.2em] font-medium" delay={2000} />
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu - Aligned to center */}
                    <div className="hidden md:flex gap-8 text-sm font-bold tracking-widest text-silver/80 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`hover:text-cyan transition-colors uppercase ${isActive(link.path) ? 'text-cyan border-b border-cyan' : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={openBooking}
                            className="px-4 py-2 border border-cyan text-cyan rounded hover:bg-cyan hover:text-obsidian transition-all uppercase"
                        >
                            JOIN THE INTELLECTUAL LIST
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-cyan" onClick={toggleMenu} aria-label="Toggle Menu">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`md:hidden absolute top-28 left-0 w-full bg-obsidian/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-col p-6 space-y-4 text-center font-bold tracking-widest text-silver">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={toggleMenu}
                                className={`hover:text-cyan py-2 border-b border-white/5 ${isActive(link.path) ? 'text-cyan' : ''}`}
                            >
                                {link.name.toUpperCase()}
                            </Link>
                        ))}
                        <button onClick={() => { openBooking(); toggleMenu(); }} className="text-cyan py-2 uppercase">JOIN THE INTELLECTUAL LIST</button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-32">
                {children}
            </main>

            {/* Footer Copyright */}
            <footer className="max-w-7xl mx-auto py-8 border-t border-white/5 text-center text-xs text-silver/40">
                © {new Date().getFullYear()} {COMPANY_INFO.name}. All Systems Operational.
            </footer>

            {/* Overlays */}
            <VoiceHud onOpenBooking={openBooking} />
            <LeadFormModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
            <AboutOverlay isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
        </div>
    );
};

export default Layout;

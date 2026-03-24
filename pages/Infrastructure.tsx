import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import DynamicTagline from '../components/DynamicTagline';
import PithonixLogo from '../components/PithonixLogo';
import { COMPANY_INFO } from '../constants';

const Infrastructure: React.FC = () => {
    return (
        <section id="contact" className="py-24 px-6 relative overflow-hidden bg-obsidian min-h-screen pt-32">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                <div className="md:col-span-2">
                    <ScrollReveal>
                        <div className="flex items-center gap-5 mb-8">
                            <PithonixLogo size={96} animate={true} />
                            <div className="flex flex-col items-start justify-start gap-1">
                                <img src={COMPANY_INFO.branding.text} alt="PITHONIX AI" className="h-10 w-auto object-contain" />
                                <DynamicTagline className="w-full items-start px-0" delay={2500} />
                            </div>
                        </div>
                        <p className="text-silver/60 text-sm max-w-sm mb-6">
                            Reducing surprise, not removing risk. Decision-ready intelligence for the modern enterprise.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded bg-white/5 flex items-center justify-center hover:bg-cyan hover:text-obsidian transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded bg-white/5 flex items-center justify-center hover:bg-cyan hover:text-obsidian transition-colors">
                                <span className="sr-only">Twitter</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                            </a>
                        </div>
                    </ScrollReveal>
                </div>

                <div className="md:col-span-2">
                    <ScrollReveal delay={300}>
                        <h3 className="text-white font-bold mb-6">CONTACT NODE</h3>
                        <ul className="space-y-6 text-lg text-silver/60">
                            <li className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded bg-cyan/10 flex items-center justify-center text-cyan">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <div className="text-xs uppercase text-silver/40 font-mono">Location</div>
                                    <div className="text-white">{COMPANY_INFO.location}</div>
                                </div>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded bg-teal/10 flex items-center justify-center text-teal">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <div className="text-xs uppercase text-silver/40 font-mono">Email</div>
                                    <div className="text-white">{COMPANY_INFO.email}</div>
                                </div>
                            </li>
                        </ul>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default Infrastructure;

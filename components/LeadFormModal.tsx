import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { LeadFormData } from '../types';

interface LeadFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LeadFormModal: React.FC<LeadFormModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState<LeadFormData>({
        name: '',
        designation: '',
        challenge: '',
        timeline: '',
        phone: '',
        email: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        // =========================================================================
        // EMAILJS CONFIGURATION
        // 1. Log in to https://emailjs.com/
        // 2. Service ID: Found in "Email Services" tab.
        // 3. Template IDs: Found in "Email Templates" tab. 
        //    - Create one template for yourself (Internal)
        //    - Create one template for the client (Customer) -> Ensure "To Email" is set to {{to_email}} in template settings.
        // 4. Public Key: Found in "Account" -> "General" -> "API Keys".
        // =========================================================================

        // TODO: REPLACE THE STRINGS BELOW WITH YOUR ACTUAL KEYS FROM EMAILJS DASHBOARD
        const SERVICE_ID = "service_zavggjd";          // e.g. "service_z3x9..."
        const TEMPLATE_ID_INTERNAL = "template_de6eyxp"; // e.g. "template_a1b2..."
        const TEMPLATE_ID_CUSTOMER = "template_3os9jeq"; // e.g. "template_c3d4..."
        const PUBLIC_KEY = "KleM6z8moExTZ6FNX";          // e.g. "user_12345..."

        // Parameters for Internal Email (To Pithonix)
        // Ensure your Internal Template in EmailJS uses {{from_name}}, {{phone}}, etc.
        const internalParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            designation: formData.designation,
            challenge: formData.challenge,
            timeline: formData.timeline,
            message: `New Lead Enquiry:\nDesignation: ${formData.designation}\nChallenge: ${formData.challenge}\nTimeline: ${formData.timeline}`
        };

        // Parameters for Customer Email (Confirmation)
        // Ensure your Customer Template settings has "To Email" set to {{to_email}}
        const customerParams = {
            to_name: formData.name,
            to_email: formData.email, // This variable directs the email to the customer
            challenge: formData.challenge,
            timeline: formData.timeline,
            reply_to: 'info@pithonix.ai'
        };

        // Send to Make.com webhook for unified lead tracking (fire and forget)
        fetch('https://hook.eu1.make.com/1wsr5cdrlhj595w5r6bzkacra4vbp9lq', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                source: 'Pithonix.ai Contact Form',
                name: formData.name,
                email: formData.email,
                company: formData.designation,
                industry: 'Inbound Lead',
                country: '',
                functions: formData.challenge,
                fte: formData.phone,
                timeline: formData.timeline,
                priority: formData.challenge,
                timestamp: new Date().toISOString()
            })
        }).catch(() => {});

        // Send both emails in parallel
        Promise.all([
            emailjs.send(SERVICE_ID, TEMPLATE_ID_INTERNAL, internalParams, PUBLIC_KEY),
            emailjs.send(SERVICE_ID, TEMPLATE_ID_CUSTOMER, customerParams, PUBLIC_KEY)
        ])
            .then(() => {
                setStatus('success');
                setTimeout(() => {
                    setStatus('idle');
                    setFormData({ name: '', designation: '', challenge: '', timeline: '', phone: '', email: '' });
                    onClose();
                }, 3000);
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);

                // Check if keys are placeholders
                if ((SERVICE_ID as string) === "YOUR_SERVICE_ID") {
                    alert("Email Sending Failed: You have not replaced the placeholders in 'components/LeadFormModal.tsx' with your actual EmailJS keys.");
                } else {
                    alert("Transmission failed. Please check your network connection or contact support directly.");
                }

                setStatus('idle');
            });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-obsidian/90 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative w-full max-w-lg glass-panel p-8 rounded-2xl border border-cyan/20 shadow-[0_0_50px_rgba(102,252,241,0.1)]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-silver/50 hover:text-cyan transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="mb-6">
                    <h2 className="font-heading font-black text-2xl text-white mb-1">
                        INITIATE <span className="text-cyan">PROTOCOL</span>
                    </h2>
                    <p className="text-sm text-silver/70">
                        Secure channel established. Enter your parameters for engagement.
                    </p>
                </div>

                {status === 'success' ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                        <div className="w-20 h-20 rounded-full bg-teal/20 flex items-center justify-center mb-6 border border-teal text-teal animate-glow">
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-white font-black text-2xl mb-4 tracking-widest uppercase">TRANSMISSION COMPLETE</h3>
                        <p className="text-silver/60 mb-8 max-w-sm">Our agents have intercepted your signal. Your intelligence briefing is being prepared.</p>

                        <div className="w-full space-y-4">
                            <a
                                href="https://pithonix-simulator-public.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 bg-cyan text-obsidian font-black tracking-widest uppercase rounded-lg hover:bg-white transition-all shadow-[0_0_30px_rgba(102,252,241,0.4)] flex justify-center items-center gap-3 group"
                            >
                                <span>INITIALIZE AI SIMULATOR</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </a>
                            <button
                                onClick={onClose}
                                className="text-silver/40 hover:text-silver transition-colors text-xs uppercase tracking-widest"
                            >
                                Return to Command Center
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-teal uppercase tracking-wider">Name</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:border-cyan focus:outline-none focus:bg-white/10 transition-colors"
                                    placeholder="Identify yourself (Optional)"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-teal uppercase tracking-wider">Designation</label>
                                <input
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:border-cyan focus:outline-none focus:bg-white/10 transition-colors"
                                    placeholder="Your Role (Optional)"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-teal uppercase tracking-wider">Primary Challenge</label>
                            <input
                                name="challenge"
                                value={formData.challenge}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:border-cyan focus:outline-none focus:bg-white/10 transition-colors"
                                placeholder="e.g. High Attrition, Skill Gaps... (Optional)"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-teal uppercase tracking-wider">Tentative Timeline</label>
                            <select
                                name="timeline"
                                value={formData.timeline}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:border-cyan focus:outline-none focus:bg-charcoal transition-colors"
                            >
                                <option value="" className="bg-charcoal">Select Timeline (Optional)</option>
                                <option value="Immediate (< 1 Month)" className="bg-charcoal">Immediate (&#60; 1 Month)</option>
                                <option value="1-3 Months" className="bg-charcoal">1-3 Months</option>
                                <option value="3-6 Months" className="bg-charcoal">3-6 Months</option>
                                <option value="Exploratory" className="bg-charcoal">Exploratory / Future</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-teal uppercase tracking-wider">Contact Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:border-cyan focus:outline-none focus:bg-white/10 transition-colors"
                                    placeholder="+1 (555)... (Optional)"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-teal uppercase tracking-wider">Email ID</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:border-cyan focus:outline-none focus:bg-white/10 transition-colors"
                                    placeholder="name@company.com (Optional)"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="w-full py-4 mt-2 bg-cyan text-obsidian font-black tracking-widest uppercase rounded-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(102,252,241,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 group overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            {status === 'sending' ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-obsidian" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    INITIALIZING...
                                </>
                            ) : (
                                'COMMENCE DISCOVERY'
                            )}
                        </button>

                        <div className="text-center pt-2 border-t border-white/10 mt-6 pt-6">
                            <p className="text-[10px] text-silver/40 mb-3 uppercase tracking-widest font-mono">Parallel Protocol Hub</p>
                            <a
                                href="https://pithonix-simulator-public.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-6 py-3 border border-cyan/30 rounded-full text-cyan hover:bg-cyan hover:text-obsidian transition-all duration-500 text-xs font-black tracking-[0.2em]"
                            >
                                <span>ACCESS AI SIMULATOR</span>
                                <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LeadFormModal;
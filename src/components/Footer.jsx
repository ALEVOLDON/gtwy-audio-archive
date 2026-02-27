import React from 'react';
import { Eye, Globe, Lock } from 'lucide-react';

const Footer = ({ t, lang }) => {
    return (
        <footer className="border-t border-zinc-900 p-8 lg:p-10 mt-12 bg-zinc-950/50 pb-24 md:pb-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all text-center md:text-left">
                <div className="flex flex-wrap justify-center gap-6 lg:gap-12 text-[9px] font-bold tracking-[0.2em] uppercase">
                    <span className="flex items-center gap-2"><Eye size={12} /> {t[lang].footer_obs}</span>
                    <span className="flex items-center gap-2"><Globe size={12} /> {t[lang].footer_uplink}</span>
                    <span className="flex items-center gap-2"><Lock size={12} /> {t[lang].footer_e2e}</span>
                </div>
                <div className="text-center md:text-right">
                    <p className="text-[10px] font-black italic">GTWY PROTOCOL // V2.5.0</p>
                    <p className="text-[8px] text-zinc-600 mt-1">{t[lang].footer_est}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

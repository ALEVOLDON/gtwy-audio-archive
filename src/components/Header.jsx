import React from 'react';
import { Activity, Shield, Globe, Wallet, X, Menu } from 'lucide-react';

const Header = ({ t, lang, toggleLang, connectWallet, account, isMobileMenuOpen, setIsMobileMenuOpen }) => {
    return (
        <nav className="border-b border-zinc-800/50 p-4 sticky top-0 bg-black/90 backdrop-blur-xl z-50 flex justify-between items-center h-16 flex-shrink-0">
            <div className="flex items-center gap-6">
                <div className="text-white font-black tracking-tighter text-xl flex items-center gap-2">
                    <div className="w-2 h-6 bg-cyan-500 animate-pulse" />
                    GTWY <span className="text-zinc-700 font-thin hidden sm:inline">//</span> <span className="hidden sm:inline">{t[lang].nav_archive}</span>
                </div>
                {/* Desktop Stats */}
                <div className="hidden lg:flex gap-4 text-[9px] uppercase tracking-tighter text-zinc-600">
                    <span className="flex items-center gap-1"><Activity size={10} className="text-cyan-500" /> {t[lang].latency}: 12ms</span>
                    <span className="flex items-center gap-1"><Shield size={10} className="text-emerald-500" /> {t[lang].secure}: V4</span>
                </div>
            </div>

            {/* Desktop Controls */}
            <div className="hidden md:flex items-center gap-4">
                <button onClick={toggleLang} className="flex items-center gap-1 px-3 py-1 bg-zinc-900 border border-zinc-700 text-[10px] font-bold text-zinc-300 hover:border-cyan-500 hover:text-cyan-400 transition-colors">
                    <Globe size={12} /> {lang === 'en' ? 'EN' : 'RU'}
                </button>
                <button onClick={connectWallet} className={`group flex items-center gap-2 px-6 py-2 border ${account ? 'border-cyan-500/50 text-cyan-400' : 'border-zinc-800 hover:border-zinc-500'} transition-all relative overflow-hidden`}>
                    {account && <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />}
                    <Wallet size={14} className={account ? 'animate-bounce' : ''} />
                    <span className="relative z-10 font-bold">{account ? account : t[lang].link_wallet}</span>
                </button>
            </div>

            {/* Mobile Hamburger */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white p-2">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </nav>
    );
};

export default Header;

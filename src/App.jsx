import React, { useState, useEffect, useRef } from 'react';
import {
    Disc, Wallet, Download, CheckCircle, Zap,
    Terminal, Activity, Shield, Cpu, Wifi,
    Database, Radio, Volume2, AlertTriangle, ChevronRight,
    Eye, Fingerprint, Share2, Globe, Lock, Languages, Menu, X, Server
} from 'lucide-react';

export default function App() {
    const [account, setAccount] = useState(null);
    const [activeAlbum, setActiveAlbum] = useState(null);
    const [status, setStatus] = useState('idle');
    const [lang, setLang] = useState('en');
    const [logs, setLogs] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const canvasRef = useRef(null);

    // --- TEXT DICTIONARY ---
    const t = {
        en: {
            nav_archive: "ARCHIVE",
            latency: "Latency",
            secure: "Secure_Layer",
            link_wallet: "LINK_WALLET",
            visualizer_status: "VISUALIZER // ONLINE",
            metrics_title: "SYSTEM_METRICS",
            analysis: "INCOMING SIGNAL ANALYSIS: HARMONICS DETECTED.",
            logs_title: "Operational_Logs",
            stable_title: "Stablecoin_Mode",
            stable_desc: "Payment accepted in USDT (Tether) on Polygon network.",
            nodes_title: "Data_Nodes",
            nodes_subtitle: "Gateway to the digital unconscious.",
            btn_access: "ACCESS_NODE",
            btn_pending: "TX_PENDING...",
            btn_pay: "PAY",
            btn_download_final: "DOWNLOAD_ARCHIVE",
            success_title: "NODE_UNLOCKED",
            success_msg: "ACCESS GRANTED. FILES READY.",
            footer_obs: "Observation",
            footer_uplink: "Uplink",
            footer_e2e: "End_To_End",
            footer_est: "ESTABLISHED 2020. DECENTRALISED AUDIO.",
            log_boot: "SYSTEM_BOOT: SUCCESS",
            log_active: "GATEWAY: ACTIVE",
            log_wallet_init: "INIT_WALLET...",
            log_access: "ACCESS GRANTED",
            log_error: "ERR: NO WALLET",
            log_tx_init: "INIT USDT TX:",
            log_tx_conf: "TX CONFIRMED"
        },
        ru: {
            nav_archive: "АРХИВ",
            latency: "Задержка",
            secure: "Защита",
            link_wallet: "ПОДКЛЮЧИТЬ",
            visualizer_status: "ВИЗУАЛИЗАЦИЯ // АКТИВНА",
            metrics_title: "МЕТРИКИ_СИСТЕМЫ",
            analysis: "АНАЛИЗ СИГНАЛА: ОБНАРУЖЕНЫ ГАРМОНИКИ.",
            logs_title: "Системные_Логи",
            stable_title: "Стейблкоин",
            stable_desc: "Оплата в USDT (Tether) сеть Polygon.",
            nodes_title: "Узлы_Данных",
            nodes_subtitle: "Шлюз в цифровое бессознательное.",
            btn_access: "ОТКРЫТЬ",
            btn_pending: "ОБРАБОТКА...",
            btn_pay: "ОПЛАТИТЬ",
            btn_download_final: "СКАЧАТЬ",
            success_title: "УЗЕЛ_ОТКРЫТ",
            success_msg: "ДОСТУП РАЗРЕШЕН. ФАЙЛЫ ГОТОВЫ.",
            footer_obs: "Наблюдение",
            footer_uplink: "Аплинк",
            footer_e2e: "Шифрование",
            footer_est: "ОСНОВАНО В 2020. ДЕЦЕНТРАЛИЗОВАННО.",
            log_boot: "ЗАГРУЗКА: ОК",
            log_active: "ШЛЮЗ: АКТИВЕН",
            log_wallet_init: "ПОИСК КОШЕЛЬКА...",
            log_access: "ДОСТУП ЕСТЬ",
            log_error: "ОШИБКА: НЕТ КОШЕЛЬКА",
            log_tx_init: "ПЕРЕВОД USDT:",
            log_tx_conf: "ТРАНЗАКЦИЯ ОК"
        }
    };

    useEffect(() => {
        setLogs([t[lang].log_boot, t[lang].log_active]);
    }, [lang]);

    const addLog = (msg) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 8));

    const albums = [
        {
            id: "GT-10", title: "lighthouse and sirius", price: "5.00", year: "202x",
            image: "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?auto=format&fit=crop&q=80&w=500",
            desc: { en: "Exploration of perfect forms through distorted rhythms.", ru: "Исследование идеальных форм через искаженные ритмы." }
        },
        {
            id: "GT-09", title: "CROCK", price: "5.00", year: "202x",
            image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=500",
            desc: { en: "Deconstruction of structure. Violation of order.", ru: "Деконструкция структуры. Нарушение порядка." }
        },
        {
            id: "GT-08", title: "Inevitability", price: "7.00", year: "2018",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=500",
            desc: { en: "Biological impulses converted into digital signals.", ru: "Биологические импульсы в цифровой сигнал." }
        },
        {
            id: "GT-07", title: "Droppin The Pressure", price: "6.00", year: "2018",
            image: "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&q=80&w=500",
            desc: { en: "The boundary between organics and machine code.", ru: "Граница между органикой и машинным кодом." }
        },
        {
            id: "GT-06", title: "KIEV", price: "8.50", year: "2017",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=500",
            desc: { en: "Tangible sound. Dense texture of industrial noise.", ru: "Ощутимый звук. Плотная текстура шума." }
        },
        {
            id: "GT-05", title: "Amnesiac", price: "5.00", year: "2010",
            image: "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?auto=format&fit=crop&q=80&w=500",
            desc: { en: "Pure matter of sound. Deep experimental landscapes.", ru: "Чистая материя звука. Глубокие ландшафты." }
        },
        {
            id: "GT-04", title: "Violet", price: "6.00", year: "2009",
            image: "https://images.unsplash.com/photo-1485637701894-09ad422f6de6?auto=format&fit=crop&q=80&w=500",
            desc: { en: "Architecture of sound spaces and modular synthesis.", ru: "Архитектура звуковых пространств." }
        },
        {
            id: "GT-03", title: "CUBE3", price: "4.00", year: "2008",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=500",
            desc: { en: "Continuous stream of binary data and interference.", ru: "Непрерывный поток бинарных данных." }
        },
        {
            id: "GT-02", title: "geometric progression", price: "5.00", year: "2007",
            image: "https://images.unsplash.com/photo-1504333638930-c8787321eee0?auto=format&fit=crop&q=80&w=500",
            desc: { en: "Early protocols of the GTWY gateway.", ru: "Ранние протоколы шлюза GTWY." }
        },
        {
            id: "GT-01", title: "Master Tempo", price: "5.00", year: "2006",
            image: "https://images.unsplash.com/photo-1504333638930-c8787321eee0?auto=format&fit=crop&q=80&w=500",
            desc: { en: "Initial gateway sequence.", ru: "Начальная последовательность шлюза." }
        },
    ];

    const connectWallet = () => {
        setStatus('connecting');
        addLog(t[lang].log_wallet_init);
        setTimeout(() => {
            setAccount('0xGTWY...A8F2');
            setStatus('idle');
            addLog(`${t[lang].log_access}_0xGTWY`);
            setIsMobileMenuOpen(false);
        }, 1200);
    };

    const handlePurchase = (album) => {
        if (!account) {
            addLog(t[lang].log_error);
            setIsMobileMenuOpen(true);
            return;
        }
        setActiveAlbum(album);
        setStatus('paying');
        addLog(`${t[lang].log_tx_init} ${album.price} USDT...`);
        setTimeout(() => {
            setStatus('confirmed');
            addLog(t[lang].log_tx_conf);
        }, 2500);
    };

    const toggleLang = () => {
        setLang(prev => prev === 'en' ? 'ru' : 'en');
    };

    // --- 3D VISUALIZATION LOGIC ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Resize observer to keep canvas full width
        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let angle = 0;

        const particles = [];
        const particleCount = 80; // More particles for bigger screen
        const radiusBase = 120; // Bigger sphere

        for (let i = 0; i < particleCount; i++) {
            const theta = Math.acos(-1 + (2 * i) / particleCount);
            const phi = Math.sqrt(particleCount * Math.PI) * theta;
            particles.push({
                x: Math.cos(phi) * Math.sin(theta),
                y: Math.sin(phi) * Math.sin(theta),
                z: Math.cos(theta),
                phase: Math.random() * Math.PI * 2
            });
        }

        const render = () => {
            ctx.fillStyle = 'rgba(3, 3, 3, 0.3)'; // Slightly darker trail
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            // Responsive radius
            const radius = Math.min(canvas.width, canvas.height) * 0.35;

            angle += 0.005;

            ctx.strokeStyle = '#22d3ee';
            ctx.fillStyle = '#22d3ee';
            ctx.lineWidth = 0.5;

            const projected = [];

            particles.forEach(p => {
                // Dynamic breathing effect
                const r = radius + Math.sin(angle * 2 + p.phase) * 10;

                let x = p.x * r;
                let y = p.y * r;
                let z = p.z * r;

                // Rotation
                let x1 = x * Math.cos(angle) - z * Math.sin(angle);
                let z1 = x * Math.sin(angle) + z * Math.cos(angle);
                let y1 = y * Math.cos(angle * 0.5) - z1 * Math.sin(angle * 0.5);
                let z2 = y * Math.sin(angle * 0.5) + z1 * Math.cos(angle * 0.5);

                const scale = 400 / (400 + z2);
                const x2d = cx + x1 * scale;
                const y2d = cy + y1 * scale;

                projected.push({ x: x2d, y: y2d, scale });

                const size = 1.5 * scale;
                ctx.globalAlpha = 0.3 + (0.7 * scale); // Fade distant particles
                ctx.beginPath();
                ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.globalAlpha = 0.15;
            ctx.beginPath();
            for (let i = 0; i < projected.length; i++) {
                for (let j = i + 1; j < projected.length; j++) {
                    const dx = projected[i].x - projected[j].x;
                    const dy = projected[i].y - projected[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 60) {
                        ctx.moveTo(projected[i].x, projected[i].y);
                        ctx.lineTo(projected[j].x, projected[j].y);
                    }
                }
            }
            ctx.stroke();
            ctx.globalAlpha = 1.0;

            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#030303] text-zinc-400 font-mono text-xs selection:bg-cyan-900 selection:text-cyan-100 overflow-x-hidden flex flex-col">

            {/* Background FX */}
            <div className="fixed inset-0 pointer-events-none z-[0] opacity-[0.05] contrast-150 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
            <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-2 bg-[length:100%_3px,3px_100%] animate-scan" />
            </div>

            {/* --- HEADER --- */}
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

            {/* --- 3D VISUALIZATION HERO --- */}
            <div className="relative w-full h-[250px] md:h-[350px] border-b border-zinc-800/50 bg-black/40 overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#030303_100%)] z-10 pointer-events-none" />
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

                {/* Hero Overlay Text */}
                <div className="absolute bottom-4 left-4 md:left-8 z-20 flex items-center gap-2 text-cyan-500 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-cyan-500" />
                    <span className="text-[10px] font-bold tracking-[0.2em]">{t[lang].visualizer_status}</span>
                </div>
            </div>

            {/* --- MOBILE MENU OVERLAY --- */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 top-16 bg-black/95 z-40 p-6 flex flex-col gap-6 md:hidden border-t border-zinc-800 animate-in slide-in-from-top-4">
                    <div className="space-y-4">
                        <div className="text-xs uppercase text-zinc-600 font-bold tracking-widest">System Control</div>
                        <button onClick={() => { toggleLang(); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 text-zinc-300">
                            <span className="flex items-center gap-2"><Globe size={16} /> Language</span>
                            <span className="font-bold text-cyan-400">{lang === 'en' ? 'ENGLISH' : 'РУССКИЙ'}</span>
                        </button>
                        <button onClick={connectWallet} className={`w-full flex items-center justify-between p-4 border ${account ? 'bg-cyan-900/10 border-cyan-500 text-cyan-400' : 'bg-zinc-900 border-zinc-800 text-zinc-300'}`}>
                            <span className="flex items-center gap-2"><Wallet size={16} /> Wallet</span>
                            <span className="font-bold truncate max-w-[150px]">{account ? account : t[lang].link_wallet}</span>
                        </button>
                    </div>
                    <div className="mt-auto text-[10px] text-zinc-600 text-center uppercase tracking-widest">
                        GTWY MOBILE INTERFACE V2.5
                    </div>
                </div>
            )}

            {/* --- MAIN LAYOUT --- */}
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 flex-1 w-full">

                {/* SIDEBAR (Desktop: Left, Mobile: Bottom/Second) */}
                <aside className="lg:col-span-3 lg:order-1 order-2 border-r border-zinc-800/50 p-6 space-y-8 bg-zinc-950/20">

                    {/* System Metrics (Replacement for Visualizer) */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-[10px] font-bold text-zinc-600 border-b border-zinc-800 pb-2">
                            <span>{t[lang].metrics_title}</span>
                            <Server size={12} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
                                <span className="block text-[8px] text-zinc-500 uppercase">Core_Load</span>
                                <span className="text-emerald-500 font-mono font-bold">12%</span>
                            </div>
                            <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
                                <span className="block text-[8px] text-zinc-500 uppercase">Mem_Alloc</span>
                                <span className="text-cyan-500 font-mono font-bold">2.4GB</span>
                            </div>
                            <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
                                <span className="block text-[8px] text-zinc-500 uppercase">Uptime</span>
                                <span className="text-zinc-300 font-mono font-bold">482h</span>
                            </div>
                            <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
                                <span className="block text-[8px] text-zinc-500 uppercase">Ping</span>
                                <span className="text-zinc-300 font-mono font-bold">14ms</span>
                            </div>
                        </div>
                        <p className="text-[9px] text-zinc-700 leading-tight">
                            {t[lang].analysis}
                        </p>
                    </div>

                    {/* Logs */}
                    <div className="space-y-4">
                        <div className="text-[10px] font-bold text-zinc-600 border-b border-zinc-800 pb-2 uppercase">
                            {t[lang].logs_title}
                        </div>
                        <div className="font-mono text-[10px] space-y-2 opacity-50 h-32 lg:h-auto overflow-y-auto">
                            {logs.map((log, i) => (
                                <div key={i} className={log.includes('TX_CONFIRMED') || log.includes('ТРАНЗАКЦИЯ') ? 'text-cyan-400' : ''}>
                                    {log}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info Block */}
                    <div className="p-4 border border-zinc-800/50 bg-cyan-500/5 rounded">
                        <h4 className="text-cyan-500 font-bold mb-2 flex items-center gap-2 uppercase">
                            <Zap size={12} /> {t[lang].stable_title}
                        </h4>
                        <p className="text-[10px] text-zinc-500 leading-relaxed">
                            {t[lang].stable_desc}
                        </p>
                    </div>
                </aside>

                {/* MAIN CONTENT (Desktop: Right, Mobile: Top/First) */}
                <main className="lg:col-span-9 lg:order-2 order-1 p-6 lg:p-12">
                    <div className="mb-8 lg:mb-12">
                        <h2 className="text-4xl lg:text-5xl font-black italic tracking-tighter text-white uppercase mb-4 opacity-90 break-words">
                            {t[lang].nodes_title} <span className="text-zinc-800">/</span>
                        </h2>
                        <div className="h-1 w-32 bg-cyan-500 mb-6" />
                        <p className="text-zinc-500 max-w-xl text-sm italic">
                            "{t[lang].nodes_subtitle}"
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                        {albums.map((album) => (
                            <div
                                key={album.id}
                                className="group relative bg-black border border-zinc-800 active:border-cyan-500/40 lg:hover:border-cyan-500/40 transition-all duration-300 overflow-hidden flex flex-col rounded-lg lg:rounded-none"
                            >
                                <div className="aspect-square w-full overflow-hidden relative">
                                    <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                                    <img
                                        src={album.image}
                                        alt={album.title}
                                        className="w-full h-full object-cover grayscale brightness-75 contrast-125 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-black/80 backdrop-blur px-3 py-1 border-t border-l border-zinc-800">
                                        <span className="text-white font-bold">{album.price} <span className="text-cyan-500 text-[10px]">USDT</span></span>
                                    </div>
                                </div>

                                <div className="p-5 flex-1 flex flex-col border-t border-zinc-800">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] text-zinc-600 font-bold">{album.id} // {album.year}</span>
                                        <div className="h-2 w-2 rounded-full bg-zinc-800 group-hover:bg-cyan-500 transition-colors" />
                                    </div>

                                    <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight mb-2">
                                        {album.title}
                                    </h3>

                                    <p className="text-zinc-500 text-[11px] leading-relaxed mb-6 flex-1">
                                        {album.desc[lang]}
                                    </p>

                                    <button
                                        onClick={() => handlePurchase(album)}
                                        disabled={status === 'paying'}
                                        className="w-full relative overflow-hidden bg-zinc-900 border border-zinc-800 text-zinc-300 py-4 lg:py-3 font-black uppercase text-[10px] tracking-widest hover:bg-cyan-500 hover:text-black hover:border-cyan-500 transition-all active:scale-[0.98]"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {status === 'paying' && activeAlbum?.id === album.id ? t[lang].btn_pending : `${t[lang].btn_pay} ${album.price} USDT`}
                                            <ChevronRight size={14} />
                                        </span>
                                    </button>
                                </div>

                                {/* Purchase Success Overlay */}
                                {status === 'confirmed' && activeAlbum?.id === album.id && (
                                    <div className="absolute inset-0 bg-black/95 z-20 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300 backdrop-blur-sm">
                                        <CheckCircle size={48} className="text-cyan-500 mb-4 animate-pulse" />
                                        <h4 className="text-white font-black text-xl mb-2 uppercase italic">{t[lang].success_title}</h4>
                                        <p className="text-zinc-500 text-[10px] mb-8">{t[lang].success_msg}</p>
                                        <a href="#" className="w-full py-4 border border-cyan-500 bg-cyan-500/10 text-cyan-400 font-black hover:bg-cyan-500 hover:text-black transition-all uppercase tracking-tighter flex items-center justify-center gap-2">
                                            <Download size={16} /> {t[lang].btn_download_final}
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            <footer className="border-t border-zinc-900 p-8 lg:p-10 mt-12 bg-zinc-950/50">
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

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes scan {
          from { transform: translateY(-100%); }
          to { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        body {
          cursor: crosshair;
        }
      `}} />
        </div>
    );
}
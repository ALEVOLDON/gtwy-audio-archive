import React from 'react';
import { Server, Zap } from 'lucide-react';

const Sidebar = ({ t, lang, coreLoad, memAlloc, uptime, ping, logs }) => {
    return (
        <aside className="lg:col-span-3 lg:order-1 order-2 border-r border-zinc-800/50 p-6 space-y-8 bg-zinc-950/20">
            {/* System Metrics */}
            <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] font-bold text-zinc-600 border-b border-zinc-800 pb-2">
                    <span>{t[lang].metrics_title}</span>
                    <Server size={12} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
                        <span className="block text-[8px] text-zinc-500 uppercase">Core_Load</span>
                        <span className="text-emerald-500 font-mono font-bold">{coreLoad}%</span>
                    </div>
                    <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
                        <span className="block text-[8px] text-zinc-500 uppercase">Mem_Alloc</span>
                        <span className="text-cyan-500 font-mono font-bold">{memAlloc}GB</span>
                    </div>
                    <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
                        <span className="block text-[8px] text-zinc-500 uppercase">Uptime</span>
                        <span className="text-zinc-300 font-mono font-bold">{uptime}h</span>
                    </div>
                    <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
                        <span className="block text-[8px] text-zinc-500 uppercase">Ping</span>
                        <span className="text-zinc-300 font-mono font-bold">{ping}ms</span>
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
    );
};

export default Sidebar;

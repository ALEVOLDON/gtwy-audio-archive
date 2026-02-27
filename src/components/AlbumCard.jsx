import React from 'react';
import { Play, Pause, ChevronRight, CheckCircle, Download } from 'lucide-react';

const AlbumCard = ({
    album,
    lang,
    status,
    activeAlbum,
    isLoadingAudio,
    playingId,
    t,
    togglePlay,
    handlePurchase
}) => {
    return (
        <div
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
                <button
                    onClick={(e) => togglePlay(album.id, e)}
                    className={`absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/50 border border-zinc-500/50 flex items-center justify-center transition-all z-20 backdrop-blur-sm ${isLoadingAudio ? 'opacity-50 cursor-wait' : ''} ${playingId === album.id ? 'opacity-100 border-cyan-500 text-cyan-400 scale-110' : 'opacity-0 group-hover:opacity-100 hover:border-cyan-500 hover:text-cyan-400 hover:scale-105'}`}
                >
                    {playingId === album.id ? <Pause fill="currentColor" size={24} /> : <Play fill="currentColor" size={24} className="ml-1" />}
                </button>
                {playingId === album.id && (
                    <div className="absolute top-4 left-4 z-20 flex items-end gap-1 h-3">
                        <div className="w-1.5 h-full bg-cyan-500 animate-pulse" style={{ animationDelay: "0ms" }} />
                        <div className="w-1.5 h-[60%] bg-cyan-500 animate-pulse" style={{ animationDelay: "200ms" }} />
                        <div className="w-1.5 h-[80%] bg-cyan-500 animate-pulse" style={{ animationDelay: "400ms" }} />
                        <div className="w-1.5 h-[100%] bg-cyan-500 animate-pulse" style={{ animationDelay: "100ms" }} />
                    </div>
                )}
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
    );
};

export default AlbumCard;

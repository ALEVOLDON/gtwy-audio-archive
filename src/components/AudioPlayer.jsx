import React from 'react';
import { SkipBack, Play, Pause, SkipForward } from 'lucide-react';

const AudioPlayer = ({
    currentTrack,
    playingId,
    albums,
    audioElementsRef,
    togglePlay,
    playNextOrPrev,
    formatTime
}) => {
    if (!currentTrack) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-zinc-800 p-4 pb-4 md:pb-4 flex flex-col md:flex-row items-center gap-4 animate-in slide-in-from-bottom-full">

            {/* Progress Bar (Absolute Top) */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-zinc-900 cursor-pointer group" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                const audio = audioElementsRef.current[currentTrack.albumId];
                if (audio && audio.duration) {
                    audio.currentTime = percent * audio.duration;
                }
            }}>
                <div className="h-full bg-cyan-500 group-hover:bg-cyan-400 transition-colors relative" style={{ width: `${(currentTrack.currentTime / currentTrack.duration) * 100 || 0}%` }}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-x-1/2" />
                </div>
            </div>

            <div className="flex items-center justify-between w-full md:w-auto md:flex-1 gap-4 mt-2 md:mt-0">
                <div className="flex items-center gap-4 flex-1 overflow-hidden">
                    <div className="w-10 h-10 bg-zinc-900 border border-zinc-700 flex items-center justify-center font-bold text-zinc-500 text-[10px] flex-shrink-0">
                        {currentTrack.num.toString().padStart(2, '0')}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-white font-black uppercase text-sm tracking-tighter truncate" title={currentTrack.title}>{currentTrack.title}</span>
                        <span className="text-cyan-500 text-[10px] tracking-widest font-bold uppercase truncate">
                            {albums.find(a => a.id === currentTrack.albumId)?.title}
                        </span>
                    </div>
                </div>

                {/* Mobile right side controls */}
                <div className="flex md:hidden items-center gap-2">
                    <button onClick={() => playNextOrPrev(currentTrack.albumId, -1)} className="text-zinc-500 hover:text-cyan-400 p-2"><SkipBack size={16} fill="currentColor" /></button>
                    <button
                        onClick={(e) => togglePlay(currentTrack.albumId, e)}
                        className="w-10 h-10 flex-shrink-0 rounded-full bg-cyan-500/10 border border-cyan-500/50 flex items-center justify-center text-cyan-400 hover:bg-cyan-500 hover:text-black transition-colors"
                    >
                        {playingId === currentTrack.albumId ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-1" />}
                    </button>
                    <button onClick={() => playNextOrPrev(currentTrack.albumId, 1)} className="text-zinc-500 hover:text-cyan-400 p-2"><SkipForward size={16} fill="currentColor" /></button>
                </div>
            </div>

            {/* Desktop right side controls */}
            <div className="hidden md:flex flex-row items-center gap-6">
                <div className="text-[10px] font-mono font-bold text-zinc-500 min-w-[100px] text-right">
                    <span className="text-cyan-400">{formatTime(currentTrack.currentTime)}</span> / {formatTime(currentTrack.duration)}
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => playNextOrPrev(currentTrack.albumId, -1)} className="text-zinc-500 hover:text-cyan-400 transition-colors"><SkipBack size={18} fill="currentColor" /></button>
                    <button
                        onClick={(e) => togglePlay(currentTrack.albumId, e)}
                        className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/50 flex items-center justify-center text-cyan-400 hover:bg-cyan-500 hover:text-black transition-colors"
                    >
                        {playingId === currentTrack.albumId ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
                    </button>
                    <button onClick={() => playNextOrPrev(currentTrack.albumId, 1)} className="text-zinc-500 hover:text-cyan-400 transition-colors"><SkipForward size={18} fill="currentColor" /></button>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;

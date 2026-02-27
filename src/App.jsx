import React, { useState, useEffect, useRef } from 'react';
import {
    Disc, Wallet, Download, CheckCircle, Zap,
    Terminal, Activity, Shield, Cpu, Wifi,
    Database, Radio, Volume2, AlertTriangle, ChevronRight,
    Eye, Fingerprint, Share2, Globe, Lock, Languages, Menu, X, Server,
    Play, Pause, SkipBack, SkipForward
} from 'lucide-react';
import { t } from './data/dictionary';
import { albums } from './data/albums';
import Visualizer from './components/Visualizer';
import Sidebar from './components/Sidebar';
import AudioPlayer from './components/AudioPlayer';
import Header from './components/Header';
import AlbumCard from './components/AlbumCard';
import Footer from './components/Footer';

export default function App() {
    const [account, setAccount] = useState(null);
    const [activeAlbum, setActiveAlbum] = useState(null);
    const [status, setStatus] = useState('idle');
    const [lang, setLang] = useState('en');
    const [logs, setLogs] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [coreLoad, setCoreLoad] = useState(12);
    const [memAlloc, setMemAlloc] = useState(2.4);
    const [uptime, setUptime] = useState(482);
    const [ping, setPing] = useState(14);

    const [playingId, setPlayingId] = useState(null);
    const [currentTrack, setCurrentTrack] = useState(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const audioElementsRef = useRef({});
    const sourceNodesRef = useRef({});
    const playlistsRef = useRef({});

    // Use a generic royalty-free ambient sound for testing
    const defaultAudioSrc = "https://actions.google.com/sounds/v1/science_fiction/space_ship_engine.ogg";

    useEffect(() => {
        setLogs([t[lang].log_boot, t[lang].log_active]);

        const interval = setInterval(() => {
            setCoreLoad(Math.floor(Math.random() * 15) + 5);
            setMemAlloc((Math.random() * 0.8 + 2.0).toFixed(1));
            setPing(Math.floor(Math.random() * 20) + 10);
            setUptime(prev => prev + 1);
        }, 3000);

        return () => clearInterval(interval);
    }, [lang]);

    const addLog = (msg) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 8));



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

    const initAudio = () => {
        if (!audioContextRef.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContextRef.current = new AudioContext();
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 256;
            analyserRef.current.smoothingTimeConstant = 0.8;
            analyserRef.current.connect(audioContextRef.current.destination);
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    };

    const [isLoadingAudio, setIsLoadingAudio] = useState(false);

    const formatTime = (time) => {
        if (!time || isNaN(time)) return "00:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const fetchPlaylist = async (bcPath) => {
        try {
            const res = await fetch(`/bandcamp${bcPath}`);
            const html = await res.text();
            let tracks = [];

            const match2 = html.match(/data-tralbum=\"([^\"]+)\"/);
            if (match2) {
                const tralbum = JSON.parse(match2[1].replace(/&quot;/g, '\"'));
                if (tralbum.trackinfo) {
                    tracks = tralbum.trackinfo.filter(t => t.file && t.file['mp3-128']).map(t => {
                        let audioUrl = t.file['mp3-128'].replace(/&amp;/g, '&');
                        // Robust match for //t4.bcbits... or https://po.bcbits...
                        const urlMatch = audioUrl.match(/^(?:https?:)?\/\/([^\.]+)\.bcbits\.com(.+)/);
                        if (urlMatch) {
                            audioUrl = `/bcbits/${urlMatch[1]}${urlMatch[2]}`;
                        }
                        return {
                            src: audioUrl,
                            title: t.title || 'Unknown Track',
                            num: t.track_num || 1
                        };
                    });
                }
            }

            // Fallback for extremely old single-track formats if needed
            if (tracks.length === 0) {
                const match = html.match(/\"file\":{.+?\"mp3-128\":\"([^\"]+)\"/);
                if (match) {
                    let audioUrl = match[1].replace(/&quot;/g, '').replace(/&amp;/g, '&');
                    const urlMatch = audioUrl.match(/^(?:https?:)?\/\/([^\.]+)\.bcbits\.com(.+)/);
                    if (urlMatch) audioUrl = `/bcbits/${urlMatch[1]}${urlMatch[2]}`;
                    tracks.push({ src: audioUrl, title: 'Unknown Track', num: 1 });
                }
            }

            console.log("Extracted playlist for", bcPath, tracks);
            addLog(`SYNC_NODE_${bcPath.split('/').pop().toUpperCase()}`);
            return tracks;
        } catch (e) {
            console.error("Failed to fetch stream", e);
            return [];
        }
    };

    const playNextOrPrev = (albumId, direction) => {
        const audio = audioElementsRef.current[albumId];
        const playlist = playlistsRef.current[albumId];
        if (!audio || !playlist) return;

        const currentIdx = parseInt(audio.dataset.trackIndex);
        let nextIdx = currentIdx + direction;

        if (nextIdx < 0) nextIdx = 0;
        if (nextIdx >= playlist.length) nextIdx = 0; // loop back to start if next on last track

        const track = playlist[nextIdx];
        if (!track) return;

        audio.src = track.src;
        audio.dataset.trackIndex = nextIdx;
        audio.dataset.title = track.title;
        audio.dataset.num = track.num;
        audio.play().then(() => {
            setPlayingId(albumId);
            addLog(`TRACK_${direction > 0 ? 'FWD' : 'REV'}_${albumId}_T${track.num}`);
            setCurrentTrack({
                albumId: albumId,
                trackIndex: nextIdx,
                title: track.title,
                num: track.num,
                duration: audio.duration || 0,
                currentTime: audio.currentTime || 0
            });
        }).catch(error => console.error("Skip error:", error));
    };

    const togglePlay = async (albumId, e) => {
        e.stopPropagation();
        if (isLoadingAudio) return;

        initAudio();

        // Pause current if it's playing and different
        if (playingId && playingId !== albumId) {
            const prevAudio = audioElementsRef.current[playingId];
            if (prevAudio) prevAudio.pause();
        }

        let audio = audioElementsRef.current[albumId];

        // Setup audio element if it doesn't exist
        if (!audio) {
            setIsLoadingAudio(true);
            const albumObj = albums.find(a => a.id === albumId);
            const bcPath = albumObj?.bcPath;
            let playlist = [];

            if (bcPath) {
                playlist = await fetchPlaylist(bcPath);
            }

            if (playlist.length === 0) {
                // fallback
                playlist = [{ src: defaultAudioSrc, title: albumObj?.title || 'Unknown', num: 1 }];
            }

            playlistsRef.current[albumId] = playlist;
            const track = playlist[0];

            audio = new Audio(track.src);
            audio.crossOrigin = "anonymous";
            audio.loop = false;

            audio.dataset.albumId = albumId;
            audio.dataset.trackIndex = 0;
            audio.dataset.title = track.title;
            audio.dataset.num = track.num;

            audio.addEventListener('timeupdate', () => {
                setCurrentTrack(prev => {
                    if (prev && prev.albumId === audio.dataset.albumId) {
                        return { ...prev, currentTime: audio.currentTime };
                    }
                    return prev;
                });
            });

            audio.addEventListener('loadedmetadata', () => {
                setCurrentTrack(prev => {
                    if (prev && prev.albumId === audio.dataset.albumId) {
                        return { ...prev, duration: audio.duration };
                    }
                    return prev;
                });
            });

            audio.addEventListener('ended', () => {
                const aId = audio.dataset.albumId;
                const currentIdx = parseInt(audio.dataset.trackIndex);
                const aPlaylist = playlistsRef.current[aId];
                if (aPlaylist && currentIdx + 1 < aPlaylist.length) {
                    const trackIndex = currentIdx + 1;
                    const nextTrack = aPlaylist[trackIndex];
                    audio.src = nextTrack.src;
                    audio.dataset.trackIndex = trackIndex;
                    audio.dataset.title = nextTrack.title;
                    audio.dataset.num = nextTrack.num;
                    audio.play().then(() => {
                        setPlayingId(aId);
                        addLog(`AUTO_NEXT_${aId}_T${nextTrack.num}`);
                        setCurrentTrack({
                            albumId: aId,
                            trackIndex: trackIndex,
                            title: nextTrack.title,
                            num: nextTrack.num,
                            duration: audio.duration || 0,
                            currentTime: audio.currentTime || 0
                        });
                    });
                } else {
                    setPlayingId(null);
                }
            });

            audioElementsRef.current[albumId] = audio;

            // Connect to analyser
            const source = audioContextRef.current.createMediaElementSource(audio);
            source.connect(analyserRef.current);
            sourceNodesRef.current[albumId] = source;
            setIsLoadingAudio(false);
        }

        if (playingId === albumId) {
            audio.pause();
            setPlayingId(null);
            addLog(`AUDIO_PAUSED_${albumId}`);
        } else {
            audio.play().then(() => {
                setPlayingId(albumId);
                setCurrentTrack({
                    albumId: albumId,
                    trackIndex: parseInt(audio.dataset.trackIndex),
                    title: audio.dataset.title,
                    num: audio.dataset.num,
                    duration: audio.duration || 0,
                    currentTime: audio.currentTime || 0
                });
                addLog(`AUDIO_PLAYING_${albumId}`);
            }).catch(error => {
                addLog(`AUDIO_ERR: ${error.message}`);
                setPlayingId(albumId); // Fallback for visual indication if autoplay blocked
            });
        }
    };



    return (
        <div className="min-h-screen bg-[#030303] text-zinc-400 font-mono text-xs selection:bg-cyan-900 selection:text-cyan-100 overflow-x-hidden flex flex-col">

            {/* Background FX */}
            <div className="fixed inset-0 pointer-events-none z-[0] opacity-[0.05] contrast-150 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
            <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-2 bg-[length:100%_3px,3px_100%] animate-scan" />
            </div>

            {/* --- HEADER --- */}
            <Header
                t={t}
                lang={lang}
                toggleLang={toggleLang}
                connectWallet={connectWallet}
                account={account}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            {/* --- 3D VISUALIZATION --- */}
            <Visualizer
                analyserRef={analyserRef}
                playingId={playingId}
                t={t}
                lang={lang}
            />

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
                <Sidebar
                    t={t}
                    lang={lang}
                    coreLoad={coreLoad}
                    memAlloc={memAlloc}
                    uptime={uptime}
                    ping={ping}
                    logs={logs}
                />

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
                            <AlbumCard
                                key={album.id}
                                album={album}
                                lang={lang}
                                status={status}
                                activeAlbum={activeAlbum}
                                isLoadingAudio={isLoadingAudio}
                                playingId={playingId}
                                t={t}
                                togglePlay={togglePlay}
                                handlePurchase={handlePurchase}
                            />
                        ))}
                    </div>
                </main>
            </div>

            {/* --- FOOTER --- */}
            <Footer t={t} lang={lang} />

            {/* --- GLOBAL AUDIO PLAYER --- */}
            <AudioPlayer
                currentTrack={currentTrack}
                playingId={playingId}
                albums={albums}
                audioElementsRef={audioElementsRef}
                togglePlay={togglePlay}
                playNextOrPrev={playNextOrPrev}
                formatTime={formatTime}
            />

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
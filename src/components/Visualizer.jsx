import React, { useEffect, useRef } from 'react';

const Visualizer = ({ analyserRef, playingId, t, lang }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

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
        const particleCount = 80;

        for (let i = 0; i < particleCount; i++) {
            const theta = Math.acos(-1 + (2 * i) / particleCount);
            const phi = Math.sqrt(particleCount * Math.PI) * theta;
            particles.push({
                x: Math.cos(phi) * Math.sin(theta),
                y: Math.sin(phi) * Math.sin(theta),
                z: Math.cos(theta),
                phase: Math.random() * Math.PI * 2,
                index: i
            });
        }

        const render = () => {
            ctx.fillStyle = 'rgba(3, 3, 3, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            const radius = Math.min(canvas.width, canvas.height) * 0.35;

            let audioData = null;
            let audioIntensity = 0;

            if (analyserRef.current) {
                audioData = new Uint8Array(analyserRef.current.frequencyBinCount);
                analyserRef.current.getByteFrequencyData(audioData);

                let sum = 0;
                for (let i = 0; i < Math.min(audioData.length, 64); i++) sum += audioData[i];
                audioIntensity = sum / Math.min(audioData.length, 64);
            }

            angle += 0.005;

            ctx.strokeStyle = '#22d3ee';
            ctx.fillStyle = '#22d3ee';
            ctx.lineWidth = 0.5;

            const projected = [];

            particles.forEach(p => {
                const audioPulse = audioData ? (audioData[p.index % audioData.length] / 255) * 40 : 0;
                const r = radius + Math.sin(angle * 2 + p.phase) * 10 + audioPulse + (audioIntensity * 0.15);

                let x = p.x * r;
                let y = p.y * r;
                let z = p.z * r;

                let x1 = x * Math.cos(angle) - z * Math.sin(angle);
                let z1 = x * Math.sin(angle) + z * Math.cos(angle);
                let y1 = y * Math.cos(angle * 0.5) - z1 * Math.sin(angle * 0.5);
                let z2 = y * Math.sin(angle * 0.5) + z1 * Math.cos(angle * 0.5);

                const scale = 400 / (400 + z2);
                const x2d = cx + x1 * scale;
                const y2d = cy + y1 * scale;

                projected.push({ x: x2d, y: y2d, scale });

                const size = 1.5 * scale;
                ctx.globalAlpha = 0.3 + (0.7 * scale);
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
    }, [analyserRef]);

    return (
        <div className="relative w-full h-[250px] md:h-[350px] border-b border-zinc-800/50 bg-black/40 overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#030303_100%)] z-10 pointer-events-none" />
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

            <div className="absolute bottom-4 left-4 md:left-8 z-20 flex items-center gap-2 text-cyan-500 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                <span className="text-[10px] font-bold tracking-[0.2em]">
                    {playingId ? t[lang].visualizer_status + ' [AUDIO REACTIVE]' : t[lang].visualizer_status}
                </span>
            </div>
        </div>
    );
};

export default Visualizer;

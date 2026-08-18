import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Flame, Sparkles, Play, Pause, RefreshCw } from 'lucide-react';
import heroVideo from '../assets/ad6eff89-7596-42cc-873a-b4dbebfc3771.mp4';
import { toggleBBQSizzle } from '../utils/audio';

export default function CinematicVideoHero() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [heatIntensity, setHeatIntensity] = useState('high'); // 'medium' | 'high' | 'viral'
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play safety check on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay was prevented, user interaction required:", err);
      });
    }
  }, []);

  // 60fps Ambient Fire Embers & Smoke Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      if (!containerRef.current || !canvas) return;
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Spark {
      constructor(w, h) {
        this.reset(w, h, true);
      }

      reset(w, h, initial = false) {
        this.x = w * 0.2 + Math.random() * (w * 0.6);
        this.y = initial ? Math.random() * h : h * 0.8 + Math.random() * (h * 0.2);
        this.vx = (Math.random() - 0.5) * 1.6;
        this.vy = -(1.2 + Math.random() * 3.2);
        this.size = 1.2 + Math.random() * 2.5;
        this.alpha = 0.6 + Math.random() * 0.4;
        this.decay = 0.006 + Math.random() * 0.012;
        this.hue = 24 + Math.random() * 36; // 24 (Orange) to 60 (Yellow)
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.04 + Math.random() * 0.07;
      }

      update(w, h, speedMultiplier = 1) {
        this.wobble += this.wobbleSpeed;
        this.x += this.vx + Math.sin(this.wobble) * 0.8;
        this.y += this.vy * speedMultiplier;
        this.alpha -= this.decay;

        if (this.alpha <= 0 || this.y < 0 || this.x < 0 || this.x > w) {
          this.reset(w, h);
        }
      }

      draw(context) {
        context.save();
        context.globalAlpha = Math.max(0, this.alpha);
        context.shadowBlur = 10;
        context.shadowColor = `hsl(${this.hue}, 100%, 55%)`;
        context.fillStyle = `hsl(${this.hue}, 100%, 75%)`;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }

    const sparkCount = heatIntensity === 'viral' ? 90 : heatIntensity === 'high' ? 60 : 35;
    const sparks = Array.from({ length: sparkCount }, () => new Spark(canvas.width, canvas.height));
    let time = 0;

    const render = () => {
      if (!isPlaying) return;
      time += 0.03;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Subtle dynamic glow pulse over video
      const flicker = Math.sin(time * 5) * 0.08 + Math.cos(time * 8) * 0.05;
      const glowAlpha = 0.18 + flicker * 0.08;
      
      const fireGlow = ctx.createRadialGradient(w * 0.5, h * 0.5, 50, w * 0.5, h * 0.5, w * 0.7);
      fireGlow.addColorStop(0, `rgba(255, 110, 10, ${glowAlpha})`);
      fireGlow.addColorStop(0.5, `rgba(255, 50, 0, ${glowAlpha * 0.5})`);
      fireGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.save();
      ctx.fillStyle = fireGlow;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // Render rising sparks
      sparks.forEach((spark) => {
        spark.update(w, h, heatIntensity === 'viral' ? 1.4 : 1.0);
        spark.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, heatIntensity]);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleToggleAudio = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    
    // Also sync synthesized sizzle audio if desired
    toggleBBQSizzle();
  };

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[400px] sm:h-[490px] lg:h-[580px] rounded-3xl overflow-hidden glass-panel border-2 border-orange-500/40 shadow-[0_0_60px_rgba(255,80,0,0.3)] select-none group"
    >
      {/* Background High-Def BBQ Video */}
      <video
        ref={videoRef}
        src={heroVideo}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700"
      />

      {/* Cinematic Vignette & Heat Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#08080c_98%)] pointer-events-none" />

      {/* Real-Time Particle & Fire Embers Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Live Video Indicator Badge (Top Left) */}
      <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-orange-500/50 text-[11px] sm:text-xs font-bold text-orange-300 shadow-xl">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
        </span>
        <span className="flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
          <span>LIVE BBQ SIZZLE</span>
        </span>
      </div>

      {/* Heat Level & Smoke Tag (Top Right) */}
      <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md p-1 sm:p-1.5 rounded-2xl border border-white/10 text-[10px] sm:text-xs font-bold">
        <span className="text-zinc-400 px-1 hidden sm:inline">Flame:</span>
        {['medium', 'high', 'viral'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setHeatIntensity(lvl)}
            className={`px-2.5 py-1 rounded-xl capitalize transition-all cursor-pointer ${
              heatIntensity === lvl
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md font-extrabold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {lvl === 'viral' ? '🔥 100% Coal' : lvl}
          </button>
        ))}
      </div>

      {/* Floating Center Play/Pause Overlay (on hover or when paused) */}
      {!isPlaying && (
        <button
          onClick={handleTogglePlay}
          className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-orange-600/90 text-white flex items-center justify-center shadow-[0_0_35px_rgba(255,80,0,0.8)] z-30 transition-transform transform hover:scale-110 cursor-pointer"
        >
          <Play className="w-8 h-8 fill-white translate-x-0.5" />
        </button>
      )}

      {/* Bottom Interactive Video Controls & Badges */}
      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 flex items-center justify-between gap-2 pointer-events-none">
        
        {/* Playback Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Sizzle Audio Toggle */}
          <button
            onClick={handleToggleAudio}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all backdrop-blur-md cursor-pointer ${
              !isMuted
                ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-[0_0_25px_rgba(255,80,0,0.7)] animate-flame-pulse'
                : 'bg-black/80 text-zinc-300 hover:text-white border border-white/15 hover:border-orange-500/50'
            }`}
          >
            {!isMuted ? (
              <Volume2 className="w-4 h-4 text-yellow-300 animate-bounce" />
            ) : (
              <VolumeX className="w-4 h-4 text-zinc-400" />
            )}
            <span>{!isMuted ? 'Sound ON 🔊' : 'Unmute Sizzle 🔇'}</span>
          </button>

          {/* Pause / Play button */}
          <button
            onClick={handleTogglePlay}
            className="p-2 sm:px-3 sm:py-2.5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 text-zinc-300 hover:text-white text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            title={isPlaying ? 'Pause Video' : 'Play Video'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-orange-400" />
            ) : (
              <Play className="w-4 h-4 text-orange-400" />
            )}
            <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
        </div>

        {/* Authentic Badge */}
        <div className="text-[10px] sm:text-xs text-orange-300 font-bold bg-black/85 backdrop-blur-md px-3 sm:px-4 py-2 rounded-2xl border border-orange-500/40 shadow-lg pointer-events-auto flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
          <span className="truncate">Coconut Shell Coal Roasted</span>
        </div>

      </div>
    </div>
  );
}

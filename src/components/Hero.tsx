"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

// Hoisted static SVG icons for better performance (rendering-hoist-jsx)
const targetIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const mapIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);

const shieldIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const playIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const pauseIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);

const volumeOnIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

const volumeOffIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

const calendarIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const replayIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

const valueBullets = [
  { icon: targetIcon, text: "Diagnóstico claro" },
  { icon: mapIcon, text: "Plan de acción" },
  { icon: shieldIcon, text: "Evitar errores caros" },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay blocked
      });
    }
  }, []);

  // Listen for external trigger to show booking
  useEffect(() => {
    const heroSection = document.getElementById("hero-section");
    const handleShowBooking = () => {
      setVideoEnded(true);
    };

    if (heroSection) {
      heroSection.addEventListener("showBooking", handleShowBooking);
      return () => {
        heroSection.removeEventListener("showBooking", handleShowBooking);
      };
    }
  }, []);

  // Update progress bar
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // Use useCallback for stable references (rerender-functional-setstate)
  const handleVideoEnd = useCallback(() => {
    setVideoEnded(true);
    setIsPlaying(false);
  }, []);

  const replayVideo = useCallback(() => {
    setVideoEnded(false);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        setIsPlaying(true);
      }
    }, 100);
  }, []);

  // Use functional setState to avoid dependency on isPlaying (rerender-functional-setstate)
  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      setIsPlaying(prev => {
        if (prev) {
          videoRef.current?.pause();
          return false;
        } else {
          videoRef.current?.play();
          return true;
        }
      });
    }
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
  }, []);

  // Use functional setState to avoid dependency on volume (rerender-functional-setstate)
  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      setVolume(prev => {
        if (prev === 0) {
          videoRef.current!.volume = 0.7;
          videoRef.current!.muted = false;
          return 0.7;
        } else {
          videoRef.current!.volume = 0;
          videoRef.current!.muted = true;
          return 0;
        }
      });
    }
  }, []);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const videoDuration = videoRef.current.duration;
    const newTime = percentage * videoDuration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(percentage * 100);
  }, []);

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-8 pt-20 pb-8 md:pt-24 md:pb-12">
      <AnimatePresence mode="wait">
        {!videoEnded ? (
          <motion.div
            key="video"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-4xl"
          >
            {/* Video Container */}
            <div
              className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#1A1A1A] shadow-2xl group"
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(true)}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover cursor-pointer"
                onEnded={handleVideoEnd}
                onClick={togglePlayPause}
                playsInline
                loop={false}
              >
                <source
                  src={process.env.NEXT_PUBLIC_VIDEO_URL || "https://qwcqi0m5tmjnro6h.public.blob.vercel-storage.com/video-placeholder.mp4"}
                  type="video/mp4"
                />
                Tu navegador no soporta el elemento de video.
              </video>

              {/* Video Controls */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: showControls ? 1 : 0 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-4 pt-10"
              >
                {/* Progress Bar */}
                <div
                  ref={progressRef}
                  onClick={handleProgressClick}
                  className="w-full h-1 bg-white/20 rounded-full cursor-pointer mb-3 group/progress"
                >
                  <div
                    className="h-full bg-white rounded-full relative transition-all"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Play/Pause */}
                    <button
                      onClick={togglePlayPause}
                      className="w-8 h-8 flex items-center justify-center text-white hover:text-white/80 transition-colors"
                    >
                      {isPlaying ? pauseIcon : playIcon}
                    </button>

                    {/* Volume */}
                    <div className="flex items-center gap-2 group/volume">
                      <button
                        onClick={toggleMute}
                        className="w-8 h-8 flex items-center justify-center text-white hover:text-white/80 transition-colors"
                      >
                        {volume === 0 ? volumeOffIcon : volumeOnIcon}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white opacity-0 group-hover/volume:opacity-100 transition-opacity"
                      />
                    </div>

                    {/* Time */}
                    <span className="text-white/70 text-xs font-mono">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Value Bullets below video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap justify-center gap-6 md:gap-10"
            >
              {valueBullets.map((bullet, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2 text-gray-400"
                >
                  <span className="text-white/60">
                    {bullet.icon}
                  </span>
                  <span className="text-sm">{bullet.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="booking"
            id="agenda"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-4xl"
          >
            <div className="text-center mb-4 md:mb-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3"
              >
                Agenda tu Consulta
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto"
              >
                Selecciona el horario que mejor se adapte a ti.
              </motion.p>
            </div>

            {/* Calendar Embed */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#1A1A1A] rounded-2xl p-4 md:p-6 border border-[#2A2A2A]"
            >
              <div className="min-h-[250px] md:min-h-[300px] flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#2A2A2A] flex items-center justify-center mb-4">
                  {calendarIcon}
                </div>
                <h3 className="text-base md:text-lg font-semibold text-white mb-2">
                  Calendario de Reservas
                </h3>
                <p className="text-gray-400 max-w-md mb-4 text-xs md:text-sm">
                  Aquí se integrará el calendario de Cal.com o Calendly.
                </p>
                <div className="text-xs text-gray-500 bg-[#2A2A2A] px-3 py-2 rounded-lg font-mono">
                  Reemplazar con embed de Cal.com
                </div>
              </div>
            </motion.div>

            {/* Replay video button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              onClick={replayVideo}
              className="mt-4 mx-auto flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              {replayIcon}
              Ver video nuevamente
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

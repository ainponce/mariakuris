"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [volume, setVolume] = useState(0);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {
        // Autoplay blocked
      });
    }
  }, []);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const replayVideo = () => {
    setVideoEnded(false);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }, 100);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (volume === 0) {
        setVolume(0.7);
        videoRef.current.volume = 0.7;
        videoRef.current.muted = false;
      } else {
        setVolume(0);
        videoRef.current.volume = 0;
        videoRef.current.muted = true;
      }
    }
  };

  return (
    <section className="h-screen w-screen flex flex-col items-center justify-center px-4 md:px-8 overflow-hidden">
      <AnimatePresence mode="wait">
        {!videoEnded ? (
          <motion.div
            key="video"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-5xl"
          >
            {/* Video Container */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#1A1A1A] shadow-2xl">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                onEnded={handleVideoEnd}
                playsInline
                loop={false}
              >
                <source
                  src="https://qwcqi0m5tmjnro6h.public.blob.vercel-storage.com/video-placeholder.mp4"
                  type="video/mp4"
                />
                Tu navegador no soporta el elemento de video.
              </video>

              {/* Volume Control Only */}
              <div
                className="absolute bottom-4 right-4 flex items-center gap-2 z-10"
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <AnimatePresence>
                  {showVolumeSlider && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "100px" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="overflow-hidden"
                    >
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {volume === 0 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </div>

          </motion.div>
        ) : (
          <motion.div
            key="booking"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-4xl"
          >
            <div className="text-center mb-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              >
                Agenda tu Consulta
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto"
              >
                Selecciona el horario que mejor se adapte a ti para una consulta personalizada.
              </motion.p>
            </div>

            {/* Calendar Embed */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#1A1A1A] rounded-2xl p-6 md:p-10 border border-[#2A2A2A]"
            >
              <div className="min-h-[350px] flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#2A2A2A] flex items-center justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                  Calendario de Reservas
                </h3>
                <p className="text-gray-400 max-w-md mb-5 text-sm">
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
              className="mt-6 mx-auto flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Ver video nuevamente
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

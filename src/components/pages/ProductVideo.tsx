"use client";

import { Play } from "lucide-react";
import { useRef, useState } from "react";

interface ProductVideoProps {
  src: string;
  poster: string;
  label: string;
  className?: string;
}

export function ProductVideo({ src, poster, label, className }: ProductVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function playWithSound() {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    video.muted = false;
    void video.play();
  }

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-slate-950 shadow-2xl shadow-violet-200/70 ${className ?? "mx-auto mt-8"}`}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-contain"
        controls
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
      {playing ? null : (
        <button
          type="button"
          onClick={playWithSound}
          aria-label={`Play ${label}`}
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-violet-300/80 transition-opacity hover:opacity-90"
        >
          <Play size={28} className="ml-1" fill="currentColor" />
        </button>
      )}
    </div>
  );
}

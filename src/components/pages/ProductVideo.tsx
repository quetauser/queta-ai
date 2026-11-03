"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ProductVideoProps {
  src?: string;
  poster?: string;
  label: string;
  className?: string;
  loop?: boolean;
  fit?: "contain" | "cover";
}

export function ProductVideo({
  src,
  poster,
  label,
  className,
  loop = false,
  fit = "contain",
}: ProductVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const srcRef = useRef(src);
  const [attached, setAttached] = useState(false);
  const [playing, setPlaying] = useState(false);

  srcRef.current = src;

  function attach(unmute: boolean) {
    const video = videoRef.current;
    if (!video || !srcRef.current) {
      return;
    }
    if (!video.getAttribute("src")) {
      video.preload = "auto";
      video.src = srcRef.current;
    }
    video.muted = !unmute;
    setAttached(true);
    void video.play();
  }

  useEffect(() => {
    const root = rootRef.current;
    const source = srcRef.current;
    if (!root || !source) {
      return;
    }
    let observer: IntersectionObserver | undefined;
    let cancelled = false;

    const watch = () => {
      if (cancelled) {
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) {
            return;
          }
          observer?.disconnect();
          const video = videoRef.current;
          if (!video || video.getAttribute("src")) {
            return;
          }
          video.preload = "auto";
          video.src = source;
          video.muted = true;
          setAttached(true);
          void video.play();
        },
        { rootMargin: "200px" },
      );
      observer.observe(root);
    };

    if (document.readyState === "complete") {
      watch();
    } else {
      window.addEventListener("load", watch, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", watch);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-slate-950 shadow-2xl shadow-violet-200/70 ${className ?? "mx-auto mt-8"}`}
      style={{ aspectRatio: "16 / 9" }}
    >
      {poster ? (
        <Image
          src={poster}
          alt=""
          width={1280}
          height={720}
          priority
          className={`absolute inset-0 h-full w-full object-cover ${playing ? "invisible" : ""}`}
        />
      ) : null}
      {src ? (
      <video
        ref={videoRef}
        className={`relative z-10 h-full w-full ${fit === "cover" ? "object-cover" : "object-contain"} ${attached ? "" : "pointer-events-none opacity-0"}`}
        controls={attached}
        playsInline
        muted
        loop={loop}
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      ) : null}
      {playing ? null : (
        <button
          type="button"
          onClick={() => attach(true)}
          aria-label={`Play ${label}`}
          className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-violet-300/80 transition-opacity hover:opacity-90"
        >
          <Play size={28} className="ml-1" fill="currentColor" />
        </button>
      )}
    </div>
  );
}

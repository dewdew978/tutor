"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Volume1, 
  Maximize, 
  Minimize, 
  Settings, 
  Sparkles,
  PictureInPicture2,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  RefreshCw,
  ShieldCheck,
  Lock
} from "lucide-react";

export interface VideoPlayerProps {
  src: string;
  title: string;
  poster?: string;
  autoPlay?: boolean;
  watermarkText?: string;
  onEnded?: () => void;
  onNextLesson?: () => void;
  nextLessonTitle?: string;
}

// Fallback high-availability MP4 streams
const FALLBACK_VIDEO_SOURCES = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
];

// Helper: Extract YouTube ID from any link format
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  }
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  return null;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

export function VideoPlayer({
  src,
  title,
  poster,
  autoPlay = false,
  watermarkText = "P'Toh Tutor • Verified Student",
  onEnded,
  onNextLesson,
  nextLessonTitle,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<any>(null);
  const ytIframeId = useRef(`yt-player-${Math.random().toString(36).substring(2, 9)}`);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const youtubeId = extractYouTubeId(src);
  const isYouTube = !!youtubeId;

  // Player States
  const [currentSrc, setCurrentSrc] = useState(src || FALLBACK_VIDEO_SOURCES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [quality, setQuality] = useState("1080p");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showEndedOverlay, setShowEndedOverlay] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number>(0);
  const [centerAnimation, setCenterAnimation] = useState<"play" | "pause" | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isYtReady, setIsYtReady] = useState(false);

  // Dynamic Floating Watermark Coordinates
  const [watermarkPos, setWatermarkPos] = useState({ top: "12%", left: "15%" });

  useEffect(() => {
    // Randomize watermark position every 12 seconds to prevent screen capture masking
    const interval = setInterval(() => {
      const top = Math.floor(Math.random() * 70 + 10) + "%";
      const left = Math.floor(Math.random() * 65 + 10) + "%";
      setWatermarkPos({ top, left });
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // Update source
  useEffect(() => {
    if (src) {
      setCurrentSrc(src);
      setHasError(false);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [src]);

  // Load YouTube IFrame API if YouTube URL is detected
  useEffect(() => {
    if (!isYouTube) return;

    let isMounted = true;

    const initYT = () => {
      if (!window.YT || !window.YT.Player) return;
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.destroy();
        } catch (e) {}
      }

      ytPlayerRef.current = new window.YT.Player(ytIframeId.current, {
        videoId: youtubeId,
        playerVars: {
          autoplay: autoPlay ? 1 : 0,
          controls: 0,           // Hide native controls
          modestbranding: 1,     // Minimal YouTube branding
          rel: 0,                // No unrelated videos
          disablekb: 1,          // Disable YouTube keyboard shortcuts
          fs: 0,                 // Disable YouTube native fullscreen
          iv_load_policy: 3,     // Hide annotations
          playsinline: 1,
          origin: typeof window !== "undefined" ? window.location.origin : undefined,
        },
        events: {
          onReady: (event: any) => {
            if (!isMounted) return;
            setIsYtReady(true);
            setDuration(event.target.getDuration() || 0);
            if (autoPlay) {
              event.target.playVideo();
              setIsPlaying(true);
            }
          },
          onStateChange: (event: any) => {
            if (!isMounted) return;
            if (event.data === 1) {
              setIsPlaying(true);
              setShowEndedOverlay(false);
            } else if (event.data === 2) {
              setIsPlaying(false);
            } else if (event.data === 0) {
              setIsPlaying(false);
              setShowEndedOverlay(true);
              if (onEnded) onEnded();
            }
          },
          onError: () => {
            if (isMounted) setHasError(true);
          }
        }
      });
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = () => {
        initYT();
      };
    } else if (window.YT && window.YT.Player) {
      initYT();
    }

    return () => {
      isMounted = false;
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.destroy();
        } catch (e) {}
      }
    };
  }, [youtubeId, isYouTube, autoPlay, onEnded]);

  // YouTube Poll current time
  useEffect(() => {
    if (!isYouTube || !isPlaying || !ytPlayerRef.current) return;
    const timer = setInterval(() => {
      try {
        if (ytPlayerRef.current?.getCurrentTime) {
          const t = ytPlayerRef.current.getCurrentTime();
          const d = ytPlayerRef.current.getDuration();
          setCurrentTime(t);
          if (d && d !== duration) setDuration(d);
        }
      } catch (e) {}
    }, 250);
    return () => clearInterval(timer);
  }, [isYouTube, isPlaying, duration]);

  // Format seconds to mm:ss or hh:mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return "00:00";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Safe Toggle Play / Pause
  const togglePlay = useCallback(async () => {
    if (isYouTube && ytPlayerRef.current) {
      try {
        if (isPlaying) {
          ytPlayerRef.current.pauseVideo();
          setIsPlaying(false);
          setCenterAnimation("pause");
        } else {
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
          setCenterAnimation("play");
          setShowEndedOverlay(false);
        }
      } catch (e) {}
      setTimeout(() => setCenterAnimation(null), 600);
      return;
    }

    if (!videoRef.current) return;
    try {
      if (videoRef.current.paused) {
        setHasError(false);
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
        setIsPlaying(true);
        setCenterAnimation("play");
        setShowEndedOverlay(false);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        setCenterAnimation("pause");
      }
    } catch (err) {
      console.warn("Video playback interrupted:", err);
      setIsPlaying(false);
    } finally {
      setTimeout(() => setCenterAnimation(null), 600);
    }
  }, [isYouTube, isPlaying]);

  // Jump relative time (e.g. -10s or +10s)
  const jumpTime = (seconds: number) => {
    if (isYouTube && ytPlayerRef.current) {
      try {
        const cur = ytPlayerRef.current.getCurrentTime() || 0;
        const target = Math.max(0, Math.min(duration, cur + seconds));
        ytPlayerRef.current.seekTo(target, true);
        setCurrentTime(target);
      } catch (e) {}
      return;
    }

    if (!videoRef.current) return;
    try {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
    } catch (err) {}
  };

  // Seek on scrubber click/drag
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;

    if (isYouTube && ytPlayerRef.current) {
      try {
        ytPlayerRef.current.seekTo(newTime, true);
        setCurrentTime(newTime);
      } catch (e) {}
      return;
    }

    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleScrubberMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverPosition(pos * 100);
    setHoverTime(pos * duration);
  };

  // Volume & Mute
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);

    if (isYouTube && ytPlayerRef.current) {
      try {
        ytPlayerRef.current.setVolume(newVolume * 100);
        if (newVolume === 0) ytPlayerRef.current.mute();
        else ytPlayerRef.current.unMute();
      } catch (e) {}
      return;
    }

    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      handleVolumeChange(volume === 0 ? 0.8 : volume);
    } else {
      setIsMuted(true);
      if (isYouTube && ytPlayerRef.current) {
        ytPlayerRef.current.mute();
      }
      if (videoRef.current) {
        videoRef.current.muted = true;
      }
    }
  };

  // Speed Change
  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    setShowSettingsMenu(false);

    if (isYouTube && ytPlayerRef.current) {
      try {
        ytPlayerRef.current.setPlaybackRate(speed);
      } catch (e) {}
      return;
    }

    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  // Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Hide Controls on Idle
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
        setShowSettingsMenu(false);
      }
    }, 3000);
  };

  // Countdown timer for next lesson overlay
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showEndedOverlay && countdown > 0 && onNextLesson) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (showEndedOverlay && countdown === 0 && onNextLesson) {
      onNextLesson();
      setShowEndedOverlay(false);
      setCountdown(5);
    }
    return () => clearInterval(timer);
  }, [showEndedOverlay, countdown, onNextLesson]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onContextMenu={(e) => e.preventDefault()} // Block right-click context menu
      className="group relative w-full h-full aspect-video bg-[#0C111D] select-none overflow-hidden rounded-2xl shadow-unt-xl flex items-center justify-center"
    >
      {/* ========================================================================= */}
      {/* 1. VIDEO SOURCE: YOUTUBE IFRAME OR HTML5 VIDEO                            */}
      {/* ========================================================================= */}
      {isYouTube ? (
        <div className="relative w-full h-full overflow-hidden pointer-events-none flex items-center justify-center">
          <div
            id={ytIframeId.current}
            className="w-full h-full aspect-video scale-[1.05]"
          />
        </div>
      ) : (
        <video
          ref={videoRef}
          src={currentSrc}
          poster={poster}
          playsInline
          onTimeUpdate={() => {
            if (videoRef.current) {
              setCurrentTime(videoRef.current.currentTime);
            }
          }}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setDuration(videoRef.current.duration);
            }
          }}
          onProgress={() => {
            if (videoRef.current && videoRef.current.buffered.length > 0) {
              const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
              setBuffered((bufferedEnd / (videoRef.current.duration || 1)) * 100);
            }
          }}
          onEnded={() => {
            setIsPlaying(false);
            setShowEndedOverlay(true);
            if (onEnded) onEnded();
          }}
          onError={() => setHasError(true)}
          className="h-full w-full object-contain cursor-pointer"
        />
      )}

      {/* ========================================================================= */}
      {/* 2. CUSTOM SHIELD OVERLAY (Blocks YouTube Click-Jacking & Copy Link)       */}
      {/* ========================================================================= */}
      <div
        onClick={togglePlay}
        onDoubleClick={toggleFullscreen}
        onContextMenu={(e) => {
          e.preventDefault(); // Prevents context menu from showing
        }}
        className="absolute inset-0 z-20 cursor-pointer bg-transparent"
        title="คลิกเพื่อ เล่น / หยุดวิดีโอ"
      />

      {/* ========================================================================= */}
      {/* 3. DYNAMIC ANTI-PIRACY WATERMARK (Floats to deter screen recording)      */}
      {/* ========================================================================= */}
      <div
        style={{ top: watermarkPos.top, left: watermarkPos.left }}
        className="absolute z-30 pointer-events-none opacity-25 select-none font-mono text-[11px] font-bold text-white bg-black/40 px-2.5 py-1 rounded-md border border-white/20 backdrop-blur-xs transition-all duration-1000 shadow-sm"
      >
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-[#12B76A]" />
          {watermarkText}
        </span>
      </div>

      {/* Shield Protection Badge (Subtle Top Left) */}
      <div className="absolute top-3 left-3 z-30 pointer-events-none opacity-40 select-none text-[10px] text-white flex items-center gap-1 font-semibold">
        <Lock className="h-3 w-3 text-[#7F56D9]" />
        <span>P&apos;Toh Shield DRM</span>
      </div>

      {/* ========================================================================= */}
      {/* 4. CENTER PLAY/PAUSE SPLASH ANIMATION                                     */}
      {/* ========================================================================= */}
      {centerAnimation && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#101828]/80 text-white backdrop-blur-md animate-ping duration-300">
            {centerAnimation === "play" ? (
              <Play className="h-8 w-8 fill-white ml-1" />
            ) : (
              <Pause className="h-8 w-8 fill-white" />
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. ERROR STATE OVERLAY & RETRY                                            */}
      {/* ========================================================================= */}
      {hasError && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0C111D]/95 text-white p-6 text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-[#F04438]" />
          <h3 className="text-base font-bold">ไม่สามารถโหลดวิดีโอได้ในขณะนี้</h3>
          <p className="text-xs text-[#98A2B3] max-w-sm">
            โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ต หรือกดปุ่มโหลดซ้ำ
          </p>
          <button
            onClick={() => {
              setHasError(false);
              setCurrentSrc(FALLBACK_VIDEO_SOURCES[0]);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-[#7F56D9] px-5 py-2.5 text-xs font-bold text-white shadow-unt-xs hover:bg-[#6941C6]"
          >
            <RefreshCw className="h-4 w-4" />
            โหลดซ้ำใหม่อีกครั้ง
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. END OF LESSON AUTO-NEXT OVERLAY                                        */}
      {/* ========================================================================= */}
      {showEndedOverlay && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0C111D]/90 text-white p-6 text-center space-y-4 backdrop-blur-xs">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#12B76A]/20 text-[#12B76A] border border-[#12B76A]/30">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold">เรียนจบบทนี้แล้ว เก่งมากครับ! 🎉</h3>

          {nextLessonTitle && onNextLesson && (
            <div className="space-y-3">
              <p className="text-xs text-[#98A2B3]">
                กำลังเล่นบทถัดไปใน <span className="font-bold text-[#7F56D9] font-mono text-sm">{countdown}</span> วินาที
              </p>
              <p className="text-xs font-semibold text-white max-w-md truncate">
                {nextLessonTitle}
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowEndedOverlay(false)}
                  className="rounded-xl border border-[#344054] px-4 py-2 text-xs font-semibold hover:bg-white/10"
                >
                  ดูบทนี้ซ้ำ
                </button>
                <button
                  onClick={() => {
                    onNextLesson();
                    setShowEndedOverlay(false);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#7F56D9] px-5 py-2 text-xs font-bold shadow-unt-xs hover:bg-[#6941C6]"
                >
                  <span>เล่นบทถัดไปทันที</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. CUSTOM VIDEO CONTROL BAR (Full Controller UI)                          */}
      {/* ========================================================================= */}
      <div
        className={`absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-12 pb-3 px-4 transition-all duration-300 ${
          showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()} // Keep controls interactive
      >
        {/* Progress Bar / Scrubber */}
        <div
          onClick={handleSeek}
          onMouseMove={handleScrubberMouseMove}
          onMouseLeave={() => setHoverTime(null)}
          className="group/scrub relative mb-3 h-1.5 w-full rounded-full bg-white/25 cursor-pointer hover:h-2.5 transition-all"
        >
          {/* Buffer Bar */}
          <div
            className="absolute top-0 bottom-0 left-0 rounded-full bg-white/40 transition-all"
            style={{ width: `${buffered}%` }}
          />

          {/* Played Progress Bar */}
          <div
            className="absolute top-0 bottom-0 left-0 rounded-full bg-[#7F56D9] transition-all"
            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
          >
            {/* Scrubber Knob */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-3.5 w-3.5 rounded-full bg-white shadow-md scale-0 group-hover/scrub:scale-100 transition-transform" />
          </div>

          {/* Time Hover Preview Tooltip */}
          {hoverTime !== null && (
            <div
              className="absolute -top-7 -translate-x-1/2 rounded bg-[#101828] px-2 py-0.5 text-[10px] font-mono font-bold text-white border border-[#344054] shadow-md pointer-events-none"
              style={{ left: `${hoverPosition}%` }}
            >
              {formatTime(hoverTime)}
            </div>
          )}
        </div>

        {/* Controls Toolbar Buttons */}
        <div className="flex items-center justify-between text-white text-xs">
          {/* Left Buttons: Play, Jump, Volume, Time */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              title={isPlaying ? "หยุดชั่วคราว (Space)" : "เล่น (Space)"}
            >
              {isPlaying ? <Pause className="h-4.5 w-4.5 fill-white" /> : <Play className="h-4.5 w-4.5 fill-white ml-0.5" />}
            </button>

            {/* Jump -10s */}
            <button
              onClick={() => jumpTime(-10)}
              className="p-1 text-white/80 hover:text-white transition-colors"
              title="ย้อนหลัง 10 วินาที"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            {/* Jump +10s */}
            <button
              onClick={() => jumpTime(10)}
              className="p-1 text-white/80 hover:text-white transition-colors"
              title="ข้ามไปข้างหน้า 10 วินาที"
            >
              <RotateCw className="h-4 w-4" />
            </button>

            {/* Volume Slider */}
            <div className="group/vol flex items-center gap-1.5 pl-1">
              <button
                onClick={toggleMute}
                className="p-1 text-white/80 hover:text-white"
                title={isMuted ? "เปิดเสียง" : "ปิดเสียง"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4 text-[#F04438]" />
                ) : volume < 0.5 ? (
                  <Volume1 className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-16 h-1 rounded-lg bg-white/20 accent-[#7F56D9] cursor-pointer"
              />
            </div>

            {/* Current Time / Duration Display */}
            <span className="font-mono text-[11px] text-white/80 font-semibold pl-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right Buttons: Speed, Settings, Fullscreen */}
          <div className="flex items-center gap-2.5 relative">
            {/* Playback Speed Pill Button */}
            <div className="relative">
              <button
                onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                className="flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-white/20 transition-colors"
              >
                <span>{playbackSpeed}x</span>
                <Settings className="h-3 w-3 text-white/70" />
              </button>

              {/* Speed / Quality Popover Menu */}
              {showSettingsMenu && (
                <div className="absolute right-0 bottom-9 w-44 rounded-2xl bg-[#101828] border border-[#344054] p-2 text-xs shadow-unt-2xl z-40 space-y-2">
                  <p className="px-2 pt-1 text-[10px] font-bold uppercase tracking-wider text-[#98A2B3]">
                    ความเร็วในการเล่น
                  </p>
                  <div className="grid grid-cols-3 gap-1">
                    {[0.75, 1, 1.25, 1.5, 1.75, 2].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => handleSpeedChange(spd)}
                        className={`rounded-lg py-1 text-center font-bold text-[11px] transition-colors ${
                          playbackSpeed === spd
                            ? "bg-[#7F56D9] text-white"
                            : "text-[#D0D5DD] hover:bg-white/10"
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>

                  <p className="px-2 pt-2 border-t border-[#344054] text-[10px] font-bold uppercase tracking-wider text-[#98A2B3]">
                    ความละเอียด
                  </p>
                  <div className="space-y-0.5">
                    {["1080p (60fps)", "720p HD", "Auto"].map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setQuality(q);
                          setShowSettingsMenu(false);
                        }}
                        className={`w-full text-left px-2 py-1 rounded-md text-[11px] flex items-center justify-between ${
                          quality.startsWith(q.substring(0, 4))
                            ? "text-[#7F56D9] font-bold bg-[#7F56D9]/10"
                            : "text-[#D0D5DD] hover:bg-white/5"
                        }`}
                      >
                        <span>{q}</span>
                        {quality.startsWith(q.substring(0, 4)) && <CheckCircle2 className="h-3 w-3 text-[#7F56D9]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              title={isFullscreen ? "ออกจากเต็มจอ (F)" : "เต็มหน้าจอ (F)"}
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

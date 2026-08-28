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
  RefreshCw
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

export function VideoPlayer({
  src,
  title,
  poster,
  autoPlay = false,
  watermarkText = "P'Toh Tutor • ID: 10482",
  onEnded,
  onNextLesson,
  nextLessonTitle,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Update src when prop changes
  useEffect(() => {
    if (src) {
      setCurrentSrc(src);
      setHasError(false);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [src]);

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
      console.warn("Video playback was prevented or interrupted:", err);
      setIsPlaying(false);
    } finally {
      setTimeout(() => setCenterAnimation(null), 600);
    }
  }, []);

  // Jump relative time (e.g. -10s or +10s)
  const jumpTime = (seconds: number) => {
    if (!videoRef.current) return;
    try {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
    } catch (err) {
      console.warn("Seek error:", err);
    }
  };

  // Seek on scrubber click/drag
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || duration === 0) return;
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const newTime = pos * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    } catch (err) {
      console.warn("Seek error:", err);
    }
  };

  const handleScrubberMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverPosition(pos * 100);
    setHoverTime(pos * duration);
  };

  // Volume change
  const handleVolumeChange = (newVol: number) => {
    if (!videoRef.current) return;
    try {
      setVolume(newVol);
      videoRef.current.volume = newVol;
      setIsMuted(newVol === 0);
    } catch (err) {
      console.warn("Volume error:", err);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    try {
      if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
        videoRef.current.volume = volume || 1;
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    } catch (err) {
      console.warn("Mute error:", err);
    }
  };

  // Playback Speed
  const handleSpeedSelect = (speed: number) => {
    if (!videoRef.current) return;
    try {
      setPlaybackSpeed(speed);
      videoRef.current.playbackRate = speed;
      setShowSettingsMenu(false);
    } catch (err) {
      console.warn("Playback rate error:", err);
    }
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
      } else {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    } catch (err) {
      console.warn("Fullscreen error:", err);
    }
  };

  // Picture in Picture
  const togglePiP = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      console.warn("PiP error:", err);
    }
  };

  // Handle Video Error & Fallback
  const handleVideoError = () => {
    console.warn("Video source failed to load:", currentSrc);
    if (currentSrc !== FALLBACK_VIDEO_SOURCES[1]) {
      // Try secondary fallback
      setCurrentSrc(FALLBACK_VIDEO_SOURCES[1]);
    } else {
      setHasError(true);
    }
  };

  // Controls Visibility on Mouse Activity
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
        setShowSettingsMenu(false);
      }, 3000);
    }
  };

  // Listen to video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime || 0);
      if (video.buffered.length > 0 && video.duration > 0) {
        setBuffered((video.buffered.end(video.buffered.length - 1) / video.duration) * 100);
      }
    };

    const onLoadedMetadata = () => {
      setDuration(video.duration || 0);
      setHasError(false);
    };

    const handleVideoEnd = () => {
      setIsPlaying(false);
      setShowEndedOverlay(true);
      onEnded?.();
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("ended", handleVideoEnd);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [onEnded, currentSrc]);

  // Keyboard Shortcuts (Space, K, Left, Right, F, M)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) return;

      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "arrowleft":
        case "j":
          e.preventDefault();
          jumpTime(-10);
          break;
        case "arrowright":
        case "l":
          e.preventDefault();
          jumpTime(10);
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "m":
          e.preventDefault();
          toggleMute();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, duration]);

  // Auto-advance countdown on ended
  useEffect(() => {
    if (!showEndedOverlay || !onNextLesson) return;
    setCountdown(5);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onNextLesson();
          setShowEndedOverlay(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showEndedOverlay, onNextLesson]);

  const playedPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="group relative aspect-video w-full max-w-5xl rounded-2xl overflow-hidden bg-[#0C111D] shadow-unt-2xl border border-[#344054] select-none flex items-center justify-center"
    >
      {/* HTML5 Video Element with source and error handling */}
      {!hasError ? (
        <video
          ref={videoRef}
          key={currentSrc}
          poster={poster}
          playsInline
          preload="metadata"
          onError={handleVideoError}
          onClick={togglePlay}
          className="h-full w-full object-contain cursor-pointer"
        >
          <source src={currentSrc} type="video/mp4" />
          <p className="text-xs text-white p-4">บราวเซอร์ของคุณไม่รองรับการเล่นวิดีโอ HTML5</p>
        </video>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[#FDB022]">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h4 className="text-sm font-bold">วิดีโอตัวอย่างกำลังโหลดใหม่อีกครั้ง</h4>
          <p className="text-xs text-[#98A2B3] max-w-md">
            หากเครือข่ายอินเทอร์เน็ตมีการติดขัด สามารถกดปุ่มโหลดซ้ำเพื่อดึงข้อมูลคลิปบทเรียน
          </p>
          <button
            onClick={() => {
              setHasError(false);
              setCurrentSrc(FALLBACK_VIDEO_SOURCES[0]);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#7F56D9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#6941C6] shadow-unt-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            โหลดวิดีโอใหม่อีกครั้ง
          </button>
        </div>
      )}

      {/* Floating Anti-Piracy Watermark (Untitled UI Style) */}
      <div className="absolute top-4 right-4 pointer-events-none opacity-40 hover:opacity-10 transition-opacity">
        <span className="rounded bg-black/40 px-2 py-0.5 text-[10px] font-mono font-medium text-white/80 backdrop-blur-xs">
          {watermarkText}
        </span>
      </div>

      {/* Center Animated Play/Pause Feedback Icon */}
      {centerAnimation && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-in zoom-in-75 fade-in duration-200">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md">
            {centerAnimation === "play" ? (
              <Play className="h-8 w-8 fill-white ml-1" />
            ) : (
              <Pause className="h-8 w-8 fill-white" />
            )}
          </div>
        </div>
      )}

      {/* End-of-Video Next Lesson Overlay */}
      {showEndedOverlay && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/85 backdrop-blur-sm p-6 text-white text-center animate-in fade-in duration-300">
          <div className="max-w-md space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#ECFDF3] text-[#12B76A]">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold">เรียนจบบทเรียนนี้แล้ว 🎉</h3>
            <p className="text-xs text-[#D0D5DD]">
              กำลังจะเล่นบทถัดไป: <strong>{nextLessonTitle || "บทเรียนถัดไป"}</strong> ในอีก {countdown} วินาที
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setShowEndedOverlay(false);
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    videoRef.current.play().catch(() => {});
                    setIsPlaying(true);
                  }
                }}
                className="rounded-lg border border-[#475467] bg-[#1D2939] px-4 py-2 text-xs font-semibold text-white hover:bg-[#344054]"
              >
                <RotateCcw className="inline h-3.5 w-3.5 mr-1" /> ดูบทนี้ซ้ำ
              </button>
              {onNextLesson && (
                <button
                  onClick={() => {
                    setShowEndedOverlay(false);
                    onNextLesson();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#7F56D9] px-5 py-2 text-xs font-bold text-white hover:bg-[#6941C6] shadow-unt-xs"
                >
                  เล่นบทถัดไปทันที <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Glassmorphic Controls Bar */}
      <div
        className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 pt-8 pb-3 transition-opacity duration-300 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Interactive Seekbar / Scrubber with Hover Tooltip */}
        <div
          onClick={handleSeek}
          onMouseMove={handleScrubberMouseMove}
          onMouseLeave={() => setHoverTime(null)}
          className="group/scrubber relative h-1.5 hover:h-2.5 w-full cursor-pointer rounded-full bg-white/20 transition-all mb-3"
        >
          {/* Buffer Progress Bar */}
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-white/30 transition-all duration-300"
            style={{ width: `${buffered}%` }}
          />

          {/* Played Progress Bar (Untitled UI Signature Purple) */}
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-[#7F56D9] relative"
            style={{ width: `${playedPercentage}%` }}
          >
            {/* Scrubber Knob */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-white shadow-unt-md opacity-0 group-hover/scrubber:opacity-100 transition-opacity" />
          </div>

          {/* Hover Time Tooltip */}
          {hoverTime !== null && (
            <div
              className="absolute -top-7 -translate-x-1/2 rounded bg-black/90 px-1.5 py-0.5 text-[10px] font-mono font-bold text-white shadow-unt-xs pointer-events-none border border-white/10"
              style={{ left: `${hoverPosition}%` }}
            >
              {formatTime(hoverTime)}
            </div>
          )}
        </div>

        {/* Control Buttons Row */}
        <div className="flex items-center justify-between text-white text-xs">
          {/* Left Controls: Play, Jump 10s, Volume, Time */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title={isPlaying ? "หยุดชั่วคราว (Space)" : "เล่นต่อ (Space)"}
            >
              {isPlaying ? <Pause className="h-4 w-4 fill-white" /> : <Play className="h-4 w-4 fill-white ml-0.5" />}
            </button>

            {/* Jump -10s */}
            <button
              onClick={() => jumpTime(-10)}
              className="text-white/80 hover:text-white transition-colors hidden sm:block cursor-pointer"
              title="ย้อนหลัง 10 วินาที (←)"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            {/* Jump +10s */}
            <button
              onClick={() => jumpTime(10)}
              className="text-white/80 hover:text-white transition-colors hidden sm:block cursor-pointer"
              title="ไปข้างหน้า 10 วินาที (→)"
            >
              <RotateCw className="h-4 w-4" />
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-1.5 group/volume">
              <button
                onClick={toggleMute}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
                title="เปิด/ปิดเสียง (M)"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4 text-red-400" />
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
                className="w-14 sm:w-18 h-1 bg-white/20 accent-[#7F56D9] rounded-lg cursor-pointer hidden group-hover/volume:inline-block transition-all"
              />
            </div>

            {/* Time Stamp */}
            <div className="text-[11px] font-mono text-white/90">
              <span>{formatTime(currentTime)}</span>
              <span className="text-white/40 mx-1">/</span>
              <span className="text-white/60">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right Controls: Speed, Quality, PiP, Fullscreen */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Speed Selector Pill */}
            <div className="relative">
              <button
                onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                className="rounded-md bg-white/10 hover:bg-white/20 px-2 py-1 text-[11px] font-bold text-white transition-colors flex items-center gap-1 cursor-pointer"
                title="ความเร็วในการเล่น"
              >
                <span>{playbackSpeed}x</span>
              </button>

              {/* Speed Popover */}
              {showSettingsMenu && (
                <div className="absolute right-0 bottom-8 z-40 w-28 rounded-xl border border-[#344054] bg-[#1D2939] p-1 shadow-unt-xl animate-in fade-in-0 zoom-in-95 duration-150">
                  <div className="px-2 py-1 text-[10px] font-bold text-[#98A2B3] uppercase">
                    ความเร็วเสียง
                  </div>
                  {[0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSpeedSelect(s)}
                      className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs transition-colors ${
                        playbackSpeed === s
                          ? "bg-[#7F56D9] text-white font-bold"
                          : "text-[#D0D5DD] hover:bg-[#344054]"
                      }`}
                    >
                      <span>{s}x</span>
                      {playbackSpeed === s && <span className="text-[10px]">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Resolution Badge */}
            <span className="hidden sm:inline-block rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-[#75E0A7] border border-white/10">
              {quality} HD
            </span>

            {/* Picture in Picture */}
            <button
              onClick={togglePiP}
              className="text-white/80 hover:text-white transition-colors hidden sm:block cursor-pointer"
              title="ย่อหน้าต่างลอย (PiP)"
            >
              <PictureInPicture2 className="h-4 w-4" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="text-white/80 hover:text-white transition-colors p-1 cursor-pointer"
              title={isFullscreen ? "ออกจากเต็มจอ (F)" : "ดูแบบเต็มจอ (F)"}
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

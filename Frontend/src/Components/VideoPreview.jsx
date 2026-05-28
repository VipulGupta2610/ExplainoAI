import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";
import { api } from "../api/axios";

export default function VideoPreview({
  script,
  voiceFile,
  videoType,
  niche,
  topic,
  showSubtitles = true,
  highlightKeywords = true,
  backgroundMusic = false,
  style = "Formal",
}) {
  const audioRef = useRef(null);
  const captureRef = useRef(null);
  const musicRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const scriptText = `
${script?.hook || ""}
${script?.main_explanation || ""}
${script?.example || ""}
${script?.summary || ""}
${script?.ending_cta || ""}
`;

  const splitScriptIntoSentences = (text) => {
    const normalizedText = text.replace(/\s+/g, " ").trim();
    const matches = normalizedText.match(/[^.!?]+[.!?]+|[^.!?]+$/g);

    return (matches || [normalizedText])
      .map((sentence) => sentence.trim())
      .filter(Boolean);
  };

  const createSubtitleCaptions = (text) => {
    const maxWordsPerCaption = videoType === "full" ? 8 : 6;
    const captions = [];

    splitScriptIntoSentences(text).forEach((sentence) => {
      const words = sentence.split(/\s+/).filter(Boolean);

      for (let index = 0; index < words.length; index += maxWordsPerCaption) {
        captions.push(words.slice(index, index + maxWordsPerCaption).join(" "));
      }
    });

    return captions.length ? captions : ["Your AI video preview will appear here"];
  };

  const captions = createSubtitleCaptions(scriptText);

  const getSubtitleIndexForTime = (currentTime, duration) => {
    if (!captions.length) return 0;

    const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 1;
    const elapsedRatio = Math.min(Math.max(currentTime / safeDuration, 0), 1);
    const captionWeights = captions.map((caption) => {
      const wordCount = caption.split(/\s+/).filter(Boolean).length;
      return Math.max(wordCount, 1);
    });
    const totalWeight = captionWeights.reduce((sum, weight) => sum + weight, 0);
    const elapsedWeight = elapsedRatio * totalWeight;
    let runningWeight = 0;

    for (let index = 0; index < captionWeights.length; index += 1) {
      runningWeight += captionWeights[index];

      if (elapsedWeight <= runningWeight) {
        return index;
      }
    }

    return captions.length - 1;
  };

  const getBackgroundTheme = () => {
    switch (niche) {
      case "Education":
        return "from-blue-950 via-slate-900 to-cyan-900";
      case "Technology":
        return "from-black via-purple-900 to-indigo-900";
      case "Motivation":
        return "from-black via-orange-800 to-yellow-700";
      case "Finance":
        return "from-black via-green-800 to-emerald-700";
      default:
        return "from-slate-950 via-slate-900 to-black";
    }
  };

  const getCanvasTheme = () => {
    switch (niche) {
      case "Education":
        return ["#172554", "#0f172a", "#164e63"];
      case "Technology":
        return ["#020617", "#581c87", "#312e81"];
      case "Motivation":
        return ["#020617", "#9a3412", "#a16207"];
      case "Finance":
        return ["#020617", "#166534", "#047857"];
      default:
        return ["#020617", "#0f172a", "#000000"];
    }
  };

  const getVideoLayout = () => {
    if (videoType === "full") {
      return "w-full h-[500px]";
    }

    return "w-full h-[700px]";
  };

  const getTextSize = () => {
    if (videoType === "full") {
      return "text-xl md:text-2xl";
    }

    return "text-2xl md:text-3xl";
  };

  const getHighlightWords = () => {
    return new Set(
      (topic || "")
        .split(/\s+/)
        .map((word) => word.toLowerCase())
        .filter((word) => word.length > 3)
    );
  };

  const renderSubtitleText = (sentence) => {
    if (!showSubtitles) return null;

    if (!highlightKeywords) {
      return sentence || "Your AI video preview will appear here";
    }

    const highlightWords = getHighlightWords();

    return (sentence || "Your AI video preview will appear here")
      .split(/(\s+)/)
      .map((word, index) => {
        const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, "");
        const shouldHighlight =
          highlightWords.has(cleanWord) ||
          (cleanWord.length > 7 && index % 3 === 0);

        if (!shouldHighlight) return word;

        return (
          <span key={`${word}-${index}`} className="text-yellow-300">
            {word}
          </span>
        );
      });
  };

  const getPreviewCaptionLines = (caption) => {
    const words = (caption || "Your AI video preview will appear here")
      .split(/\s+/)
      .filter(Boolean);
    const midpoint = Math.ceil(words.length / 2);

    if (words.length <= 4) {
      return [words.join(" ")];
    }

    return [
      words.slice(0, midpoint).join(" "),
      words.slice(midpoint).join(" "),
    ].filter(Boolean);
  };

  const renderSpeakerCharacter = () => {
    const isTalking = isPlaying && showSubtitles;

    return (
      <div className="absolute inset-x-0 bottom-14 z-0 flex justify-center pointer-events-none">
        <div className={`relative h-[520px] w-[420px] max-w-[96%] ${isTalking ? "animate-pulse" : ""}`}>
          <div className="absolute left-1/2 top-6 h-52 w-52 -translate-x-1/2 rounded-full bg-amber-200 border-[7px] border-amber-900 shadow-2xl">
            <div className="absolute left-12 top-20 h-6 w-6 rounded-full bg-slate-900"></div>
            <div className="absolute right-12 top-20 h-6 w-6 rounded-full bg-slate-900"></div>
            <div className="absolute left-10 top-14 h-3 w-14 -rotate-6 rounded-full bg-amber-900/70"></div>
            <div className="absolute right-10 top-14 h-3 w-14 rotate-6 rounded-full bg-amber-900/70"></div>
            <div className="absolute left-1/2 top-[132px] h-7 w-20 -translate-x-1/2 rounded-b-full border-b-[8px] border-red-900"></div>
            <div className="absolute -left-5 top-[88px] h-14 w-9 rounded-full bg-amber-200 border-4 border-amber-900"></div>
            <div className="absolute -right-5 top-[88px] h-14 w-9 rounded-full bg-amber-200 border-4 border-amber-900"></div>
          </div>

          <div className="absolute left-1/2 top-52 h-60 w-72 -translate-x-1/2 rounded-t-[92px] rounded-b-[42px] bg-blue-500 border-[7px] border-blue-950 shadow-2xl"></div>
          <div className="absolute left-1/2 top-64 h-20 w-36 -translate-x-1/2 rounded-full bg-white/20"></div>
          <div className="absolute left-2 top-60 h-36 w-14 -rotate-[30deg] rounded-full bg-amber-200 border-[7px] border-amber-900"></div>
          <div className="absolute right-0 top-42 h-40 w-14 rotate-[34deg] rounded-full bg-amber-200 border-[7px] border-amber-900"></div>
          <div className="absolute right-1 top-35 h-16 w-16 rounded-full bg-amber-200 border-[7px] border-amber-900"></div>
          <div className="absolute left-1/2 bottom-0 h-28 w-24 -translate-x-[105px] rounded-t-3xl bg-slate-900"></div>
          <div className="absolute left-1/2 bottom-0 h-28 w-24 translate-x-[10px] rounded-t-3xl bg-slate-900"></div>

          {isTalking && (
            <>
              <div className="absolute right-12 top-20 h-4 w-16 rotate-[-18deg] rounded-full bg-yellow-300/80"></div>
              <div className="absolute right-3 top-36 h-4 w-20 rotate-[9deg] rounded-full bg-cyan-200/80"></div>
              <div className="absolute left-10 top-28 h-4 w-14 rotate-[16deg] rounded-full bg-white/70"></div>
            </>
          )}
        </div>
      </div>
    );
  };

  const getVoiceUrl = () => {
    if (!voiceFile) return "";

    if (/^https?:\/\//i.test(voiceFile)) {
      return voiceFile;
    }

    const baseUrl = api.defaults.baseURL || window.location.origin;
    const cleanPath = voiceFile.replace(/\\/g, "/").replace(/^\/+/, "");

    return new URL(cleanPath, baseUrl).href;
  };

  const getSafeFileName = () => {
    return (
      (topic || "ExplainoAI-video")
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
        .trim() || "ExplainoAI-video"
    );
  };

  const getMimeType = () => {
    const types = [
      "video/webm;codecs=vp9,opus",
      "video/webm;codecs=vp8,opus",
      "video/webm",
    ];

    return types.find((type) => MediaRecorder.isTypeSupported(type)) || "";
  };

  const getWrappedLines = (ctx, text, maxWidth) => {
    const words = text.split(" ");
    const lines = [];
    let line = "";

    words.forEach((word) => {
      const testLine = line ? `${line} ${word}` : word;

      if (ctx.measureText(testLine).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = testLine;
      }
    });

    if (line) lines.push(line);

    return lines;
  };

  const drawWrappedText = (ctx, text, x, y, maxWidth, lineHeight, maxLines = 4) => {
    let lines = getWrappedLines(ctx, text, maxWidth);
    let fontSize = Number(ctx.font.match(/(\d+)px/)?.[1] || 48);

    while (lines.length > maxLines && fontSize > 30) {
      fontSize -= 4;
      ctx.font = ctx.font.replace(/\d+px/, `${fontSize}px`);
      lineHeight = fontSize * 1.45;
      lines = getWrappedLines(ctx, text, maxWidth);
    }

    if (lines.length > maxLines) {
      lines = lines.slice(0, maxLines);
      lines[maxLines - 1] = `${lines[maxLines - 1].replace(/\s+\S*$/, "")}...`;
    }

    const startY = y - ((lines.length - 1) * lineHeight) / 2;
    ctx.shadowColor = "rgba(0, 0, 0, 0.42)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 6;
    lines.forEach((lineText, index) => {
      ctx.fillText(lineText, x, startY + index * lineHeight);
    });
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
  };

  const drawSubtitlePanel = (ctx, canvas, caption) => {
    if (!showSubtitles) return;

    const isFullVideo = videoType === "full";
    const panelWidth = canvas.width * (isFullVideo ? 0.72 : 0.82);
    const panelHeight = canvas.height * (isFullVideo ? 0.18 : 0.14);
    const panelX = (canvas.width - panelWidth) / 2;
    const panelY = canvas.height * (isFullVideo ? 0.68 : 0.72);
    const radius = 28;
    const fontSize = isFullVideo ? 58 : 68;
    const lineHeight = fontSize * 1.18;
    const lines = getPreviewCaptionLines(caption).slice(0, 2);

    ctx.beginPath();
    ctx.roundRect(panelX, panelY, panelWidth, panelHeight, radius);
    ctx.fillStyle = "rgba(0, 0, 0, 0.58)";
    ctx.fill();

    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = `800 ${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = highlightKeywords ? "#fde047" : "#ffffff";
    ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;

    const firstLineY = panelY + panelHeight / 2 - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, firstLineY + index * lineHeight);
    });

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
  };

  const drawSpeakerCharacter = (ctx, canvas, talkPhase = 0) => {
    const scale = videoType === "full" ? canvas.width / 1920 : canvas.width / 1080;
    const centerX = canvas.width / 2;
    const bob = Math.sin(talkPhase * Math.PI * 2) * 8 * scale;
    const baseY = canvas.height * (videoType === "full" ? 0.88 : 0.84) + bob;
    const headRadius = 178 * scale;
    const headY = baseY - 520 * scale;
    const bodyY = baseY - 320 * scale;

    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
    ctx.shadowBlur = 42 * scale;
    ctx.shadowOffsetY = 22 * scale;

    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    ctx.beginPath();
    ctx.ellipse(centerX, baseY + 8 * scale, 390 * scale, 54 * scale, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#3b82f6";
    ctx.strokeStyle = "#172554";
    ctx.lineWidth = 12 * scale;
    ctx.beginPath();
    ctx.roundRect(
      centerX - 235 * scale,
      bodyY,
      470 * scale,
      390 * scale,
      120 * scale
    );
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f8d28b";
    ctx.strokeStyle = "#78350f";
    ctx.lineWidth = 11 * scale;

    ctx.beginPath();
    ctx.roundRect(
      centerX - 360 * scale,
      bodyY + 80 * scale,
      95 * scale,
      265 * scale,
      48 * scale
    );
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.roundRect(
      centerX + 265 * scale,
      bodyY - 95 * scale,
      95 * scale,
      285 * scale,
      48 * scale
    );
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX + 340 * scale, bodyY - 115 * scale, 54 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
    ctx.beginPath();
    ctx.ellipse(centerX, bodyY + 135 * scale, 125 * scale, 62 * scale, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, headY, headRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX - 188 * scale, headY + 14 * scale, 42 * scale, 0, Math.PI * 2);
    ctx.arc(centerX + 188 * scale, headY + 14 * scale, 42 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(centerX - 72 * scale, headY - 18 * scale, 20 * scale, 0, Math.PI * 2);
    ctx.arc(centerX + 72 * scale, headY - 18 * scale, 20 * scale, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#78350f";
    ctx.lineWidth = 13 * scale;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(centerX - 118 * scale, headY - 82 * scale);
    ctx.lineTo(centerX - 38 * scale, headY - 92 * scale);
    ctx.moveTo(centerX + 38 * scale, headY - 92 * scale);
    ctx.lineTo(centerX + 118 * scale, headY - 82 * scale);
    ctx.stroke();

    ctx.strokeStyle = "#7f1d1d";
    ctx.lineWidth = 12 * scale;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(centerX, headY + 62 * scale, 62 * scale, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();

    if (talkPhase > 0) {
      ctx.strokeStyle = "rgba(253, 224, 71, 0.75)";
      ctx.lineWidth = 12 * scale;
      ctx.beginPath();
      ctx.moveTo(centerX + 255 * scale, headY - 110 * scale);
      ctx.lineTo(centerX + 345 * scale, headY - 150 * scale);
      ctx.moveTo(centerX + 278 * scale, headY - 32 * scale);
      ctx.lineTo(centerX + 390 * scale, headY - 20 * scale);
      ctx.moveTo(centerX - 255 * scale, headY - 60 * scale);
      ctx.lineTo(centerX - 340 * scale, headY - 92 * scale);
      ctx.stroke();
    }

    ctx.restore();
  };

  const drawVideoFrame = (ctx, canvas, caption, talkPhase = 0) => {
    const [start, middle, end] = getCanvasTheme();
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    gradient.addColorStop(0, start);
    gradient.addColorStop(0.5, middle);
    gradient.addColorStop(1, end);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const glowOne = ctx.createRadialGradient(
      canvas.width * 0.2,
      canvas.height * 0.2,
      0,
      canvas.width * 0.2,
      canvas.height * 0.2,
      canvas.width * 0.35
    );
    glowOne.addColorStop(0, "rgba(59, 130, 246, 0.34)");
    glowOne.addColorStop(1, "rgba(59, 130, 246, 0)");
    ctx.fillStyle = glowOne;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const glowTwo = ctx.createRadialGradient(
      canvas.width * 0.82,
      canvas.height * 0.82,
      0,
      canvas.width * 0.82,
      canvas.height * 0.82,
      canvas.width * 0.36
    );
    glowTwo.addColorStop(0, "rgba(168, 85, 247, 0.32)");
    glowTwo.addColorStop(1, "rgba(168, 85, 247, 0)");
    ctx.fillStyle = glowTwo;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const padding = canvas.width * 0.07;
    const titleSize = videoType === "full" ? 44 : 56;
    const subtitleSize = videoType === "full" ? 20 : 30;

    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.font = `700 ${titleSize}px Arial, sans-serif`;
    ctx.fillStyle = "#60a5fa";
    ctx.fillText(topic || "Explaino AI", padding, padding);

    ctx.font = `500 ${subtitleSize}px Arial, sans-serif`;
    ctx.fillStyle = "rgba(229, 231, 235, 0.9)";
    ctx.fillText("Premium AI Video Generator", padding, padding + titleSize + 16);

    ctx.font = `500 ${subtitleSize}px Arial, sans-serif`;
    ctx.fillStyle = backgroundMusic
      ? "rgba(191, 219, 254, 0.9)"
      : "rgba(229, 231, 235, 0.9)";
    ctx.fillText(
      `${style} style${backgroundMusic ? " with soft background music" : ""}`,
      padding,
      padding + titleSize + subtitleSize + 34
    );

    drawSpeakerCharacter(ctx, canvas, talkPhase);
    drawSubtitlePanel(ctx, canvas, caption || "Your AI video preview will appear here");
  };

  const stopBackgroundMusic = () => {
    if (!musicRef.current) return;

    musicRef.current.oscillator.stop();
    musicRef.current.oscillator.disconnect();
    musicRef.current.gain.disconnect();
    musicRef.current.audioContext.close();
    musicRef.current = null;
  };

  const startBackgroundMusic = () => {
    if (!backgroundMusic || musicRef.current) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = niche === "Motivation" ? 196 : 164.81;
    gain.gain.value = 0.025;
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();

    musicRef.current = {
      audioContext,
      oscillator,
      gain,
    };
  };

  const handlePlay = () => {
    if (!voiceFile || !audioRef.current) return;

    if (isPaused) {
      audioRef.current.play();
      startBackgroundMusic();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    setCurrentIndex(0);
    setIsPlaying(true);
    setIsPaused(false);

    audioRef.current.currentTime = 0;
    audioRef.current.play();
    startBackgroundMusic();
  };

  useEffect(() => {
    let animationFrame;

    const syncSubtitle = () => {
      const audio = audioRef.current;

      if (!audio) return;

      const calculatedIndex = getSubtitleIndexForTime(
        audio.currentTime,
        audio.duration
      );

      setCurrentIndex(calculatedIndex);

      if (audio.ended) {
        setIsPlaying(false);
        setIsPaused(false);
        stopBackgroundMusic();
        return;
      }

      animationFrame = requestAnimationFrame(syncSubtitle);
    };

    if (isPlaying && captions.length > 0 && audioRef.current) {
      syncSubtitle();
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, captions.length]);

  useEffect(() => {
    return () => stopBackgroundMusic();
  }, []);

  const downloadFallbackImage = async () => {
    const canvas = await html2canvas(captureRef.current, {
      useCORS: true,
      scale: 3,
      backgroundColor: null,
      logging: false,
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${getSafeFileName()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadFinalVideo = async () => {
    try {
      if (!captureRef.current) {
        toast.error("Preview not found");
        return;
      }

      if (!voiceFile) {
        toast.error("Generate voice before downloading", {
          id: "download-toast",
        });
        return;
      }

      setIsDownloading(true);
      toast.loading("Preparing video download...", {
        id: "download-toast",
      });

      if (!window.MediaRecorder || !HTMLCanvasElement.prototype.captureStream) {
        await downloadFallbackImage();
        toast.success("Video export is not supported here. Image downloaded.", {
          id: "download-toast",
        });
        return;
      }

      const canvas = document.createElement("canvas");
      const isFullVideo = videoType === "full";
      canvas.width = isFullVideo ? 1920 : 1080;
      canvas.height = isFullVideo ? 1080 : 1920;

      const ctx = canvas.getContext("2d");
      const stream = canvas.captureStream(30);
      const audio = new Audio(getVoiceUrl());
      audio.crossOrigin = "anonymous";
      audio.preload = "auto";

      await new Promise((resolve, reject) => {
        audio.onloadedmetadata = resolve;
        audio.onerror = () => reject(new Error("Unable to load voice audio"));
        audio.load();
      });

      let audioContext;
      let audioSource;
      let audioDestination;
      const audioStream =
        typeof audio.captureStream === "function"
          ? audio.captureStream()
          : typeof audio.mozCaptureStream === "function"
            ? audio.mozCaptureStream()
            : null;

      if (audioStream) {
        audioStream.getAudioTracks().forEach((track) => {
          stream.addTrack(track);
        });
      } else if (window.AudioContext || window.webkitAudioContext) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContextClass();
        audioSource = audioContext.createMediaElementSource(audio);
        audioDestination = audioContext.createMediaStreamDestination();
        audioSource.connect(audioDestination);
        audioSource.connect(audioContext.destination);
        audioDestination.stream.getAudioTracks().forEach((track) => {
          stream.addTrack(track);
        });
      }

      let musicContext;
      let musicOscillator;
      let musicGain;
      let musicDestination;

      if (backgroundMusic && (window.AudioContext || window.webkitAudioContext)) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        musicContext = new AudioContextClass();
        musicOscillator = musicContext.createOscillator();
        musicGain = musicContext.createGain();
        musicDestination = musicContext.createMediaStreamDestination();
        musicOscillator.type = "sine";
        musicOscillator.frequency.value = niche === "Motivation" ? 196 : 164.81;
        musicGain.gain.value = 0.025;
        musicOscillator.connect(musicGain);
        musicGain.connect(musicDestination);
        musicDestination.stream.getAudioTracks().forEach((track) => {
          stream.addTrack(track);
        });
      }

      const chunks = [];
      const mimeType = getMimeType();
      const recorderOptions = {
        audioBitsPerSecond: 192_000,
        videoBitsPerSecond: isFullVideo ? 14_000_000 : 16_000_000,
      };

      if (mimeType) {
        recorderOptions.mimeType = mimeType;
      }

      const recorder = new MediaRecorder(stream, recorderOptions);

      const recordingDone = new Promise((resolve, reject) => {
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) chunks.push(event.data);
        };
        recorder.onstop = resolve;
        recorder.onerror = () => reject(recorder.error);
      });

      let animationFrame;
      const render = () => {
        const index = getSubtitleIndexForTime(
          audio.currentTime,
          audio.duration
        );
        const talkPhase =
          audio.currentTime > 0 && !audio.ended ? (audio.currentTime * 0.9) % 1 : 0;

        drawVideoFrame(ctx, canvas, captions[index], talkPhase);
        animationFrame = requestAnimationFrame(render);
      };

      render();
      recorder.start(250);
      musicOscillator?.start();
      await audio.play();

      await new Promise((resolve) => {
        audio.onended = resolve;
      });

      cancelAnimationFrame(animationFrame);
      drawVideoFrame(ctx, canvas, captions[captions.length - 1], 0);
      recorder.stop();
      await recordingDone;

      stream.getTracks().forEach((track) => track.stop());
      audioDestination?.stream.getTracks().forEach((track) => track.stop());
      audioSource?.disconnect();
      audioContext?.close();
      musicOscillator?.stop();
      musicOscillator?.disconnect();
      musicGain?.disconnect();
      musicDestination?.stream.getTracks().forEach((track) => track.stop());
      musicContext?.close();

      const blob = new Blob(chunks, {
        type: recorder.mimeType || "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${getSafeFileName()}.webm`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Video downloaded successfully", {
        id: "download-toast",
      });
    } catch (error) {
      console.log("Download failed", error);
      toast.error("Download failed", {
        id: "download-toast",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className={`relative rounded-3xl overflow-hidden border border-gray-800 p-8 flex flex-col bg-gradient-to-br ${getBackgroundTheme()} ${getVideoLayout()}`}
    >
      <div ref={captureRef} className="flex-1 flex flex-col">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full"></div>
        </div>

        {renderSpeakerCharacter()}

        <div className="absolute top-6 left-6 z-20">
          <h2 className="text-xl md:text-2xl font-bold text-blue-400 leading-tight">
            {topic || "Explaino AI"}
          </h2>
          <p className="text-xs text-gray-300 mt-1">
            Premium AI Video Generator | Explaino AI
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {style} style{backgroundMusic ? " with soft background music" : ""}
          </p>
        </div>

        <div className="relative z-10 flex-1 flex items-end justify-center pb-16 px-6 overflow-hidden">
          <motion.div
            initial={false}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className={`min-h-[120px] max-h-[220px] flex items-center justify-center text-center font-semibold leading-[1.28] text-white max-w-[86%] mx-auto break-words [overflow-wrap:anywhere] ${getTextSize()}`}
          >
            {showSubtitles && (
              <div className="rounded-2xl bg-black/60 px-5 py-4 shadow-2xl max-w-full">
                {getPreviewCaptionLines(captions[currentIndex]).map((line, index) => (
                  <div key={`${line}-${index}`}>
                    {renderSubtitleText(line)}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 mt-6">
        <audio ref={audioRef} crossOrigin="anonymous">
          <source src={getVoiceUrl()} type="audio/mpeg" />
        </audio>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={handlePlay}
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            Play
          </button>

          <button
            onClick={() => {
              if (audioRef.current) {
                if (isPlaying) {
                  audioRef.current.pause();
                  stopBackgroundMusic();
                  setIsPlaying(false);
                  setIsPaused(true);
                } else if (isPaused) {
                  audioRef.current.play();
                  startBackgroundMusic();
                  setIsPlaying(true);
                  setIsPaused(false);
                }
              }
            }}
            className="px-6 py-3 rounded-2xl bg-gray-800 hover:bg-gray-700 text-white font-semibold transition"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>

          <button
            onClick={downloadFinalVideo}
            disabled={isDownloading}
            className="px-6 py-3 rounded-2xl border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {isDownloading ? "Downloading..." : "Download Video"}
          </button>
        </div>
      </div>
    </div>
  );
}

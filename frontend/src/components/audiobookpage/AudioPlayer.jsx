import { useRef, useEffect, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";

const AudioPlayer = ({
  selectedChapter,
  isPlaying,
  setIsPlaying,
  setSelectedChapter,
  data,
}) => {
  const audioRef = useRef(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [selectedChapter, setIsPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [selectedChapter, isPlaying]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    const currentIndex = data?.findIndex(
      (chapter) => chapter.id === selectedChapter?.id
    );
    if (currentIndex !== undefined && currentIndex < (data?.length || 0) - 1) {
      const nextIndex = currentIndex + 1;
      setSelectedChapter(data[nextIndex]);
      setIsPlaying(true); // Start playing the next track
    }
  };

  const handlePrev = () => {
    const currentIndex = data?.findIndex(
      (chapter) => chapter.id === selectedChapter?.id
    );
    if (currentIndex !== undefined && currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setSelectedChapter(data[prevIndex]);
      setIsPlaying(true); // Start playing the previous track
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleVolumeChange = (event) => {
    const volume = event.target.value;
    setVolume(volume);
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };

  const handleSeek = (event) => {
    if (audioRef.current) {
      const seekTime = (event.target.value / 100) * duration;
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const toggleMute = () => {
    if (volume > 0) {
      setVolume(0);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    } else {
      setVolume(1);
      if (audioRef.current) {
        audioRef.current.volume = 1;
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const isFirstTrack =
    data?.findIndex((chapter) => chapter.id === selectedChapter?.id) === 0;
  const isLastTrack =
    data?.findIndex((chapter) => chapter.id === selectedChapter?.id) ===
    (data?.length || 0) - 1;

  return (
    <div className="flex flex-col items-center pt-4 pb-2 px-2 lg:px-4 bg-slate-800 text-white rounded-lg shadow-lg mx-2 sticky bottom-0 left-0">
      <div className="w-full">
        <div className="flex items-center w-full gap-3">
          {/* timeline */}
          <div className="flex-grow flex items-center">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              className="w-64 mx-2 flex-grow"
            />
            <span>{formatTime(duration)}</span>
          </div>
          {/* volume */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={toggleMute}
              className="p-2 text-slate-300 hover:text-slate-500"
            >
              {volume > 0 ? (
                <FaVolumeUp size={18} />
              ) : (
                <FaVolumeMute size={24} />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 mx-2"
            />
          </div>
        </div>

        {/* controls */}
        <div className="flex justify-center gap-5">
          <button
            onClick={handlePrev}
            className={`p-2 text-slate-300 ${
              isFirstTrack
                ? "cursor-not-allowed opacity-30"
                : "hover:text-slate-500"
            }`}
            disabled={isFirstTrack}
          >
            <FaStepBackward size={18} />
          </button>
          <button
            onClick={handlePlayPause}
            className="p-2 text-slate-300 hover:text-slate-500"
          >
            {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
          </button>
          <button
            onClick={handleNext}
            className={`p-2 text-slate-300 ${
              isLastTrack
                ? "cursor-not-allowed opacity-30"
                : "hover:text-slate-500"
            }`}
            disabled={isLastTrack}
          >
            <FaStepForward size={18} />
          </button>
        </div>
      </div>
      <audio
        className="hidden"
        ref={audioRef}
        controls
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      >
        <source src={selectedChapter?.media_url} />
      </audio>
    </div>
  );
};

export default AudioPlayer;

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Check } from 'lucide-react';

const sounds = [
  { name: 'Beep', file: '/sounds/beep.mp3' },
  { name: 'Chime', file: '/sounds/chime.mp3' },
  { name: 'Ding', file: '/sounds/ding.mp3' },
  { name: 'Bell', file: '/sounds/bell.mp3' },
];

const Slider = ({ 
  value, 
  onChange 
}: { 
  value: number; 
  onChange: (value: number) => void; 
}) => (
  <div className="w-full">
    <input
      type="range"
      min="0"
      max="1"
      step="0.1"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-2 bg-[#767577] rounded-lg appearance-none cursor-pointer slider"
      style={{
        background: `linear-gradient(to right, #81b0ff 0%, #81b0ff ${value * 100}%, #767577 ${value * 100}%, #767577 100%)`
      }}
    />
    <style jsx>{`
      .slider::-webkit-slider-thumb {
        appearance: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #f5dd4b;
        cursor: pointer;
      }
      .slider::-moz-range-thumb {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #f5dd4b;
        cursor: pointer;
        border: none;
      }
    `}</style>
  </div>
);

const NotificationSound = () => {
  const router = useRouter();
  const [volume, setVolume] = useState(0.5);
  const [selectedSound, setSelectedSound] = useState('Beep');
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Load settings from localStorage
    const savedSound = localStorage.getItem('notificationSound');
    const savedVolume = localStorage.getItem('notificationVolume');
    
    if (savedSound) setSelectedSound(savedSound);
    if (savedVolume) setVolume(parseFloat(savedVolume));
  }, []);

  const playSound = (sound: typeof sounds[0]) => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
    
    const audio = new Audio(sound.file);
    audio.volume = volume;
    audio.play();
    setAudioElement(audio);
  };

  const handleSoundSelection = (sound: typeof sounds[0]) => {
    setSelectedSound(sound.name);
    playSound(sound);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioElement) {
      audioElement.volume = newVolume;
    }
  };

  const saveSettings = () => {
    try {
      localStorage.setItem('notificationSound', selectedSound);
      localStorage.setItem('notificationVolume', volume.toString());
      router.back();
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-[#1E262F] to-[#16171B] min-h-screen">
      <div className="flex-1 p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 text-white hover:text-[#FCD34D] transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-white">Notification Sound</h1>
          </div>
          <button
            onClick={saveSettings}
            className="text-[#81b0ff] hover:text-[#FCD34D] transition-colors"
          >
            Save
          </button>
        </div>

        {/* Settings Container */}
        <div className="px-4">
          <h2 className="text-white text-lg font-bold mt-6 mb-4">
            Notification Volume
          </h2>
          <Slider value={volume} onChange={handleVolumeChange} />

          <h2 className="text-white text-lg font-bold mt-6 mb-4">
            Notification Sound
          </h2>
          {sounds.map((sound) => (
            <button
              key={sound.name}
              onClick={() => handleSoundSelection(sound)}
              className="flex flex-row justify-between items-center py-4 border-b border-[#353A40] w-full text-left hover:bg-white/5 transition-colors"
            >
              <span className="text-white text-base">{sound.name}</span>
              {selectedSound === sound.name && (
                <Check className="text-[#81b0ff] w-6 h-6" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationSound; 
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Check, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Speaker, 
  Headphones, 
  Download, 
  Upload, 
  RotateCcw, 
  Music, 
  Bell, 
  Zap, 
  Heart, 
  Star, 
  Settings,
  Smartphone,
  TestTube
} from 'lucide-react';

// Enhanced sound configurations
interface SoundOption {
  id: string;
  name: string;
  file: string; // 'generated' for Web Audio API sounds
  category: 'classic' | 'modern' | 'nature' | 'tech' | 'custom';
  duration: number; // in seconds
  description: string;
  preview?: string;
  isPremium?: boolean;
}

const soundCategories = {
  classic: { label: 'Classic', icon: Bell, color: 'text-blue-500' },
  modern: { label: 'Modern', icon: Zap, color: 'text-purple-500' },
  nature: { label: 'Nature', icon: Heart, color: 'text-green-500' },
  tech: { label: 'Tech', icon: Smartphone, color: 'text-orange-500' },
  custom: { label: 'Custom', icon: Upload, color: 'text-pink-500' }
};

// Web Audio API sound generation functions
const generateBeep = (audioContext: AudioContext, frequency: number, duration: number, volume: number = 0.5) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
  
  return { oscillator, gainNode };
};

const generateChime = (audioContext: AudioContext, volume: number = 0.5) => {
  const frequencies = [523.25, 659.25, 783.99]; // C, E, G
  frequencies.forEach((freq, index) => {
    setTimeout(() => {
      generateBeep(audioContext, freq, 0.3, volume * 0.7);
    }, index * 100);
  });
};

const generateDing = (audioContext: AudioContext, volume: number = 0.5) => {
  generateBeep(audioContext, 800, 0.1, volume);
  setTimeout(() => {
    generateBeep(audioContext, 600, 0.2, volume * 0.8);
  }, 100);
};

const generateBell = (audioContext: AudioContext, volume: number = 0.5) => {
  const frequencies = [440, 554.37, 659.25, 880];
  frequencies.forEach((freq, index) => {
    setTimeout(() => {
      generateBeep(audioContext, freq, 0.5 - index * 0.1, volume * (1 - index * 0.2));
    }, index * 200);
  });
};

const generatePulse = (audioContext: AudioContext, volume: number = 0.5) => {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      generateBeep(audioContext, 400 + i * 100, 0.15, volume);
    }, i * 150);
  }
};

const generateSwoosh = (audioContext: AudioContext, volume: number = 0.5) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.7);
  
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.1);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.7);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.7);
};

const generateChirp = (audioContext: AudioContext, volume: number = 0.5) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3);
  oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.6);
  
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(volume * 0.6, audioContext.currentTime + 0.1);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.5);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 1.5);
};

const generateWaterDrop = (audioContext: AudioContext, volume: number = 0.5) => {
  generateBeep(audioContext, 1000, 0.05, volume);
  setTimeout(() => {
    generateBeep(audioContext, 500, 0.3, volume * 0.7);
  }, 50);
};

const generateSynthPop = (audioContext: AudioContext, volume: number = 0.5) => {
  const frequencies = [220, 277.18, 329.63, 440];
  frequencies.forEach((freq, index) => {
    setTimeout(() => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume * 0.5, audioContext.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    }, index * 100);
  });
};

const generateCyberBeep = (audioContext: AudioContext, volume: number = 0.5) => {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      generateBeep(audioContext, 800 + i * 200, 0.1, volume);
    }, i * 80);
  }
};

const sounds: SoundOption[] = [
  {
    id: 'beep',
    name: 'Classic Beep',
    file: 'generated', // Using Web Audio API
    category: 'classic',
    duration: 0.5,
    description: 'Simple and effective notification sound'
  },
  {
    id: 'chime',
    name: 'Gentle Chime',
    file: 'generated', // Using Web Audio API
    category: 'classic',
    duration: 1.2,
    description: 'Soft and pleasant bell-like tone'
  },
  {
    id: 'ding',
    name: 'Quick Ding',
    file: 'generated', // Using Web Audio API
    category: 'classic',
    duration: 0.8,
    description: 'Sharp and attention-grabbing'
  },
  {
    id: 'bell',
    name: 'Traditional Bell',
    file: 'generated', // Using Web Audio API
    category: 'classic',
    duration: 2.0,
    description: 'Classic bell sound for important notifications'
  },
  {
    id: 'pulse',
    name: 'Digital Pulse',
    file: 'generated', // Using Web Audio API
    category: 'modern',
    duration: 1.0,
    description: 'Modern digital notification tone'
  },
  {
    id: 'swoosh',
    name: 'Swoosh',
    file: 'generated', // Using Web Audio API
    category: 'modern',
    duration: 0.7,
    description: 'Smooth and contemporary sound'
  },
  {
    id: 'chirp',
    name: 'Bird Chirp',
    file: 'generated', // Using Web Audio API
    category: 'nature',
    duration: 1.5,
    description: 'Natural and calming bird sound'
  },
  {
    id: 'water-drop',
    name: 'Water Drop',
    file: 'generated', // Using Web Audio API
    category: 'nature',
    duration: 1.0,
    description: 'Gentle water droplet sound'
  },
  {
    id: 'synth-pop',
    name: 'Synth Pop',
    file: 'generated', // Using Web Audio API
    category: 'tech',
    duration: 1.2,
    description: 'Futuristic synthesizer tone',
    isPremium: true
  },
  {
    id: 'cyber-beep',
    name: 'Cyber Beep',
    file: 'generated', // Using Web Audio API
    category: 'tech',
    duration: 0.9,
    description: 'High-tech notification sound',
    isPremium: true
  }
];

// Volume slider component
const VolumeSlider: React.FC<{
  value: number;
  onChange: (value: number) => void;
  onMute: () => void;
  isMuted: boolean;
}> = ({ value, onChange, onMute, isMuted }) => {
  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={onMute}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
      >
        {isMuted || value === 0 ? (
          <VolumeX className="w-5 h-5 text-gray-500" />
        ) : (
          <Volume2 className="w-5 h-5 text-gray-700" />
        )}
      </button>
      
      <div className="flex-1 relative">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={isMuted ? 0 : value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(isMuted ? 0 : value) * 100}%, #4b5563 ${(isMuted ? 0 : value) * 100}%, #4b5563 100%)`
          }}
        />
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          .slider::-moz-range-thumb {
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
        `}</style>
      </div>
      
      <span className="text-sm text-gray-600 w-10">
        {Math.round((isMuted ? 0 : value) * 100)}%
      </span>
    </div>
  );
};

// Sound item component
const SoundItem: React.FC<{
  sound: SoundOption;
  isSelected: boolean;
  isPlaying: boolean;
  onSelect: () => void;
  onPlay: () => void;
  volume: number;
}> = ({ sound, isSelected, isPlaying, onSelect, onPlay, volume }) => {
  const CategoryIcon = soundCategories[sound.category].icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
        isSelected 
          ? 'border-blue-500 bg-blue-500/10' 
          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          {/* Category icon */}
          <div className={`p-2 rounded-lg ${soundCategories[sound.category].color} bg-white/10`}>
            <CategoryIcon className="w-4 h-4" />
          </div>
          
          {/* Sound info */}
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-white">{sound.name}</h3>
              {sound.isPremium && (
                <Star className="w-4 h-4 text-yellow-400" />
              )}
            </div>
            <p className="text-sm text-gray-400">{sound.description}</p>
            <p className="text-xs text-gray-500 mt-1">
              {sound.duration.toFixed(1)}s • {soundCategories[sound.category].label}
            </p>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center space-x-2">
          {/* Play button */}
          <button
            onClick={onPlay}
            className={`p-2 rounded-lg transition-colors ${
              isPlaying 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'
            }`}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
          
          {/* Selection indicator */}
          <button
            onClick={onSelect}
            className={`p-2 rounded-lg transition-colors ${
              isSelected 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'
            }`}
          >
            <Check className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Volume visualization when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-3 border-t border-white/10"
          >
            <div className="flex items-center space-x-2">
              <Speaker className="w-4 h-4 text-blue-400" />
              <div className="flex-1 flex items-center space-x-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`h-2 w-1 rounded-full ${
                      i < Math.floor(volume * 20) ? 'bg-blue-400' : 'bg-gray-600'
                    }`}
                    animate={{
                      height: isPlaying && i < Math.floor(volume * 20) 
                        ? [8, 16, 8] 
                        : 8
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.05
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400">Playing</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main notification sound component
const NotificationSound: React.FC = () => {
  const router = useRouter();
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedSound, setSelectedSound] = useState('beep');
  const [playingSound, setPlayingSound] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isTestMode, setIsTestMode] = useState(false);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const volumeRef = useRef(volume);

  // Update volume reference
  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSound = localStorage.getItem('notificationSound');
    const savedVolume = localStorage.getItem('notificationVolume');
    const savedMuted = localStorage.getItem('notificationMuted');
    
    if (savedSound) setSelectedSound(savedSound);
    if (savedVolume) setVolume(parseFloat(savedVolume));
    if (savedMuted) setIsMuted(JSON.parse(savedMuted));
  }, []);

  // Play sound function using Web Audio API
  const playSound = (sound: SoundOption) => {
    // Stop current playing sound indicator
    setPlayingSound(null);
    
    try {
      // Create audio context
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const volume = isMuted ? 0 : volumeRef.current;
      
      setPlayingSound(sound.id);
      
      // Generate sound based on ID
      switch (sound.id) {
        case 'beep':
          generateBeep(audioContext, 800, 0.5, volume);
          break;
        case 'chime':
          generateChime(audioContext, volume);
          break;
        case 'ding':
          generateDing(audioContext, volume);
          break;
        case 'bell':
          generateBell(audioContext, volume);
          break;
        case 'pulse':
          generatePulse(audioContext, volume);
          break;
        case 'swoosh':
          generateSwoosh(audioContext, volume);
          break;
        case 'chirp':
          generateChirp(audioContext, volume);
          break;
        case 'water-drop':
          generateWaterDrop(audioContext, volume);
          break;
        case 'synth-pop':
          generateSynthPop(audioContext, volume);
          break;
        case 'cyber-beep':
          generateCyberBeep(audioContext, volume);
          break;
        default:
          generateBeep(audioContext, 600, 0.3, volume);
      }
      
      // Auto-stop playing indicator after sound duration
      setTimeout(() => {
        setPlayingSound(null);
        audioContext.close();
      }, sound.duration * 1000);
      
    } catch (error) {
      console.error('Error playing sound:', error);
      setPlayingSound(null);
      
      // Fallback to system beep
      try {
        // Use system beep as fallback
        const utterance = new SpeechSynthesisUtterance('');
        utterance.volume = 0;
        speechSynthesis.speak(utterance);
      } catch (fallbackError) {
        console.error('Fallback sound failed:', fallbackError);
      }
    }
  };

  // Stop sound function
  const stopSound = () => {
    setPlayingSound(null);
    // Note: Web Audio API oscillators stop automatically, no need for manual cleanup
  };

  // Handle sound selection
  const handleSoundSelection = (sound: SoundOption) => {
    setSelectedSound(sound.id);
    if (playingSound !== sound.id) {
      playSound(sound);
    } else {
      stopSound();
    }
  };

  // Handle play/pause
  const handlePlayPause = (sound: SoundOption) => {
    if (playingSound === sound.id) {
      stopSound();
    } else {
      playSound(sound);
    }
  };

  // Handle volume change
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(false);
    // Web Audio API volume is handled per-sound generation
  };

  // Handle mute toggle
  const handleMuteToggle = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    // Web Audio API volume is handled per-sound generation
  };

  // Test notification
  const testNotification = () => {
    setIsTestMode(true);
    const selectedSoundOption = sounds.find(s => s.id === selectedSound);
    if (selectedSoundOption) {
      playSound(selectedSoundOption);
    }
    setTimeout(() => setIsTestMode(false), 2000);
  };

  // Save settings
  const saveSettings = () => {
    try {
      localStorage.setItem('notificationSound', selectedSound);
      localStorage.setItem('notificationVolume', volume.toString());
      localStorage.setItem('notificationMuted', JSON.stringify(isMuted));
      
      setSavedSuccessfully(true);
      setTimeout(() => setSavedSuccessfully(false), 2000);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setSelectedSound('beep');
    setVolume(0.5);
    setIsMuted(false);
    stopSound();
  };

  // Filter sounds by category
  const filteredSounds = sounds.filter(sound => 
    activeCategory === 'all' || sound.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="lg:hidden h-16" />
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Notification Sounds</h1>
              <p className="text-sm text-gray-600">
                Choose your perfect notification tone
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={testNotification}
              disabled={isTestMode}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isTestMode 
                  ? 'bg-blue-300 text-blue-700' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <TestTube className="w-4 h-4" />
              <span>{isTestMode ? 'Testing...' : 'Test'}</span>
            </button>
            
            <button
              onClick={saveSettings}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                savedSuccessfully
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{savedSuccessfully ? 'Saved!' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Volume control */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Volume2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Volume Control</h2>
              <p className="text-sm text-gray-600">Adjust notification volume</p>
            </div>
          </div>
          
          <VolumeSlider
            value={volume}
            onChange={handleVolumeChange}
            onMute={handleMuteToggle}
            isMuted={isMuted}
          />
          
          {isMuted && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <VolumeX className="w-4 h-4 text-yellow-600" />
                <p className="text-sm text-yellow-800">
                  Notifications are muted. You won't hear any sounds.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Category filter */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Music className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Sound Categories</h2>
              <p className="text-sm text-gray-600">Browse sounds by type</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              All Sounds
            </button>
            
            {Object.entries(soundCategories).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{config.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sound list */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-600/20 rounded-lg">
                <Bell className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Available Sounds</h2>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-400">
                    {filteredSounds.length} high-quality generated sound{filteredSounds.length !== 1 ? 's' : ''} available
                  </p>
                  <div className="px-2 py-1 bg-blue-600/20 border border-blue-600/30 rounded-full">
                    <span className="text-xs text-blue-300 font-medium">Web Audio</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={resetToDefaults}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm">Reset</span>
            </button>
          </div>
          
          <div className="space-y-3">
            <AnimatePresence>
              {filteredSounds.map((sound) => (
                <SoundItem
                  key={sound.id}
                  sound={sound}
                  isSelected={selectedSound === sound.id}
                  isPlaying={playingSound === sound.id}
                  onSelect={() => setSelectedSound(sound.id)}
                  onPlay={() => handlePlayPause(sound)}
                  volume={volume}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Current selection info */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-orange-600/20 rounded-lg">
              <Settings className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Current Selection</h2>
              <p className="text-sm text-gray-400">Active notification sound</p>
            </div>
          </div>
          
          {(() => {
            const currentSound = sounds.find(s => s.id === selectedSound);
            if (!currentSound) return null;
            
            const CategoryIcon = soundCategories[currentSound.category].icon;
            
            return (
              <div className="flex items-center space-x-4 p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg">
                <div className="p-3 bg-blue-600/20 rounded-xl">
                  <CategoryIcon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{currentSound.name}</h3>
                  <p className="text-sm text-gray-400">{currentSound.description}</p>
                  <p className="text-xs text-blue-300 mt-1">
                    {currentSound.duration.toFixed(1)}s • {soundCategories[currentSound.category].label}
                    {currentSound.isPremium && ' • Premium'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Volume</p>
                  <p className="text-lg font-bold text-white">
                    {isMuted ? '0' : Math.round(volume * 100)}%
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default NotificationSound; 
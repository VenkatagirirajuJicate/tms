'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Star, 
  CheckCircle, 
  AlertCircle, 
  Send,
  Award,
  Clock,
  Bus,
  Shield,
  Users,
  Sparkles,
  MessageSquare,
  Heart
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Enhanced rating item component
const RatingItem: React.FC<{ 
  title: string; 
  description: string;
  icon: React.ReactNode;
  rating: number; 
  onRatingChange: (value: number) => void; 
}> = ({ title, description, icon, rating, onRatingChange }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
    
    <div className="flex items-center justify-center space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRatingChange(star)}
          className="transition-transform"
        >
          <Star 
            className={`w-8 h-8 transition-colors ${
              star <= rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300 hover:text-yellow-200'
            }`} 
          />
        </motion.button>
      ))}
    </div>
    
    <div className="mt-3 text-center">
      <span className="text-sm font-medium text-gray-700">
        {rating === 0 ? 'Tap to rate' : 
         rating === 1 ? 'Poor' :
         rating === 2 ? 'Fair' :
         rating === 3 ? 'Good' :
         rating === 4 ? 'Very Good' : 'Excellent'}
      </span>
    </div>
  </div>
);

// Enhanced chip button component
const ChipButton: React.FC<{ 
  title: string; 
  icon?: React.ReactNode;
  isSelected: boolean; 
  onPress: () => void; 
  color?: string;
}> = ({ title, icon, isSelected, onPress, color = 'blue' }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onPress}
    className={`inline-flex items-center space-x-2 rounded-full py-3 px-4 text-sm font-medium transition-all ${
      isSelected 
        ? `bg-${color}-600 text-white shadow-md` 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
  >
    {icon && <span className="w-4 h-4">{icon}</span>}
    <span>{title}</span>
  </motion.button>
);

// Section component
const RatingSection: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, description, icon, children }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

const Rating: React.FC = () => {
  const router = useRouter();
  const [ratings, setRatings] = useState({
    overall: 0,
    punctuality: 0,
    condition: 0,
    behavior: 0,
    safety: 0,
  });
  const [likes, setLikes] = useState<string[]>([]);
  const [improvements, setImprovements] = useState<string[]>([]);
  const [additionalComments, setAdditionalComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (category: keyof typeof ratings, value: number) =>
    setRatings((prev) => ({ ...prev, [category]: value }));

  const toggleChip = (array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>, item: string) =>
    setArray((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );

  const validateForm = () => {
    const unratedCategories = Object.entries(ratings).filter(([_, rating]) => rating === 0);
    if (unratedCategories.length > 0) {
      toast.error('Please rate all categories');
      return false;
    }
    if (likes.length === 0) {
      toast.error('Please select at least one thing you liked');
      return false;
    }
    if (improvements.length === 0) {
      toast.error('Please select at least one area for improvement');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      const ratingData = {
        userId: 'user_001',
        ratings,
        likes,
        improvements,
        additionalComments,
        timestamp: new Date().toISOString(),
        averageRating: Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).length
      };

      console.log('Rating data:', ratingData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Thank you for your feedback!');
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('Failed to submit rating. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ratingCategories = [
    {
      key: 'overall' as keyof typeof ratings,
      title: 'Overall Satisfaction',
      description: 'How would you rate your overall experience?',
      icon: <Award className="w-5 h-5" />
    },
    {
      key: 'punctuality' as keyof typeof ratings,
      title: 'Punctuality',
      description: 'Was the bus on time?',
      icon: <Clock className="w-5 h-5" />
    },
    {
      key: 'condition' as keyof typeof ratings,
      title: 'Bus Condition',
      description: 'How clean and comfortable was the bus?',
      icon: <Bus className="w-5 h-5" />
    },
    {
      key: 'behavior' as keyof typeof ratings,
      title: 'Driver Behavior',
      description: 'How was the driver\'s attitude and professionalism?',
      icon: <Users className="w-5 h-5" />
    },
    {
      key: 'safety' as keyof typeof ratings,
      title: 'Safety & Security',
      description: 'Did you feel safe during the journey?',
      icon: <Shield className="w-5 h-5" />
    },
  ];

  const likeOptions = [
    { title: 'Smooth Ride', icon: '🚌' },
    { title: 'Fast Travel', icon: '⚡' },
    { title: 'Cleanliness', icon: '✨' },
    { title: 'Convenient', icon: '👍' },
    { title: 'Good Music', icon: '🎵' },
    { title: 'Friendly Driver', icon: '😊' },
    { title: 'Air Conditioning', icon: '❄️' },
    { title: 'Comfortable Seats', icon: '🪑' },
  ];

  const improvementOptions = [
    { title: 'Cleanliness', icon: '🧹' },
    { title: 'Seating', icon: '💺' },
    { title: 'Overcrowding', icon: '👥' },
    { title: 'Punctuality', icon: '⏰' },
    { title: 'Driver Behavior', icon: '🚗' },
    { title: 'Route Information', icon: '🗺️' },
    { title: 'Wi-Fi Service', icon: '📶' },
    { title: 'Temperature Control', icon: '🌡️' },
  ];

  const averageRating = Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="lg:hidden h-16" />
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="text-gray-700 hover:text-yellow-600 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Rate Your Experience</h1>
              <p className="text-sm text-gray-600">Help us improve our transportation service</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            {averageRating > 0 && (
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                {averageRating.toFixed(1)} ⭐
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Rating Categories */}
        <RatingSection
          title="Rate Your Experience"
          description="Please rate each aspect of your journey"
          icon={<Star className="w-5 h-5" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ratingCategories.map((category) => (
              <RatingItem
                key={category.key}
                title={category.title}
                description={category.description}
                icon={category.icon}
                rating={ratings[category.key]}
                onRatingChange={(value) => handleRatingChange(category.key, value)}
              />
            ))}
          </div>
        </RatingSection>

        {/* What did you like */}
        <RatingSection
          title="What did you like?"
          description="Select all that apply"
          icon={<Heart className="w-5 h-5" />}
        >
          <div className="flex flex-wrap gap-3">
            {likeOptions.map((item) => (
              <ChipButton
                key={item.title}
                title={item.title}
                icon={<span>{item.icon}</span>}
                isSelected={likes.includes(item.title)}
                onPress={() => toggleChip(likes, setLikes, item.title)}
                color="green"
              />
            ))}
          </div>
        </RatingSection>

        {/* Areas for improvement */}
        <RatingSection
          title="What could be improved?"
          description="Help us identify areas for enhancement"
          icon={<Sparkles className="w-5 h-5" />}
        >
          <div className="flex flex-wrap gap-3">
            {improvementOptions.map((item) => (
              <ChipButton
                key={item.title}
                title={item.title}
                icon={<span>{item.icon}</span>}
                isSelected={improvements.includes(item.title)}
                onPress={() => toggleChip(improvements, setImprovements, item.title)}
                color="orange"
              />
            ))}
          </div>
        </RatingSection>

        {/* Additional comments */}
        <RatingSection
          title="Additional Comments"
          description="Share any additional thoughts or suggestions"
          icon={<MessageSquare className="w-5 h-5" />}
        >
          <textarea
            value={additionalComments}
            onChange={(e) => setAdditionalComments(e.target.value)}
            placeholder="Tell us more about your experience, suggestions for improvement, or any other feedback..."
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-white text-gray-900 placeholder-gray-500"
          />
        </RatingSection>

        {/* Submit Button */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:from-yellow-300 disabled:to-orange-300 text-white px-6 py-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 shadow-lg"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Submitting Rating...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Rating</span>
              </>
            )}
          </motion.button>
          
          <p className="text-sm text-gray-600 mt-3 text-center">
            Your rating helps us maintain and improve the quality of our transportation services. Thank you for your valuable feedback!
          </p>
        </div>
      </div>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: { background: '#fff', color: '#374151' },
        }}
      />
    </div>
  );
};

export default Rating; 
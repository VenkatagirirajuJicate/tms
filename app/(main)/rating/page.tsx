'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Star, CheckCircle, AlertCircle } from 'lucide-react';

const RatingItem = ({ 
  title, 
  rating, 
  onRatingChange 
}: { 
  title: string; 
  rating: number; 
  onRatingChange: (value: number) => void; 
}) => (
  <div className="flex flex-row justify-between items-center mb-5">
    <span className="text-white text-sm flex-1">{title}</span>
    <div className="flex flex-row">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRatingChange(star)}
          className="ml-1"
        >
          <Star 
            className={`w-6 h-6 ${
              star <= rating ? 'text-[#00A3FF] fill-[#00A3FF]' : 'text-[#353A40]'
            }`} 
          />
        </button>
      ))}
    </div>
  </div>
);

const ChipButton = ({ 
  title, 
  isSelected, 
  onPress 
}: { 
  title: string; 
  isSelected: boolean; 
  onPress: () => void; 
}) => (
  <button
    onClick={onPress}
    className={`rounded-full py-2 px-3 mr-2 mb-2 text-xs transition-colors ${
      isSelected 
        ? 'bg-[#00A3FF] text-white font-bold' 
        : 'bg-[#353A40] text-white'
    }`}
  >
    {title}
  </button>
);

const ToastNotification = ({ 
  message, 
  icon, 
  onClose 
}: { 
  message: string; 
  icon: 'success' | 'error'; 
  onClose: () => void; 
}) => (
  <div className="fixed top-4 right-4 bg-white text-gray-800 p-4 rounded-lg shadow-lg z-50 flex items-center">
    {icon === 'success' ? (
      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
    ) : (
      <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
    )}
    <span>{message}</span>
    <button onClick={onClose} className="ml-4 text-gray-500 hover:text-gray-700">
      ×
    </button>
  </div>
);

const Rating = () => {
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
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastIcon, setToastIcon] = useState<'success' | 'error'>('success');

  const handleRatingChange = (category: keyof typeof ratings, value: number) =>
    setRatings((prev) => ({ ...prev, [category]: value }));

  const toggleChip = (array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>, item: string) =>
    setArray((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );

  const showToast = (message: string, icon: 'success' | 'error') => {
    setToastMessage(message);
    setToastIcon(icon);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const handleSubmit = async () => {
    // Validate form
    if (
      Object.values(ratings).some((val) => val === 0) ||
      !likes.length ||
      !improvements.length
    ) {
      showToast('Please fill out all required fields!', 'error');
      return;
    }

    try {
      // Simulate API call with dummy data
      const ratingData = {
        userId: 'dummy-user-id',
        ratings,
        likes,
        improvements,
        additionalComments,
      };

      console.log('Rating data:', ratingData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showToast('Rating submitted successfully!', 'success');
      setTimeout(() => {
        router.back();
      }, 3000);
    } catch (error) {
      console.error('Error submitting rating:', error);
      showToast('An error occurred. Please try again.', 'error');
    }
  };

  const ratingTitles = [
    'Overall Satisfaction',
    'Punctuality of the Bus',
    'Condition and Cleanliness of the Bus',
    'Behavior and Attitude of the Bus Driver',
    'Safety and Security on the Bus',
  ];

  const likeOptions = [
    'SMOOTH RIDE',
    'FAST TRAVEL',
    'CLEANLINESS',
    'CONVENIENT',
    'GOOD MUSIC SYSTEM',
  ];

  const improvementOptions = [
    'CLEANLINESS',
    'SEATING',
    'OVERCROWDING',
    'NO SERVICE DURING SPECIAL EVENTS',
  ];

  return (
    <div className="flex-1 bg-gradient-to-b from-[#1E262F] to-[#16171B] min-h-screen">
      <div className="flex-1 p-5">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="mr-4 text-white hover:text-[#FCD34D] transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-white">Rating</h1>
        </div>

        {/* Content */}
        <div className="px-4 pb-20">
          {ratingTitles.map((title, index) => (
            <RatingItem
              key={title}
              title={title}
              rating={ratings[Object.keys(ratings)[index] as keyof typeof ratings]}
              onRatingChange={(value) =>
                handleRatingChange(Object.keys(ratings)[index] as keyof typeof ratings, value)
              }
            />
          ))}

          <h2 className="text-white text-base font-bold mt-5 mb-3">
            What did you like about it?
          </h2>
          <div className="flex flex-row flex-wrap mb-4">
            {likeOptions.map((item) => (
              <ChipButton
                key={item}
                title={item}
                isSelected={likes.includes(item)}
                onPress={() => toggleChip(likes, setLikes, item)}
              />
            ))}
          </div>

          <h2 className="text-white text-base font-bold mt-5 mb-3">
            What could be improved?
          </h2>
          <div className="flex flex-row flex-wrap mb-4">
            {improvementOptions.map((item) => (
              <ChipButton
                key={item}
                title={item}
                isSelected={improvements.includes(item)}
                onPress={() => toggleChip(improvements, setImprovements, item)}
              />
            ))}
          </div>

          <h2 className="text-white text-base font-bold mt-5 mb-3">
            Anything else?
          </h2>
          <textarea
            value={additionalComments}
            onChange={(e) => setAdditionalComments(e.target.value)}
            placeholder="Tell us everything."
            className="w-full h-24 text-white text-sm p-3 bg-[#2E323B] border-b border-[#666] rounded-lg resize-none focus:outline-none focus:border-[#00A3FF]"
          />
        </div>

        {/* Submit Button */}
        <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-b from-transparent to-[#16171B]">
          <button
            onClick={handleSubmit}
            className="w-full bg-[#00A3FF] rounded-full py-4 text-white text-base font-bold hover:bg-[#0088CC] transition-colors"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastVisible && (
        <ToastNotification
          message={toastMessage}
          icon={toastIcon}
          onClose={() => setToastVisible(false)}
        />
      )}
    </div>
  );
};

export default Rating; 
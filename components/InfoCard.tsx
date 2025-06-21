'use client';

import React from 'react';

interface InfoCardProps {
  title: string;
  subtitle: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, subtitle }) => (
  <div className="w-[32%] aspect-[0.8] rounded-[15px] p-4 flex justify-end bg-gradient-to-b from-[#1E262F] to-[#000000] relative">
    <div>
      <h3 className="text-white text-2xl font-bold">{title}</h3>
      <p className="text-[#aaaaaa] text-sm mt-1.5">{subtitle}</p>
    </div>
    <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#3b82f6]"></div>
  </div>
);

export default InfoCard; 
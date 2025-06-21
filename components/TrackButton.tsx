'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const TrackButton = () => {
  const router = useRouter();

  return (
    <div className="rounded-[15px] p-4 flex justify-between bg-gradient-to-b from-[#1E262F] to-[#000000]">
      <div className="flex flex-row justify-between items-start">
        <div className="flex-1">
          <h3 className="text-[#B8BDC7] text-sm font-semibold">TRACK YOUR BUS</h3>
          <h3 className="text-[#B8BDC7] text-sm font-semibold">IN REAL TIME</h3>
          <div className="h-0.5 w-15 bg-white my-2"></div>
          <p className="text-[#B8BDC7] text-xs font-bold mt-2.5">TRAVENT</p>
          <p className="text-white text-3xl font-bold mb-2">MAPS</p>
        </div>
        <Image
          src="/assets/red-pin.png"
          alt="Map Marker"
          width={150}
          height={150}
          className="object-contain"
        />
      </div>
      <button
        onClick={() => router.push('/live-tracking')}
        className="bg-[#1E262F] rounded-[20px] py-2.5 px-10 self-end -mt-8 shadow-lg hover:bg-[#2A3744] transition-colors"
      >
        <span className="text-white text-sm font-bold">Track</span>
      </button>
    </div>
  );
};

export default TrackButton; 
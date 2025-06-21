'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Camera, XCircle, CheckCircle, AlertTriangle, ScanLine } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const ScanScreen = () => {
  const router = useRouter();
  const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const requestCameraPermission = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported');
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      setPermissionStatus('granted');
      startCamera(stream);
    } catch (error) {
      console.error('Camera permission error:', error);
      setPermissionStatus('denied');
    }
  };

  const startCamera = (stream: MediaStream) => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(e => console.error("Error playing video:", e));
      startScanning();
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    setScanStatus('scanning');
    
    const scanTimeout = setTimeout(() => {
      if (Math.random() > 0.2) {
        setScanStatus('success');
        toast.success('QR Code Detected!');
        setTimeout(() => router.push('/scan-success'), 1500);
      } else {
        setScanStatus('error');
        toast.error('Invalid QR Code. Please try again.');
        setTimeout(() => startScanning(), 2000);
      }
    }, 3000 + Math.random() * 2000);

    return () => clearTimeout(scanTimeout);
  };
  
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
    setScanStatus('idle');
  };

  const renderContent = () => {
    switch (permissionStatus) {
      case 'prompt':
        return (
          <div className="card text-center p-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="text-blue-600 w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to Scan</h2>
            <p className="text-gray-600 mb-6">Press the button below to start your camera.</p>
            <button onClick={requestCameraPermission} className="btn-primary">
              Start Camera
            </button>
          </div>
        );
      case 'denied':
        return (
          <div className="card text-center p-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="text-red-600 w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Camera Access Denied</h2>
            <p className="text-gray-600">Please grant camera permission in your browser settings to scan QR codes.</p>
          </div>
        );
      case 'granted':
        return (
          <div className="card p-2 sm:p-4 overflow-hidden">
            <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-900">
              <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full h-full relative">
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-lg" />
                </div>
              </div>
              <AnimatePresence>
                {isScanning && (
                  <motion.div
                    className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                    initial={{ y: 0, opacity: 0.7 }}
                    animate={{ y: 'calc(100% - 1.5px)', opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                     <ScanLine className="w-full h-auto text-blue-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="pt-4 text-center">
              <ScanStatusIndicator status={scanStatus} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <div className="lg:hidden h-16" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => router.back()} className="btn-ghost btn-sm p-2">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">QR Code Scanner</h1>
            <p className="text-gray-600">Align the QR code within the frame to scan</p>
          </div>
        </div>
        <div className="max-w-md mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const ScanStatusIndicator = ({ status }: { status: 'idle' | 'scanning' | 'success' | 'error' }) => {
  const statusConfig = {
    idle: { icon: Camera, text: 'Ready to Scan', color: 'text-gray-600' },
    scanning: { icon: ScanLine, text: 'Searching for QR code...', color: 'text-blue-600' },
    success: { icon: CheckCircle, text: 'QR Code Detected!', color: 'text-green-600' },
    error: { icon: AlertTriangle, text: 'Invalid QR Code', color: 'text-red-600' },
  };

  const { icon: Icon, text, color } = statusConfig[status];

  return (
    <div className={`flex items-center justify-center gap-2 font-semibold text-lg ${color}`}>
      <Icon className={`w-6 h-6 ${status === 'scanning' ? 'animate-pulse' : ''}`} />
      <span>{text}</span>
    </div>
  );
};

export default ScanScreen; 
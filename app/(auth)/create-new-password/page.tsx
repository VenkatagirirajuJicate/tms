'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const CreateNewPassword = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({
    newPassword: false,
    confirmPassword: false,
  });
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (step === 4) {
      setTimeout(() => {
        router.replace('/login');
      }, 2000);
    }
  }, [step, router]);

  const togglePasswordVisibility = (field: 'newPassword' | 'confirmPassword') =>
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleInputChange = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const sendOtp = async () => {
    try {
      const response = await fetch(
        'https://travent-admin-server-suryaprabajicates-projects.vercel.app/api/auth/send-otp',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email }),
        }
      );

      const data = await response.json();
      if (data.message === 'OTP sent to your email.') {
        toast.success('OTP sent to your email!');
        setStep(2);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Error sending OTP. Please try again.');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch(
        'https://travent-admin-server-suryaprabajicates-projects.vercel.app/api/auth/verify-otp',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email, otp: form.otp }),
        }
      );

      const data = await response.json();
      if (data.message === 'OTP verified successfully.') {
        toast.success('OTP verified!');
        setStep(3);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Error verifying OTP. Please try again.');
    }
  };

  const updatePassword = async () => {
    if (form.newPassword !== form.confirmPassword) {
      return toast.error('Passwords do not match.');
    }

    try {
      const response = await fetch(
        'https://travent-admin-server-suryaprabajicates-projects.vercel.app/api/auth/update-password',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: form.email,
            newPassword: form.newPassword,
            otp: form.otp,
          }),
        }
      );

      const data = await response.json();
      if (data.message === 'PendingUser password updated successfully.') {
        toast.success('Password reset successful!');
        setTimeout(() => setStep(4), 3000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Error updating password. Please try again.');
    }
  };

  const handleSubmit = () => {
    if (step === 1) sendOtp();
    else if (step === 2) verifyOtp();
    else if (step === 3) updatePassword();
  };

  const getTitle = () => {
    switch (step) {
      case 1: return 'Enter Your Email';
      case 2: return 'Enter OTP';
      case 3: return 'Create A New Password';
      default: return 'Password Reset';
    }
  };

  const getSubtitle = () => {
    switch (step) {
      case 1: return 'We will send an OTP to your email address to verify your identity.';
      case 2: return 'Enter the OTP sent to your email to proceed.';
      case 3: return 'Enter your new password to complete the reset process.';
      default: return '';
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-[#1E262F] to-[#16171B] min-h-screen">
      <div className="flex-1 flex flex-col justify-center items-center p-5">
        <Image
          src="/assets/splash.png"
          alt="Travent Logo"
          width={80}
          height={80}
          className="mb-5"
        />
        
        <h1 className="text-2xl font-bold text-white text-center mb-4">
          {getTitle()}
        </h1>
        
        <p className="text-gray-400 text-center mb-8 max-w-md">
          {getSubtitle()}
        </p>

        <div className="w-full max-w-md space-y-4">
          {step === 1 && (
            <input
              type="email"
              placeholder="Enter Your Email"
              value={form.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-[#FCD34D] transition-colors"
            />
          )}

          {step === 2 && (
            <input
              type="text"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={(e) => handleInputChange('otp', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-[#FCD34D] transition-colors"
            />
          )}

          {step === 3 && (
            <>
              <div className="relative">
                <input
                  type={showPasswords.newPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  value={form.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-[#FCD34D] transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('newPassword')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPasswords.newPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPasswords.confirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-[#FCD34D] transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPasswords.confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-[#FCD34D] py-3 px-6 rounded-lg font-semibold text-[#1E293B] hover:bg-[#F59E0B] transition-colors"
          >
            {step === 1 ? 'Send OTP' : step === 2 ? 'Verify OTP' : 'Reset Password'}
          </button>

          <button
            onClick={() => router.push('/login')}
            className="w-full text-white text-sm underline hover:text-[#FCD34D] transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
      
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: { background: '#363636', color: '#fff' },
        }}
      />
    </div>
  );
};

export default CreateNewPassword; 
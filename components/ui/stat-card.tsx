import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, children, className, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className={`bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-md border border-white/20 flex items-center gap-3 ${className}`}
    onClick={onClick}
    style={{ cursor: onClick ? 'pointer' : 'default' }}
  >
    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-600 font-medium">{label}</p>
      <div className="text-sm font-bold text-gray-900">
        {children}
      </div>
    </div>
  </motion.div>
);

export default StatCard; 
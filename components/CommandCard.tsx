
import React from 'react';
// Fix: Module '"../data/commands"' declares 'Command' locally, but it is not exported.
import { Command } from '../types';
import { ICONS } from '../constants';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface CommandCardProps {
  command: Command;
  onClick: () => void;
}

const CommandCard: React.FC<CommandCardProps> = ({ command, onClick }) => {
  const Icon = ICONS[command.category] || ICONS['default'];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      onClick={onClick}
      className="glassmorphism rounded-2xl p-6 cursor-pointer group relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start">
          <div className="bg-cyan-500/20 p-3 rounded-lg self-start">
            <Icon className="w-7 h-7 text-cyan-400" />
          </div>
          <span className="text-xs font-medium bg-white/10 px-2 py-1 rounded-full">{command.category}</span>
        </div>
        
        <div className="mt-4 flex-grow">
          <h3 className="text-xl font-bold text-white font-mono">{command.title}</h3>
          <p className="mt-2 text-gray-300 text-sm leading-relaxed">{command.short}</p>
        </div>

        <div className="mt-6 flex justify-end items-center text-cyan-400">
          <span className="text-sm font-semibold">عرض التفاصيل</span>
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
};

export default CommandCard;
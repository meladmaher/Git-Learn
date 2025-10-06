
import React from 'react';
import { motion } from 'framer-motion';
import { CommandType } from '../types';
import { GitMerge, TerminalSquare } from 'lucide-react';

interface HeaderProps {
  activeSection: CommandType;
  setActiveSection: (section: CommandType) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: CommandType.GIT, label: 'أوامر Git', icon: GitMerge },
    { id: CommandType.CMD, label: 'أوامر CMD', icon: TerminalSquare },
  ];

  return (
    <header className="py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-wider">
          مرجع الأوامر
        </h1>
        <nav className="glassmorphism p-1.5 rounded-full flex items-center space-x-2 space-x-reverse">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`relative px-4 py-2 text-sm sm:text-base font-medium rounded-full transition-colors duration-300 focus:outline-none ${
                activeSection === item.id ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="active-nav-item"
                  className="absolute inset-0 bg-cyan-500/30 rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <item.icon className="w-5 h-5" />
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;

import React, { useState, useMemo, useEffect } from 'react';
import { Command, CommandType } from '../types';
import CommandCard from './CommandCard';
import { useDebounce } from '../hooks/useDebounce';
import Fuse from 'fuse.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Layers } from 'lucide-react';
import { ICONS } from '../constants';

interface CommandGridProps {
  commands: Command[];
  categories: string[];
  onCommandSelect: (command: Command) => void;
  favorites: string[];
  onToggleFavorite: (commandId: string) => void;
  activeSection: CommandType;
}

const CommandGrid: React.FC<CommandGridProps> = ({ commands, categories, onCommandSelect, favorites, onToggleFavorite, activeSection }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [gitFilter, setGitFilter] = useState('essential'); // 'essential' or 'all'
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredCommands = useMemo(() => {
    let baseCommands = [...commands];

    // 1. Apply Git sub-filter ('essential' vs 'all')
    if (activeSection === CommandType.GIT && gitFilter === 'essential') {
      baseCommands = baseCommands.filter(cmd => cmd.isEssential);
    }
    
    // 2. Apply category filter ('المفضلة', specific category, or 'الكل')
    if (activeCategory === 'المفضلة') {
      const favoriteSet = new Set(favorites);
      baseCommands = baseCommands.filter(cmd => favoriteSet.has(cmd.id));
    } else if (activeCategory !== 'الكل') {
      baseCommands = baseCommands.filter(cmd => cmd.category === activeCategory);
    }
    
    // 3. Apply search term
    if (debouncedSearchTerm) {
        const fuseInstance = new Fuse(baseCommands, {
            keys: ['title', 'short', 'detail', 'category'],
            threshold: 0.3,
        });
        const searchResult = fuseInstance.search(debouncedSearchTerm);
        return searchResult.map(item => item.item);
    }

    return baseCommands;
  }, [debouncedSearchTerm, activeCategory, gitFilter, commands, favorites, activeSection]);
  
  // Reset filters when command set changes
  useEffect(() => {
      setActiveCategory('الكل');
      setGitFilter('essential');
  }, [commands]);

  const gitFilterOptions = [
    { id: 'essential', label: 'الأساسية', icon: Star },
    { id: 'all', label: 'كل الأوامر', icon: Layers },
  ];

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن أمر..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {activeSection === CommandType.GIT && (
             <div className="glassmorphism p-1.5 rounded-full flex items-center space-x-2 space-x-reverse">
               {gitFilterOptions.map(opt => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setGitFilter(opt.id)}
                      className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 focus:outline-none ${
                          gitFilter === opt.id ? 'text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {gitFilter === opt.id && (
                          <motion.div
                          layoutId="git-filter-item"
                          className="absolute inset-0 bg-purple-500/30 rounded-full"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {opt.label}
                      </span>
                    </button>
                  )
               })}
             </div>
          )}

          <div className="flex-grow self-start md:self-center overflow-x-auto scrollbar-hide">
              <div className="glassmorphism p-1.5 rounded-full flex items-center space-x-2 space-x-reverse w-max">
              {categories.map(category => {
                  const Icon = ICONS[category] || ICONS['default'];
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 focus:outline-none ${
                          activeCategory === category ? 'text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {activeCategory === category && (
                          <motion.div
                          layoutId="active-category-item"
                          className="absolute inset-0 bg-cyan-500/30 rounded-full"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {category}
                      </span>
                    </button>
                  )
              })}
              </div>
          </div>
        </div>
      </div>

      {/* Commands Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredCommands.map(command => (
            <CommandCard 
              key={command.id} 
              command={command} 
              onClick={() => onCommandSelect(command)}
              isFavorite={favorites.includes(command.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </AnimatePresence>
      </motion.div>
      {filteredCommands.length === 0 && (
          <div className="text-center py-16 text-gray-400">
              <p className="text-lg">لم يتم العثور على أوامر تطابق بحثك.</p>
          </div>
      )}
    </div>
  );
};

export default CommandGrid;

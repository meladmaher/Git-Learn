import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import CommandGrid from './components/CommandGrid';
import CommandModal from './components/CommandModal';
import { gitCommands, cmdCommands } from './data/commands';
// Fix: Module '"./data/commands"' declares 'Command' locally, but it is not exported.
import { Command, CommandType } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<CommandType>(CommandType.GIT);
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const savedFavorites = localStorage.getItem('favoriteCommands');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error('Failed to parse favorites from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favoriteCommands', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (commandId: string) => {
    setFavorites(prev => 
      prev.includes(commandId)
        ? prev.filter(id => id !== commandId)
        : [...prev, commandId]
    );
  };

  const commands = useMemo(() => {
    return activeSection === CommandType.GIT ? gitCommands : cmdCommands;
  }, [activeSection]);

  const categories = useMemo(() => {
    const allCategories = commands.map(cmd => cmd.category);
    const uniqueCategories = ['الكل', ...Array.from(new Set(allCategories))];
    if (favorites.length > 0) {
      uniqueCategories.splice(1, 0, 'المفضلة');
    }
    return uniqueCategories;
  }, [commands, favorites.length]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-[#070B1F] to-[#0B1229] -z-10"></div>
      <div className="fixed top-0 left-0 w-[50vw] h-[50vh] bg-cyan-500/10 rounded-full blur-[150px] -z-10 -translate-x-1/4 -translate-y-1/4"></div>
      <div className="fixed bottom-0 right-0 w-[50vw] h-[50vh] bg-purple-500/10 rounded-full blur-[150px] -z-10 translate-x-1/4 translate-y-1/4"></div>
      
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <CommandGrid 
          commands={commands} 
          categories={categories}
          onCommandSelect={setSelectedCommand}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          activeSection={activeSection}
        />
      </main>

      <CommandModal 
        command={selectedCommand} 
        onClose={() => setSelectedCommand(null)}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
      
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>آخر تحديث: {new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </footer>
    </div>
  );
}

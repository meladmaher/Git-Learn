
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import CommandGrid from './components/CommandGrid';
import CommandModal from './components/CommandModal';
import { gitCommands, cmdCommands } from './data/commands';
// Fix: Module '"./data/commands"' declares 'Command' locally, but it is not exported.
import { Command, CommandType } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<CommandType>(CommandType.GIT);
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);

  const commands = useMemo(() => {
    return activeSection === CommandType.GIT ? gitCommands : cmdCommands;
  }, [activeSection]);

  const categories = useMemo(() => {
    const allCategories = commands.map(cmd => cmd.category);
    return ['الكل', ...Array.from(new Set(allCategories))];
  }, [commands]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-[#070B1F] to-[#0B1229] -z-10"></div>
      <div className="fixed top-0 left-0 w-[50vw] h-[50vh] bg-cyan-500/10 rounded-full blur-[150px] -z-10 -translate-x-1/4 -translate-y-1/4"></div>
      <div className="fixed bottom-0 right-0 w-[50vw] h-[50vh] bg-purple-500/10 rounded-full blur-[150px] -z-10 translate-x-1/4 translate-y-1/4"></div>
      
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CommandGrid 
          commands={commands} 
          categories={categories}
          onCommandSelect={setSelectedCommand} 
        />
      </main>

      <CommandModal 
        command={selectedCommand} 
        onClose={() => setSelectedCommand(null)} 
      />
    </div>
  );
}
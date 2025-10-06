
import React, { useState, useEffect } from 'react';
// Fix: Module '"../data/commands"' declares 'Command' locally, but it is not exported.
import { Command } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { X, Copy, Check, Terminal } from 'lucide-react';

interface CommandModalProps {
  command: Command | null;
  onClose: () => void;
}

const TerminalSimulation: React.FC<{ command: string }> = ({ command }) => {
    const [lines, setLines] = useState<string[]>(['']);
    const fullText = `$ ${command}\n> Success! Task completed.`;
  
    useEffect(() => {
        setLines(['']);
        let charIndex = 0;
        const intervalId = setInterval(() => {
            setLines(prev => {
                const newLines = [...prev];
                if (charIndex < fullText.length) {
                    if (fullText[charIndex] === '\n') {
                        newLines.push('');
                    } else {
                        newLines[newLines.length - 1] += fullText[charIndex];
                    }
                }
                return newLines;
            });
            charIndex++;
            if (charIndex >= fullText.length) {
                clearInterval(intervalId);
            }
        }, 50);

        return () => clearInterval(intervalId);
    }, [command]);

    return (
        <div className="bg-black/80 rounded-lg p-4 font-mono text-sm text-green-400 mt-4 h-24 overflow-y-auto">
            {lines.map((line, i) => (
                <p key={i} className="whitespace-pre-wrap">{line}{i === lines.length - 1 && <span className="animate-pulse">_</span>}</p>
            ))}
        </div>
    );
};

const CommandModal: React.FC<CommandModalProps> = ({ command, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    if (!command) {
      setShowTerminal(false);
    }
  }, [command]);

  const handleCopy = () => {
    if (command) {
      navigator.clipboard.writeText(command.example);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } },
  };
  
  return (
    <AnimatePresence>
      {command && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="glassmorphism rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative scrollbar-hide"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl font-bold text-white font-mono">{command.title}</h2>
            <p className="mt-2 text-cyan-400">{command.short}</p>

            <div className="mt-6 border-t border-white/10 pt-6">
              <h3 className="text-xl font-bold text-white mb-2">شرح مفصل</h3>
              <p className="text-gray-300 leading-relaxed">{command.detail}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold text-white mb-2">مثال للاستخدام</h3>
              <div className="relative group">
                <SyntaxHighlighter language="bash" style={atomDark} customStyle={{ borderRadius: '0.5rem', padding: '1rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  {command.example}
                </SyntaxHighlighter>
                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 p-2 bg-gray-700/50 rounded-lg text-gray-300 hover:bg-gray-600/50 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  {isCopied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-6 flex flex-wrap gap-4">
               <button
                  onClick={handleCopy}
                  className="flex-1 min-w-[150px] flex items-center justify-center gap-2 bg-cyan-500/80 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
               >
                   {isCopied ? <Check size={20}/> : <Copy size={20} />}
                   {isCopied ? 'تم النسخ!' : 'نسخ الأمر'}
               </button>
               <button
                onClick={() => setShowTerminal(!showTerminal)}
                className="flex-1 min-w-[150px] flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
               >
                   <Terminal size={20} />
                   {showTerminal ? 'إخفاء المحاكاة' : 'تجربة في المحاكي'}
               </button>
            </div>
            
            {showTerminal && <TerminalSimulation command={command.title} />}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandModal;
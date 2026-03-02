import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, ChevronDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const PRESET_QUESTIONS = [
  "Quel est le taux de ponctualité aujourd'hui ?",
  "Quelles sont les alertes critiques ?",
  "Comment se porte le réseau Asie ?",
  "Quelle est l'utilisation moyenne de la flotte A350 ?",
];

const BOT_RESPONSES: Record<string, string> = {
  "Quel est le taux de ponctualité aujourd'hui ?": "Le taux de ponctualité global aujourd'hui est de 82.4%, en hausse de 1.2% par rapport à hier.",
  "Quelles sont les alertes critiques ?": "Il y a actuellement 2 alertes critiques : une alerte météo sur CDG et une inspection moteur requise sur l'A350 F-HTYA.",
  "Comment se porte le réseau Asie ?": "Le réseau Asie affiche un taux de remplissage de 81% avec 8,300 vols opérés ce mois-ci.",
  "Quelle est l'utilisation moyenne de la flotte A350 ?": "L'utilisation moyenne de la flotte A350-900 est de 14.5 heures par jour, avec 27 appareils actifs sur 29.",
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Bonjour ! Je suis l'assistant Air France Analytics. Comment puis-je vous aider aujourd'hui ?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const responseText = BOT_RESPONSES[text] || "Je n'ai pas la réponse exacte à cette question, mais je peux vous rediriger vers la section correspondante. Souhaitez-vous plus d'informations ?";
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-af-border overflow-hidden flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-af-navy p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-af-red flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Assistant AF</p>
                  <p className="text-[10px] text-white/60 uppercase tracking-widest">En ligne</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-af-bg/30">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    msg.sender === 'user' ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "p-3 rounded-2xl text-sm shadow-sm",
                      msg.sender === 'user'
                        ? "bg-af-navy text-white rounded-tr-none"
                        : "bg-white text-af-text border border-af-border rounded-tl-none"
                    )}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-af-text-muted mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>

            {/* Preset Questions */}
            <div className="p-2 border-t border-af-border bg-white overflow-x-auto whitespace-nowrap scrollbar-hide">
              <div className="flex gap-2">
                {PRESET_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendMessage(q)}
                    className="px-3 py-1.5 bg-af-bg hover:bg-af-border text-af-navy text-xs rounded-full border border-af-border transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-4 border-t border-af-border bg-white flex gap-2"
            >
              <input
                type="text"
                placeholder="Posez votre question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-af-bg border border-af-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-af-navy"
              />
              <button
                type="submit"
                className="bg-af-navy text-white p-2 rounded-full hover:bg-af-navy-light transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110",
          isOpen ? "bg-af-red rotate-90" : "bg-af-navy"
        )}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageSquare className="w-6 h-6 text-white" />}
      </button>
    </div>
  );
}

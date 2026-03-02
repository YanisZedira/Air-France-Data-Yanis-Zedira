import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plane, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#051040] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-af-sky rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-af-red rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-white/20 backdrop-blur-sm">
          <div className="p-8 sm:p-12">
            <div className="flex flex-col items-center mb-10">
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-black tracking-tighter italic text-af-navy">AIRFRANCE</span>
                <div className="w-6 h-7 bg-af-red ml-1 -skew-x-[25deg] transform origin-bottom" />
              </div>
              <p className="text-af-text-muted text-sm font-medium uppercase tracking-widest">Analytics Platform</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-af-navy uppercase tracking-wider ml-1">Utilisateur</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-af-text-muted" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Identifiant Air France"
                    className="w-full pl-12 pr-4 py-4 bg-af-bg border border-af-border rounded-2xl text-af-navy focus:outline-none focus:ring-2 focus:ring-af-navy/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-af-navy uppercase tracking-wider ml-1">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-af-text-muted" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-af-bg border border-af-border rounded-2xl text-af-navy focus:outline-none focus:ring-2 focus:ring-af-navy/20 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-af-border text-af-navy focus:ring-af-navy" />
                  <span className="text-xs text-af-text-muted group-hover:text-af-navy transition-colors">Se souvenir de moi</span>
                </label>
                <a href="#" className="text-xs font-bold text-af-red hover:underline">Mot de passe oublié ?</a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-af-navy text-white rounded-2xl font-bold text-lg hover:bg-af-navy-light transition-all shadow-xl shadow-af-navy/20 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Connexion sécurisée
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-af-border flex items-center justify-center gap-2 text-af-text-muted">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Accès restreint au personnel autorisé</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/40 text-xs font-medium">
            &copy; 2026 Air France-KLM Group. Tous droits réservés.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

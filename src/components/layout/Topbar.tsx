import { useState, useRef, useEffect } from 'react';
import { Bell, Search, Calendar, Menu, X, Check, AlertTriangle, Info, Clock } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { format, isWithinInterval, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TopbarProps {
  onMenuClick: () => void;
}

const SUGGESTIONS = [
  { id: '1', type: 'flight', label: 'AF006 - Paris (CDG) → New York (JFK)' },
  { id: '2', type: 'flight', label: 'AF117 - Shanghai (PVG) → Paris (CDG)' },
  { id: '3', type: 'dest', label: 'Londres (LHR) - Hub Europe' },
  { id: '4', type: 'dest', label: 'Singapour (SIN) - Hub Asie' },
  { id: '5', type: 'fleet', label: 'Airbus A350-900 - Performance' },
  { id: '6', type: 'fleet', label: 'Boeing 777-300ER - Maintenance' },
];

const NOTIFICATIONS = [
  { id: '1', type: 'alert', title: 'Retard AF006', message: 'Le vol AF006 accuse un retard de 45min dû à la météo.', time: 'Il y a 5 min', read: false },
  { id: '2', type: 'info', title: 'Maintenance F-HTYA', message: 'La visite technique de l\'A350 F-HTYA est terminée.', time: 'Il y a 1h', read: false },
  { id: '3', type: 'warning', title: 'Alerte Carburant', message: 'Hausse de 5% de la consommation sur le réseau Asie.', time: 'Il y a 3h', read: true },
];

export function Topbar({ onMenuClick }: TopbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 2, 15)); // March 15, 2026

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = SUGGESTIONS.filter(s => 
    s.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-af-border bg-white px-6 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-af-text-muted hover:text-af-navy transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <div className="relative w-full max-w-md hidden md:block" ref={searchRef}>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-af-text-muted" />
          <input
            type="text"
            placeholder="Rechercher un vol, une destination..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="h-10 w-full rounded-full border border-af-border bg-af-bg pl-10 pr-4 text-sm focus:border-af-navy focus:outline-none focus:ring-1 focus:ring-af-navy transition-all"
          />
          
          {showSuggestions && searchQuery.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-af-border overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-2">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSearchQuery(s.label);
                        setShowSuggestions(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm hover:bg-af-bg rounded-xl transition-colors group"
                    >
                      <div className="h-8 w-8 rounded-lg bg-af-bg flex items-center justify-center text-af-navy group-hover:bg-white transition-colors">
                        <Search className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-af-navy">{s.label}</p>
                        <p className="text-[10px] text-af-text-muted uppercase font-bold tracking-wider">
                          {s.type === 'flight' ? 'Vol' : s.type === 'dest' ? 'Destination' : 'Flotte'}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-sm text-af-text-muted">Aucun résultat pour "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative" ref={calendarRef}>
          <button 
            onClick={() => setShowCalendar(!showCalendar)}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-af-bg text-sm font-medium text-af-text hover:bg-af-border transition-colors border border-transparent hover:border-af-border"
          >
            <Calendar className="h-4 w-4 text-af-sky" />
            <span>{format(selectedDate, 'dd MMMM yyyy', { locale: fr })}</span>
          </button>

          {showCalendar && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-af-border overflow-hidden z-50 p-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-af-navy uppercase tracking-wider">Période d'analyse</p>
                <button onClick={() => setShowCalendar(false)}><X className="w-4 h-4 text-af-text-muted" /></button>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-af-bg rounded-xl border border-af-border">
                  <p className="text-[10px] text-af-text-muted uppercase font-bold mb-2">Plage autorisée</p>
                  <p className="text-xs font-medium text-af-navy">Sept. 2024 → 27 Sept. 2026</p>
                </div>
                <input 
                  type="date" 
                  min="2024-09-01"
                  max="2026-09-27"
                  value={format(selectedDate, 'yyyy-MM-dd')}
                  onChange={(e) => setSelectedDate(parseISO(e.target.value))}
                  className="w-full p-3 bg-white border border-af-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-af-navy/20"
                />
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setSelectedDate(new Date())}
                    className="py-2 bg-af-bg text-af-navy text-xs font-bold rounded-lg hover:bg-af-border transition-colors"
                  >
                    Aujourd'hui
                  </button>
                  <button 
                    onClick={() => setShowCalendar(false)}
                    className="py-2 bg-af-navy text-white text-xs font-bold rounded-lg hover:bg-af-navy-light transition-colors"
                  >
                    Appliquer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={cn(
              "relative p-2 text-af-text-muted hover:text-af-navy transition-colors rounded-full hover:bg-af-bg",
              showNotifications && "bg-af-bg text-af-navy"
            )}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-af-red"></span>
          </button>

          {showNotifications && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-af-border overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-af-border flex items-center justify-between bg-af-bg/50">
                <h3 className="text-sm font-bold text-af-navy">Notifications</h3>
                <button className="text-[10px] font-bold text-af-red uppercase hover:underline">Tout marquer lu</button>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {NOTIFICATIONS.map((n) => (
                  <div key={n.id} className={cn(
                    "p-4 border-b border-af-border last:border-0 hover:bg-af-bg transition-colors cursor-pointer",
                    !n.read && "bg-af-sky/5"
                  )}>
                    <div className="flex gap-3">
                      <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                        n.type === 'alert' ? "bg-af-red/10 text-af-red" : 
                        n.type === 'warning' ? "bg-amber-100 text-amber-600" : "bg-af-sky/10 text-af-sky"
                      )}>
                        {n.type === 'alert' ? <AlertTriangle className="w-4 h-4" /> : 
                         n.type === 'warning' ? <Clock className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-af-navy">{n.title}</p>
                          {!n.read && <div className="h-1.5 w-1.5 rounded-full bg-af-red" />}
                        </div>
                        <p className="text-xs text-af-text-muted leading-relaxed">{n.message}</p>
                        <p className="text-[10px] text-af-text-muted font-medium">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 text-xs font-bold text-af-navy hover:bg-af-bg transition-colors border-t border-af-border">
                Voir toutes les notifications
              </button>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-af-border mx-2 hidden sm:block"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-semibold text-af-navy group-hover:text-af-red transition-colors">Yanis Zedira</span>
            <span className="text-xs text-af-text-muted">Admin Data</span>
          </div>
          <div className="h-10 w-10 rounded-full bg-af-navy flex items-center justify-center text-white font-bold shadow-lg shadow-af-navy/20 group-hover:scale-105 transition-transform">
            YZ
          </div>
        </div>
      </div>
    </header>
  );
}

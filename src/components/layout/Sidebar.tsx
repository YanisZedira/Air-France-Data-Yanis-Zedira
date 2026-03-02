import { Plane, BarChart3, Users, Settings, Map, ShieldAlert, LogOut, X, Navigation, Activity } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export type PageId = 'dashboard' | 'operations' | 'fleet' | 'passengers' | 'network' | 'traffic' | 'alerts' | 'settings';

export const navItems: { id: PageId; icon: any; label: string }[] = [
  { id: 'dashboard', icon: BarChart3, label: 'Tableau de bord' },
  { id: 'operations', icon: Plane, label: 'Opérations' },
  { id: 'fleet', icon: Activity, label: 'Performance Flotte' },
  { id: 'passengers', icon: Users, label: 'Passagers' },
  { id: 'network', icon: Map, label: 'Réseau' },
  { id: 'traffic', icon: Navigation, label: 'Trafic Temps Réel' },
  { id: 'alerts', icon: ShieldAlert, label: 'Alertes' },
  { id: 'settings', icon: Settings, label: 'Paramètres' },
];

interface SidebarProps {
  currentPage: PageId;
  onPageChange: (page: PageId) => void;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function Sidebar({ currentPage, onPageChange, isOpen, onClose, onLogout }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-af-navy text-white flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-20 border-b border-white/10 px-6">
          <div className="flex items-center gap-2">
            <div className="flex items-baseline">
              <span className="text-xl font-black tracking-tighter italic">AIRFRANCE</span>
              <div className="w-4 h-5 bg-af-red ml-1 -skew-x-[25deg] transform origin-bottom" />
            </div>
          </div>
          <button onClick={onClose} className="md:hidden text-white/70 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <div className="mb-6 px-2">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">Analytics Platform</p>
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onPageChange(item.id);
                onClose();
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                currentPage === item.id 
                  ? "bg-white/10 text-white" 
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5", currentPage === item.id ? "text-af-red" : "")} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-4 mb-4">
            <p className="text-xs text-white/60 mb-1">Créé par</p>
            <p className="text-sm font-medium">Yanis Zedira</p>
            <p className="text-xs text-af-red mt-0.5">Data Analyst & Engineer</p>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
}

import { KPICard } from '@/src/components/dashboard/KPICard';
import { RevenueChart, PerformanceChart, RegionalChart } from '@/src/components/dashboard/Charts';
import { AlertsList } from '@/src/components/dashboard/AlertsList';
import { PlaneTakeoff, Users, Euro, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export function Dashboard() {
  const handleExport = () => {
    const data = [
      ['KPI', 'Valeur', 'Tendance'],
      ['Vols Opérés', '1,248', '+2.4%'],
      ['Passagers', '142.5k', '+5.1%'],
      ['Chiffre d\'Affaires', '€1.84B', '+1.2%'],
      ['Taux de Remplissage', '86.4%', '-0.5%'],
    ];
    const csvContent = "data:text/csv;charset=utf-8," + data.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "air_france_analytics_summary.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-af-navy tracking-tight">Vue d'ensemble</h1>
          <p className="text-sm text-af-text-muted mt-1">Plateforme analytique globale des opérations Air France.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="px-4 py-2 bg-white border border-af-border rounded-lg text-sm font-medium text-af-navy hover:bg-gray-50 transition-colors shadow-sm"
          >
            Exporter
          </button>
          <button className="px-4 py-2 bg-af-navy text-white rounded-lg text-sm font-medium hover:bg-af-navy-light transition-colors shadow-sm">
            Générer Rapport
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Vols Opérés (Aujourd'hui)"
          value="1,248"
          icon={PlaneTakeoff}
          trend={2.4}
          trendLabel="vs hier"
        />
        <KPICard
          title="Passagers Transportés"
          value="142.5k"
          icon={Users}
          trend={5.1}
          trendLabel="vs semaine dernière"
        />
        <KPICard
          title="Chiffre d'Affaires (Mois)"
          value="€1.84B"
          icon={Euro}
          trend={1.2}
          trendLabel="vs mois dernier"
        />
        <KPICard
          title="Taux de Remplissage"
          value="86.4%"
          icon={Activity}
          trend={-0.5}
          trendLabel="vs mois dernier"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart />
        <PerformanceChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RegionalChart />
        <AlertsList />
      </div>
    </motion.div>
  );
}

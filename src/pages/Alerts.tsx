import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { AlertsList } from '@/src/components/dashboard/AlertsList';
import { ShieldAlert, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { KPICard } from '@/src/components/dashboard/KPICard';

export function Alerts() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-af-navy tracking-tight">Centre d'Alertes</h1>
          <p className="text-sm text-af-text-muted mt-1">Gestion des incidents et notifications critiques.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Alertes Critiques"
          value="2"
          icon={AlertTriangle}
          trend={-1}
          trendLabel="vs hier"
        />
        <KPICard
          title="Avertissements"
          value="14"
          icon={ShieldAlert}
          trend={4}
          trendLabel="vs hier"
        />
        <KPICard
          title="Informations"
          value="45"
          icon={Info}
        />
        <KPICard
          title="Incidents Résolus"
          value="128"
          icon={CheckCircle2}
          trend={12}
          trendLabel="cette semaine"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Historique des Incidents Majeurs (7 derniers jours)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: '14 Mars', type: 'Météo', desc: 'Fermeture piste 2 CDG (Brouillard)', duration: '4h 12m', status: 'Résolu' },
                  { date: '12 Mars', type: 'Technique', desc: 'Panne système enregistrement Orly', duration: '1h 45m', status: 'Résolu' },
                  { date: '10 Mars', type: 'Social', desc: 'Grève contrôleurs aériens (Marseille)', duration: '24h', status: 'Résolu' },
                  { date: '09 Mars', type: 'Sécurité', desc: 'Colis suspect Terminal 2E', duration: '2h 30m', status: 'Résolu' },
                ].map((incident, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-af-navy">{incident.desc}</span>
                      <div className="flex items-center gap-3 text-xs text-af-text-muted">
                        <span>{incident.date}</span>
                        <span className="px-2 py-0.5 bg-gray-100 rounded-full">{incident.type}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> {incident.status}
                      </span>
                      <span className="text-xs text-af-text-muted">Durée: {incident.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <AlertsList />
        </div>
      </div>
    </motion.div>
  );
}

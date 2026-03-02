import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { KPICard } from '@/src/components/dashboard/KPICard';
import { Plane, Clock, Wrench, ShieldCheck } from 'lucide-react';
import { fleetStatus } from '@/src/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export function Operations() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-af-navy tracking-tight">Opérations Aériennes</h1>
          <p className="text-sm text-af-text-muted mt-1">Suivi en temps réel de la flotte et des vols.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Avions en Vol"
          value="184"
          icon={Plane}
          trend={12}
          trendLabel="vs moyenne"
        />
        <KPICard
          title="Retard Moyen"
          value="14m"
          icon={Clock}
          trend={-2.1}
          trendLabel="vs hier"
        />
        <KPICard
          title="En Maintenance"
          value="9"
          icon={Wrench}
        />
        <KPICard
          title="Indice Sécurité"
          value="99.9%"
          icon={ShieldCheck}
          trend={0.1}
          trendLabel="vs mois dernier"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Disponibilité de la Flotte</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fleetStatus} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="type" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB' }}
                  cursor={{ fill: '#F4F6F9' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Bar dataKey="active" name="Actifs" stackId="a" fill="#051040" radius={[0, 0, 4, 4]} />
                <Bar dataKey="maintenance" name="En Maintenance" stackId="a" fill="#FF0000" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statut des Vols (En cours)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { flight: 'AF006', route: 'CDG - JFK', status: 'En vol', time: '14:20', delay: 0 },
                { flight: 'AF117', route: 'PVG - CDG', status: 'Retardé', time: '15:45', delay: 45 },
                { flight: 'AF278', route: 'CDG - HND', status: 'Embarquement', time: '16:10', delay: 0 },
                { flight: 'AF402', route: 'SCL - CDG', status: 'Approche', time: '16:30', delay: 10 },
                { flight: 'AF123', route: 'CDG - LHR', status: 'Annulé', time: '17:00', delay: 0 },
              ].map((flight, i) => (
                <div key={i} className="flex items-center justify-between p-3 border-b border-af-border last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-12 text-sm font-bold text-af-navy">{flight.flight}</div>
                    <div className="text-sm font-medium text-af-text">{flight.route}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-af-text-muted">{flight.time}</div>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                      flight.status === 'En vol' || flight.status === 'Approche' ? 'bg-emerald-100 text-emerald-700' :
                      flight.status === 'Retardé' ? 'bg-amber-100 text-amber-700' :
                      flight.status === 'Annulé' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {flight.status} {flight.delay > 0 && `(+${flight.delay}m)`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

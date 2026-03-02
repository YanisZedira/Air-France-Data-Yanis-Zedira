import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { KPICard } from '@/src/components/dashboard/KPICard';
import { Plane, Fuel, Wrench, Clock, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { cn } from '@/src/lib/utils';

const fleetEfficiency = [
  { type: 'A350-900', fuel: 2.4, utilization: 14.5, reliability: 99.2 },
  { type: 'B777-300ER', fuel: 2.9, utilization: 13.8, reliability: 98.7 },
  { type: 'A330-200', fuel: 3.1, utilization: 12.5, reliability: 98.5 },
  { type: 'A320neo', fuel: 2.1, utilization: 10.2, reliability: 99.4 },
  { type: 'A220-300', fuel: 1.9, utilization: 9.8, reliability: 99.6 },
];

export function Fleet() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-af-navy tracking-tight">Performance de la Flotte</h1>
          <p className="text-sm text-af-text-muted mt-1">Analyse technique et opérationnelle des appareils.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-af-border rounded-lg text-sm font-medium text-af-navy hover:bg-gray-50 transition-colors shadow-sm">
            Rapport Maintenance
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Utilisation Moyenne"
          value="12.4h"
          icon={Clock}
          trend={0.8}
          trendLabel="vs mois dernier"
        />
        <KPICard
          title="Efficacité Carburant"
          value="2.3L/100pkm"
          icon={Fuel}
          trend={-2.4}
          trendLabel="vs an dernier"
        />
        <KPICard
          title="Fiabilité Technique"
          value="99.1%"
          icon={Wrench}
          trend={0.2}
        />
        <KPICard
          title="Coût Maintenance / BH"
          value="€1,240"
          icon={TrendingUp}
          trend={-1.5}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Consommation Carburant par Type (L/100pkm)</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fleetEfficiency} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="type" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB' }}
                />
                <Bar dataKey="fuel" name="Consommation" fill="#FF0000" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Utilisation Quotidienne (Heures de vol)</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fleetEfficiency} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="type" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB' }}
                />
                <Bar dataKey="utilization" name="Heures/Jour" fill="#051040" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>État de Santé des Moteurs & Systèmes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-af-text-muted uppercase bg-af-bg">
                <tr>
                  <th className="px-6 py-3 font-semibold">Appareil</th>
                  <th className="px-6 py-3 font-semibold">Moteur 1</th>
                  <th className="px-6 py-3 font-semibold">Moteur 2</th>
                  <th className="px-6 py-3 font-semibold">Avionique</th>
                  <th className="px-6 py-3 font-semibold">Prochaine Visite</th>
                  <th className="px-6 py-3 font-semibold">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-af-border">
                {[
                  { id: 'F-HTYA', m1: '98%', m2: '97%', av: 'OK', next: '12 Jours', status: 'Actif' },
                  { id: 'F-GSQD', m1: '94%', m2: '95%', av: 'OK', next: '2 Jours', status: 'Maintenance' },
                  { id: 'F-HRBA', m1: '99%', m2: '99%', av: 'OK', next: '45 Jours', status: 'Actif' },
                  { id: 'F-GRXF', m1: '92%', m2: '93%', av: 'Vérif', next: 'Demain', status: 'Actif' },
                  { id: 'F-HZUA', m1: '100%', m2: '100%', av: 'OK', next: '60 Jours', status: 'Actif' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-af-bg transition-colors">
                    <td className="px-6 py-4 font-bold text-af-navy">{row.id}</td>
                    <td className="px-6 py-4">{row.m1}</td>
                    <td className="px-6 py-4">{row.m2}</td>
                    <td className="px-6 py-4">{row.av}</td>
                    <td className="px-6 py-4">{row.next}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                        row.status === 'Actif' ? "bg-emerald-100 text-emerald-700" : "bg-af-red/10 text-af-red"
                      )}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

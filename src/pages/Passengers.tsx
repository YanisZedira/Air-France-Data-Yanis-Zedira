import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { KPICard } from '@/src/components/dashboard/KPICard';
import { Users, Heart, Award, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { cn } from '@/src/lib/utils';

const satisfactionData = [
  { month: 'Jan', score: 8.2 },
  { month: 'Fév', score: 8.3 },
  { month: 'Mar', score: 8.5 },
  { month: 'Avr', score: 8.4 },
  { month: 'Mai', score: 8.6 },
  { month: 'Juin', score: 8.7 },
];

export function Passengers() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-af-navy tracking-tight">Passagers & Satisfaction</h1>
          <p className="text-sm text-af-text-muted mt-1">Analyse de l'expérience client et fidélité.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Nouveaux Clients"
          value="12.4k"
          icon={Users}
          trend={8.2}
          trendLabel="vs mois dernier"
        />
        <KPICard
          title="Score NPS"
          value="42"
          icon={Heart}
          trend={3}
          trendLabel="vs trimestre dernier"
        />
        <KPICard
          title="Membres Flying Blue"
          value="18.2M"
          icon={Award}
          trend={1.5}
          trendLabel="vs an dernier"
        />
        <KPICard
          title="Revenu par Passager"
          value="€420"
          icon={TrendingUp}
          trend={4.1}
          trendLabel="vs an dernier"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Évolution de la Satisfaction Globale (/10)</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={satisfactionData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis domain={[7, 10]} stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB' }}
                />
                <Line type="monotone" dataKey="score" name="Score" stroke="#00A4E4" strokeWidth={3} dot={{ r: 4, fill: '#00A4E4', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top 5 Flux Origine-Destination (Pax/Mois)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { route: 'CDG → JFK', pax: '42,500', trend: '+12%', load: '94%' },
                { route: 'CDG → LHR', pax: '38,200', trend: '+5%', load: '88%' },
                { route: 'CDG → SIN', pax: '28,400', trend: '+18%', load: '91%' },
                { route: 'CDG → GRU', pax: '24,100', trend: '+2%', load: '86%' },
                { route: 'CDG → DXB', pax: '22,800', trend: '-3%', load: '82%' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-xl hover:bg-af-bg transition-colors">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-af-navy">{item.route}</span>
                    <span className="text-xs text-af-text-muted">Remplissage: {item.load}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-af-text">{item.pax}</span>
                    <span className={cn("text-xs font-medium", item.trend.startsWith('+') ? "text-emerald-600" : "text-af-red")}>
                      {item.trend}
                    </span>
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

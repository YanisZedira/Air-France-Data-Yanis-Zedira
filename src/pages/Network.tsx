import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { KPICard } from '@/src/components/dashboard/KPICard';
import { Map, Globe, Navigation, Target } from 'lucide-react';
import { RegionalChart } from '@/src/components/dashboard/Charts';

export function Network() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-af-navy tracking-tight">Réseau & Destinations</h1>
          <p className="text-sm text-af-text-muted mt-1">Analyse des routes et de la couverture mondiale.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Destinations Desservies"
          value="195"
          icon={Globe}
          trend={3}
          trendLabel="vs an dernier"
        />
        <KPICard
          title="Pays Couverts"
          value="91"
          icon={Map}
        />
        <KPICard
          title="Nouvelles Routes (2026)"
          value="12"
          icon={Navigation}
        />
        <KPICard
          title="Hub Principal (CDG)"
          value="68%"
          icon={Target}
          trend={1.2}
          trendLabel="part du trafic"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RegionalChart />

        <Card>
          <CardHeader>
            <CardTitle>Top 5 Routes les plus Rentables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { route: 'Paris (CDG) - New York (JFK)', revenue: '145M€', load: 92, trend: '+4.5%' },
                { route: 'Paris (CDG) - Los Angeles (LAX)', revenue: '112M€', load: 89, trend: '+3.2%' },
                { route: 'Paris (CDG) - Tokyo (HND)', revenue: '98M€', load: 85, trend: '+8.1%' },
                { route: 'Paris (CDG) - São Paulo (GRU)', revenue: '85M€', load: 88, trend: '+2.4%' },
                { route: 'Paris (CDG) - Dubai (DXB)', revenue: '76M€', load: 84, trend: '-1.2%' },
              ].map((route, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:border-af-sky transition-colors cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-af-navy">{route.route}</span>
                    <span className="text-xs text-af-text-muted">Remplissage: {route.load}%</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-bold text-af-text">{route.revenue}</span>
                    <span className={`text-xs font-medium ${route.trend.startsWith('+') ? 'text-emerald-600' : 'text-af-red'}`}>
                      {route.trend}
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

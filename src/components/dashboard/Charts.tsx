import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { revenueData, onTimePerformance, regionalPerformance } from '@/src/data/mockData';

export function RevenueChart() {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Évolution du Chiffre d'Affaires (M€)</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPax" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#051040" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#051040" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCargo" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00A4E4" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00A4E4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}M`} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#1A1A1A', fontWeight: 500 }}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
            <Area type="monotone" dataKey="pax" name="Passagers" stroke="#051040" strokeWidth={2} fillOpacity={1} fill="url(#colorPax)" />
            <Area type="monotone" dataKey="cargo" name="Fret" stroke="#00A4E4" strokeWidth={2} fillOpacity={1} fill="url(#colorCargo)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function PerformanceChart() {
  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle>Ponctualité Globale</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] flex flex-col items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={onTimePerformance}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {onTimePerformance.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontWeight: 600 }}
              formatter={(value: number) => [`${value}%`, 'Part']}
            />
            <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center mt-2">
          <p className="text-2xl font-bold text-af-navy">82.4%</p>
          <p className="text-xs text-af-text-muted">Vols à l'heure</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function RegionalChart() {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Taux de Remplissage par Région (%)</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={regionalPerformance} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
            <XAxis type="number" domain={[0, 100]} stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis dataKey="region" type="category" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} width={80} />
            <Tooltip
              cursor={{ fill: '#F4F6F9' }}
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB' }}
              formatter={(value: number) => [`${value}%`, 'Taux de remplissage']}
            />
            <Bar dataKey="loadFactor" name="Taux de Remplissage" radius={[0, 4, 4, 0]} barSize={24}>
              {regionalPerformance.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.loadFactor > 85 ? '#051040' : '#00A4E4'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

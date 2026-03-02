import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { recentAlerts } from '@/src/data/mockData';
import { AlertCircle, Clock, Info, Wrench } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function AlertsList() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'weather': return <AlertCircle className="h-4 w-4 text-af-red" />;
      case 'maintenance': return <Wrench className="h-4 w-4 text-amber-500" />;
      case 'operational': return <Clock className="h-4 w-4 text-orange-500" />;
      default: return <Info className="h-4 w-4 text-af-sky" />;
    }
  };

  const getBgColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-af-red/10 border-af-red/20';
      case 'medium': return 'bg-amber-500/10 border-amber-500/20';
      case 'low': return 'bg-af-sky/10 border-af-sky/20';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Alertes Opérationnelles</CardTitle>
        <span className="text-xs font-medium bg-af-red text-white px-2 py-1 rounded-full">
          {recentAlerts.length} actives
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentAlerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg border",
              getBgColor(alert.severity)
            )}
          >
            <div className="mt-0.5">{getIcon(alert.type)}</div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-tight text-af-navy">{alert.message}</p>
              <p className="text-xs text-af-text-muted flex items-center gap-1">
                <Clock className="h-3 w-3" /> {alert.time}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

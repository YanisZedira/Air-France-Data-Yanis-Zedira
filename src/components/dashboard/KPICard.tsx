import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  className?: string;
}

export function KPICard({ title, value, icon: Icon, trend, trendLabel, className }: KPICardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-af-text-muted">
          {title}
        </CardTitle>
        <div className="h-10 w-10 rounded-full bg-af-bg flex items-center justify-center text-af-navy">
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-af-navy tracking-tight">{value}</div>
        {trend !== undefined && (
          <p className="mt-2 text-xs flex items-center gap-1">
            <span className={cn("font-medium", trend > 0 ? "text-emerald-600" : "text-af-red")}>
              {trend > 0 ? "+" : ""}{trend}%
            </span>
            <span className="text-af-text-muted">{trendLabel || "depuis le mois dernier"}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}

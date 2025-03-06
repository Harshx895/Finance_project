
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  percentage?: number;
  color?: string;
  className?: string;
}

export const MetricCard = ({
  title,
  value,
  percentage,
  color = "bg-primary",
  className,
}: MetricCardProps) => {
  return (
    <Card className={cn("metric-card overflow-hidden border-none shadow-lg", className)}>
      <CardContent className="p-6 relative">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">{value}</p>
            {percentage !== undefined && (
              <div className={cn("rounded-full px-3 py-1", color)}>
                <span className="text-sm font-medium text-white">
                  {percentage > 0 ? "+" : ""}{percentage}%
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

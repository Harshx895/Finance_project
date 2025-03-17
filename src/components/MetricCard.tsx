
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  percentage?: number;
  color?: string;
  className?: string;
  overdue?: boolean;
  buttonText?: string;
  onClick?: () => void;
}

export const MetricCard = ({
  title,
  value,
  percentage,
  color = "bg-primary",
  className,
  overdue = false,
  buttonText,
  onClick,
}: MetricCardProps) => {
  return (
    <Card className={cn("metric-card overflow-hidden border-none shadow-lg", className)}>
      <CardContent className="p-4 md:p-6 relative">
        <div className="space-y-2 md:space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-xs md:text-sm text-muted-foreground uppercase">{title}</p>
            {overdue && (
              <span className="text-xs uppercase font-bold text-destructive">OVERDUE</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg md:text-2xl font-bold">{value}</p>
            {percentage !== undefined && (
              <div className={cn("rounded-full px-2 py-0.5 md:px-3 md:py-1 flex items-center gap-1", color)}>
                {percentage > 0 ? (
                  <TrendingUp className="h-3 w-3 text-white" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-white" />
                )}
                <span className="text-xs md:text-sm font-medium text-white">
                  {percentage > 0 ? "+" : ""}{percentage}%
                </span>
              </div>
            )}
          </div>
          {buttonText && (
            <button 
              onClick={onClick} 
              className="mt-2 bg-black text-white text-sm px-4 py-2 rounded-full"
            >
              {buttonText}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

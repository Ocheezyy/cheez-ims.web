import {
  Bar,
  BarChart,
  BarProps,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useGetOverview } from "@/hooks/dashboard/useGetOverview.ts";
import { useEffect } from "react";
import { toast } from "sonner";

export function Overview() {
  const { data, isError, isLoading } = useGetOverview();

  useEffect(() => {
    if (isError) toast.error("Failed to load overview");
  }, [isError]);

  if (isLoading) {
    return <OverviewSkeleton />;
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="totalAmount"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

function OverviewSkeleton() {
  const placeholderData = Array.from({ length: 13 }, (_, i) => ({
    name: `Item ${i + 1}`,
    value: Math.random() * 100, // Random placeholder values
  }));

  return (
    <div className="space-y-2">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={placeholderData}>
          <XAxis dataKey="name" tick={false} axisLine={false} />
          <YAxis tick={false} axisLine={false} />
          <Bar
            dataKey="value"
            shape={(props: BarProps) => (
              <rect
                x={props.x}
                y={props.y}
                width={props.width}
                height={props.height}
                fill="#e0e0e0"
                className="animate-pulse"
                rx={4} // Rounded corners
              />
            )}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

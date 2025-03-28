import { useQuery } from "@tanstack/react-query";
import type { DashboardOverviewStats } from "@/types.ts";

export const useGetOverviewStats = () => {
  return useQuery<DashboardOverviewStats, Error>({
    queryKey: ["dashboardOverviewStats"],
    queryFn: async (): Promise<DashboardOverviewStats> => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/dashboard/overview-stats`,
      );

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to fetch dashboard overview stats: ${error}`);
      }

      return await res.json();
    },
  });
};

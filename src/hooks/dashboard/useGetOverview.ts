import { useQuery } from "@tanstack/react-query";
import { DashboardOverview } from "@/types.ts";

export const useGetOverview = () => {
  return useQuery<DashboardOverview[], Error>({
    queryKey: ["dashboardOverview"],
    queryFn: async (): Promise<DashboardOverview[]> => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/dashboard/overview`,
      );

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to fetch dashboard overview: ${error}`);
      }

      const dashboardOverview: DashboardOverview[] = await res.json();
      return dashboardOverview;
    },
  });
};

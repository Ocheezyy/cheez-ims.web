import { useQuery } from "@tanstack/react-query";
import type { ActivityWUser } from "@/types.ts";

export const useGetActivity = () => {
  return useQuery<ActivityWUser[], Error>({
    queryKey: ["dashboardActivity"],
    queryFn: async (): Promise<ActivityWUser[]> => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/dashboard/recent-activity`,
      );

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to fetch dashboard activity: ${error}`);
      }

      return await res.json();
    },
  });
};

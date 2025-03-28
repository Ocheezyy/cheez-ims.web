import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { useGetActivity } from "@/hooks/dashboard/useGetActivity.ts";
import { getTimeDifference, getUserInitials } from "@/lib/utils.ts";
import { useEffect } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton.tsx";

interface RecentActivityProps {
  extended?: boolean;
}

export function RecentActivity({ extended = false }: RecentActivityProps) {
  const { data: activities, isLoading, isError } = useGetActivity();

  useEffect(() => {
    if (isError) toast.error("Failed to get recent activity");
  }, [isError]);

  const displayActivities = extended ? activities : activities?.slice(0, 5);

  if (isLoading) return <RecentActivitySkeleton extended={extended} />;

  return (
    <div className="space-y-8">
      {displayActivities?.map((activity, index) => (
        <div className="flex items-center" key={index}>
          <Avatar className="h-9 w-9">
            <AvatarImage
              src="/placeholder.svg"
              alt={activity.user.firstName + " " + activity.user.lastName}
            />
            <AvatarFallback>{getUserInitials(activity.user)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user.firstName + " " + activity.user.lastName}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">{activity.message}</span>
            </p>
          </div>
          <div className="ml-auto font-medium text-xs text-muted-foreground">
            {getTimeDifference(activity.timestamp)}
          </div>
        </div>
      ))}
    </div>
  );
}

function RecentActivitySkeleton({ extended }: RecentActivityProps) {
  const blankArr = Array.from({ length: 8 }, (_, i) => ({
    name: `Item ${i + 1}`,
    value: Math.random() * 100,
  }));
  const emptyArr = extended ? blankArr : blankArr.slice(0, 5);

  return (
    <div className="space-y-8">
      {emptyArr.map((_, index) => (
        <div className="flex items-center" key={index}>
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="ml-4 flex-1 space-y-1">
            <Skeleton className="h-7 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

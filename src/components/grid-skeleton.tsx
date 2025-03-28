import { Skeleton } from "@/components/ui/skeleton.tsx";

const SkeletonCard = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="overflow-hidden">
          <div className="p-4 pb-0">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-md" />
                <Skeleton className="w-40 h-4" />
              </div>
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <Skeleton className="w-16 h-4" />
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-36 h-4" />
            </div>
          </div>
          <div className="p-4 pt-0 flex justify-between">
            <Skeleton className="h-8 w-24 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SkeletonCard;

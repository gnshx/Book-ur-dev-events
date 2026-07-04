import Skeleton from "@/components/Skeleton";

const EventCardSkeleton = () => (
  <div id="event-card" className="flex flex-col gap-3">
    <Skeleton className="h-[300px] w-full rounded-lg" />
    <div className="flex flex-row items-center gap-2">
      <Skeleton className="size-3.5 shrink-0 rounded-full" />
      <Skeleton className="h-3.5 w-24" />
    </div>
    <Skeleton className="h-5 w-4/5" />
    <div className="flex flex-row flex-wrap items-center gap-4">
      <div className="flex flex-row items-center gap-2">
        <Skeleton className="size-3.5 shrink-0 rounded-full" />
        <Skeleton className="h-3.5 w-20" />
      </div>
      <div className="flex flex-row items-center gap-2">
        <Skeleton className="size-3.5 shrink-0 rounded-full" />
        <Skeleton className="h-3.5 w-16" />
      </div>
    </div>
  </div>
);

export default EventCardSkeleton;

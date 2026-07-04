import EventCardSkeleton from "@/components/EventCardSkeleton";
import Skeleton from "@/components/Skeleton";

const FeaturedEventsSkeleton = () => (
  <div
    className="mt-20 space-y-7"
    role="status"
    aria-live="polite"
    aria-label="Loading featured events"
  >
    <span className="sr-only">Loading featured events…</span>
    <Skeleton className="h-7 w-44" />
    <div className="events">
      {Array.from({ length: 3 }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  </div>
);

export default FeaturedEventsSkeleton;

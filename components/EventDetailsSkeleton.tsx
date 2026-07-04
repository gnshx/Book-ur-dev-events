import EventCardSkeleton from "@/components/EventCardSkeleton";
import Skeleton from "@/components/Skeleton";

const EventDetailsSkeleton = () => (
  <section
    id="event"
    role="status"
    aria-live="polite"
    aria-label="Loading event details"
  >
    <span className="sr-only">Loading event details…</span>

    <div className="header mb-10 flex w-2/3 flex-col items-start gap-4 max-lg:w-full">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-4 w-full max-w-2xl" />
      <Skeleton className="h-4 w-full max-w-xl" />
      <Skeleton className="h-4 w-2/3 max-w-lg" />
    </div>

    <div className="details mt-12 flex w-full flex-col items-start gap-12 max-lg:items-center lg:flex-row">
      <div className="content flex max-lg:w-full flex-[2] flex-col gap-8">
        <Skeleton className="aspect-square max-h-[457px] w-full rounded-lg" />

        <div className="flex flex-col gap-3">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex flex-row items-center gap-2">
              <Skeleton className="size-5 shrink-0 rounded-full" />
              <Skeleton className="h-4 w-36" />
            </div>
          ))}
        </div>

        <div className="agenda flex flex-col gap-3">
          <Skeleton className="h-7 w-24" />
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full rounded-md" />
          ))}
        </div>

        <div className="flex flex-row flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-20 rounded-[6px]" />
          ))}
        </div>
      </div>

      <aside className="booking w-full flex-1 border-l border-gray-700 p-4">
        <div className="signup-card bg-dark-100 border-dark-200 card-shadow flex w-full flex-col gap-6 rounded-[10px] border px-5 py-6">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-11 w-full rounded-[6px]" />
          <Skeleton className="h-11 w-full rounded-[6px]" />
          <Skeleton className="h-11 w-full rounded-[6px]" />
          <Skeleton className="h-12 w-full rounded-[6px]" />
        </div>
      </aside>
    </div>

    <div className="flex flex-col gap-4 pt-20">
      <Skeleton className="h-7 w-40" />
      <div className="events">
        {Array.from({ length: 3 }).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </div>
    </div>
  </section>
);

export default EventDetailsSkeleton;

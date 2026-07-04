import Skeleton from "@/components/Skeleton";
import FeaturedEventsSkeleton from "@/components/FeaturedEventsSkeleton";

const Loading = () => (
  <section role="status" aria-live="polite" aria-label="Loading page">
    <span className="sr-only">Loading page…</span>

    <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
      <Skeleton className="h-14 w-full max-w-xl rounded-lg" />
      <Skeleton className="h-14 w-full max-w-lg rounded-lg" />
      <Skeleton className="mt-2 h-5 w-72 max-w-full" />
      <Skeleton className="mt-4 h-12 w-48 rounded-full" />
    </div>

    <FeaturedEventsSkeleton />
  </section>
);

export default Loading;

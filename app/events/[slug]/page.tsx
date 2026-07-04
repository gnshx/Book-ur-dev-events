import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

const EventDetailsFallback = () => (
  <section id="event" className="animate-pulse space-y-6">
    <div className="header space-y-2">
      <div className="h-8 w-48 rounded bg-muted" />
      <div className="h-4 w-full max-w-2xl rounded bg-muted" />
    </div>
    <div className="h-96 w-full rounded bg-muted" />
  </section>
);

const EventPage = ({ params }: EventPageProps) => {
  return (
    <Suspense fallback={<EventDetailsFallback />}>
      <EventDetails params={params} />
    </Suspense>
  );
};

export default EventPage;

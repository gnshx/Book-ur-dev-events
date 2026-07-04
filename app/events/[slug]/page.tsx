import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";
import EventDetailsSkeleton from "@/components/EventDetailsSkeleton";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

const EventPage = ({ params }: EventPageProps) => {
  return (
    <Suspense fallback={<EventDetailsSkeleton />}>
      <EventDetails params={params} />
    </Suspense>
  );
};

export default EventPage;

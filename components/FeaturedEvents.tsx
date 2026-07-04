import { connection } from "next/server";
import Eventcard from "@/components/Eventcard";
import { getAllEvents } from "@/lib/actions/event.actions";

const FeaturedEvents = async () => {
  // Defer DB access to request time so build does not require MONGODB_URI
  await connection();

  const events = await getAllEvents();

  return (
    <div className="mt-20 space-y-7">
      <h3>featured-events</h3>
      <ul className="events">
        {events.length > 0 &&
          events.map((event) => (
            <li key={event.slug} className="list-none">
              <Eventcard {...event} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FeaturedEvents;

import { notFound } from "next/navigation";
import Image from "next/image";
import Bookevent from "@/components/Bookevent";
import {
  getEventBySlug,
  getsimilareventsbyslug,
  type EventData,
} from "@/lib/actions/event.actions";
import { connection } from "next/server";
import Eventcard from "@/components/Eventcard";

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={20} height={20} />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agenda }: { agenda: string[] }) => {
  const list = agenda.flatMap((item) =>
    item
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
  );

  return (
    <div className="agenda">
      <h2 className="text-xl font-semibold mb-3">Agenda</h2>
      <ul className="space-y-2">
        {list.map((item, index) => (
          <li key={index} className="p-2 border rounded-md">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const EventTags = ({ tags }: { tags: string[] }) => {
  const list = tags.flatMap((tag) =>
    tag.split("\n").map((item) => item.trim()).filter(Boolean)
  );

  return (
    <div className="flex flex-row gap-2 flex-wrap">
      {list.map((tag) => (
        <div key={tag} className="pill">
          {tag}
        </div>
      ))}
    </div>
  );
};

interface EventDetailsProps {
  params: Promise<{ slug: string }>;
}

const EventDetails = async ({ params }: EventDetailsProps) => {
  await connection();

  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return notFound();
  }

  const booking = 10;
  const similarEvents: EventData[] = await getsimilareventsbyslug(slug);

  return (
    <section id="event">
      <div className="header">
        <h1>Event description</h1>
        <p>{event.description}</p>
      </div>

      <div className="details">
        <div className="content">
          <Image
            src={event.image}
            alt={event.title}
            width={800}
            height={800}
          />

          <section className="flex flex-col gap-2">
            <h2>Overview</h2>
            <p>{event.overview}</p>

            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={event.date}
            />
            <EventDetailItem
              icon="/icons/clock.svg"
              alt="clock"
              label={event.time}
            />
            <EventDetailItem
              icon="/icons/pin.svg"
              alt="location"
              label={event.venue}
            />
            <EventDetailItem
              icon="/icons/mode.svg"
              alt="mode"
              label={event.mode}
            />
            <EventDetailItem
              icon="/icons/audience.svg"
              alt="audience"
              label={event.audience}
            />
          </section>

          <EventAgenda agenda={event.agenda} />
          <section className="flex-col gap-2">
            <h2>{event.organizer}</h2>
          </section>
          <EventTags tags={event.tags} />
        </div>

        <aside className="booking">
          <div className="signup-card">
            <h2>Book your seat</h2>
            {booking > 0 ? (
              <p className="text-lg font-semibold">Seats available: {booking}</p>
            ) : (
              <p className="text-lg font-semibold">be the first to register</p>
            )}
            <Bookevent eventid={event._id} slug={event.slug} />
          </div>
        </aside>
      </div>

      <div className="flex flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((similarEvent) => (
              <Eventcard key={similarEvent.title} {...similarEvent} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;

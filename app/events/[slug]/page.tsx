import { notFound } from "next/navigation";
import Image from "next/image";
import Bookevent from "@/components/Bookevent";
import {getsimilareventsbyslug } from "@/lib/actions/event.actions";
import { IEvent } from "@/database/event.model";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import Eventcard from "@/components/Eventcard";
import { cacheLife } from "next/cache";
const Eventdetails=({icon,alt,label} :{icon: string, alt: string, label: string})=>(
<div className="flex-row-gap-2 items-center">
    <Image
        src={icon}
        alt={alt}   
        width={20}
        height={20}
        />
        <p>{label}</p>
</div>
)
const Eventagends = ({ agends }: { agends: string[] }) => {
  const list = agends.flatMap((item) =>
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

const Eventtags = ({ tags }: { tags: string[] }) => {
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
const Eventdetailspage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    'use cache'
    cacheLife('hours');
    const { slug } = await params;
    const response = await fetch(`${BASE_URL}/api/events/${slug}`);
    const { event } = await response.json();
    if (!event) {
        return notFound();
    }const booking=10;
    const similarEvents :IEvent[] = await getsimilareventsbyslug(slug);

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
        alt={"event.name"}
        width={800}
        height={800}
    />
    <section className="flex flex-col gap-2">
<h2>
    Overview
</h2>
<p>
    {event.overview}
</p>

<Eventdetails icon="/icons/calendar.svg" alt="calendar" label={event.date} />
<Eventdetails icon="/icons/clock.svg" alt="clock" label={event.time} />
<Eventdetails icon="/icons/pin.svg" alt="location" label={event.venue} />
<Eventdetails icon="/icons/mode.svg" alt="mode" label={event.mode} />
<Eventdetails icon="/icons/audience.svg" alt="audience" label={event.audience} />

    </section>
<Eventagends agends={(event.agenda)} />
<section className="flex-col gap-2">
<h2>{event.organizer}</h2>
</section>
<Eventtags tags={(event.tags)} />
</div>
<aside className="booking">
<div className="signup-card">
    <h2>Book your seat</h2>
    {booking>0 ? (  
        <p className="text-lg font-semibold">Seats available: {booking}</p>
    ) : (
        <p className="text-lg font-semibold">be the first to register</p>
    )}

    <Bookevent eventid={event._id} slug={event.slug} />
    </div></aside>
    </div>

    <div className="flex flex-col gap-4 pt-20">
<h2 >Similar Events</h2>
<div className="events">
{
    similarEvents.length > 0 && (
        similarEvents.map((similarEvent : IEvent) => (
           <Eventcard key={similarEvent.title} {...similarEvent} />
        ))
    ) 
}
</div>
    </div>
        </section>
    )
}

export default Eventdetailspage
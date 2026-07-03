import Explorer from "@/components/Explorerbtn"
import Eventcard from '@/components/Eventcard'
import { events } from '@/lib/constants'
import { IEvent } from "@/database/event.model";
const page = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const response = await fetch(`${BASE_URL}/api/events`);
  const { events } = await response.json();

  return (

    <section>
      <h1 className="text-center">
        The HUB FOR every dev <br />
        Events shouldn't miss
      </h1>
      <p className="text-center mt-5">Hackthons,Meetups and conference,all in one place</p>
      <Explorer />
      <div className="mt-20 space-y-7 ">
        <h3>
          featured-events
        </h3>
        <ul className="events">
          {events && events.length > 0 && events.map((event: IEvent) => (

            <li key={event.title}  >
              <Eventcard {...event} />
            </li>

          ))}
        </ul>

      </div>
    </section>
  )
}

export default page
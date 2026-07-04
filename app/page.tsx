import Explorer from "@/components/Explorerbtn"
import Eventcard from '@/components/Eventcard'
import { getAllEvents } from "@/lib/actions/event.actions";
import { cacheLife } from "next/cache";

const page = async () => {
  
'use cache'
cacheLife('hours')
  const events = await getAllEvents();

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
          {events.length > 0 && events.map((event) => (

            <li key={event.title}  className="list-none">
              <Eventcard {...event} />
            </li>

          ))}
        </ul>

      </div>
    </section>
  )
}

export default page
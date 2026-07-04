import { Suspense } from "react";
import Explorer from "@/components/Explorerbtn";
import FeaturedEvents from "@/components/FeaturedEvents";
import FeaturedEventsSkeleton from "@/components/FeaturedEventsSkeleton";

const page = () => {
  return (
    <section>
      <h1 className="text-center">
        The Event Hub for Developers <br />
        Discover Events You Should Not Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, meetups, and conferences, all in one place.
      </p>
      <Explorer />
      <Suspense fallback={<FeaturedEventsSkeleton />}>
        <FeaturedEvents />
      </Suspense>
    </section>
  );
};

export default page;

import { Suspense } from "react";
import Explorer from "@/components/Explorerbtn";
import FeaturedEvents from "@/components/FeaturedEvents";
import FeaturedEventsSkeleton from "@/components/FeaturedEventsSkeleton";

const page = () => {
  return (
    <section>
      <h1 className="text-center">
        The HUB FOR every dev <br />
        Events shouldn&apos;t miss
      </h1>
      <p className="text-center mt-5">
        Hackthons,Meetups and conference,all in one place
      </p>
      <Explorer />
      <Suspense fallback={<FeaturedEventsSkeleton />}>
        <FeaturedEvents />
      </Suspense>
    </section>
  );
};

export default page;

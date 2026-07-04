import { Suspense } from "react";
import Explorer from "@/components/Explorerbtn";
import FeaturedEvents from "@/components/FeaturedEvents";

const FeaturedEventsFallback = () => (
  <div className="mt-20 space-y-7 animate-pulse">
    <div className="h-6 w-40 rounded bg-muted" />
    <div className="grid gap-4">
      <div className="h-72 rounded bg-muted" />
      <div className="h-72 rounded bg-muted" />
    </div>
  </div>
);

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
      <Suspense fallback={<FeaturedEventsFallback />}>
        <FeaturedEvents />
      </Suspense>
    </section>
  );
};

export default page;

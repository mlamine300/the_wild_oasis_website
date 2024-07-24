import { Suspense } from "react";
import CabinCard from "../_components/CabinCard";
import Counter from "../_components/Counter";

import CabinList from "./CabinList";
import Spinner from "../_components/Spinner";
import Filter from "./Filter";
import ReservationReminder from "../_components/ReservationReminder";
export const metadata = { title: "cabins" };
export const revalidate = 0;
export default function Page({ searchParams }) {
  // CHANGE
  // console.log(searchParams);
  const capacity = searchParams.capacity;
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature s beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>
      <Suspense fallback={<Spinner />} key={capacity}>
        <div className="flex justify-end mb-8">
          <Filter />
        </div>
        <CabinList capacity={capacity} />
      </Suspense>
      <ReservationReminder />
    </div>
  );
}

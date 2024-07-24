import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import Reservation from "./Reservation";
import Cabin from "../Cabin";

// PLACEHOLDER DATA
// const cabin = {
//   id: 89,
//   name: "001",
//   maxCapacity: 2,
//   regularPrice: 250,
//   discount: 0,
//   description:
//     "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
//   image:
//     "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg",
// };

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));

  console.log(ids);
  return ids;
}

export async function generateMetadata({ params }) {
  try {
    const { name } = await getCabin(params.cabinId);
    return { title: `cabin ${name}` };
  } catch (error) {
    notFound();
  }
}
export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);
  try {
    return (
      <div className="max-w-6xl mx-auto mt-8">
        <Cabin cabin={cabin} />
        <div>
          <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
            Reserve today. Pay on arrival.
          </h2>
          <Suspense fallback={<Spinner />}>
            <Reservation cabin={cabin} />
          </Suspense>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}

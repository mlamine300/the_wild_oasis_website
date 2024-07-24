import CabinCard from "../_components/CabinCard";
import loading from "./loading";
import { getCabins } from "@/app/_lib/data-service";
async function CabinList({ capacity }) {
  console.log("-----------------" + capacity);
  const cabins = await getCabins();
  let filteredCabins = cabins;
  if (capacity === "small") {
    filteredCabins = cabins.filter((c) => c.maxCapacity <= 3);
  } else if (capacity === "medium") {
    filteredCabins = cabins.filter(
      (c) => c.maxCapacity > 3 && c.maxCapacity < 8
    );
  } else if (capacity === "large") {
    filteredCabins = cabins.filter((c) => c.maxCapacity >= 8);
  }

  //if (!cabins.length) return <loading />;
  return (
    <>
      {cabins.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {filteredCabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </>
  );
}

export default CabinList;

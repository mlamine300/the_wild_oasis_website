"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const path = usePathname();
  const router = useRouter();
  function handleFilter(filter) {
    params.set("capacity", filter);
    router.replace(`${path}?${params.toString()}`, { scroll: false });

    // console.log(filter);
  }
  const shoosenFilter = params.get("capacity") || "all";
  console.log(searchParams);
  return (
    <div className="border border-primary-50">
      <Button
        handleFilter={handleFilter}
        filter={"all"}
        shoosenFilter={shoosenFilter}
      >
        All cabins
      </Button>
      <Button
        handleFilter={handleFilter}
        filter={"small"}
        shoosenFilter={shoosenFilter}
      >
        1-3
      </Button>
      <Button
        handleFilter={handleFilter}
        filter={"medium"}
        shoosenFilter={shoosenFilter}
      >
        4-7
      </Button>
      <Button
        handleFilter={handleFilter}
        filter={"large"}
        shoosenFilter={shoosenFilter}
      >
        8-12
      </Button>
    </div>
  );
}

function Button({ children, handleFilter, filter, shoosenFilter }) {
  return (
    <button
      className={`px-5 py-2  ${
        shoosenFilter === filter ? " bg-primary-500" : ""
      } hover:bg-primary-700`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;

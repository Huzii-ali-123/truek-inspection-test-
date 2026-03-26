import { cn } from "@/lib/utils";
import Image from "next/image";

interface Country {
  id: number;
  name: string;
  path: string;
}

const countries: Country[] = [
  { id: 1, name: "France", path: "/flags/france.gif" },
  { id: 2, name: "United States", path: "/flags/usa.gif" },
  { id: 3, name: "Canada", path: "/flags/canada.gif" },
  { id: 4, name: "Australia", path: "/flags/australia.webp" },
  { id: 5, name: "United Kingdom", path: "/flags/uk.webp" },
  { id: 6, name: "New Zealand", path: "/flags/newzealand.webp" },
  // { id:7, name: "Ireland", path: "/flags/ireland.gif" },
];

const FlagCard = ({ img, name }: { img: string; name: string }) => {
  return (
    <figure
      className={cn(
        "relative w-48 sm:w-64 cursor-pointer overflow-hidden rounded-xl border p-4 sm:p-6",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-col items-center gap-5 sm:gap-6">
        <div className="relative w-36 sm:w-44 h-36 sm:h-44 rounded-full overflow-hidden">
          <Image src={img} alt={name} fill className="object-cover" />
        </div>
        <figcaption className="text-xl sm:text-2xl font-semibold text-center dark:text-white">
          {name}
        </figcaption>
      </div>
    </figure>
  );
};

export const Flags = () => {
  const firstRow = countries.slice(0, 3);
  const secondRow = countries.slice(3);

  return (
    <div className="mx-auto container max-w-7xl relative flex flex-col items-center justify-center overflow-hidden rounded-lg py-12">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold dark:text-white">
          Where We Provide Service
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mt-2">
          Serving Customers Across the World
        </p>
        <p className="text-md sm:text-lg text-gray-500 dark:text-gray-400">
          We proudly offer our services throughout the World.
        </p>
      </div>

      {/* Mobile View - 2 Cards per Row Grid */}
      <div className="grid grid-cols-2 gap-4 md:hidden w-full max-w-2xl px-4">
        {countries.map((country) => (
          <FlagCard key={country.id} img={country.path} name={country.name} />
        ))}
      </div>

      {/* Desktop View - Grid */}
      <div className="hidden md:block">
        {/* First Row of Flags */}
        <div className="flex justify-center gap-6 mb-6">
          {firstRow.map((country) => (
            <FlagCard key={country.id} img={country.path} name={country.name} />
          ))}
        </div>

        {/* Second Row of Flags */}
        <div className="flex justify-center gap-6">
          {secondRow.map((country) => (
            <FlagCard key={country.id} img={country.path} name={country.name} />
          ))}
        </div>
      </div>
    </div>
  );
};


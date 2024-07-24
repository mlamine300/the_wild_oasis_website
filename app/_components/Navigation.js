import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();
  const { name, image } = session?.user || { name: null, image: null };
  console.log(image);
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors flex justify-center gap-4"
          >
            {name ? "account" : "Guest area"}
            {image ? (
              <img
                src={image}
                alt={name}
                className="rounded-full w-8"
                referrerPolicy="no-referrer"
              />
            ) : (
              ""
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

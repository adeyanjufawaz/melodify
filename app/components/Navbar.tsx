"use clients";

import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <nav className="fixed w-full z-50 opacity-85 bg-primary h-16 p-4 flex items-center justify-between">
        <Link href="/">
          <h1 className="uppercase font-semibold">Melodify</h1>
        </Link>
        {/* <div>
          <input
            type="text"
            className="py-2 px-4 text-sm rounded-full outline-none text-black"
            placeholder="Search for music"
          />
        </div> */}
      </nav>
    </div>
  );
}

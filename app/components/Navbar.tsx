"use clients";

export default function Navbar() {
  return (
    <div>
      <nav className="fixed w-full bg-primary h-16 p-4 flex items-center justify-between">
        <div>
          <h1 className="uppercase font-semibold">Melodify</h1>
        </div>
        <div>
          <input type="text" className="py-2 px-4 text-sm rounded-full outline-none text-black" placeholder="Search for music" />
        </div>
      </nav>
    </div>
  );
}

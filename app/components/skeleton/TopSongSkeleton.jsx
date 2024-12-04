export default function TopSongSkeleton() {
  const array = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <div className="text-center">
      <div>
        <span className="font-bold text-lg">
          {" "}
          If it takes too long to display{" "}
        </span>
        <h1>Refresh this page</h1>
        <h2>
          Spotify API, impose rate limits to prevent excessive usage, ensure
          fair access for all users, and protect their infrastructure{" "}
        </h2>
      </div>
      {array.map((el, ind) => {
        return (
          <div
            key={ind}
            className="mt-4 flex flex-wrap justify-center items-center h-2 animate-pulse p-6 bg-gray-700 rounded w-3/4 mx-auto"
          ></div>
        );
      })}
    </div>
  );
}

export default function TopSongSkeleton() {
  const array = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <div>
      {array.map((el,ind) => {
        return (
          <div  key={ind} className="mt-4 h-2 animate-pulse p-6 bg-gray-700 rounded w-3/4 mx-auto"></div>
        );
      })}
    </div>
  );
}

import React from "react";

export default function TopArtsistSkeleton() {
  const array = Array.from({ length: 15 }, (_, i) => i + 1);
  return (
    <div className="flex flex-wrap justify-center gap-5">
      {array.map((el, ind) => {
        return (
          <div key={ind} className="animate-pulse">
            <div className="bg-gray-600 h-16 w-16 md:h-28 md:w-28 rounded-full  "></div>
            <h2 className="bg-gray-600 mt-2 text-sm truncate w-20 mx-auto text-center"></h2>
          </div>
        );
      })}
    </div>
  );
}

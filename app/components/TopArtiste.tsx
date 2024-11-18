import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function TopArtiste() {
  const [topArtists, setTopArtists] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  const getPopularArtiste = async () => {
    await fetch(
      `https://api.spotify.com/v1/search?q=afropop&type=artist&market=NG&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        //   setTopArtists(data?.artists?.items);
        const sortedArtists = data.artists.items.sort(
          (a: any, b: any) => b.followers.total - a.followers.total
        );
        //   console.log(sortedArtists);
        setTopArtists(sortedArtists);
      });
  };

  useEffect(() => {
    getPopularArtiste();
  },[]);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {topArtists?.map((artist) => {
        // console.log(artist);
        const { name, id, images } = artist;
        const [{ url: firstImageUrl }]: { url: string }[] = images;
        return (
          <Link href={`/artist/${id}`} key={id}>
            <motion.div
              initial={{ y: -30, opacity: 0, scale: 0.3 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gray-600 h-28 w-28 rounded-full  ">
                <Image
                  src={firstImageUrl}
                  width={100}
                  height={100}
                  className="rounded-full border-2 border-secondary border-double h-28 w-28"
                  alt="Artist image"
                />
              </div>
              <h2 className="mt-2 text-center">{name}</h2>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}

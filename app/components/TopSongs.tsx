"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import TopSongSkeleton from "./skeleton/TopSongSkeleton";
import useLocalStorage from "../hooks/localStorage";

export default function TopSongs() {
  const [topSongsIsLoading, setTopSongsIsLoading] = useState<boolean>(true);
  const [topSongs, setTopSongs] = useState([]);
  const [accessToken, ] = useLocalStorage<string>(
    "accessToken",
    ""
  );
  const getPopularArtiste = async () => {
    const response = await fetch(
      `https://api.spotify.com/v1/browse/categories/toplists/playlists?country=Nigeria`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    const playlistId = data?.playlists?.items[3]?.id; // Get first playlist ID
    if (playlistId) {
      const playlistResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const playlistData = await playlistResponse.json();
      const topSongs = playlistData?.tracks?.items?.slice(0, 10); // Get top 10 songs

      setTopSongs(topSongs);
      setTopSongsIsLoading(false);
    }
  };
  useEffect(() => {
    getPopularArtiste();
  }, []);

  return (
    <div>
      {topSongsIsLoading ? (
        <TopSongSkeleton />
      ) : (
        <div className="grid gap-4">
          {topSongs?.map((song, ind) => {
            // Destructuring individual song
            const {
              track: { name, artists,},
            } = song;
            // Destructuring Artistdetails
            const [{ name: name1 }]: { name: string }[] = artists;

            return (
              <motion.div
                initial={{ y: 30, opacity: 0, scale: 0.8 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                key={ind}
                className="rounded-md gradient text-white flex flex-wrap items-center gap-6 w-3/4 mx-auto px-6 py-1"
              >
                <h2 className="font-semibold text-black">{ind + 1}. </h2>
                <div>
                  <h2 className=" max-w-[100px] md:max-w-full truncate text-black text-sm font-bold capitalize">
                    {name}
                  </h2>
                  <p className="text-sm text-gray-800">
                    {" "}
                    <span className=" font-bold">Artist:</span> {name1}{" "}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

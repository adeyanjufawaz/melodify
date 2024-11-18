"use client";

import "./globals.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { authParameters } from "./lib/spotifyCredentials";
import TopSongSkeleton from "./components/skeleton/TopSongSkeleton";
import TopArtiste from "./components/TopArtiste";

export default function Home() {
  const accessToken = localStorage?.getItem("accessToken");
  // Top songs
  const [top100, setTop100] = useState([]);
  const [topSongsIsLoading, setTopSongsIsloading] = useState(true);


  useEffect(() => {
    // Function to get accessToken
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => {
        // setAccesstoken(data.access_token)
        localStorage.setItem("accessToken", data.access_token);
      });
  }, []);

  useEffect(() => {
    const afrobeatParam = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    // 1. Get Top 100 Nigeria songs ID
    const getAfrobeatPlaylist = async () => {
      const top100ID = await fetch(
        "https://api.spotify.com/v1/search?q=top100nigeria&type=playlist&limit=50",
        afrobeatParam
      )
        .then((res) => res.json())
        .then((data) => {
          return data?.playlists?.items[2]?.id;
        });

      // 2. Use the ID to get all the songs in the playlists
      await fetch(
        `https://api.spotify.com/v1/playlists/${top100ID}/tracks?offset=${0}&limit=${10}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (accessToken) {
            setTop100(data?.items);
            setTopSongsIsloading(false);
          }
        });
    };
    getAfrobeatPlaylist();
  }, [accessToken]);

  const playSong = (uri: string) => {
    console.log(uri);
    localStorage.setItem("songUri", uri);
  };

  return (
    <div className="bg-[url('/transparent.svg')]">
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0, scale: 0.3 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-[url('/transparent.svg')] w-full flex justify-center  items-center px-8 py-6 "
      >
        <div className="hero w-full mt-8 h-[50vh] lg:h-[80vh] flex justify-start items-center">
          <div className="w-full md:w-[50%]">
            <section className="text-2xl lg:text-5xl font-semibold ">
              <h2>
                All the <span className="text-secondary">Best Songs</span>{" "}
              </h2>
              <h2 className="mt-2">
                in one <span className="text-primary">Place</span>
              </h2>
            </section>

            <section className="mt-8">
              <p className="text-xl">
                On our website you can access an amazing collection of popular
                and new songs. Stream your favorite tracks in high quality and
                enjoy without interruptions. Whatever your tatse in music we
                have it all for you
              </p>
            </section>
          </div>
        </div>
      </motion.div>

      {/* Top 20 Songs */}
      <div className="p-6 bg-[url('/transparent.svg')]">
        <h2 className="text-2xl my-8 uppercase text-center font-bold text-white">
          Top 10 Naija
        </h2>
        {topSongsIsLoading ? (
          <TopSongSkeleton />
        ) : (
          <div className="grid gap-4">
            {top100?.map((song, ind) => {
              // Destructuring individual song
              const {
                track: { name, artists, uri },
              } = song;
              // Destructuring Artistdetails
              const [{ name: name1 }]: { name: string }[] = artists;

              return (
                <motion.div
                  initial={{ y: 30, opacity: 0, scale: 0.8 }}
                  whileInView={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  key={ind}
                  className="rounded-md bg-secondary text-white flex flex-wrap items-center gap-6 w-3/4 mx-auto px-6 py-1"
                  onClick={() => playSong(uri)}
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

      {/* Top Artists */}
      <div className="bg-[url('/transparent.svg')]">
        <h2 className="text-2xl  ml-6 my-10 text-center uppercase font-bold text-white">
          Top Artiste
        </h2>
        <TopArtiste />
      </div>
    </div>
  );
}

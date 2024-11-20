"use client";

import "./globals.css";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { authParameters } from "./lib/spotifyCredentials";
import TopArtiste from "./components/TopArtiste";
import useLocalStorage from "./hooks/localStorage";
import TopSongs from "./components/TopSongs";

export default function Home() {
  const [, setAccesstoken] = useLocalStorage<string>("accessToken", "");

  useEffect(() => {
    // Function to get accessToken
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => {
        // const setData = localStorage?.setItem("accessToken", );
        setAccesstoken(data.access_token);
      });
  }, []);

  return (
    <div className="bg-[url('/transparent.svg')]">
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0, scale: 0.3 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-[url('/transparent.svg')] w-full flex justify-center  items-center px-2 md:px-8 py-6 "
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

        <TopSongs />
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

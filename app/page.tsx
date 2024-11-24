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

  // Function to get accessToken
  function getaccess() {
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => {
        // const setData = localStorage?.setItem("accessToken", );
        setAccesstoken(data.access_token);
      });
  }
  useEffect(() => {
    getaccess();
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
        <div className="hero p-3 w-full mt-8 h-[50vh] lg:h-[80vh] flex justify-start items-center">
          <div className="w-full md:w-[50%]">
            <section className="text-xl lg:text-5xl font-semibold ">
              <h2>
                All the <span className="text-secondary">Best Songs</span>{" "}
              </h2>
              <h2 className="mt-1">
                in one <span className="text-primary">Place</span>
              </h2>
            </section>

            <section className="mt-1 md:mt-8 p-3">
              <p className="text-base lg:text-xl">
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

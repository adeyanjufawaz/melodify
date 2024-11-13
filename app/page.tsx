"use client";

import "./globals.css";
import img from "../app/img/musicHero.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { authParameters } from "./lib/spotifyCredentials";
import axios from "axios";

export default function Home() {
  const [accessToken, setAccesstoken] = useState("");
  const [top100, setTop100] = useState([]);

  useEffect(() => {
    // Function to get accessToken
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccesstoken(data.access_token));
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
      var top100ID = await fetch(
        "https://api.spotify.com/v1/search?q=top100nigeria&type=playlist&limit=50",
        afrobeatParam
      )
        .then((res) => res.json())
        .then((data) => {
          return data.playlists.items[2].id;
        });
      // console.log(top100ID);

      // 2. Use the ID to get all the songs in the playlists
      var allPlayLists = await fetch(
        `https://api.spotify.com/v1/playlists/${top100ID}/tracks?offset=${0}&limit=${100}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (accessToken) {
            console.log(data.items);
            setTop100(data.items);
          }
        });
    };
    getAfrobeatPlaylist();
  }, [accessToken]);

  return (
    <div className="">
      <div className="relative min-h-[30vh] md:min-h-[55vh]  w-full flex justify-start items-center p-8 ">
        <div className="w-full absolute -z-10">
          <Image
            src={img}
            alt="djdhdh"
            // objectFit="cover"
            quality={100}
            priority
            className="w-full h-full block"
          />
        </div>
        <div className="mt-20 md:max-w-[50%]">
          <section className="text-2xl lg:text-5xl font-semibold ">
            <h2>
              All the <span className="text-secondary">Best Songs</span>{" "}
            </h2>
            <h2 className="mt-2">
              in one <span className="text-primary">Place</span>
            </h2>
          </section>
          <section className="mt-8">
            <p>
              On our website you can access an amazing collection of popular and
              new songs. Stream your favorite tracks in high quality and enjoy
              without interruptions. Whatever your tatse in music we have it all
              for you
            </p>
          </section>
        </div>
      </div>

      {/* <div className="">
        <h2>Home</h2>
        <h2>
          {accessToken
            ? `Access token is ${accessToken}`
            : "Access token is empty"}
        </h2>
       
      </div> */}
      <div>
        {top100.map((song,ind) => {
          console.log(song);
          return (
            <div key={ind} className="bg-secondary mt-4 flex items-center gap-3 p-4">
              <h2>#{ind + 1}</h2>
              <div>
                <h2>{song?.track.name}</h2>
                <p>{song?.track.artists[0].name} </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

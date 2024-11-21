"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "../../globals.css";
import Image from "next/image";
import useLocalStorage from "@/app/hooks/localStorage";
import { motion } from "framer-motion";
import Link from "next/link";

export default function UserPage() {
  const { artistDetails } = useParams<{ artistDetails: string }>();
  const [accessToken] = useLocalStorage<string>("accessToken", "");

  const [artistInfo, setArtisitInfo] = useState<Artist>({
    name: "",
    followers: 0,
    image: "",
  });
  const [artistInfoIsLoading, setArtistInfoIsLoading] = useState(true);

  const [artistTracks, setArtisitTracks] = useState([]);
  const [artistTracksIsLoading, setartistTracksIsLoading] = useState(true);

  const [relatedArtists, setRelatedArtists] = useState([]);
  const [relatedArtistsIsLoading, setrelatedArtistsIsLoading] = useState(true);

  useEffect(() => {
    // 1. Get Artist Info
    const getArtistInfo = async () => {
      await fetch(`https://api.spotify.com/v1/artists/${artistDetails}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const name = data.name;
          const followers = data.followers.total;
          const image = data.images[0].url;
          const artistInfo = { name, followers, image };
          setArtisitInfo(artistInfo);
          setArtistInfoIsLoading(false);
        });
    };
    getArtistInfo();

    // 2. Get Artist tracks
    const getArtistTracks = async () => {
      await fetch(
        `https://api.spotify.com/v1/artists/${artistDetails}/top-tracks`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          const tracks = data.tracks.map((cur: SpotifyTrack) => cur);
          setArtisitTracks(tracks.slice(0,5));
          setartistTracksIsLoading(false);
        });
    };
    getArtistTracks();

    // 3. Get similar artist
    const getReltedArtist = async () => {
      await fetch(
        `https://api.spotify.com/v1/artists/${artistDetails}/related-artists`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setrelatedArtistsIsLoading(false);
          setRelatedArtists(data?.artists.slice(0,15));
        });
    };
    getReltedArtist();
  }, []);

  if (artistInfoIsLoading || artistTracksIsLoading || relatedArtistsIsLoading) {
    return (
      <div className="mt-20 animate-pulse min-h-[70vh] flex justify-center items-center">
        <h2>Loading....</h2>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* DIsplay profile */}
      <motion.section
        initial={{ y: 30, opacity: 0, scale: 0.8 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="opacity-75 w-full"
      >
        <div className="flex p-4 justify-start bg-primary gap-4 md:gap-10 items-center">
          <Image
            src={artistInfo?.image}
            alt="Artiste image"
            width={100}
            height={100}
            priority={true}
            className="h-32 w-32 md:h-48 md:w-48 border-secondary  rounded-md border-4 border-double p-2 "
          />

          <div className="flex flex-col gap-2 md:gap-4">
            <h1 className="text-xl md:text-4xl max-w-44 md:max-w-full truncate text-secondary font-extrabold">
              {artistInfo.name}
            </h1>
            <h2 className="text-lg md:text-xl font-bold">
              {artistInfo.followers.toLocaleString()} followers
            </h2>
          </div>
        </div>

        <div></div>
      </motion.section>

      {/* Artist Top tracks */}
      <section className="mt-6 p-6">
        <div className="grid gap-4">
          <h2 className="text-3xl text-white font-extrabold">Top Tracks</h2>
          {artistTracks &&
            artistTracks.map((song, ind) => {
              const { name, duration_ms: duration, artists } = song;
              const [{ name: name1 }]: { name: string }[] = artists;

              return (
                <motion.div
                  initial={{ y: 30, opacity: 0, scale: 0.8 }}
                  whileInView={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  key={ind}
                  className="rounded-md gradient text-white flex flex-wrap items-center gap-6 w-[90%] mx-auto px-6 py-1"
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
                    <p className="text-sm text-gray-800">
                      {" "}
                      <span className=" font-bold">Duration:</span>{" "}
                      {(duration / 60000).toFixed(2)} min{" "}
                    </p>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </section>

      {/* Related Artists */}
      <section className="mt-6 p-6 ">
        <h2 className="text-2xl text-white font-extrabold">Fans Also Like </h2>
        <div className="mt-6 flex flex-wrap justify-center gap-6">
          {relatedArtists &&
            relatedArtists.map((artist) => {
              const { name, id, images } = artist;
              const [{ url: firstImageUrl }]: { url: string }[] = images;
              return (
                <Link href={`/artist/${id}`} key={id}>
                  <motion.div
                    initial={{ y: -30, opacity: 0, scale: 0.3 }}
                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="bg-gray-600 h-16 w-16 md:h-28 md:w-28 rounded-full  ">
                      <Image
                        src={firstImageUrl}
                        width={100}
                        height={100}
                        className="rounded-full border-2 border-secondary border-double h-16 w-16 md:h-28  md:w-28"
                        alt="Artist image"
                      />
                    </div>
                    <h2 className="mt-2 text-sm truncate w-20 mx-auto text-center">
                      {name}
                    </h2>
                  </motion.div>
                </Link>
              );
            })}
        </div>
      </section>
    </div>
  );
}

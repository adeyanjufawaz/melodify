"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "../../globals.css";
import Image from "next/image";
import img from "../../../public/musicHero.jpg"

type Params = {
  params: {
    artistDetails: string;
  };
};

export default function UserPage() {
  const {artistDetails} = useParams<{ artistDetails: string }>();

  const [artistInfo, setArtisitInfo] = useState({});
  const [artistTracks, setArtisitTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {

    // 1. Get Artist Info
    const getArtistInfo = async () => {
      await fetch( `https://api.spotify.com/v1/artists/${artistDetails}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setArtisitInfo(data));
      //   const {followers: { total },name,images} = artistData;
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
        .then((data) => console.log(data?.tracks));
      //   const {followers: { total },name,images} = artistData;
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
         .then((data) => console.log(data?.artists));
       
     };
     getReltedArtist();
  },[]);

  return (
    <div className="mt-20">
      <h2>jjhsdhjsdh</h2>
      <div className="bg-red-600 h-56 w-[50%]">
        <Image
          src={img}
          alt="Artiste image"
          width={100}
          height={10}
          className="h-full w-full "
        />
      </div>
    </div>
  );
}

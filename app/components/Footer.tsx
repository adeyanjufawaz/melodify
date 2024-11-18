"use client"
import Player from "./Player";

let accessToken = localStorage.getItem("accessToken")
let trackUri = localStorage.getItem("songUri")
export default function Footer() {
  return (
    <div className="bg-indigo-950 w-full sticky bottom-0">
      <Player accessToken={accessToken} trackUri={trackUri} />
    </div>
  );
}

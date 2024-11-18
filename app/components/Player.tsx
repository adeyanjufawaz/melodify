import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken }: any) {
  // console.log(accessToken);
  const songUri: any = localStorage.getItem("songUri");
  console.log(songUri);

  return (
    <div className="h-16">
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        uris={songUri ? [songUri] : []}
      />
    </div>
  );
}

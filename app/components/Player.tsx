import SpotifyPlayer from "react-spotify-web-playback";
type PlayerProps = {
  accessToken: string;
};


export default function Player({ accessToken }: PlayerProps) {
  // console.log(accessToken);
  const songUri:string = localStorage.getItem("songUri") || "";;
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

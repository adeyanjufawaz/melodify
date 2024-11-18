interface SpotifyTrack {
  added_at: string;
  added_by: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  primary_color: string | null;
  track: {
    preview_url: string;
    available_markets: string[];
    explicit: boolean;
    type: string;
    episode: boolean;
    // Add more properties if needed, based on the full track data
  };
  video_thumbnail: {
    url: string | null;
  };
}
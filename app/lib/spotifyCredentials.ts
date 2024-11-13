import { spotifyCredentials } from "@/credentials";

export const authParameters = {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: `grant_type=client_credentials&client_id=${spotifyCredentials.clientID}&client_secret=${spotifyCredentials.clientSecret}`,
};


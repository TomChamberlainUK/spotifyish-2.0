import type { Artist } from '@tsTypes/Artist';
import { useState, useEffect } from 'react';
import useFetch from '@hooks/useFetch';
import parseSpotifyApiArtists from '@utils/parseSpotifyApiArtists';

type ResponseType = {
  data: SpotifyApi.UsersRecentlyPlayedTracksResponse,
  error: SpotifyApi.ErrorObject,
  isLoading: boolean
}

export default function useGetRecentlyPlayed() {

  const { data, error, isLoading }: ResponseType = useFetch('https://api.spotify.com/v1/me/player/recently-played');
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    if (!error && data) {

      // Parse relevant tracks data from fetch response and update state
      // const spotifyApiArtists = data.items.map(({ track }) => track);
      // const parsedArtists = parseSpotifyApiTracks(spotifyApiArtists);
      // setArtists(parsedArtists);
  
    }
  }, [data, error]);

  return {
    artists,
    error,
    isLoading
  }

}
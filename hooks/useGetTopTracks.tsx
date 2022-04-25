import type { Track } from '@tsTypes/Track';
import { useState, useEffect } from 'react';
import useFetch from '@hooks/useFetch';
import parseSpotifyApiTracks from '@utils/parseSpotifyApiTracks';

type ResponseType = {
  data: SpotifyApi.UsersTopTracksResponse | undefined,
  error: SpotifyApi.ErrorObject | undefined,
  isLoading: boolean
}

export default function useGetTopTracks() {

  const { data, error, isLoading }: ResponseType = useFetch('https://api.spotify.com/v1/me/top/tracks');
  const [tracks, setTracks] = useState<Track[]>([]);
  
  useEffect(() => {
    if (!error && data) {

      // Parse relevant tracks data from fetch response and update state
      const spotifyApiTracks = data.items;
      const parsedTracks = parseSpotifyApiTracks(spotifyApiTracks);
      setTracks(parsedTracks);
  
    }
  }, [data, error]);

  return {
    tracks,
    error,
    isLoading
  }

}
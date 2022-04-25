import type { Track } from '@tsTypes/Track';
import { useState, useEffect } from 'react';
import useFetch from '@hooks/useFetch';
import parseSpotifyApiTracks from '@utils/parseSpotifyApiTracks';

type ResponseType = {
  data: SpotifyApi.UsersSavedTracksResponse,
  error: SpotifyApi.ErrorObject,
  isLoading: boolean
}

export default function useGetSavedTracks() {

  const { data, error, isLoading }: ResponseType = useFetch('https://api.spotify.com/v1/me/tracks');
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    if (!error && data) {

      // Parse relevant tracks data from fetch response and update state
      const spotifyApiTracks = data.items.map(({ track }) => track);
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
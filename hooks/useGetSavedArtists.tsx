import type { ArtistFull } from '@tsTypes/Artist';
import { useState, useEffect } from 'react';
import useFetch from '@hooks/useFetch';
import parseSpotifyApiArtists from '@utils/parseSpotifyApiArtists';

type ResponseType = {
  data: SpotifyApi.UsersTopArtistsResponse | undefined,
  error: SpotifyApi.ErrorObject | undefined,
  isLoading: boolean
}

export default function useGetSavedArtists() {

  const { data, error, isLoading }: ResponseType = useFetch('https://api.spotify.com/v1/me/top/artists');
  const [artists, setArtists] = useState<ArtistFull[]>([]);
  
  useEffect(() => {
    if (!error && data) {

      // Parse relevant tracks data from fetch response and update state
      const spotifyApiArtists = data.items;
      const parsedArtists = parseSpotifyApiArtists(spotifyApiArtists);
      setArtists(parsedArtists);
  
    }
  }, [data, error]);

  return {
    artists,
    error,
    isLoading
  }

}
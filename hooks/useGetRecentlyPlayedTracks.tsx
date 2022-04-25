import type { Track } from '@tsTypes/Track';
import type { Artist } from '@tsTypes/Artist';
import { useState, useEffect } from 'react';
import useFetch from '@hooks/useFetch';

type ResponseType = {
  data: SpotifyApi.UsersRecentlyPlayedTracksResponse,
  error: SpotifyApi.ErrorObject,
  isLoading: boolean
}

export default function useGetRecentlyPlayed() {

  const { data, error, isLoading }: ResponseType = useFetch('https://api.spotify.com/v1/me/player/recently-played');
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    if (!error && data) {

      // Init maps to efficiently parse track data and prevent duplicates with O(n) time complexity
      const uniqueTracks = new Map<string, Track>();
  
      // Loop through each track
      for (const { track } of data.items) {
  
        // If the track is not already mapped, parse and map it
        if (!uniqueTracks.has(track.id)) {
          uniqueTracks.set(track.id, {
            id: track.id,
            name: track.name,
            artists: track.artists.map(({ id, name }: Artist) => {
              return {
                id,
                name
              }
            }),
            album: track.album.name,
            imageUrl: track.album.images[0].url,
            previewUrl: track.preview_url
          });
        }
      
      }
  
      // Update tracks state
      setTracks(Array.from(uniqueTracks.values()));
  
    }
  }, [data, error]);

  return {
    tracks,
    error,
    isLoading
  }

}
import type { Artist } from '@tsTypes/Artist';
import type { Track } from '@tsTypes/Track';
import { useEffect, useState } from 'react';
import useFetch from './useFetch';

export default function useGetRecentlyPlayed() {

  // Init state for tracks and artists
  const [tracks, setTracks] = useState<Track[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);

  // Fetch recently played tracks data
  const { data, error, isLoading } = useFetch('https://api.spotify.com/v1/me/player/recently-played');

  // If data was successfully fetched
  useEffect(() => {
    if (!error && data) {

      // Init maps to efficiently parse track/artist data and prevent duplicates with O(n) time complexity
      const uniqueTracks = new Map<string, Track>();
      const uniqueArtists = new Map<string, Artist>();
  
      // Loop through each track
      for (const { track } of data.items) {
        const artist = track.artists[0];
  
        // If the track is not already mapped, map it
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
        
        // If the artist is not already mapped, map them
        if (!uniqueArtists.has(artist.id)) {
          uniqueArtists.set(artist.id, {
            id: artist.id,
            name: artist.name
          });
        }
      
      }
  
      // Update artists and tracks state
      setTracks(Array.from(uniqueTracks.values()));
      setArtists(Array.from(uniqueArtists.values()));
  
    }
  }, [error, data]);

  return {
    tracks,
    artists,
    error,
    isLoading
  }
}
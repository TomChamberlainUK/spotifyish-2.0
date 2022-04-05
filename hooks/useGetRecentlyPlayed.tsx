import type { Session } from 'next-auth';
import type { Artist } from '@tsTypes/Artist';
import type { Track } from '@tsTypes/Track';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

// Prepare fetcher for useSWR
async function fetcher(url: string, accessToken: string) {
  
  // Fetch data
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });

  // Handle errors
  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(`An error occurred whilst fetching data: (${error.status}) ${error.message}`);
  }

  // Parse and return data
  const data = await response.json();
  return data;

}

export default function useGetRecentlyPlayed(session: Session | null) {

  // Init state for tracks and artists
  const [tracks, setTracks] = useState<Track[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);

  // Get recently played tracks data
  const { data, error } = useSWR(
    session
      ? ['https://api.spotify.com/v1/me/player/recently-played', session.accessToken]
      : null,
    fetcher
  );

  useEffect(() => {
    if (!error && data) {

      // Init maps to efficiently parse track/artist data and prevent duplicates with O(n) time complexity
      const uniqueTracks = new Map<string, Track>();
      const uniqueArtists = new Map<string, Artist>();
  
      // Loop through each track from the response
      for (const { track } of data.items) {
        const artist = track.artists[0];
  
        // If the track is not already mapped, add it
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
          });
        }
        
        // If the artist is not already mapped, add them
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
    isLoading: !data && !error
  }
}
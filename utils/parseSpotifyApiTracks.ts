import type { Track } from '@tsTypes/Track';
import type { Artist } from '@tsTypes/Artist';

/**
 * Parse relevant data from tracks from the Spotify API.
 * @param tracks {@link SpotifyApi.TrackObjectFull Spotify API tracks array}
 * @returns An array of {@link Track} objects with their ids, names, artists, albums, imageUrls, and previewUrls
 */
export default function parseSpotifyApiTracks(tracks: SpotifyApi.TrackObjectFull[]) {

  // Init map to efficiently parse track data and prevent duplicates with O(n) time complexity
  const uniqueTracks = new Map<string, Track>();
  
  // Loop through each track
  for (const track of tracks) {

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

  // Return tracks as array
  return Array.from(uniqueTracks.values());

}
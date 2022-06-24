import type { Track } from '@tsTypes/Track';
import type { ArtistFull } from '@tsTypes/Artist';

/**
 * Parse relevant data from tracks from the Spotify API.
 * @param tracks {@link SpotifyApi.TrackObjectFull Spotify API tracks array}
 * @returns An array of {@link Track} objects with their ids, names, artists, albums, imageUrls, and previewUrls
 */
export default function parseSpotifyApiArtists(artists: SpotifyApi.ArtistObjectFull[]) {

  // Init map to efficiently parse artist data and prevent duplicates with O(n) time complexity
  const uniqueArtists = new Map<string, ArtistFull>();

  for (const artist of artists) {
    if (!uniqueArtists.has(artist.id)) {
      uniqueArtists.set(artist.id, {
        id: artist.id,
        name: artist.name,
        imageUrl: artist.images[0].url,
        popularity: artist.popularity
      })
    }
  }

  // Return artists as array
  return Array.from(uniqueArtists.values());

}
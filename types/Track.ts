import type { Artist } from '@tsTypes/Artist';

export type Track = {
  id: string,
  name: string,
  artists: Artist[],
  album: string,
  imageUrl: string,
  previewUrl: string | null
}
export type Artist = {
  id: string,
  name: string
}

export interface ArtistFull extends Artist {
  imageUrl: string;
  popularity: number;
}
import type { ReactNode } from 'react';
import styles from './TrackGrid.module.scss';

type TrackGridProps = {
  children: ReactNode
}

export default function TrackGrid({ children }: TrackGridProps) {
  return (
    <ul className={styles.gridContainer}>
      {children}
    </ul>
  );
}

type TrackGridItemProps = {
  name: string,
  artist: string,
  album: string,
  imageUrl: string
}

export function TrackGridItem({ name, artist, album, imageUrl }: TrackGridItemProps) {
  return (
    <li className={styles.itemContainer}>
      <img
        src={imageUrl}
        alt={`Album artwork for ${album} by ${artist}`}
        className={styles.itemImage}
      />
      <h2 className={styles.itemArtistName}>
        {artist}
      </h2>
      <p className={styles.itemTrackName}>
        {name}
      </p>
    </li>
  );
}
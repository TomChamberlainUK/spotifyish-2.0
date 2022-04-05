import type { ReactNode } from 'react';
import Link from 'next/link';
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
  id: string,
  name: string,
  artist: string,
  album: string,
  imageUrl: string
}

export function TrackGridItem({ id, name, artist, album, imageUrl }: TrackGridItemProps) {
  return (
    <li className={styles.itemContainer}>
      <Link href={`/tracks/${id}`}>
        <a>
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
        </a>
      </Link>
    </li>
  );
}
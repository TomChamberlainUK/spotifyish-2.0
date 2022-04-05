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

type Artist = {
  id: string,
  name: string
}

type TrackGridItemProps = {
  id: string,
  name: string,
  artists: Artist[],
  album: string,
  imageUrl: string
}

export function TrackGridItem({ id, name, artists, album, imageUrl }: TrackGridItemProps) {
  return (
    <li className={styles.itemContainer}>
      <Link href={`/tracks/${id}`}>
        <a>
          <img
            src={imageUrl}
            alt={`Album artwork for ${album}`}
            className={styles.itemImage}
          />
          <h2 className={styles.itemArtistName}>
            {name}
          </h2>
          <p className={styles.itemTrackName}>
            {artists.map(({ name }: { name: string }) => name).join(', ')}
          </p>
        </a>
      </Link>
    </li>
  );
}
import type { ReactNode } from 'react';
import type { Track } from '@tsTypes/Track';
import type { Artist } from '@tsTypes/Artist';
import { Fragment } from 'react';
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

export function TrackGridItem({ id, name, artists, album, imageUrl }: Track) {
  return (
    <li className={styles.itemContainer}>
      <Link href={`/tracks/${id}`}>
        <a>
          <img
            src={imageUrl}
            alt={`Album artwork for ${album}`}
            className={styles.itemImage}
          />
          <h2 className={styles.itemTrackName}>
            {name}
          </h2>
          <p className={styles.itemArtistName}>
            {
              artists.map(({ id, name }: Artist, i) => {
                return (
                  <Fragment key={id}>
                    <span>
                      <Link href={`/artists/${id}`} >
                        <a>{name}</a>
                      </Link>
                    </span>
                    {
                      // Add ", " between all artists
                      i !== artists.length - 1 &&
                        <>, </>
                    }
                  </Fragment>
                );
              })
            }
          </p>
        </a>
      </Link>
    </li>
  );
}
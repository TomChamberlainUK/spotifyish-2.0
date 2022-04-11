import type { ReactNode } from 'react';
import type { Track } from '@tsTypes/Track';
import type { Artist } from '@tsTypes/Artist';
import { Fragment, useContext } from 'react';
import Link from 'next/link';
import MusicPlayerContext from '@context/MusicPlayer/MusicPlayerContext';
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

export function TrackGridItem({ id, name, artists, album, imageUrl, previewUrl }: Track) {

  const musicPlayerContext = useContext(MusicPlayerContext);

  return (
    <li className={styles.itemContainer}>
      <div className={styles.itemImageWrapper}>
        <img
          src={imageUrl}
          alt={`Album artwork for ${album}`}
          className={styles.itemImage}
          onClick={() => {
            if (musicPlayerContext?.setCurrentlyPlaying && previewUrl) {
              musicPlayerContext.setCurrentlyPlaying(previewUrl);
            }
          }}
        />
        <span className={`${styles.itemImageIcon} material-icons`}>
          {
            previewUrl
              ? 'play_circle_filled'
              : 'play_disabled'
          }
        </span>
      </div>
      <h2 className={styles.itemTrackName}>
        <Link href={`/tracks/${id}`}>
          <a className={styles.link}>
            {name}
          </a>
        </Link>
      </h2>
      <p className={styles.itemArtistName}>
        {
          artists.map(({ id, name }: Artist, i) => {
            return (
              <Fragment key={id}>
                <span>
                  <Link href={`/artists/${id}`} >
                    <a className={styles.link}>
                      {name}
                    </a>
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
    </li>
  );
}
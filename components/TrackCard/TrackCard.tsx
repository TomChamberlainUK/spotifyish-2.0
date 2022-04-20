import type { Track } from '@tsTypes/Track';
import type { Artist } from '@tsTypes/Artist';
import { Fragment, useContext } from 'react';
import Link from 'next/link';
import MusicPlayerContext from '@context/MusicPlayer/MusicPlayerContext';
import styles from './TrackCard.module.scss';

export default function TrackCard({ id, name, artists, album, imageUrl, previewUrl }: Track) {

  const musicPlayerContext = useContext(MusicPlayerContext);

  return (
    <li className={styles.container}>
      <div className={styles.imageWrapper}>
        <img
          src={imageUrl}
          alt={`Album artwork for ${album}`}
          className={styles.image}
          onClick={() => {
            if (musicPlayerContext?.setCurrentlyPlaying && previewUrl) {
              musicPlayerContext.setCurrentlyPlaying(previewUrl);
            }
          }}
        />
        <span className={`${styles.imageIcon} material-icons`}>
          {
            previewUrl
              ? 'play_circle_filled'
              : 'play_disabled'
          }
        </span>
      </div>
      <h2 className={styles.trackName}>
        <Link href={`/tracks/${id}`}>
          <a className={styles.link}>
            {name}
          </a>
        </Link>
      </h2>
      <p className={styles.artistName}>
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
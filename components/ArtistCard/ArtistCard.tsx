import type { ArtistFull } from '@tsTypes/Artist';
import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import styles from './ArtistCard.module.scss';

export default function ArtistCard({ id, name, imageUrl, popularity }: ArtistFull) {

  return (
    <li className={styles.container}>
      <div className={styles.imageWrapper}>
        <Link href={`/artists/${id}`}>
          <a>
            <img
              src={imageUrl}
              alt={name}
              className={styles.image}
            />
          </a>
        </Link>
      </div>
        
      <h2 className={styles.name}>
        <Link href={`/artists/${id}`}>
          <a className={styles.link}>
            {name}
          </a>
        </Link>
      </h2>
      <div
        className={styles.popularityRatingContainer}
        title={`Popularity: ${popularity}`}
      >
        <StarIcon className={styles.popularityRatingIcon} />
        <StarIcon className={styles.popularityRatingIcon} />
        <StarIcon className={styles.popularityRatingIcon} />
        <StarHalfIcon className={styles.popularityRatingIcon} />
        <StarOutlineIcon className={styles.popularityRatingIcon} />
      </div>
    </li>
  );
}
import type { NextPage } from 'next';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Switch from '@components/Switch/Switch';
import styles from '@styles/home.module.scss';

const Home: NextPage = () => {

  const { status } = useSession();

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <span className={styles.headphonesEmoji}>
          🎧
        </span>
        <h2 className={styles.heading}>
          Welcome to Spotify<span className={styles.italic}>ish</span>!
        </h2>
        <p className={styles.paragraph}>
          Browse your favourite tracks and artists on a site that's <span className={styles.italic}>almost</span> as good as the real thing!
        </p>
        <p className={styles.paragraph}>
          <Switch
            condition={status}
            caseHandlers={[
              {
                conditionCase: 'loading',
                handler: <>Loading...</>
              },
              {
                conditionCase: 'unauthenticated',
                handler: (
                  <>
                    <Link href="/api/auth/signin">
                      <a>Sign In</a>
                    </Link>
                    {' '}
                    to get started
                  </>
                )
              },
              {
                conditionCase: 'authenticated',
                handler: (
                  <>
                    <Link href="/profile">
                      <a>Profile</a>
                    </Link>
                    {' | '}
                    <Link href="/recently-played">
                      <a>Recently Played</a>
                    </Link>
                  </>
                )
              }
            ]}
            defaultHandler={<>An error has occurred, please refresh your browser.</>}
          />
        </p>
      </div>
    </div>
  );
}

export default Home;

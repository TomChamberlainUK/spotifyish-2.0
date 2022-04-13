import type { ProtectedNextPage } from '@tsTypes/ProtectedNextPage';
import Head from 'next/head';
import useGetRecentlyPlayed from '@hooks/useGetRecentlyPlayed';
import LoadingThrobber from '@components/LoadingThrobber/LoadingThrobber';
import TrackGrid, { TrackGridItem } from '@components/TrackGrid/TrackGrid';
import styles from '@styles/recently-played.module.scss';

const RecentlyPlayed: ProtectedNextPage = () => {

  // Get recently played tracks data
  const { tracks, artists, error, isLoading } = useGetRecentlyPlayed();

  return (
    <div className={styles.container}>
      <Head>
        <title>Recently Played | Spotifyish</title>
        <meta name="description" content="Recently played music" />
      </Head>
      <header className={styles.headerContainer}>
        <h1 className={styles.heading}>Music | Recently Played</h1>
      </header>
      {
        isLoading
          ? <LoadingThrobber />
          : error
            ? <p>An error has occurred, please refresh your browser.</p>
            : <TrackGrid>
                {
                  tracks.map(({ id, name, artists, album, imageUrl, previewUrl }) => {
                    return (
                      <TrackGridItem
                        key={id}
                        id={id}
                        name={name}
                        artists={artists}
                        album={album}
                        imageUrl={imageUrl}
                        previewUrl={previewUrl}
                      />
                    );
                  })
                }
              </TrackGrid>
      }
    </div>
  );
}

RecentlyPlayed.auth = true;

export default RecentlyPlayed;

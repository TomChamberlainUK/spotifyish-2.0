import type { ProtectedNextPage } from '@tsTypes/ProtectedNextPage';
import Head from 'next/head';
import useGetRecentlyPlayed from '@hooks/useGetRecentlyPlayed';
import LoadingThrobber from '@components/LoadingThrobber/LoadingThrobber';
import CardGrid from '@components/CardGrid/CardGrid';
import TrackCard from '@components/TrackCard/TrackCard';
import styles from '@styles/music.module.scss';

const MusicPage: ProtectedNextPage = () => {

  const { tracks, error, isLoading } = useGetRecentlyPlayed();

  return (
    <>
      <Head>
        <title>Music | Spotifyish</title>
        <meta name="description" content="Browse music" />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.heading}>
          Recently Played
        </h1>
      </header>
      {
        isLoading
          ? <LoadingThrobber />
          : error
            ? <p>An error has occurred, please refresh your browser.</p>
            : <CardGrid>
                {
                  tracks.map(({ id, name, artists, album, imageUrl, previewUrl }) => {
                    return (
                      <TrackCard
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
              </CardGrid>
      }
    </>
  );
}

MusicPage.auth = true;

export default MusicPage;
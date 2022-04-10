import type { ProtectedNextPage } from '@tsTypes/ProtectedNextPage';
import Head from 'next/head';
import useGetRecentlyPlayed from '@hooks/useGetRecentlyPlayed';
import Layout from '@components/Layout/Layout';
import LoadingThrobber from '@components/LoadingThrobber/LoadingThrobber';
import TrackGrid, { TrackGridItem } from '@components/TrackGrid/TrackGrid';

const RecentlyPlayed: ProtectedNextPage = () => {

  // Get recently played tracks data
  const { tracks, artists, error, isLoading } = useGetRecentlyPlayed();

  return (
    <Layout>
      <Head>
        <title>Recently Played | Spotifyish</title>
        <meta name="description" content="Recently played music" />
      </Head>
      <h1>Recently Played</h1>
      {
        isLoading
          ? <LoadingThrobber />
          : error
            ? <p>An error has occurred, please refresh your browser.</p>
            : <TrackGrid>
                {
                  tracks.map(({ id, name, artists, album, imageUrl }) => {
                    return (
                      <TrackGridItem
                        key={id}
                        id={id}
                        name={name}
                        artists={artists}
                        album={album}
                        imageUrl={imageUrl}
                      />
                    );
                  })
                }
              </TrackGrid>
      }
    </Layout>
  );
}

RecentlyPlayed.auth = true;

export default RecentlyPlayed;

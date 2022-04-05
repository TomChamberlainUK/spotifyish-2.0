import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import useGetRecentlyPlayed from '@hooks/useGetRecentlyPlayed';
import Layout from '@components/Layout/Layout';
import LoadingThrobber from '@components/LoadingThrobber/LoadingThrobber';
import TrackGrid, { TrackGridItem } from '@components/TrackGrid/TrackGrid';

type AuthNextPage = NextPage & {
  auth: boolean;
}

const RecentlyPlayed: AuthNextPage = () => {

  const { data: session } = useSession();

  // Get recently played tracks data
  const { tracks, artists, error, isLoading } = useGetRecentlyPlayed(session);

  // Log errors
  useEffect(() => {
    if (!error) return;
    console.error(error);
  }, [error]);

  return (
    <Layout>
      <Head>
        <title>Spotifyish | Recently Played</title>
        <meta name="description" content="Recently played music" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <h1>Recently Played</h1>
      {
        isLoading
          ? <LoadingThrobber />
          : error
            ? <p>An error has occurred, please refresh your browser.</p>
            : <TrackGrid>
                {
                  tracks.map(({ id, name, artist, album, imageUrl }) => {
                    return (
                      <TrackGridItem
                        key={id}
                        id={id}
                        name={name}
                        artist={artist}
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

import type { NextPage } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import useGetRecentlyPlayed from '@hooks/useGetRecentlyPlayed';
import Layout from '@components/Layout/Layout';
import LoadingThrobber from '@components/LoadingThrobber/LoadingThrobber';

type AuthNextPage = NextPage & {
  auth: boolean;
}

const RecentlyPlayed: AuthNextPage = () => {

  const { data: session } = useSession();

  // Get recently played tracks data
  const { tracks, artists, error, isLoading } = useGetRecentlyPlayed(session);

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
            : <ul>
                {
                  tracks.map(({ id, name, artist, album, imageUrl }) => {
                    return (
                      <li key={id}>
                        <img src={imageUrl} alt={`Album artwork for ${album} by ${artist}`}/>
                        <h2>{artist}</h2>
                        <p>{name}</p>
                      </li>
                    );
                  })
                }
              </ul>
      }
    </Layout>
  );
}

RecentlyPlayed.auth = true;

export default RecentlyPlayed;

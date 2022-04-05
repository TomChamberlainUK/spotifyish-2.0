import type { GetServerSideProps } from 'next';
import type { ProtectedNextPage } from '@tsTypes/ProtectedNextPage';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import Layout from '@components/Layout/Layout';

export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await getSession(context);
  const id = typeof context.params?.id === 'string'
    ? context.params.id
    : '';

  // Don't fetch any data if there is no active session
  if (!session) {
    return { props: {} }
  }

  // Fetch and parse data
  const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    headers: {
      "Authorization": `Bearer ${session.accessToken}`
    }
  });
  const data = await response.json();

  // Handle errors
  if (!response.ok) {
    throw new Error(`An error occurred whilst fetching data: (${data.status}) ${data.message}`);
  }

  return {
    props: {
      name: data.name,
      artists: data.artists.map(({ name }: { name: string }) => name),
      imageUrl: data.album.images[0].url
    }
  }
}

type Props = {
  name: string;
  artists: string[];
  imageUrl: string;
}

const TrackPage: ProtectedNextPage<Props> = ({ name, artists, imageUrl }) => {
  return (
    <Layout>
      <Head>
        <title>Spotifyish | {name}</title>
        <meta name="description" content={`${name}`} />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <img src={imageUrl} />
      <h2>{name}</h2>
      <p>{artists.join(', ')}</p>
    </Layout>
  );
}

TrackPage.auth = true;

export default TrackPage;
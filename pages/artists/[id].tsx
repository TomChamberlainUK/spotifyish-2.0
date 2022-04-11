import type { GetServerSideProps } from 'next';
import type { ProtectedNextPage } from '@tsTypes/ProtectedNextPage';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

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
  const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
    headers: {
      "Authorization": `Bearer ${session.accessToken}`
    }
  });
  const data = await response.json();

  // Handle errors
  if (!response.ok) {
    if (data.status && data.message) {
      throw new Error(`An error occurred whilst fetching data: (${data.status}) ${data.message}`);
    }
    if (data.error?.status && data.error?.message) {
      throw new Error(`An error occurred whilst fetching data: (${data.error.status}) ${data.error.message}`);
    }
    console.log(data);
    throw new Error(`An error occurred whilst fetching data: Unknown error, please check logs.`);
  }

  return {
    props: {
      name: data.name,
      imageUrl: data.images[0].url,
      genres: data.genres,
      followers: data.followers.total,
      popularity: data.popularity
    }
  }
}

type Props = {
  name: string,
  imageUrl: string,
  genres: string[],
  followers: number,
  popularity: number
}

const ArtistPage: ProtectedNextPage<Props> = ({
  name,
  imageUrl,
  genres,
  followers,
  popularity
}) => {
  return (
    <>
      <Head>
        <title>{name} | Spotifyish</title>
        <meta name="description" content={`${name}`} />
      </Head>
      <img src={imageUrl} />
      <h2>{name}</h2>
      <p>Genres: {genres.join(', ')}</p>
      <p>Followers: {followers}</p>
      <p>Popularity: {popularity}</p>
    </>
  );
}

ArtistPage.auth = true;

export default ArtistPage;
import type { GetServerSideProps } from 'next';
import type { ProtectedNextPage } from '@tsTypes/ProtectedNextPage';
import type { Artist } from '@tsTypes/Artist';
import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
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
      artists: data.artists.map(({ id, name }: Artist) => {
        return {
          id,
          name
        }
      }),
      imageUrl: data.album.images[0].url,
      album: {
        name: data.album.name,
        type: data.album.type,
        releaseDate: data.album.release_date
      },
      explicit: data.explicit,
      duration: data.duration_ms,
      popularity: data.popularity,
      previewUrl: data.preview_url
    }
  }
}

type Props = {
  name: string,
  artists: Artist[],
  imageUrl: string,
  album: {
    name: string,
    type: string,
    releaseDate: string
  },
  explicit: boolean,
  duration: number,
  popularity: number,
  previewUrl: string
}

const TrackPage: ProtectedNextPage<Props> = ({
  name,
  artists,
  imageUrl,
  album,
  explicit,
  duration,
  popularity,
  previewUrl
}) => {
  return (
    <Layout>
      <Head>
        <title>Spotifyish | {name}</title>
        <meta name="description" content={`${name}`} />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <img src={imageUrl} />
      <h2>{name}</h2>
      <p>
        {
          artists.map(({ id, name }: Artist, i) => {
            return (
              <Fragment key={id}>
                <span>
                  <Link href={`/artists/${id}`} >
                    <a>{name}</a>
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
      <p>On the {album.type}, {album.name}, released on {album.releaseDate}</p>
      {
        explicit &&
          <p>Explicit!</p>
      }
      <p>Track length: {duration}</p>
      <p>Popularity: {popularity}</p>
      {
        previewUrl &&
          <p>Check it out <Link href={previewUrl}><a>Here</a></Link></p>
      }
    </Layout>
  );
}

TrackPage.auth = true;

export default TrackPage;
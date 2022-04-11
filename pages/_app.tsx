import '../styles/global.scss';
import type { AppProps } from 'next/app';
import type { NextComponentType } from 'next';
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import MusicPlayerContext from '@context/MusicPlayer/MusicPlayerContext';
import Auth from '@components/Auth/Auth';
import Layout from '@components/Layout/Layout';

type Props = AppProps & {
  Component: NextComponentType & {
    auth?: boolean
  }
}

function MyApp({
  Component,
  pageProps: {
    session,
    ...pageProps
  }
}: Props) {

  const [currentlyPlaying, setCurrentlyPlaying] = useState('');

  return (
    <SessionProvider session={session}>
      <MusicPlayerContext.Provider
        value={{
          currentlyPlaying,
          setCurrentlyPlaying
        }}
      >
        <Layout>
          {
            Component.auth
              ? (<Auth>
                  <Component {...pageProps} />
                </Auth>)
              : <Component {...pageProps} />
          }
        </Layout>
      </MusicPlayerContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;

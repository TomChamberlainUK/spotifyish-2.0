import '../styles/global.scss';
import type { AppProps } from 'next/app';
import type { NextComponentType } from 'next';
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import Auth from '@components/Auth/Auth';
import MusicPlayerContext from '@context/MusicPlayer/MusicPlayerContext';

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
        {
          Component.auth
            ? (<Auth>
                <Component {...pageProps} />
              </Auth>)
            : <Component {...pageProps} />
        }
      </MusicPlayerContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;

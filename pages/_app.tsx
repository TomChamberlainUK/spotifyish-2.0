import '../styles/global.scss';
import type { AppProps } from 'next/app';
import type { NextComponentType } from 'next';
import { SessionProvider } from 'next-auth/react';
import Auth from '@components/Auth/Auth';

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
  return (
    <SessionProvider session={session}>
      {
        Component.auth
          ? (<Auth>
              <Component {...pageProps} />
            </Auth>)
          : <Component {...pageProps} />
      }

    </SessionProvider>
  );
}

export default MyApp;

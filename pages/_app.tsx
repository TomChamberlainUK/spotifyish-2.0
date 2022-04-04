import '../styles/global.scss';
import type { AppProps } from 'next/app';
import type { NextComponentType } from 'next';
import type { ReactNode } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';


type CustomAppProps = AppProps & {
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
}: CustomAppProps) {
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

type AuthProps = {
  children: ReactNode
}

function Auth({ children }: AuthProps) {
  const { data: session, status } = useSession({ required: true });
  const isUser = session?.user;
  if (isUser) {
    return <>{children}</>;
  }
  return <div>Loading...</div>;
}

export default MyApp;

import type { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@components/Layout/Layout';
import LoadingThrobber from '@components/LoadingThrobber/LoadingThrobber';

type Props = {
  children: ReactNode
}

export default function Auth({ children }: Props) {
  const { data: session } = useSession({ required: true });
  const user = session?.user;
  return (
    user
      ? <>{children}</>
      : (
        <Layout>
          <LoadingThrobber />
        </Layout>
      )
  );
}
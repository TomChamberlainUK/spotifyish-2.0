import type { NextPage } from 'next';
import Layout from '@components/Layout/Layout';

type AuthNextPage = NextPage & {
  auth: boolean;
}

const RecentlyPlayed: AuthNextPage = () => {
  return (
    <Layout>
      <h1>Recently Played</h1>
    </Layout>
  );
}

RecentlyPlayed.auth = true;

export default RecentlyPlayed;
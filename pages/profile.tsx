import type { NextPage } from 'next';
import Layout from '@components/Layout/Layout';

type AuthNextPage = NextPage & {
  auth: boolean;
}

const Profile: AuthNextPage = () => {
  return (
    <Layout>
      <h1>Profile</h1>
    </Layout>
  );
}

Profile.auth = true;

export default Profile;
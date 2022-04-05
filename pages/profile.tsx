import type { ProtectedNextPage } from '@tsTypes/ProtectedNextPage';
import Layout from '@components/Layout/Layout';

const Profile: ProtectedNextPage = () => {
  return (
    <Layout>
      <h1>Profile</h1>
    </Layout>
  );
}

Profile.auth = true;

export default Profile;
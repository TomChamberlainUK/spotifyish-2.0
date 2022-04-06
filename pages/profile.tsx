import type { ProtectedNextPage } from '@tsTypes/ProtectedNextPage';
import Layout from '@components/Layout/Layout';
import LoadingThrobber from '@components/LoadingThrobber/LoadingThrobber';
import useGetUser from '@hooks/useGetUser';

const Profile: ProtectedNextPage = () => {

  // Get user data
  const { user, error, isLoading } = useGetUser();

  return (
    <Layout>
      <h1>Profile</h1>
      {
        isLoading
          ? <LoadingThrobber />
          : error
            ? <p>An error has occurred, please refresh your browser.</p>
            : (
              <>
                <img
                  src={user?.imageUrl ?? ''}
                  alt={`profile picture for ${user?.name ?? user?.email ?? 'unknown user'}`}
                />
                <p>
                  {user?.name ?? '(Username not found)'}
                </p>
                <p>
                  {user?.email ?? '(Email not found)'}
                </p>
                <p>
                  Followers: {user?.followers ?? '(Followers not found)'}
                </p>
              </>
            )
      }
    </Layout>
  );
}

Profile.auth = true;

export default Profile;
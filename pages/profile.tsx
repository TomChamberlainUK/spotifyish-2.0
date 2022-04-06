import type { ProtectedNextPage } from '@tsTypes/ProtectedNextPage';
import { useEffect  } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@components/Layout/Layout';
import LoadingThrobber from '@components/LoadingThrobber/LoadingThrobber';
import useGetUser from '@hooks/useGetUser';

const Profile: ProtectedNextPage = () => {

  const { data: session } = useSession()
  const { user, error, isLoading } = useGetUser(session);

  // Log errors
  useEffect(() => {
    if (!error) return;
    console.error(error);
  }, [error]);

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
                  alt={`profile picture for ${session?.user?.name ?? session?.user?.email ?? 'unknown user'}`}
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
import type { ProtectedNextPage } from '@tsTypes/ProtectedNextPage';
import Head from 'next/head';
import LoadingThrobber from '@components/LoadingThrobber/LoadingThrobber';
import useGetUser from '@hooks/useGetUser';
import styles from '@styles/profile.module.scss';

const Profile: ProtectedNextPage = () => {

  // Get user data
  const { user, error, isLoading } = useGetUser();

  return (
    <div className={styles.container}>
      <Head>
        <title>{user?.name ?? 'Profile'} | Spotifyish</title>
        <meta name="description" content="View user profile information." />
      </Head>
      <div className={styles.textContainer}>
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
                    className={styles.profilePicture}
                  />
                  <h1 className={styles.userNameText}>
                    {user?.name ?? '(Name not found)'}
                  </h1>
                  <p className={styles.userEmailText}>
                    {user?.email ?? '(Email not found)'}
                  </p>
                  <p className={styles.paragraph}>
                    Followers: {user?.followers ?? '(Followers not found)'}
                  </p>
                </>
              )
        }
      </div>
    </div>
  );
}

Profile.auth = true;

export default Profile;
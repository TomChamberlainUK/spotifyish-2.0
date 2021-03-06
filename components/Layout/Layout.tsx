import type { ReactNode } from 'react';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import MenuIcon from '@mui/icons-material/Menu';
import MusicPlayer from '@components/MusicPlayer/MusicPlayer';
import ExternalLink from '@components/ExternalLink/ExternalLink';
import LoadingThrobber from '@components/LoadingThrobber/LoadingThrobber';
import Switch from '@components/Switch/Switch';
import styles from './Layout.module.scss';

type NavLink = {
  name: string,
  url: string,
  isProtected: boolean
}

const navLinks: NavLink[] = [
  {
    name: 'Home',
    url: '/',
    isProtected: false
  },
  {
    name: 'Profile',
    url: '/profile',
    isProtected: true
  },
  {
    name: 'Music',
    url: '/music',
    isProtected: true
  }
]

type Props = {
  children: ReactNode
}

function Layout({ children }: Props) {

  const { data: session, status } = useSession();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  // Open/close sidebar
  function toggleSidebar() {
    setSidebarIsOpen(!sidebarIsOpen);
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Spotifyish</title>
        <meta name="description" content="Browse your favourite tracks and artists." />
      </Head>
      <header className={styles.header}>
        <button
          onClick={toggleSidebar}
          className={styles.iconButton}
        >
          <MenuIcon />
        </button>
        <h1 className={styles.pageTitle}>Spotifyish</h1>
      </header>
      <nav className={`${styles.sidebar} ${sidebarIsOpen ? styles.isOpen : ''}`}>
        <div className={styles.profileContainer}>
          {
            // Display sign in/out and profile depending on session status
            <Switch
              condition={status}
              caseHandlers={[
                {
                  conditionCase: 'loading',
                  handler: <LoadingThrobber />
                },
                {
                  conditionCase: 'unauthenticated',
                  handler: (
                    <>
                      <p className={styles.signInMessage}>
                        Sign in to use Spotifyish
                      </p>
                      <p className={styles.signInText}>
                        <Link href="/api/auth/signin">
                          <a className={styles.signInLink}>Sign In</a>
                        </Link>
                      </p>
                    </>
                  )
                },
                {
                  conditionCase: 'authenticated',
                  handler: (
                    <>
                      <img
                        src={session?.user?.image ?? ''}
                        alt={`profile picture for ${session?.user?.name ?? session?.user?.email ?? 'unknown user'}`}
                        className={styles.profilePicture}
                      />
                      <p className={styles.profileName}>
                        {session?.user?.name ?? session?.user?.email ?? '(User name not found)'}
                      </p>
                      <p className={styles.signOutText}>
                        <Link href="/api/auth/signout">
                          <a className={styles.signOutLink}>Sign Out</a>
                        </Link>
                      </p>
                    </>
                  )
                }
              ]}
              defaultHandler={
                <p>An error has occurred, please refresh your browser.</p>
              }
            />
          }
        </div>
        {
          // Map nav links
          navLinks.map(({ name, url, isProtected }) => {
            // Only display protected links if user is authenticated
            if (isProtected && status !== 'authenticated') return;
            return (
              <Link
                key={url}
                href={url}
              >
                <a
                  onClick={() => setSidebarIsOpen(false)}
                  className={styles.sidebarLink}
                >
                  <h2 className={styles.sidebarLinkName}>
                    {name}
                  </h2>
                </a>
              </Link>
            );
          })
        }
      </nav>
      <div
        className={`${styles.pageFade} ${sidebarIsOpen && styles.isActive}`}
        onClick={() => setSidebarIsOpen(false)}
      />
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Spotifyish
        </p>
        <p className={styles.footerText}>
          Site built by <ExternalLink href="https://github.com/TomChamberlainUK" className={styles.footerLink}>Tom Chamberlain</ExternalLink>
        </p>
      </footer>
      <MusicPlayer />
    </div>
  );
}

export default Layout;
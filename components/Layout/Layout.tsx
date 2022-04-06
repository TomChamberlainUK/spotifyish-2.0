import type { ReactNode } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
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
    name: 'Recently Played',
    url: '/recently-played',
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
      <header className={styles.header}>
        <button onClick={toggleSidebar}>
          menu
        </button>
        <h1 className={styles.pageTitle}>Spotifyish</h1>
      </header>
      <nav className={`${styles.sidebar} ${sidebarIsOpen ? styles.isOpen : ''}`}>
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
                handler: <button onClick={() => signIn()}>Sign In</button>
              },
              {
                conditionCase: 'authenticated',
                handler:  <div className={styles.profileContainer}>
                            <img
                              src={session?.user?.image ?? ''}
                              alt={`profile picture for ${session?.user?.name ?? session?.user?.email}`}
                              className={styles.profilePicture}
                            />
                            <p>Welcome back {session?.user?.name ?? session?.user?.email ?? 'user'}!</p>
                            <button onClick={() => signOut()}>Sign Out</button>
                          </div>
              }
            ]}
            defaultHandler={
              <p>An error has occurred, please refresh your browser.</p>
            }
          />
        }
        {
          // Map nav links
          navLinks.map(({ name, url, isProtected }) => {
            // Only display protected links if user is authenticated
            if (isProtected && status !== 'authenticated') return;
            return (
              <Link href={url}>
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
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <p>Site built by Tom Chamberlain</p>
      </footer>
    </div>
  );
}

export default Layout;
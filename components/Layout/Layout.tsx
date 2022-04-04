import type { ReactNode } from 'react';
import { useState } from 'react';
import styles from './Layout.module.scss';

type Props = {
  children: ReactNode
}

function Layout({ children }: Props) {

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

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
        Menu
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
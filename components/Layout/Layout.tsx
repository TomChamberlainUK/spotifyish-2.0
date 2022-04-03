import type { ReactNode } from 'react';
import styles from './Layout.module.scss';

type Props = {
  children: ReactNode
}

function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>Spotifyish</h1>
      </header>
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
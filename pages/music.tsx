import type { ChangeEvent } from 'react';
import type { ProtectedNextPage } from '@tsTypes/ProtectedNextPage';
import Head from 'next/head';
import { useState } from 'react';
import Switch from '@components/Switch/Switch';
import RecentlyPlayedMusic from '@components/Music/RecentlyPlayedMusic';
import TopMusic from '@components/Music/TopMusic';
import SavedMusic from '@components/Music/SavedMusic';
import styles from '@styles/music.module.scss';

const MusicPage: ProtectedNextPage = () => {

  const [displaySelection, setDisplaySelection] = useState('recently-played');

  function handleDisplaySelectionChange(event: ChangeEvent<HTMLSelectElement>) {
    setDisplaySelection(event.target.value);
  }

  return (
    <>
      <Head>
        <title>Music | Spotifyish</title>
        <meta name="description" content="Browse music" />
      </Head>
      <header className={styles.header}>
        <label>
          <span className={styles.hiddenLabel}>Display</span>
          <select value={displaySelection} onChange={handleDisplaySelectionChange}>
            <option value="recently-played">Recently Played</option>
            <option value="top">Top</option>
            <option value="saved">Saved</option>
          </select>
        </label>
      </header>
      <Switch
        condition={displaySelection}
        caseHandlers={[
          {
            conditionCase: 'recently-played',
            handler: <RecentlyPlayedMusic />
          },
          {
            conditionCase: 'top',
            handler: <TopMusic />
          },
          {
            conditionCase: 'saved',
            handler: <SavedMusic />
          }
        ]}
        defaultHandler={<p>An error has occurred</p>}
      />
    </>
  );
}

MusicPage.auth = true;

export default MusicPage;
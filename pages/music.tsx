import type { ChangeEvent } from 'react';
import type { ProtectedNextPage } from '@tsTypes/ProtectedNextPage';
import Head from 'next/head';
import { useState } from 'react';
import TrackIcon from '@mui/icons-material/Audiotrack';
import ArtistIcon from '@mui/icons-material/Person';
import AlbumIcon from '@mui/icons-material/Album';
import Switch from '@components/Switch/Switch';
import RecentlyPlayedMusic from '@components/Music/RecentlyPlayedMusic';
import TopMusic from '@components/Music/TopMusic';
import SavedMusic from '@components/Music/SavedMusic';
import styles from '@styles/music.module.scss';

const allowedFilters: Record<string, string[]> = {
  'recently-played': ['tracks'],
  'top': ['tracks', 'artists'],
  'saved': ['tracks', 'artists', 'albums']
}

const MusicPage: ProtectedNextPage = () => {

  const [formValues, setFormValues] = useState({
    selection: 'recently-played',
    filter: 'tracks'
  });

  function handleFormChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {

    if (event.target.name === 'selection' && !allowedFilters[event.target.value].includes(formValues.filter)) {
      // Change value of filter if not available for selection
      setFormValues({
        selection: event.target.value,
        filter: allowedFilters[event.target.value][0]
      });
    } else {
      setFormValues({
        ...formValues,
        [event.target.name]: event.target.value
      });
    }

  }

  return (
    <>
      <Head>
        <title>Music | Spotifyish</title>
        <meta name="description" content="Browse music" />
      </Head>
      <header className={styles.header}>
      <form className={styles.selectionForm}>
          <label>
            <span className={styles.hiddenLabel}>Display</span>
            <select
              value={formValues.selection}
              name="selection"
              onChange={handleFormChange}
              className={styles.dropdown}
            >
              <option value="recently-played">Recently Played</option>
              <option value="top">Top</option>
              <option value="saved">Saved</option>
            </select>
          </label>
          <fieldset className={styles.filterButtonsGroup}>
            <legend className={styles.hiddenLabel}>Filter</legend>
            {
              allowedFilters[formValues.selection].includes('tracks') &&
                <label title="Tracks">
                  <span className={styles.hiddenLabel}>Tracks</span>
                  <input
                    className={styles.radioButton}
                    type="radio"
                    name="filter"
                    value="tracks"
                    onChange={handleFormChange}
                    checked={formValues.filter === 'tracks'}
                  />
                  <div className={styles.filterIconWrapper}>
                    <TrackIcon className={styles.filterIcon}/>
                  </div>
                </label>
            }
            {
              allowedFilters[formValues.selection].includes('artists') &&
                <label title="Artists">
                  <span className={styles.hiddenLabel}>Artists</span>
                  <input
                    className={styles.radioButton}
                    type="radio"
                    name="filter"
                    value="artists"
                    onChange={handleFormChange}
                    checked={formValues.filter === 'artists'}
                  />
                  <div className={styles.filterIconWrapper}>
                    <ArtistIcon className={styles.filterIcon}/>
                  </div>
                </label> 
            }
            {
              allowedFilters[formValues.selection].includes('albums') &&
                <label title="Albums">
                  <span className={styles.hiddenLabel}>Albums</span>
                  <input
                    className={styles.radioButton}
                    type="radio"
                    name="filter"
                    value="albums"
                    onChange={handleFormChange}
                    checked={formValues.filter === 'albums'}
                  />
                  <div className={styles.filterIconWrapper}>
                    <AlbumIcon className={styles.filterIcon}/>
                  </div>
                </label>
            }
          </fieldset>
        </form>
      </header>
      <Switch
        condition={formValues.selection}
        caseHandlers={[
          {
            conditionCase: 'recently-played',
            handler: <RecentlyPlayedMusic />
          },
          {
            conditionCase: 'top',
            handler: <TopMusic filter={formValues.filter}/>
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
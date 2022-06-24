import type { ChangeEvent, FormEvent } from 'react';
import type { ProtectedNextPage } from '@tsTypes/ProtectedNextPage';
import { useState } from 'react';
import useSearch from '@hooks/useSearch';
import LoadingThrobber from '@components/LoadingThrobber/LoadingThrobber';
import CardGrid from '@components/CardGrid/CardGrid';
import TrackCard from '@components/TrackCard/TrackCard';

const SearchPage: ProtectedNextPage = () => {

  const [searchInput, setSearchInput] = useState<string>('');
  const [currentSearch, setCurrentSearch] = useState<string>('');

  function handleSearchInputUpdate(event: ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value);
  }

  function handleSearchFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCurrentSearch(searchInput);
  }

  const { tracks, error, isLoading } = useSearch(
    currentSearch
      ? `https://api.spotify.com/v1/search?q=${currentSearch}&type=track,artist`
      : ''
  );

  return (
    <>
      <h1>Search</h1>
      <form onSubmit={handleSearchFormSubmit}>
        <label>
          Search:
          <input
            type="text"
            onChange={handleSearchInputUpdate}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {
        !currentSearch
          ? <></>
          : isLoading
            ? <LoadingThrobber />
            : error
              ? <p>An error has occurred, please refresh your browser.</p>
              : <CardGrid>
                  {
                    tracks.map(({ id, name, artists, album, imageUrl, previewUrl }) => {
                      return (
                        <TrackCard
                          key={id}
                          id={id}
                          name={name}
                          artists={artists}
                          album={album}
                          imageUrl={imageUrl}
                          previewUrl={previewUrl}
                        />
                      );
                    })
                  }
                </CardGrid>
      }
    </>
  );
}

SearchPage.auth = true;

export default SearchPage;

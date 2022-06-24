import CardGrid from '@components/CardGrid/CardGrid';
import ArtistCard from '@components/ArtistCard/ArtistCard';
import LoadingThrobber from '@components/LoadingThrobber/LoadingThrobber';
import useGetSavedArtists from '@hooks/useGetSavedArtists';

export default function TopArtists() {

  const { artists, error, isLoading } = useGetSavedArtists();

  return (
    isLoading
      ? <LoadingThrobber />
      : error
        ? <p>An error has occurred, please refresh your browser.</p>
        : <CardGrid>
            {
              artists.map(({ id, name, imageUrl, popularity }) => {
                return (
                  <ArtistCard
                    key={id}
                    id={id}
                    name={name}
                    imageUrl={imageUrl}
                    popularity={popularity}
                  />
                );
              })
            }
          </CardGrid>
  );
}
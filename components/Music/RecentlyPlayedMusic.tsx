import CardGrid from '@components/CardGrid/CardGrid';
import TrackCard from '@components/TrackCard/TrackCard';
import LoadingThrobber from '@components/LoadingThrobber/LoadingThrobber';
import useGetRecentlyPlayedTracks from '@hooks/useGetRecentlyPlayedTracks';

export default function RecentlyPlayedMusic() {

  const { tracks, error, isLoading } = useGetRecentlyPlayedTracks();

  return (
    isLoading
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
  );
}
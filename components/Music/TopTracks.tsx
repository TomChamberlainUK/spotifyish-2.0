import CardGrid from '@components/CardGrid/CardGrid';
import TrackCard from '@components/TrackCard/TrackCard';
import LoadingThrobber from '@components/LoadingThrobber/LoadingThrobber';
import useGetTopTracks from '@hooks/useGetTopTracks';

export default function TopTracks() {

  const { tracks, error, isLoading } = useGetTopTracks();

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
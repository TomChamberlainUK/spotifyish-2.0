import TopTracks from '@components/Music/TopTracks';
import TopArtists from '@components/Music/TopArtists';

type Props = {
  filter: string
}

export default function TopMusic({ filter }: Props) {

  switch (filter) {

    case 'tracks': {
      return <TopTracks />
    }

    case 'artists': {
      return <TopArtists />
    }

    default: {
      return <p>An error has occurred, please refresh your browser.</p>
    }

  }

}
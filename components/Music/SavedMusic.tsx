// import SavedTracks from '@components/Music/SavedTracks';
import SavedArtists from '@components/Music/SavedArtists';

type Props = {
  filter: string
}

export default function SavedMusic({ filter }: Props) {

  switch (filter) {

    // case 'tracks': {
    //   return <SavedTracks />
    // }

    case 'artists': {
      return <SavedArtists />
    }

    default: {
      return <p>An error has occurred, please refresh your browser.</p>
    }

  }

}








// import CardGrid from '@components/CardGrid/CardGrid';
// import TrackCard from '@components/TrackCard/TrackCard';
// import LoadingThrobber from '@components/LoadingThrobber/LoadingThrobber';
// import useGetSavedTracks from '@hooks/useGetSavedTracks';

// export default function TopMusic() {

//   const { tracks, error, isLoading } = useGetSavedTracks();

//   return (
//     <CardGrid>
//       {
//         isLoading
//           ? <LoadingThrobber />
//           : error
//             ? <p>An error has occurred, please refresh your browser.</p>
//             : <CardGrid>
//                 {
//                   tracks.map(({ id, name, artists, album, imageUrl, previewUrl }) => {
//                     return (
//                       <TrackCard
//                         key={id}
//                         id={id}
//                         name={name}
//                         artists={artists}
//                         album={album}
//                         imageUrl={imageUrl}
//                         previewUrl={previewUrl}
//                       />
//                     );
//                   })
//                 }
//               </CardGrid>
//       }
//     </CardGrid>
//   );
// }
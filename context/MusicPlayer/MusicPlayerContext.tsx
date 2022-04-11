import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

type Props = {
  currentlyPlaying: string,
  setCurrentlyPlaying: Dispatch<SetStateAction<string>>
}

const MusicPlayerContext = createContext<Props | null>(null);

export default MusicPlayerContext;
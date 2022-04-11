import { useContext, useRef, useEffect } from 'react';
import MusicPlayerContext from '@context/MusicPlayer/MusicPlayerContext';
import styles from './MusicPlayer.module.scss';

export default function MusicPlayer() {

  const { currentlyPlaying } = useContext(MusicPlayerContext) ?? {};
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // When currently playing changes, load the new track and play
  useEffect(() => {
    if (!currentlyPlaying) return;
    audioRef.current?.load();
    audioRef.current?.play();
  }, [currentlyPlaying]);

  return (
    <div className={styles.container}>
      <audio controls ref={audioRef}>
        {
          currentlyPlaying &&
            <source src={currentlyPlaying} />
        }
      </audio>
    </div>
  );
}
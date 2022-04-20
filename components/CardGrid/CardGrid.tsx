import type { ReactNode } from 'react';
import styles from './CardGrid.module.scss';

type Props = {
  children: ReactNode
}

export default function CardGrid({ children }: Props) {
  return (
    <ul className={styles.container}>
      {children}
    </ul>
  );
}
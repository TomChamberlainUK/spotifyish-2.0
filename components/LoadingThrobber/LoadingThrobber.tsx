import styles from './LoadingThrobber.module.scss';

function LoadingThrobber() {
  return (
    <div className={styles.container}>
      <div className={styles.throbber} />
      <p className={styles.text}>Loading...</p>
    </div>
  );
}

export default LoadingThrobber;
import styles from './LoadingOverlay.module.scss'

function LoadingOverlay(): JSX.Element {



  return (
    <>
    <div className={styles.container}>
        <div className={styles.loadingSpinner}></div>
    </div>
    </>
  );
}

export default LoadingOverlay;

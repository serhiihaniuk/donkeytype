import styles from './CapsLockPopup.module.css';

export default function CapsLockPopup({ open }: {open: boolean}) {
  return <>{open && <div className={styles.popup}>Caps Lock</div>}</>;
}

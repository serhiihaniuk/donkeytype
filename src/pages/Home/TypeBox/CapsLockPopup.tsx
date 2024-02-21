import styles from './CapsLockPopup.module.css';

export default function CapsLockPopup({ open }) {
  return <>{open && <div className={styles.popup}>Caps Lock</div>}</>;
}

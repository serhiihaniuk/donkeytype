import styles from './Toggle.module.css';

interface ToggleProps {
  state: boolean;
  cb: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ state, cb }) => {
  return (
    <div>
      <button
        className={`${styles.toggleBtn} ${state ? styles.toggled : ''}`}
        onClick={() => cb()}
      >
        <div className={styles.thumb}></div>
      </button>
    </div>
  );
};

export default Toggle;

import { ConfigContext } from '@/context/ConfigContext';
import { ConfigContextType } from '@/types/Config';
import { useContext, useState } from 'react';
import styles from './Settings.module.css';
import Popup from '@/components/PopUp';

export default function Settnigs() {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-expect-error */
  const [config, updateConfig] = useContext(
    ConfigContext
  ) as ConfigContextType | null;
  const toggleSetting = () => {
    updateConfig({ liveWPM: !config.liveWPM });
  };
  return (
    <>
      <div
        className={styles.container}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Settings
      </div>
      <Popup show={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Settings</h2>
        <div className={styles.list}>
          <div className={styles.listItem}>
            <span>Live WPM</span>
            <button onClick={toggleSetting}>toggle</button>
          </div>
        </div>
      </Popup>
    </>
  );
}

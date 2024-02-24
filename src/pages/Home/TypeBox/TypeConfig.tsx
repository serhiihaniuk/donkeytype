import { useContext } from 'react';
import styles from './TypeConfig.module.css';
import { ConfigContext } from '@/context/ConfigContext';

export default function TypeConfig() {
  const [config, updateConfig] = useContext(ConfigContext);

  const timeOptions = [15, 30, 60];
  return (
    <div className={styles.container}>
      <div className={styles.timeWrapper}>
        {timeOptions.map((item, i) => (
          <span
            key={i}
            className={styles.configButton}
            onClick={() => updateConfig({ time: item })}
            style={{'color':  item === config.time ? '#f2ce83' : 'inherit'}}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

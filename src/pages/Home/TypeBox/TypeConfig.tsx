import { useContext } from 'react';
import styles from './TypeConfig.module.css';
import { ConfigContext } from '@/context/ConfigContext';

export default function TypeConfig({ isVisible }) {
  const [config, updateConfig] = useContext(ConfigContext);

  const timeOptions = [15, 30, 60];
  return (
    <div
      className={styles.container}
      style={!isVisible ? { opacity: 0, pointerEvents: 'none' } : {}}
    >
      <div className={styles.timeWrapper}>
        {timeOptions.map((item, i) => (
          <span
            key={i}
            className={styles.configButton}
            onClick={() => updateConfig({ time: item })}
            style={{ color: item === config.time ? '#f2ce83' : 'inherit' }}
          >
            {item}
          </span>
        ))}
        <span
          className={styles.configButton}
          onClick={() => updateConfig({ capitals: !config.capitals })}
          style={{ color: config.capitals ? '#f2ce83' : 'inherit' }}
        >
          capitals
        </span>
        <span
          className={styles.configButton}
          onClick={() => updateConfig({ numbers: !config.numbers })}
          style={{ color: config.numbers ? '#f2ce83' : 'inherit' }}
        >
          numbers
        </span>
      </div>
    </div>
  );
}

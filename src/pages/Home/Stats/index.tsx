import { Results } from '@/types/Results';
import Chart from './Chart';
import styles from './Stats.module.css';
import { useEffect } from 'react';

interface Props {
  result: Results;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

const Stats: React.FC<Props> = ({ result, setStatus }) => {
  useEffect(() => {
    const handleTabPress = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        setStatus('waiting');
      }
    };

    window.addEventListener('keydown', handleTabPress);

    return () => {
      window.removeEventListener('keydown', handleTabPress);
    };
  }, [setStatus]);

  return (
    <div className={styles.wrapper}>
      <p>Stats</p>
      <p>WPM: {result.wpm}</p>
      <div className={styles.chartContainer}>
        <Chart chartData={result.speedHistory}></Chart>
      </div>
      <div>
        <p>characters</p>
        <span>{result.charCorrectness.correctCount}/{result.charCorrectness.errorCount}/{result.charCorrectness.skippedCount}</span>
      </div>
      <p>Press TAB to restart</p>
    </div>
  );
};

export default Stats;

import { Results } from '@/types/Results';
import Chart from './Chart';
import styles from './Stats.module.css';
import { useEffect } from 'react';
import { Accuracy } from '@/types/Results';

const calcAccuracy = ({ correct, incorrect }: Accuracy) => {
  return Math.floor((100 / (correct + incorrect)) * correct) | 0;
};

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
      <div className={styles.results}>
        <div className={styles.mainstats}>
          <p className={styles.title}>wpm</p>
          <span className={styles.info}>{result.wpm}</span>
          <p className={styles.title}>accuracy</p>
          <span className={styles.info}>{calcAccuracy(result.accuracy)}%</span>
        </div>

        <div className={styles.chart}>
          <Chart chartData={result.speedHistory} />
        </div>

        <div className={styles.substats}>
          <div className={styles.substatsItem}>
            <p className={styles.title}>characters</p>
            <span className={styles.info}>
              {result.charCorrectness.correctCount}/
              {result.charCorrectness.errorCount}/
              {result.charCorrectness.skippedCount}
            </span>
          </div>
        </div>
      </div>

      <p>Press TAB to restart</p>
    </div>
  );
};

export default Stats;

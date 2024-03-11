import { Results } from '@/types/Results';
import Chart from './Chart';
import styles from './Stats.module.css';

interface Props {
  result: Results;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}
const Stats: React.FC<Props> = ({ result, setStatus }) => {
  return (
    <div className={styles.wrapper}>
      <p>Stats</p>
      <p>WPM: {result.wpm}</p>
      <div className={styles.chartContainer}>
        <Chart chartData={result.speedHistory}></Chart>
      </div>
      <button
        onClick={() => {
          setStatus('waiting');
        }}
      >
        Restart
      </button>
    </div>
  );
};

export default Stats;

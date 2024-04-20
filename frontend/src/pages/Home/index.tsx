import { useContext, useState } from 'react';
import TypeBox from './TypeBox';
import styles from './Home.module.css';
import Stats from './Stats';
import TypeConfig from './TypeBox/TypeConfig';
import { StatusContext } from '@/context/StatusContext';
import { Results } from '@/types/Results';
import { StatusContextType } from '@/types/Status';

export default function Home() {
  const [result, setResult] = useState<Results>({
    wpm: 0,
    speedHistory: [],
    charCorrectness: {},
    accuracy: { correct: 0, incorrect: 0 },
    isAfk: false,
  });
  const [status, setStatus] = useContext(StatusContext) as StatusContextType;
  return (
    <div className={styles.wrapper}>
      {status == 'finished' ? (
        <Stats result={result} setStatus={setStatus} />
      ) : (
        <>
          <TypeConfig isVisible={status === 'waiting'} />
          <TypeBox setResult={setResult} />
        </>
      )}
    </div>
  );
}

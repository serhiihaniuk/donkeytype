import { useContext, useState } from 'react';
import TypeBox from './TypeBox';
import Header from '@/components/Header';
import styles from './Home.module.css';
import Stats from './Stats';
import TypeConfig from './TypeBox/TypeConfig';
import { StatusContext } from '@/context/StatusContext';

export default function Home() {
  const [result, setResult] = useState(0);
  const [status, setStatus] = useContext(StatusContext)
  return (
    <div className={styles.container}>
      <Header />
      {status !== 'finished' ? (
        <>
          <TypeConfig />
          <TypeBox setResult={setResult} />
        </>
      ) : (
        <Stats result={result} setStatus={setStatus} />
      )}
    </div>
  );
}

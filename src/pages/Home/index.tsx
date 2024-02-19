import React, { useState } from 'react';
import TypeBox from './TypeBox';
import Header from '../../components/Header';
import styles from './Home.module.css';
import Stats from './Stats';

export default function Home() {
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState(0)
  
  return (
    <div className={styles.container}>
      <Header/>
      
      {!isFinished ? (
        <TypeBox setIsFinished={setIsFinished} setResult={setResult}/>
      ) : (
        <Stats result={result} setIsFinished={setIsFinished} />
      )}
    </div>
  );
}

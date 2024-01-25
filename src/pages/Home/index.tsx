import React, { useState } from 'react'
import TypeBox from './TypeBox'
import Header from '../../components/Header'
import styles from './Home.module.css'
import Stats from './Stats'

export default function Home() {
  const [isFinished, setIsFinished] = useState(false)
  return (
    <div className={styles.container}>
      <Header></Header>
      {!isFinished ? <TypeBox setIsFinished={setIsFinished}/> : <Stats/>}
    </div>
  )
}

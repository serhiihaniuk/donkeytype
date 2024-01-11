import React from 'react'
import TypeBox from './TypeBox'
import Header from '../../components/Header'
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Header></Header>
      <TypeBox></TypeBox>
    </div>
  )
}

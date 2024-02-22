import React from 'react'
import styles from './Header.module.css'
import logo from '../../assets/logo.svg'

export default function Header() {
  return (
    <div className={styles.container}>
      <img src={logo} alt="Logo" className={styles.logo}/>
      <span className={styles.title}>DonkeyType</span>
    </div>
  )
}
  
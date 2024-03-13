import styles from './Header.module.css'
import logo from '@/assets/logo.svg'

export default function Header() {
  return (
    <div className={styles.wrapper}>
      <img src={logo} alt="Logo" className={styles.logo}/>
      <span className={styles.title}>DonkeyType</span>
    </div>
  )
}
  
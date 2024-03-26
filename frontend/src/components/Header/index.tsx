import styles from './Header.module.css'
import logo from '@/assets/logo.svg'
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div onClick={() => navigate('/')} className={styles.logoWrapper}>
        <img src={logo} alt="Logo" className={styles.logo}/>
        <span className={styles.title}>DonkeyType</span>
      </div>
      <span className={styles.headerButton} onClick={() => navigate('/login')}>Login</span>
    </div>
  )
}
  
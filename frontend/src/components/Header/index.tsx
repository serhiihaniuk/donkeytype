import styles from './Header.module.css'
import logo from '@/assets/logo.svg'
import user from '@/assets/user.svg'
import logout from '@/assets/logout.svg'
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { StatusContext } from '@/context/StatusContext';
import { StatusContextType } from '@/types/Status';

export default function Header() {
  const navigate = useNavigate();
  const [, setStatus] = useContext(StatusContext) as StatusContextType;
  const { isUserLogged, handleLogOut } = useContext(AuthContext)
  const handleLogoutClick = () => {
    handleLogOut()
    navigate('/login')
  }
  const handleLogoClick = () => {
    setStatus('waiting')
    navigate('/')
  }
  return (
    <div className={styles.wrapper}>
      <div onClick={handleLogoClick} className={styles.logoWrapper}>
        <img src={logo} alt="Logo" className={styles.logo}/>
        <span className={styles.title}>DonkeyType</span>
      </div>
      <div>
        {isUserLogged ?
          <>
            <span className={styles.headerButton} onClick={() => navigate('/dashboard')}>
              <img src={user} alt="User" className={styles.headerButton}/>
            </span>
            <span className={styles.headerButton} onClick={handleLogoutClick}>
              <img src={logout} alt="logout" className={styles.headerButton}/>
            </span>
          </>
          :
          <span className={styles.headerButton} onClick={() => navigate('/login')}>
              <img src={user} alt="User" className={styles.headerButton}/>
          </span>
        }
      </div>
    </div>
  )
}
  
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { StatusContext } from '@/context/StatusContext'
import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './Layhout.module.css'


export default function Layout() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  { /* @ts-expect-error */ }
  const [status] = useContext(StatusContext) 
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
      {status === 'waiting' && <Footer />}
    </div>
  )
}

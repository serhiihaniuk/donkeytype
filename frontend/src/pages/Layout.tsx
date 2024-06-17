import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { StatusContext } from '@/context/StatusContext'
import { useContext } from 'react'
import { Outlet } from 'react-router-dom'


export default function Layout() {
  const [status] = useContext(StatusContext)
  return (
    <>
      <Header />
      <Outlet />
      {status === 'waiting' && <Footer />}
      
    </>
  )
}

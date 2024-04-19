import { AuthContext } from "@/context/AuthContext"
import { StatusContext } from "@/context/StatusContext"
import { StatusContextType } from "@/types/Status"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const {isUserLogged} = useContext(AuthContext) as {isUserLogged: boolean}
  const navigate = useNavigate()
  useEffect(()=>{
    if(!isUserLogged){
      navigate('/login')
    }
  })
  const [, setStatus] = useContext(StatusContext) as StatusContextType;
  setStatus('waiting');
  return (
    <div>Dashboard</div>
  )
}

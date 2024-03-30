import { AuthContext } from "@/context/AuthContext"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const {isUserLogged} = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!isUserLogged){
      navigate('/login')
    }
  })
  return (
    <div>Dashboard</div>
  )
}

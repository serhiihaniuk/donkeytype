// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const nagigate = useNavigate()
  const { handleSignUp, handleSignIn } = useContext(AuthContext)

  const handleSend = async () => {
    const data = {
      username: document.getElementById('name').value,
      email: document.getElementById('remail').value,
      password: document.getElementById('rpassword').value
    }
    handleSignUp(data)
    nagigate('/')
  }
  const handleLogin = async () => {
    const data = {
      email: document.getElementById('lemail').value,
      password: document.getElementById('lpassword').value
    }
    handleSignIn(data)
    nagigate('/')
  }

  return (
    <>
        <input id='name' type="text" placeholder='name' />
        <input id='remail' type="text" placeholder='email' />
        <input id='rpassword' type="text" placeholder='password' />
        <button onClick={handleSend}>register</button>
        <input id='lemail' type="text" placeholder='login email' />
        <input id='lpassword' type="text" placeholder='login password' />
        <button onClick={handleLogin}>Login</button>

    </>
  )
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import axios from 'axios';

export default function Login() {

  const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1/',
    withCredentials: true
  })

  const handleSend = async () => {
    const data = {
      username: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    }
    api.post("/sign-up", data)
    console.log(data)
  }

  return (
    <>
        <input id='name' type="text" placeholder='name' />
        <input id='email' type="text" placeholder='email' />
        <input id='password' type="text" placeholder='password' />
        <button onClick={handleSend}>Send</button>
    </>
  )
}

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import styles from './Login.module.css'

export default function Login() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <RegisterForm />
        <LoginForm/>
      </div>
    </div>
  );
}

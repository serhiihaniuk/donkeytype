import { UserSignInType } from '@/types/User';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './Form.module.css';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function RegisterForm() {
  const { handleSignIn } = useContext(AuthContext);
  const [isWrong, setIsWrong] = useState(false)
  const {
    register,
    handleSubmit,
  } = useForm<UserSignInType>();

  const onSubmit: SubmitHandler<UserSignInType> = async (
    data: UserSignInType
  ) => {
    const res = await handleSignIn(data);
    if(res.message == 'Wrong email or password') {
      setIsWrong(true)
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.formContainer}
        noValidate
      >
        <div className={styles.formControl}>
          <label htmlFor="email">Email</label>

          <input
            id="login-email"
            {...register('email', {
              onChange: () => {setIsWrong(false)},
              required: true,
            })}
          />
        </div>

        <div className={styles.formControl}>
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            {...register('password', {
              onChange: () => {setIsWrong(false)},
              required: true
            })}
          />
        </div>
        {isWrong && <p>Wrong email or password</p>}
        
        

        <button>Sign In</button>
      </form>
    </>
  );
}

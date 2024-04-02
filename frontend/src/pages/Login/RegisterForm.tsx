import { AuthContext } from '@/context/AuthContext';
import { UserSignUpType } from '@/types/User';
import { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './Form.module.css';

export default function RegisterForm() {
  const nagigate = useNavigate();
  const { getUserByEmail } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpType>();

  const onSubmit: SubmitHandler<UserSignUpType> = async (data: UserSignUpType) => {
    const res = await getUserByEmail(data.email)
    console.log(res);
 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer} noValidate>
      <div className={styles.formControl}>
        <input
          {...register('username', { required: true })}
          placeholder="username"
        />
      </div>
      <div className={styles.formControl}>
        <input
          {...register('email', {
            required: true,

          })}
          placeholder="email"
        />
        <p>{errors.email?.message}</p>
      </div>
      <div className={styles.formControl}>
        <input
          {...register('password', { 
            required: true,
            minLength: 6 || 'min length is 6'
          })}
          placeholder="password"
          />
          <p>{errors.password?.message}</p>
      </div>

      <button>Register</button>
    </form>

    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
  );
}

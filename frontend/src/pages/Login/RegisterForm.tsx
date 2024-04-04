import { UserSignUpType } from '@/types/User';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './Form.module.css';
import { checkUsername } from '@/services/userServices';

export default function RegisterForm() {

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpType>();

  const onSubmit: SubmitHandler<UserSignUpType> = async (
    data: UserSignUpType
  ) => {
    const isUsernameAvaliable = await checkUsername(data.username);
    console.log(isUsernameAvaliable);
    console.log(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.formContainer}
        noValidate
      >
        <div className={styles.formControl}>
          <label htmlFor="username">Username</label>
          <input id="username" {...register('username', { required: true })} />
        </div>

        <div className={styles.formControl}>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            {...register('email', {
              required: true,
              pattern: {
                value:
                  /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/i,
                message: 'Invalid email address',
              },
            })}
          />
          <p>{errors.email?.message}</p>
        </div>

        <div className={styles.formControl}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div className={styles.formControl}>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === watch('password') || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </div>

        <button>Register</button>
      </form>
      <button onClick={() => console.log(errors)}>test </button>
    </>
  );
}

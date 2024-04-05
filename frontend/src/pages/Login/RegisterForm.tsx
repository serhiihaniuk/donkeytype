import { UserSignUpType } from '@/types/User';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './Form.module.css';
import { checkUsername } from '@/services/userServices';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

type UserInputType = UserSignUpType & {
  confirmPassword: string;
};

export default function RegisterForm() {
  const { handleSignUp } = useContext(AuthContext);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputType>();

  const onSubmit: SubmitHandler<UserInputType> = async (
    data: UserInputType
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userData } = data;
    try {
      await handleSignUp(userData);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        throw new Error('Email is already in use');
      }
      console.error(error);
      throw error;
    }
  };

  const validateUsernameAvailability = async (value: string) => {
    try {
      const isUsernameAvailable = await checkUsername(value);
      return isUsernameAvailable || 'Username is not available';
    } catch (error) {
      console.error('Error checking username availability:', error);
      return 'Error checking username availability';
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
          <label htmlFor="username">Username</label>
          <input
            id="username"
            {...register('username', {
              required: true,
              validate: validateUsernameAvailability,
              minLength: {
                value: 2,
                message: 'Username must be at least 2 characters',
              },
              maxLength: {
                value: 20,
                message: 'Username must be max 20 characters',
              },
            })}
          />
          <p>{errors.username?.message}</p>
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

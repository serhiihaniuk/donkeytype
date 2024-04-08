import { UserSignUpType } from '@/types/User';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './Form.module.css';
import { checkUsername } from '@/services/userServices';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

type UserInputType = UserSignUpType & {
  confirmPassword: string;
};

export default function RegisterForm() {
  const { handleSignUp } = useContext(AuthContext);
  const navigate = useNavigate()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputType>();

  const [isEmailInUse, setIsEmailInUse] = useState(false);

  const onSubmit: SubmitHandler<UserInputType> = async (
    data: UserInputType
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userData } = data;
   
    const res = await handleSignUp(userData)
    if(res.message === 'Email is not avaliable'){
      setIsEmailInUse(true)
    } else {
      setIsEmailInUse(false)
    }
    if(res.success){
      navigate('/')
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
          <p className={styles.error}>{errors.username?.message}</p>
        </div>

        <div className={styles.formControl}>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            {...register('email', {
              required: true,
              onChange: ()=>setIsEmailInUse(false),
              pattern: {
                value:
                  /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/i,
                message: 'Invalid email address',
              },
            })}
          />
          <p className={styles.error}>{errors.email?.message}</p>
          {isEmailInUse && <p>Email is not avaliable</p>}
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
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
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
            <span className={styles.error}>{errors.confirmPassword.message}</span>
          )}
        </div>

        <button>Sign Up</button>
      </form>
    </>
  );
}

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema, SignUpInput } from '@/app/lib/signupSchema';
import { signUpWithEmail} from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpForm() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: SignUpInput) => {
    try {
      const result = await signUpWithEmail(data);

      if (result === "email taken") {
        setError('email', {
          type: 'server',
          message: (
            <span>
              This email is already registered. Want to{' '}
              <Link href='/login' className='text-sky-800'>
                log in instead?
              </Link>
            </span>
          ) as unknown as string
        });
        return;
      }

      if (result === 'success') {
        router.push('/todo-list');
      }
    } catch (error) {
      console.error("SignUp failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3 bg-sky-400 px-6 py-10 shadow-lg">
        <h1 className="mb-3 text-2xl text-sky-900">Sign Up</h1>
        <div>
          <label htmlFor="email" className="text-sky-800">Email</label>
          <input {...register("email")} id="email" name="email" type="text" className="rounded-md border border-sky-900 p-2 bg-white w-full text-sky-800" placeholder="Enter your email address" />
          {errors.email && <p className="text-sm text-red-700">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="text-sky-800">Password</label>
          <input {...register("password")} id="password" name="password" type="password" className="rounded-md border border-sky-900 p-2 bg-white w-full text-sky-800" placeholder="Create a password" />
          {errors.password && <p className="text-sm text-red-700">{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="confirm-password" className="text-sky-800">Confirm Password</label>
          <input {...register("confirmPassword")} id="confirm-password" name="confirm-password" type="password" className="rounded-md border border-sky-900 p-2 bg-white w-full text-sky-800" placeholder="Confirm your password" />
          {errors.confirmPassword && <p className="text-sm text-red-700">{errors.confirmPassword.message}</p>}
        </div>
        <div>
          <button type="submit" disabled={isSubmitting} className="w-full rounded-md text-sky-200 bg-sky-900 py-2 mt-2 hover:bg-sky-700">
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </div>
    </form>
  );
}
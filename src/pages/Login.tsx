import React from 'react'
import { login } from '../assets/auth';
import { Link } from 'react-router-dom';
import Form from '../components/Form';

const Login = () => {
  return (
    <Form alt='login' img={login}>
        <form className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full flex flex-col md:gap-6 gap-4">
              <h1 className="mb-4 text-xl font-semibold text-[#252641]">Sign in to your account</h1>
              <div className="space-y-2">
              <label htmlFor="email" className='text-[#252641] sm:text-base text-sm'>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="sm:text-base text-sm focus:outline-none block w-full rounded-full bg-gray-50 border-2 border-[#252641] bg-transparent px-4 py-2 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-[#96fde3]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className='text-[#252641] sm:text-base text-sm'>Password</label>
                <input
                type="password"
                name="pwd"
                id="pwd"
                autoComplete="password"
                className="sm:text-base text-sm focus:outline-none block w-full rounded-full bg-gray-50 border-2 border-[#252641] bg-transparent px-4 py-2 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-[#96fde3]"
              />

              </div>

              <button type="submit" className="my-1 relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 rounded-full bg-[#252641] transition duration-300 hover:scale-105 active:duration-75 active:scale-95">
              <span className="relative md:text-base text-sm text-white font-semibold">Log in</span>
            </button>

              <hr className='md:mt-0 mt-2'/>

              <div className='flex flex-col gap-2'>
                <p>
                  <Link
                    className="text-sm font-medium text-text-[#252641] hover:underline"
                    to="/password-recovery"
                  >
                    Forgot your password?
                  </Link>
                </p>
                <p>
                  <Link
                    className="text-sm font-medium text-text-[#252641] hover:underline"
                    to="/register"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </form>
    </Form>

  )
}

export default Login
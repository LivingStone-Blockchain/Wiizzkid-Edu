import React from 'react'
import { register } from '../assets/auth';
import Form from '../components/Form';
import { Link } from 'react-router-dom';


const Register = () => {
  return (
    <Form alt='register' img={register}>
    <form className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
        <div className="w-full flex flex-col md:gap-7 gap-5">
          <h1 className="mb-4 text-xl font-semibold text-[#252641]">Create account</h1>
          <div className="space-y-2">
          <input
            type="name"
            name="name"
            id="name"
            placeholder='Full Name'
            autoComplete="fullName"
            className="sm:text-base text-sm placeholder:text-sm focus:outline-none block w-full rounded-full bg-gray-50 border-2 border-[#252641] bg-transparent px-4 py-2 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-[#96fde3]"
          />
        </div>
          <div className="space-y-2">
          <input
            type="email"
            name="email"
            id="email"
            placeholder='Email'
            autoComplete="email"
            className="sm:text-base text-sm placeholder:text-sm focus:outline-none block w-full rounded-full bg-gray-50 border-2 border-[#252641] bg-transparent px-4 py-2 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-[#96fde3]"
          />
        </div>
        <div className="space-y-2">
        <input
            type="password"
            name="password"
            id="password"
            placeholder='Password'
            autoComplete="password"
            className="sm:text-base text-sm placeholder:text-sm focus:outline-none block w-full rounded-full bg-gray-50 border-2 border-[#252641] bg-transparent px-4 py-2 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-[#96fde3]"
          />

          </div>
            <div>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder='Confirm Password'
            autoComplete="confirm-password"
            className="sm:text-base text-sm placeholder:text-sm focus:outline-none block w-full rounded-full bg-gray-50 border-2 border-[#252641] bg-transparent px-4 py-2 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-[#96fde3]"
          />
          </div>

          <label htmlFor='agree' className='relative -top-2 pl-1 cursor-pointer'>
                <input type="checkbox"  name="agree" id="agree" className='accent-[#96fde3]' checked/>
                <span className="ml-2 text-sm">
                  I agree to the <span className="underline">privacy policy</span>
                </span>
            </label>

          <button type="submit" className="my-1 relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 rounded-full bg-[#252641] transition duration-300 hover:scale-105 active:duration-75 active:scale-95">
          <span className="relative md:text-base text-sm text-white font-semibold">Register</span>
        </button>

          <hr className='md:mt-0 mt-2'/>

            <p>
                <Link
                  className="text-sm font-medium text-text-[#252641] hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
            </p>
            
        </div>
      </form>
      </Form>
  )
}

export default Register;


/*</Form>
    <Form alt='register' img={register}>
        <form className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
        <div className="w-full space-y-6">
        <h1 className="mb-4 text-xl font-semibold text-[#252641]">Create account</h1>
        <div className="space-y-2">
              <label htmlFor="email" className='text-[#252641]'>Name</label>
              <input
                type="name"
                name="name"
                id="mail"
                autoComplete="username"
                className="focus:outline-none block w-full rounded-full border border-[#252641] bg-transparent px-4 py-2 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-[#96fde3]"
              />
            </div>
              <div className="space-y-2">
              <label htmlFor="email" className='text-[#252641]'>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="username"
                className="focus:outline-none block w-full rounded-full border border-[#252641] bg-transparent px-4 py-2 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-[#96fde3]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className='text-[#252641]'>Password</label>
                <input
                type="password"
                name="pwd"
                id="pwd"
                autoComplete="current-password"
                className="focus:outline-none block w-full rounded-full border border-[#252641] bg-transparent px-4 py-2 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-[#96fde3]"
              />

              </div>

              <div className="space-y-2">
              <label htmlFor="password" className='text-[#252641]'>Confirm Password</label>
                <input
                type="password"
                name="pwd"
                id="pwd"
                autoComplete="current-password"
                className="focus:outline-none block w-full rounded-full border border-[#252641] bg-transparent px-4 py-2 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-[#96fde3]"
              />

              </div>

             
               <label htmlFor='agree'>
                <input type="checkbox"  name="agree" id="agree" className='accent-[#96fde3]'/>
               <span className="ml-2">
                  I agree to the <span className="underline">privacy policy</span>
                </span>
               </label>
            

               <button type="submit" className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 rounded-full bg-[#252641] transition duration-300 hover:scale-105 active:duration-75 active:scale-95">
              <span className="relative text-base text-white font-semibold">Create account</span>
            </button>

              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-text-[#252641] hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
        </form>
    </Form> */
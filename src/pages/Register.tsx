import React, { useContext } from 'react'
import { register } from '../assets/auth';
import { Link } from 'react-router-dom';
import { UserContext, UserContextType } from '../context/user.context'
import { BsCheck, BsQuestionCircle } from 'react-icons/bs';
import {MdCancel } from 'react-icons/md'
import { Form, LoadingToRedirect } from '../components/index';



const Register = () => {
  const { user, registerFormik, isLoading, referralToggle, setReferralToggle } = useContext(UserContext) as UserContextType;

 
  //restrict access to page for logged users
  if (user) {
    return (
      <><LoadingToRedirect /></>
    )
  }


  return (
    <Form alt='register' img={register}>
      <form onSubmit={registerFormik.handleSubmit} className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
        <div className="w-full flex flex-col md:gap-7 gap-5">
          <h1 className="mb-4 text-xl font-semibold text-[#252641]">Create account</h1>
          <div className={`space-y-2 ${registerFormik.touched.full_name && registerFormik.errors.full_name ? '' : 'flex justify-center items-center gap-1'}`}>
            <input
              type="text"
              name="full_name"
              id="full_name"
              placeholder='Full Name'
              autoComplete="full_name"
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
              value={registerFormik.values.full_name}
              className={`text-sm placeholder:text-sm focus:outline-none block ${registerFormik.touched.full_name && !registerFormik.errors.full_name ? 'w-[95%]' : 'w-full'} rounded-full bg-gray-50 border-2 border-[#252641] bg-transparent px-4 py-2 text-gray-600 transition duration-300  focus:ring-2 focus:ring-[#96fde3]`}  
            />
            {registerFormik.touched.full_name && registerFormik.errors.full_name ? (
              <span className='text-xs text-red-600 pl-5'>{registerFormik.errors.full_name}</span>
            ) : registerFormik.touched.full_name && !registerFormik.errors.full_name && <span className='flex justify-center items-center w-5 h-5 text-sm bg-green-50 border rounded-full duration-300 border-green-500 hover:shadow-lg hover:shadow-lime-600/20'><BsCheck className='text-[#252641]' /></span>}

          </div>


          <div className={`space-y-2 ${registerFormik.touched.email && registerFormik.errors.email ? '' : 'flex justify-center items-center gap-1'}`}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder='Email'
              autoComplete="email"
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
              value={registerFormik.values.email}
              className={`text-sm placeholder:text-sm focus:outline-none block ${registerFormik.touched.email && !registerFormik.errors.email ? 'w-[95%]' : 'w-full'} rounded-full bg-gray-50 border-2 border-[#252641] bg-transparent px-4 py-2 text-gray-600 transition duration-300  focus:ring-2 focus:ring-[#96fde3]`} 
            />
            {registerFormik.touched.email && registerFormik.errors.email ? (
              <span className='text-xs text-red-600 pl-5'>{registerFormik.errors.email}</span>
            ) : registerFormik.touched.email && !registerFormik.errors.email && <span className='flex justify-center items-center w-5 h-5 text-sm bg-green-50 border rounded-full duration-300 border-green-500 hover:shadow-lg hover:shadow-lime-600/20'><BsCheck className='text-[#252641]' /></span>}
          </div>
          <div className={`space-y-2 ${registerFormik.touched.password && registerFormik.errors.password ? '' : 'flex justify-center items-center gap-1'}`}>
            <input
              type="password"
              name="password"
              id="password"
              placeholder='Password'
              autoComplete="password"
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
              value={registerFormik.values.password}
              className={`text-sm placeholder:text-sm focus:outline-none block ${registerFormik.touched.password && !registerFormik.errors.password ? 'w-[95%]' : 'w-full'} rounded-full bg-gray-50 border-2 border-[#252641] bg-transparent px-4 py-2 text-gray-600 transition duration-300  focus:ring-2 focus:ring-[#96fde3]`} 
            />
            {registerFormik.touched.password && registerFormik.errors.password ? (
              <span className='text-xs text-red-600 pl-5'>{registerFormik.errors.password}</span>
            ) : registerFormik.touched.password && !registerFormik.errors.password && <span className='flex justify-center items-center w-5 h-5 text-sm bg-green-50 border rounded-full duration-300 border-green-500 hover:shadow-lg hover:shadow-lime-600/20'><BsCheck className='text-[#252641]' /></span>}
          </div>
          <div className={`space-y-2 ${registerFormik.touched.confirmPassword && registerFormik.errors.confirmPassword ? '' : 'flex justify-center items-center gap-1'}`}>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder='Confirm Password'
              autoComplete="confirmPassword"
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
              value={registerFormik.values.confirmPassword}
              className={`text-sm placeholder:text-sm focus:outline-none block ${registerFormik.touched.confirmPassword && !registerFormik.errors.confirmPassword ? 'w-[95%]' : 'w-full'} rounded-full bg-gray-50 border-2 border-[#252641] bg-transparent px-4 py-2 text-gray-600 transition duration-300  focus:ring-2 focus:ring-[#96fde3]`} 
            />
           {registerFormik.touched.confirmPassword && registerFormik.errors.confirmPassword ? (
              <span className='text-xs text-red-600 pl-5'>{registerFormik.errors.confirmPassword}</span>
            ) : registerFormik.touched.confirmPassword && !registerFormik.errors.confirmPassword && <span className='flex justify-center items-center w-5 h-5 text-sm bg-green-50 border rounded-full duration-300 border-green-500 hover:shadow-lg hover:shadow-lime-600/20'><BsCheck className='text-[#252641]' /></span>}
          </div>
          <div className="relative pl-1 cursor-pointer md:w-1/2 w-[90%]">
            {referralToggle ? (
                 <div className={`space-y-2 transition duration-300 ${referralToggle ? 'block' : 'hidden'}`}>
                 <input
                   type="text"
                   name="referral"
                   id="referral"
                   placeholder='Referral Code'
                   autoComplete="referral"
                   onChange={registerFormik.handleChange}
                   onBlur={registerFormik.handleBlur}
                   value={registerFormik.values.referral}
                   className="text-sm placeholder:text-sm focus:outline-none block w-full rounded-full bg-gray-50 border-2 border-[#252641] bg-transparent px-4 py-2 text-gray-600 transition duration-300  focus:ring-2 focus:ring-[#96fde3]"
                 />     
                {referralToggle &&  <MdCancel className={`absolute -right-8 text-[#252641 ${registerFormik.errors.referral ? 'bottom-9' : 'bottom-3'}`}  onClick={() => setReferralToggle(false)} />}
                {registerFormik.touched.referral && registerFormik.errors.referral ? (
                <span className='text-xs text-red-600 pl-5'>{registerFormik.errors.referral}</span>
            ) : null}
               </div>
            ) : (
              <div className='flex justify-start items-center gap-1  text-text-[#252641] text-sm'  onClick={() => setReferralToggle(!referralToggle)}><span>Referral Code</span><BsQuestionCircle /></div>
            )}
          </div>

          <label htmlFor='acceptTerms' className='relative -top-2 pl-1 cursor-pointer'>
            <input
               name="acceptTerms"
               id="acceptTerms"
               className='accent-[#96fde3]'
               checked
              type="checkbox"
              readOnly
            />
            <span className="ml-2 text-sm">I agree to the <span className="underline">privacy policy</span></span>
          </label>
          <button type="submit" className={`my-1 relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 rounded-full ${isLoading ? "cursor-not-allowed bg-[#37385e]" : "cursor-pointer transition duration-300 hover:scale-105 active:duration-75 active:scale-95 bg-[#252641]"}`}>
            {isLoading && (<svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>)}
            <span className={`relative md:text-base text-s font-semibold ${isLoading ? " text-gray-200" : " text-white"}`}>{isLoading ? "Processing" : "Register"}</span>
          </button>

          <hr className='md:mt-0 mt-2' />
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


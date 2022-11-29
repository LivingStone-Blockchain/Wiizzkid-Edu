import React, { useContext } from 'react'
import { FiCheck } from 'react-icons/fi';
import Button from '../components/Button';
import { Banner } from './../components/index';
import { useNavigate } from 'react-router-dom';
import { UserContext, UserContextType } from '../context/user.context';


const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as UserContextType;

  const handleDashboardRouting = () => {
    if (!user) {
      return navigate('/login');
    }

    navigate('/dashboard')
  }


  return (
    <>
    <Banner 
      title='Pricing'
    />
    <div className="xl:container m-auto px-6 md:py-20 py-14 md:px-12 lg:px-20">
      <div className="m-auto text-center lg:w-7/12">
      <h1 className="font-bold text-darken my-3 md:text-3xl text-2xl">Pricing <span className="text-yellow-500">Table.</span></h1>
	    <p className="leading-relaxed text-gray-500 lg:text-base text-sm">A Wiizzkid subscription gives you access to our quizzes and games</p>
      </div>
      <div className="mt-12 grid items-center gap-6 md:grid-cols-2 lg:flex lg:space-x-8">
      <div className="group relative md:col-span-1 lg:w-[32%]">
      <div
        aria-hidden="true"
        className="absolute top-0 h-full w-full rounded-xl border border-gray-200  bg-white  shadow-2xl shadow-gray-600/10  transition duration-500 group-hover:scale-105 lg:group-hover:scale-110"
      ></div>
      <div className="relative space-y-8 p-8">
        <h3 className="text-center md:text-2xl text-xl font-semibold text-gray-700 ">Beijing</h3>
        <div className="relative flex justify-around">
          <div className="flex">
            <span className="-ml-6 mt-2 text-2xl font-bold text-[#37b9b2]">$</span>
            <span className="leading-0 text-7xl font-bold text-darken">5</span>
          </div>
         
        </div>
        <ul role="list" className="m-auto w-max space-y-4 pb-6 text-gray-600 dark:text-gray-300">
          <li className="space-x-2">
            <FiCheck className="font-light text-[#37b9b2] inline"/>
            <span className='text-gray-500 lg:text-base text-sm'>Two players</span>
          </li>
          <li className="space-x-2">
             <FiCheck className="font-light text-[#37b9b2] inline"/>
            <span className='text-gray-500 lg:text-base text-sm'>Medium level</span>
          </li>
          <li className="space-x-2">
             <FiCheck className="font-light text-[#37b9b2] inline"/>
            <span className='text-gray-500 lg:text-base text-sm'>Play with friends</span>
          </li>
          <li className="space-x-2">
             <FiCheck className="font-light text-[#37b9b2] inline"/>
            <span className='text-gray-500 lg:text-base text-sm'>Earn stones</span>
          </li>
        </ul>
        <Button 
            onClick={handleDashboardRouting}
            children='Start plan'
            className='relative flex h-11 w-full items-center justify-center px-6 py-6 before:absolute before:inset-0 text-white bg-[#252641] transition duration-300 hover:scale-105 active:duration-75 active:scale-95'
        />
      </div>
    </div>

    <div className="group relative row-start-1 md:col-span-2 lg:w-[36%]">
      <div
        aria-hidden="true"
        className="absolute top-0 h-full w-full rounded-xl border border-gray-200  bg-white  shadow-2xl shadow-gray-600/10  transition duration-500 group-hover:scale-105 lg:group-hover:scale-110"
      ></div>
      <div className="relative space-y-8 p-8">
        <h3 className="text-center md:text-2xl text-xl font-semibold text-gray-700 ">Shanghai</h3>
        <div className="overflow-hidden">
        <div className="relative flex justify-around">
          <div className="flex">
            <span className="-ml-6 mt-2 text-2xl font-bold text-[#37b9b2]">$</span>
            <span className="leading-0 text-7xl font-bold text-darken">10</span>
          </div>
         
        </div>
          <div className="text-center text-xl font-medium">
            <span className="text-gray-400 line-through">$15</span>
          </div>
        
          <span
            className="m-auto mt-4 block w-max rounded-full bg-gradient-to-r from-yellow-300 to-pink-300 px-4 py-1 text-sm font-medium text-yellow-900"
            >1 Discount applied</span
          >
        </div>
        <ul role="list" className="m-auto w-max space-y-4 pb-6 text-gray-600 dark:text-gray-300">
          <li className="space-x-2">
             <FiCheck className="font-light text-[#37b9b2] inline"/>
            <span className='text-gray-500 lg:text-base text-sm'>Multiplayer</span>
          </li>
          <li className="space-x-2">
             <FiCheck className="font-light text-[#37b9b2] inline"/>
            <span className='text-gray-500 lg:text-base text-sm'>Advanced level</span>
          </li>
          <li className="space-x-2">
             <FiCheck className="font-light text-[#37b9b2] inline"/>
            <span className='text-gray-500 lg:text-base text-sm'>Play with the best</span>
          </li>
          <li className="space-x-2">
             <FiCheck className="font-light text-[#37b9b2] inline"/>
            <span className='text-gray-500 lg:text-base text-sm'>Earn as a group</span>
          </li>
        </ul>
        <Button 
             onClick={handleDashboardRouting}
            children='Start plan'
            className='relative flex h-11 w-full items-center  justify-center px-6 py-6 before:absolute before:inset-0 text-white bg-[#252641] transition duration-300 hover:scale-105 active:duration-75 active:scale-95'
        />
      </div>
    </div>

    <div className="group relative md:col-span-1 lg:w-[32%]">
      <div
        aria-hidden="true"
        className="absolute top-0 h-full w-full rounded-xl border border-gray-200  bg-white  shadow-2xl shadow-gray-600/10  transition duration-500 group-hover:scale-105 lg:group-hover:scale-110"
      ></div>
      <div className="relative space-y-8 p-8">
        <h3 className="text-center md:text-2xl text-xl font-semibold text-gray-700 ">Free</h3>
        <div className="relative flex justify-around">
          <div className="flex">
            <span className="-ml-2 mt-2 text-2xl font-bold text-[#37b9b2]">$</span>
            <span className="leading-0 text-7xl font-bold text-darken">0</span>
          </div>
        </div>
        <ul role="list" className="m-auto w-max space-y-4 pb-6 text-gray-600 dark:text-gray-300">
          <li className="space-x-2">
             <FiCheck className="font-light text-[#37b9b2] inline"/>
            <span className='text-gray-500 lg:text-base text-sm'>Single player</span>
          </li>
          <li className="space-x-2">
             <FiCheck className="font-light text-[#37b9b2] inline"/>
            <span className='text-gray-500 lg:text-base text-sm'>Basic level</span>
          </li>
          <li className="space-x-2">
             <FiCheck className="font-light text-[#37b9b2] inline"/>
            <span className='text-gray-500 lg:text-base text-sm'>Practice mode</span>
          </li>
          <li className="space-x-2">
             <FiCheck className="font-light text-[#37b9b2] inline"/>
            <span className='text-gray-500 lg:text-base text-sm'>unlimited access</span>
          </li>
        </ul>
        <Button 
            children='Get started'
            className='relative flex h-11 w-full items-center justify-center px-6 py-6 before:absolute before:inset-0 font-semibold border-2 border-[#252641] text-[#252641] transition duration-300 hover:scale-105 active:duration-75 active:scale-95'
        />
      </div>
    </div>
  </div>
  
</div>
</>
  )
}

export default Pricing;
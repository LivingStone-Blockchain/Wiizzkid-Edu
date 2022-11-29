import React, {FC  } from 'react';
import { FaHome } from 'react-icons/fa';{ }
import { useNavigate } from 'react-router-dom';

type FormPropType = {
    img: string,
    children: React.ReactNode,
    alt: string
}

const Form:  FC<FormPropType> = ({img, alt, children}) => {
  const navigate = useNavigate();

  return (
    <div data-aos="fade-up" data-aos-once="true" data-aos-delay="500" className="flex lg:items-center items:start min-h-screen p-6 bg-gray-50">
     <p className='absolute md:top-10 top-7 left-6 right-0 mx-auto text-[242561] flex gap-1 md:text-base text-sm self-start justify-self-start'>
        <span className='flex items-center justify-center px-1 font-medium'>{'<'}</span>
          <span className='text-xl cursor-pointer flex items-center justify-center hover:text-[#25263b]' onClick={() => navigate('/')}><FaHome title='home' /></span>
      </p>
    <div className="relative lg:top-0 sm:top-20 top-16 flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
      <div className="flex flex-col overflow-y-auto md:flex-row">
        <div className="h-32 md:h-auto md:w-1/2">
          <img
            aria-hidden="true"
            loading='lazy'
            className="object-cover w-full h-full"
            src={img}
            alt={alt}
          />
        </div>
        {children}
      </div>
    </div>
  </div>
  )
}

export default Form;
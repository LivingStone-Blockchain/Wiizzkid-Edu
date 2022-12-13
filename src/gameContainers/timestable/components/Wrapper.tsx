import React, { FC } from 'react'

type WrapperPropType =  {
    children: React.ReactNode
}

const Wrapper: FC<WrapperPropType> = ({ children }) => {
  return (
    <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5 py-5">
        <div data-aos="fade-up" data-aos-delay="200" data-aos-once="true" className= "w-full mx-auto rounded-xl bg-gray-300 shadow-xl space-y-1 text-gray-800 relative overflow-hidden lg:max-w-[550px] md:max-w-[75%] max-w-[95%]" >
            {children}
        </div>
    </div>
  )
}

export default Wrapper;
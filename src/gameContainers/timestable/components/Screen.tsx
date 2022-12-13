import React, { FC } from 'react'


type ScreenProp = {
  value: number | string | undefined,
  className: string,
  children?: React.ReactNode,
  timer?: boolean,
}

const Screen: FC<ScreenProp> = ({ value, className, children, timer }) => {
  return (
    <div className={`${className} "w-full h-24 flex items-end rounded-lg relative`}>
      <div className={`${timer && 'flex justify-between items-center -my-3'} w-full py-5 px-6 md:text-5xl text-4xl text-white font-light`}>
        <span className='md:text-2xl text-xl font-normal'>{children}</span>
        <span>{value}</span>
      </div>
    </div>
  )
}

export default Screen;
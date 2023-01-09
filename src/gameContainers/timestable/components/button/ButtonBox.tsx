import React, { FC } from 'react'


type BoxProp = {
    children: React.ReactNode,
}

const ButtonBox: FC<BoxProp> = ({ children }) => {
  return (
        <div className="grid grid-cols-3 grid-rows-4 gap-[1px] place-items-center w-full">{children}</div>
  )
}

export default ButtonBox;
import React, {FC  } from 'react'

type FormPropType = {
    img: string,
    children: React.ReactNode,
    alt: string
}

const Form:  FC<FormPropType> = ({img, alt, children}) => {
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50">
    <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
      <div className="flex flex-col overflow-y-auto md:flex-row">
        <div className="h-32 md:h-auto md:w-1/2">
          <img
            aria-hidden="true"
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
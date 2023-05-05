import React, { useRef, useState, FC } from 'react'
import {FiChevronUp} from 'react-icons/fi'
import { faqData } from './components/faqData'





const FAQ = () => {
  const [active, setActive] = useState<number | null>(null)
  const contentSpace = useRef<HTMLDivElement>(null!)


  const toggleAccordion = (id: number) => {
    setActive(id === active ? null : id)
    }


  return (
    <div className="mt-24">
    <div data-aos="fade-up" className="text-center max-w-screen-lg mx-auto mb-8">
      <h1 className="md:text-3xl text-2xl font-bold mb-4 text-navy">Wiizzkid <span className="text-tomato">FAQs</span></h1>
      <p className="text-gray-500 md:text-base text-sm leading-relaxed">We answer some questions that are commonly asked in the Wiizzkid community.</p>
    </div>
    {faqData.map(({id, title, content}) => (
      <div className="flex flex-col gap-4">
      <button
        className="py-6 box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between bg-navy rounded-xl lg:px-6 px-4"
        onClick={() => toggleAccordion(id)}
      >
        <p className="inline-block lg:font-semibold font-medium text-white text-left">{title}</p>
        <p className='flex items-center justify-center p-2 bg-navyLight rounded-lg'><FiChevronUp className={`${active !== id ? 'transform duration-700 ease' : 'transform duration-700 ease rotate-180'} inline-block text-white font-bold`} /></p>
      </button>
      <div
        ref={contentSpace}
        style={{ maxHeight: active !== id ? '0px' : `${contentSpace?.current!.scrollHeight}px` }}
        className={`overflow-auto transition-max-height duration-700 ease-in-out scrollbar-hide`}
      >
        <div className="text-gray-500 md:text-base text-sm leading-relaxed lg:px-6 px-4 pb-8">{content}</div>
      </div>
    </div>
    ))}
    </div>
  )
}

export default FAQ;
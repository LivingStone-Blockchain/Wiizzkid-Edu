import React from 'react';
import { Banner } from '../components';


const Roadmap = () => {
  return (
    <>
    <Banner 
        title='Roadmap'
    />
    <section className="bg-white mx-auto w-full h-full my-12 rounded-lg pb-2 shadow-2xl">
  <div className="relative wrap overflow-hidden p-5 h-full">
    <div className="absolute border-opacity-20 border-gray-700 h-full border sm:left-1/2 left-10"></div>
    <div className="mb-4 flex justify-between items-center w-full">
      <div className="order-1 sm:w-5/12 hidden sm:block"></div>
      <div
        className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-10 h-10 rounded-full border-4 border-indigo-400">
        <h1 className="mx-auto font-semibold text-lg text-white">1</h1>
      </div>
      <div className="order-1 bg-gray-400 rounded-lg shadow-xl sm:w-5/12 w-10/12">
        <h3 className="w-full mb-3 font-bold text-gray-100 bg-gray-800 p-4 text-xl sm:text-lg">

          BUX Zero integration (Q3/Q4 2021)
        </h3>
        <p className="text-sm leading-snug tracking-wide text-gray-900 p-4 text-opacity-100">BUX Zero users will be able to
          create a uniquely diversified portfolio of all popular stocks, ETFs and cryptos all from one app.</p>
      </div>
    </div>
    <div className="mb-4 flex justify-between sm:flex-row-reverse items-center w-full">
      <div className="order-1 w-5/12 hidden sm:block "></div>
      <div
        className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-10 h-10 rounded-full border-4 border-indigo-400">
        <h1 className="mx-auto text-white font-semibold text-lg">2</h1>
      </div>
      <div className="order-1 bg-gray-400 rounded-lg shadow-xl sm:w-5/12 w-10/12">
        <h3 className="w-full mb-3 font-bold text-gray-100 bg-gray-800 p-4 text-xl sm:text-lg">

          New crypto listings (Q3/Q4 2021)</h3>
        <p className="text-sm leading-snug tracking-wide text-gray-900 p-4 text-opacity-100">Since the crypto boom earlier
          this year, we’ve had lots of requests from our users and community members to add more crypto assets. In the
          past month we’ve already listed five new crypto assets. And in the coming six months we are planning to add a
          lot more! Keep an eye on our social media channels to see the latest listings.</p>
      </div>
    </div>
    <div className="mb-4 flex justify-between items-center w-full">
      <div className="order-1 w-5/12 hidden sm:block"></div>
      <div
        className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-10 h-10 rounded-full  border-4 border-indigo-400">
        <h1 className="mx-auto font-semibold text-lg text-white">3</h1>
      </div>
      <div className="order-1 bg-gray-400 rounded-lg shadow-xl sm:w-5/12 w-10/12">
        <h3 className="w-full mb-3 font-bold text-gray-100 bg-gray-800 p-4 text-xl sm:text-lg">

          Limit orders (Q3/Q4 2021)</h3>
        <p className="text-sm leading-snug tracking-wide text-gray-900 p-4 text-opacity-100">The BUX Crypto platform
          currently supports market orders. A market order allows you to make an instant trade, executed at the current
          market price. The market order offers convenience for some users but lacks the flexibility that others would
          like to have. For this reason, we want to introduce limit orders in this quarter. .</p>
      </div>
    </div>
    <div className="mb-4 flex justify-between sm:flex-row-reverse items-center w-full ">
      <div className="order-1 w-5/12 hidden sm:block"></div>
      <div
        className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-10 h-10 rounded-full border-4 border-indigo-400">
        <h1 className="mx-auto text-white font-semibold text-lg">4</h1>
      </div>
      <div className="order-1 bg-gray-400 rounded-lg shadow-xl sm:w-5/12 w-10/12">
        <h3 className="w-full mb-3 font-bold text-gray-100 bg-gray-800 p-4 text-xl sm:text-lg">

          Crypto deposits and withdrawals (Q3/Q4 2021)</h3>
        <p className="text-sm leading-snug tracking-wide text-gray-900 p-4 text-opacity-100">As a result of the recent
          developments regarding the Bitonic and DNB court case, the new requirements from the DNB are becoming clearer.
          We aim to open up crypto deposits and withdrawals by the end of September. </p>
      </div>
    </div>
  </div>
</section>

    </>
  )
}

export default Roadmap
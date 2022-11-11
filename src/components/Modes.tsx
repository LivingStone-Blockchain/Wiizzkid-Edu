import React from 'react'
import { HiUser, HiUsers, HiUserGroup } from 'react-icons/hi';
const Modes = () => {
  return (
    <>
        <div data-aos="flip-up" className="max-w-xl mx-auto text-center mt-24">
			<h1 className="font-bold text-darken my-3 md:text-3xl text-2xl">All-In-One <span className="text-yellow-500">Learning Space.</span></h1>
			<p className="leading-relaxed text-gray-500 lg:text-base text-sm">The possibilities are beyond your imagination. Explore the library.</p>
		</div>
		<div className="grid md:grid-cols-3 gap-14 md:gap-5 mt-20">
			<div data-aos="fade-up" className="bg-white shadow-xl p-6 text-center rounded-xl border border-gray-200 duration-300 hover:border-[#5b72ee] hover:shadow-lg hover:shadow-blue-600/20">
				<div className="bg-[#5b72ee] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12"><HiUser className="h-auto w-full max-w-[27px]" /></div>
				<h1 className="font-medium md:text-xl text-lg mb-3 lg:px-14 text-darken">Single Player</h1>
				<p className="px-4 text-gray-500 md:text-base text-sm">Learning becomes a lot easier when you have fun practicing and sharpening your skills.</p>
			</div>
			<div data-aos="fade-up" data-aos-delay="150" className="bg-white shadow-xl p-6 text-center rounded-xl border border-gray-200 duration-300 hover:border-[#ff3939] hover:shadow-lg hover:shadow-red-600/20">
				<div className="bg-[#FF3939] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12"><HiUsers className="h-auto w-full max-w-[27px]"/></div>
				<h1 className="font-medium md:text-xl text-lg  mb-3 lg:px-14 text-darken">Two Players</h1>
				<p className="px-4 text-gray-500 md:text-base text-sm">Play with another player to earn some crypto coins. You will need speed, knowledge and accuracy to win this contest.</p>
			</div>

            <div data-aos="fade-up" data-aos-delay="300" className="bg-white shadow-xl p-6 text-center rounded-xl border border-gray-200 duration-300 hover:border-[#37b9b2] hover:shadow-lg hover:shadow-cyan-600/20">
				<div className="bg-[#37b9b2] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12"><HiUserGroup className="h-auto w-full max-w-[27px]"/></div>
				<h1 className="font-medium md:text-xl text-lg  mb-3 lg:px-14 text-darken">Multiple Players</h1>
				<p className="px-4 text-gray-500 md:text-base text-sm">Play with a group of friends/class to win the challenge. The team with the highest average would win and collect the crypto coins.</p>
			</div>
		</div>
    </>
  )
}

export default Modes
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { kids, kidsPlaceholder, girlNavy, girlNavyPlaceholder } from '../assets/about'

const About = () => {
  return (
    <div className="mt-24">
			<div data-aos="flip-down" className="text-center max-w-screen-lg mx-auto">
				<h1 className="md:text-3xl text-2xl font-bold mb-4">Who are <span className="text-yellow-500">The Wiizzkids?</span></h1>
				<p className="text-gray-500 md:text-base text-sm">We want to change the methodologies of teaching across the world using the blockchain technology while kids learn in a fun and exiting way. Each student would collect coins at the end of each challenge and which can be converted to money. The parents of each child can then use the funds to buy educational materials or book a holiday for the child.</p>
			</div>
			<div data-aos="fade-up" className="flex flex-col md:flex-row justify-center space-y-5 md:space-y-0 md:space-x-6 lg:space-x-10 mt-8">
				<div className="relative md:w-5/12">
					<LazyLoadImage 
						src={kids} 
						placeholderSrc={kidsPlaceholder}
						effect="blur"
						alt="kids-learn"
						className="rounded-2xl w-full"
					/>
					<div className="absolute bg-black bg-opacity-20 bottom-0 left-0 right-0 w-full h-full rounded-2xl">
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<h1 className="uppercase text-white font-bold text-center text-sm lg:text-xl mb-3">FUN LEARNING</h1>
							<button className="rounded-full text-white border text-xs lg:text-md px-6 py-3 w-full font-medium focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out">Try our timestable</button>
						</div>
					</div>
				</div>
				<div className="relative md:w-5/12">
				<LazyLoadImage 
						src={girlNavy} 
						placeholderSrc={girlNavyPlaceholder}
						effect="blur"
						alt="teen in library"
						className="rounded-2xl w-full"
					/>
					<div className="absolute bg-black bg-opacity-20 bottom-0 left-0 right-0 w-full h-full rounded-2xl">
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<h1 className="uppercase text-white font-bold text-center text-sm lg:text-xl mb-3">SKILLS BUILDING</h1>
							<button className="rounded-full text-white text-xs lg:text-sm px-6 py-3 w-full font-medium focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out bg-[#37b9b2]">Start a quiz today</button>
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}

export default About
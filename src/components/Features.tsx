import React from 'react'
import { duo, single, multi, graduate } from '../assets/mode';
import { Link } from 'react-router-dom';

const Features = () => {
  return (

  <div className="m-auto text-gray-500">
    <div data-aos="flip-up" className="max-w-xl mx-auto text-center mt-24">
			<h1 className="font-bold text-darken my-3 md:text-3xl text-2xl">All-In-One <span className="text-yellow-500">Learning Space.</span></h1>
			<p className="leading-relaxed text-gray-500 lg:text-base text-sm">The possibilities are beyond your imagination. Explore the library.</p>
		</div>
    <div data-aos="fade-up" data-aos-delay="100" 
      className="mt-16 grid divide-x divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4"
    >
      <div className="group relative bg-white transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 hover:bg-[#ffedef]">
        <div className="relative space-y-8 py-12 p-8">
          <img
            src={single}
            className="w-14"
            width="512"
            height="512"
            alt="burger illustration"
          />

          <div className="space-y-2">
            <h5
              className="font-medium text-gray-700 transition group-hover:text-primary md:text-xl text-lg text-darken"
            >
              Single player
            </h5>
            <p className="text-gray-500 md:text-base text-sm leading-relaxed">
              Learning becomes a lot easier when you have fun practicing and sharpening your skills.
            </p>
          </div>
        </div>
      </div>
      <div className="group relative bg-white transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 hover:bg-[#fff2e1]">
        <div className="relative space-y-8 py-12 p-8">
          <img
            src={duo}
            className="w-14"
            width="512"
            height="512"
            alt="burger illustration"
          />

          <div className="space-y-2">
            <h5
              className="font-medium md:text-xl text-lg mb-3  text-darken transition group-hover:text-primary"
            >
              Two players
            </h5>
            <p className="text-gray-500 md:text-base text-sm leading-relaxed">
            Play with another player to earn some crypto coins. You will need speed, knowledge and accuracy to win.
            </p>
          </div>
        </div>
      </div>
      <div className="group relative bg-white transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 hover:bg-[#e5fbfa]">
        <div className="relative space-y-8 py-12 p-8">
          <img
            src={multi}
            className="w-14"
            width="512"
            height="512"
            alt="burger illustration"
          />

          <div className="space-y-2">
            <h5
              className="font-medium md:text-xl text-lg mb-3 text-darken transition group-hover:text-primary"
            >
              Multiple players
            </h5>
            <p className="text-gray-500 md:text-base text-sm leading-relaxed">
            Play with a group of friends/class to win the challenge. The team with the highest average wins.
            </p>
          </div>
          
        </div>
      </div>
      <div
        className="group relative bg-gray-50 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10"
      >
        <div
          className="relative space-y-8 py-12 p-8 transition duration-300 group-hover:bg-white"
        >
          <img
             src={graduate}
            className="w-14"
            width="512"
            height="512"
            alt="burger illustration"
          />

          <div className="space-y-2">
            <h5
              className="font-medium md:text-xl text-lg mb-3 text-darken transition group-hover:text-primary"
            >
              More on Wiizzkids
            </h5>
            <p className="text-gray-500 md:text-base text-sm leading-relaxed">
              Take a deeper dive into the Wiizzkid universe and learn more about the platform.
            </p>
          </div>
          <Link to="/about" className="flex items-center justify-between group-hover:text-text-darken">
            <span className="sm:text-sm text-xs ">Read more</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>                
          </Link>
        </div>
      </div>
    </div>
  </div>

  )
}

export default Features;
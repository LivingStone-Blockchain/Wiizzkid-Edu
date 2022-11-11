import React from 'react'
import { quizNews, vrNews, crypto, study } from '../assets/blog';


const Blog = () => {
    
  return (
    <div>
        <div data-aos="zoom-in" className="mt-24 text-center">
            <h1 className="text-darken md:text-3xl text-2xl font-semibold">Wiizzkid <span className="text-yellow-500">Blog</span></h1>
            <p className="text-gray-500 my-5 lg:text-base text-sm">Stay ahead with our latest blog posts.</p>
        </div>
        <div data-aos="zoom-in-up" className="my-14 flex flex-col lg:flex-row lg:space-x-20">
            <div className="lg:w-6/12 hover:bg-[#eee]">
                <img className="w-full rounded-xl mb-6" src={quizNews} />
                <span className="bg-yellow-300 text-darken font-semibold px-4 py-px text-sm rounded-full">Latest</span>
                <h1 className="text-gray-800 font-semibold my-3 sm:text-xl text-lg">Trivia Virtual Quizzes with friends</h1>
                <p className="text-gray-500 mb-3 text-base">Wiizkid Education is creating a fun new way to to learn and earn alongside your friends virtually online, anywhere, anytime...</p>
                <a href="" className="underline text-base">Read more</a>
            </div>
        <div className="lg:w-7/12 flex flex-col justify-between mt-12 space-y-5 lg:space-y-0 lg:mt-0">
            <div className="flex space-x-5 hover:bg-[#eee]">
                <div className="w-4/12">
                    <div className="relative">
                        <img className="rounded-xl w-full" src={crypto} />
                        <span className="absolute bottom-2 right-2 bg-yellow-300 text-darken font-semibold px-4 py-px text-xs rounded-full hidden sm:block">Token</span>
                    </div>
                </div>
                <div className="w-8/12">
                    <h1 className="text-gray-800 text-base sm:text-lg font-semibold">What is the Stone token and how do we use it?</h1>
                    <p className="text-gray-500 my-2 sm:my-4 text-sm sm:text-base">Wiizzkid Education is a token-based educational empowerment platorm set to launch it's native...</p>
                </div>
            </div>
            <div className="flex space-x-5  hover:bg-[#eee]">
                <div className="w-4/12">
                    <div className="relative">
                        <img className="rounded-xl w-full" src={vrNews} />
                        <span className="absolute bottom-2 right-2 bg-yellow-300 text-darken font-semibold px-4 py-px text-xs rounded-full hidden sm:block">VR</span>
                    </div>
                </div>
                <div className="w-8/12">
                    <h1 className="text-gray-800 text-base sm:text-lg font-semibold">Virtual Reality in Education: Benefits, Tools, and Resources</h1>
                    <p className="text-gray-500 my-2 sm:my-4 text-sm sm:text-base">Virtual reality can improve education by providing students with memorable and immersive experiences that would otherwise not be possible. What's more, it can ...</p>
                </div>
            </div>
            <div className="flex space-x-5 hover:bg-[#eee]">
                <div className="w-4/12">
                    <div className="relative">
                        <img className="rounded-xl w-full" src={study} />
                        <span className="absolute bottom-2 right-2 bg-yellow-300 text-darken font-semibold px-4 py-px text-xs rounded-full hidden sm:block">Quiz</span>
                    </div>
                </div>
                <div className="w-8/12">
                    <h1 className="text-gray-800 text-base sm:text-lg font-semibold">Elementary school high-flyers making the most of the opportunity</h1>
                    <p className="text-gray-500 my-2 sm:my-4 text-sm sm:text-base">Play our classic quizzes, anywhere, anytime & fight your way to the top of the leaderboard ...</p>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Blog;
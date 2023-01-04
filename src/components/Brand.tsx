import React from 'react';
import Marquee from "react-fast-marquee";
import { google, slack, atlassian, paypal, dropbox, metamask } from "../assets/brands/index";


const Brand = () => {
  return (
	<div className='flex flex-col gap-2  justify-center'>
		<h1 className="text-center mb-3 text-gray-500 font-medium">Our tools</h1>
	 	
		{window.innerWidth > 1023 ? (
			<div className="space-x-8 lg:space-x-6 flex justify-center">
			<a aria-label="add to slack" href="#" className="p-4 border border-gray-200  rounded-full duration-300 hover:border-green-400 hover:shadow-lg hover:shadow-lime-600/20">
				<div className="flex justify-center space-x-4">
					<img className="w-6 h-6" src={google} alt="google logo" loading="lazy" width="128" height="128" />
					<span className="hidden font-medium md:block text-navy">Google</span>
				</div>
			</a>    
			<a aria-label="add to chat" href="#" className="p-4 border border-gray-200 rounded-full duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-600/20">
				<div className="flex justify-center space-x-4">
					<img className="w-6 h-6" src={slack} alt="slack logo" loading="lazy" width="128" height="128" />
					<span className="hidden font-medium md:block text-navy">Slack</span>
				</div>
			</a>   
			<a aria-label="add to zoom" href="#" className="p-4 border border-gray-200 rounded-full duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-600/20">
				<div className="flex justify-center space-x-4">
					<img className="w-6 h-6" src={atlassian} alt="atlassian logo" loading="lazy" width="128" height="128" />
					<span className="hidden font-medium md:block text-navy">Atlassian</span>
				</div>
			</a>    
			<a aria-label="add to zoom" href="#" className="p-4 border border-gray-200 rounded-full duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-600/20">
				<div className="flex justify-center space-x-4">
					<img className="w-6 h-6" src={dropbox} alt="dropbox logo" loading="lazy" width="128" height="128" />
					<span className="hidden font-medium md:block text-navy">Dropbox</span>
				</div>
			</a>    
			<a aria-label="add to zoom" href="#" className="p-4 border border-gray-200 rounded-full duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-600/20">
				<div className="flex justify-center space-x-4">
					<img className="w-6 h-6" src={paypal} alt="paypal logo" loading="lazy" width="128" height="128" />
					<span className="hidden font-medium md:block text-navy">Paypal</span>
				</div>
			</a>    
			<a aria-label="add to zoom" href="#" className="p-4 border border-gray-200 rounded-full duration-300 hover:border-[#f6851b] hover:shadow-lg hover:shadow-orange-600/20">
				<div className="flex justify-center space-x-4">
					<img className="w-6 h-6" src={metamask} alt="metamask logo" loading="lazy" width="128" height="128" />
					<span className="hidden font-medium md:block text-navy">Metamask</span>
				</div>
			</a>  
			</div>
		) : (
			<Marquee play pauseOnHover pauseOnClick direction='right' speed={35} delay={1} loop={0}>
			<div className="space-x-8 lg:space-x-6 flex justify-center px-4">
					   <a aria-label="add to slack" href="#" className="p-4 border border-gray-200  rounded-full duration-300 hover:border-green-400 hover:shadow-lg hover:shadow-lime-600/20">
						   <div className="flex justify-center space-x-4">
							   <img className="w-6 h-6" src={google} alt="google logo" loading="lazy" width="128" height="128" />
							   <span className="hidden font-medium md:block">Google</span>
						   </div>
					   </a>    
					   <a aria-label="add to chat" href="#" className="p-4 border border-gray-200 rounded-full duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-600/20">
						   <div className="flex justify-center space-x-4">
							   <img className="w-6 h-6" src={slack} alt="slack logo" loading="lazy" width="128" height="128" />
							   <span className="hidden font-medium md:block">Slack</span>
						   </div>
					   </a>   
					   <a aria-label="add to zoom" href="#" className="p-4 border border-gray-200 rounded-full duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-600/20">
						   <div className="flex justify-center space-x-4">
							   <img className="w-6 h-6" src={atlassian} alt="atlassian logo" loading="lazy" width="128" height="128" />
							   <span className="hidden font-medium md:block">Atlassian</span>
						   </div>
					   </a>    
					   <a aria-label="add to zoom" href="#" className="p-4 border border-gray-200 rounded-full duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-600/20">
						   <div className="flex justify-center space-x-4">
							   <img className="w-6 h-6" src={dropbox} alt="dropbox logo" loading="lazy" width="128" height="128" />
							   <span className="hidden font-medium md:block">Dropbox</span>
						   </div>
					   </a>    
					   <a aria-label="add to zoom" href="#" className="p-4 border border-gray-200 rounded-full duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-600/20">
						   <div className="flex justify-center space-x-4">
							   <img className="w-6 h-6" src={paypal} alt="paypal logo" loading="lazy" width="128" height="128" />
							   <span className="hidden font-medium md:block">Paypal</span>
						   </div>
					   </a>    
					   <a aria-label="add to zoom" href="#" className="p-4 border border-gray-200 rounded-full duration-300 hover:border-[#f6851b] hover:shadow-lg hover:shadow-orange-600/20">
						   <div className="flex justify-center space-x-4">
							   <img className="w-6 h-6" src={metamask} alt="metamask logo" loading="lazy" width="128" height="128" />
							   <span className="hidden font-medium md:block">Metamask</span>
						   </div>
					   </a>  
					   </div>
				   </Marquee>  
		)}
	</div>

  )
}

export default Brand;
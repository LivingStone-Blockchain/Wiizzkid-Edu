import React, { useContext, useState } from 'react'
import { london, shanghai, beijing } from './../assets/about/index';
import { Link, useNavigate } from 'react-router-dom';
import {FiChevronsRight} from 'react-icons/fi'
import { WiizzkidContext, WiizzkidContextType } from '../context/wiizzkid.context';

type modeDataType = {
	id: number,
	headerText: string,
	mainText: string,
	color: string,
	shadow: string,
	aosDelay: string,
	icon: React.ReactNode
}

const modeData: modeDataType[] = [
	{
		id: 1,
		headerText: 'London',
		mainText: 'Practice your way to greatness in the London mode. Hone your skills while you prepare to battle it out in the advanced modes.',
		color: '#5b72ee',
		shadow: 'rgba(37, 99, 235, 0.2)',
		aosDelay: '',
		icon: <img src={london} alt="london" className='w-[60px] mb-[2px]' width="60" height="auto" />
	},
	{
		id: 2,
		headerText: 'Shanghai',
		mainText: 'Play with another player in the multiplayer mode. You will need speed, knowledge and accuracy to win this contest.',
		color: '#FF3939',
		shadow: ' rgba(220, 38, 38, 0.2)',
		aosDelay: '150',
		icon: <img src={shanghai} alt="shanghai" className='w-[60px]' width="60" height="auto" />
	},
	{
		id: 3,
		headerText: 'Beijing',
		mainText: 'This a B2B platform where organizations develop their own quiz templates for competitions and utilize them in our metaverse',
		color: '#37b9b2',
		shadow: 'rgba(8, 145, 178, 0.2)',
		aosDelay: '300',
		icon: <img src={beijing} alt="beijing" className='w-[60px]' width="60" height="auto" />
	}
]

const GameModes = () => {
	const [hover, setHover] = useState<boolean>(false);
	const [active, setActive] = useState<number>(0);
	const [open, setOpen] = useState<boolean>(false);
	const navigate = useNavigate();
	const { value } = useContext(WiizzkidContext) as WiizzkidContextType;
	const colors = ['#ff5d5d', '#5b72ee', '#37b9b2'];

	const handleMouseEnter = (id: number) => {
		setHover(true);
		setActive(id)
	}
	const handleMouseLeave = () => {
		setHover(false);
		setActive(0)
	}


	return (
		<div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700">
			<div data-aos="flip-up" className="max-w-xl mx-auto text-center mt-24 ">
				<h1 className="font-bold text-navy my-3 text-2xl">Our Game Modes <span className="text-tomato">Explained.</span></h1>
				<p className="leading-relaxed text-gray-500 lg:text-base text-sm">The possibilities are beyond your imagination. Explore the library.</p>
			</div>
			<div className="grid md:grid-cols-3 gap-14 md:gap-5 mt-20">
				{modeData.map(({ id, headerText, mainText, color, icon, aosDelay, shadow }: modeDataType) => (
					<div key={id} data-aos="fade-up" data-aos-delay={aosDelay} className={`bg-white shadow-xl p-6 text-center rounded-xl border border-gray-200 duration-300 hover:shadow-lg relative hover:shadow-[${shadow}]`} onMouseEnter={() => handleMouseEnter(id)} onMouseLeave={handleMouseLeave} style={{ borderColor: hover && active == id ? color : '', boxShadow: hover && active == id ? shadow : ''}}>
						<div style={{ backgroundColor: `${color}` }} className="text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12">{icon}</div>
						<h1 className="font-medium md:text-xl text-lg mb-3 lg:px-14 text-navy">{headerText}</h1>
						<p className="px-4 text-gray-500 md:text-base text-sm">{mainText}</p>
						<p className={`flex justify-center items-center rounded-full  h-12 absolute md:-right-5 right-[45%] -bottom-7 md:top-[40%] border border-gray-200 duration-700 transition-all ease-in-out hover:shadow-2xl bg-white cursor-pointer ${open ? 'w-28' : 'w-12'} ${window.innerWidth < 768 && 'hidden'} ${id !== 3 && 'hidden'}`} onMouseEnter={() => (setOpen(true))} onMouseLeave={() => setOpen(false)} onClick={() => navigate('/about')}><span className={`mr-2 sm:text-sm text-xs duration-700 transition-all ease-in-out ${open ? 'block' : 'hidden'}`}>More</span> <FiChevronsRight className='text-xl text-navy md:rotate-0 rotate-90 animate-pulse'  style={!open ? {color: `${colors[value]}`} : {color: `#252641`}} /></p>
					</div>
				))}
			</div>
			<Link to="/about" className="md:hidden group flex items-center justify-end my-5">
            <span className="sm:text-sm text-xs font-medium ">Read more</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>                
          </Link>
		</div>
	)
}

export default GameModes
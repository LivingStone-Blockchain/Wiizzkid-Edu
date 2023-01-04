import React, { useState } from 'react'
import { london, shanghai, beijing } from './../assets/about/index';


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
		icon: <img src={london} alt="london" className='w-[60px] mb-[2px]'/>
	},
	{
		id: 2,
		headerText: 'Shanghai',
		mainText: 'Play with another player to earn some crypto coins. You will need speed, knowledge and accuracy to win this contest.',
		color: '#FF3939',
		shadow: ' rgba(220, 38, 38, 0.2)',
		aosDelay: '150',
		icon: <img src={shanghai} alt="shanghai" className='w-[60px]'/>
	},
	{
		id: 3,
		headerText: 'Beijing',
		mainText: 'This a B2B platform where organizations develop their own quiz templates for competitions and utilize them in our metaverse',
		color: '#37b9b2',
		shadow: 'rgba(8, 145, 178, 0.2)',
		aosDelay: '300',
		icon: <img src={beijing} alt="beijing" className='w-[60px]'/>
	}
]

const GameModes = () => {
	const [hover, setHover] = useState<boolean>(false);
	const [active, setActive] = useState<number>(0);

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
			<div data-aos="flip-up" className="max-w-xl mx-auto text-center mt-16 ">
				<h1 className="font-bold text-navy my-3 text-2xl">Our Game Modes <span className="text-tomato">Explained.</span></h1>
				<p className="leading-relaxed text-gray-500 lg:text-base text-sm">The possibilities are beyond your imagination. Explore the library.</p>
			</div>
			<div className="grid md:grid-cols-3 gap-14 md:gap-5 mt-20">
				{modeData.map(({ id, headerText, mainText, color, icon, aosDelay, shadow }: modeDataType) => (
					<div key={id} data-aos="fade-up" data-aos-delay={aosDelay} className={`bg-white shadow-xl p-6 text-center rounded-xl border border-gray-200 duration-300 hover:shadow-lg hover:shadow-[${shadow}]`} onMouseEnter={() => handleMouseEnter(id)} onMouseLeave={handleMouseLeave} style={{ borderColor: hover && active == id ? color : '', boxShadow: hover && active == id ? shadow : ''}}>
						<div style={{ backgroundColor: `${color}` }} className="text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12">{icon}</div>
						<h1 className="font-medium md:text-xl text-lg mb-3 lg:px-14 text-navy">{headerText}</h1>
						<p className="px-4 text-gray-500 md:text-base text-sm">{mainText}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default GameModes
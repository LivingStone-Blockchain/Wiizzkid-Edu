import React, { useState } from 'react'
import { HiUser, HiUsers, HiUserGroup } from 'react-icons/hi';


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
		headerText: 'Single Player',
		mainText: 'Learning becomes a lot easier when you have fun practicing and sharpening your skills.',
		color: '#5b72ee',
		shadow: 'rgba(37, 99, 235, 0.2)',
		aosDelay: '',
		icon: <HiUser className="h-auto w-full max-w-[27px]" />
	},
	{
		id: 2,
		headerText: 'Two Players',
		mainText: 'Play with another player to earn some crypto coins. You will need speed, knowledge and accuracy to win this contest.',
		color: '#FF3939',
		shadow: ' rgba(220, 38, 38, 0.2)',
		aosDelay: '150',
		icon: <HiUsers className="h-auto w-full max-w-[27px]" />
	},
	{
		id: 3,
		headerText: 'Multiple Players',
		mainText: 'Play with a group of friends/class to win the challenge. The team with the highest average would win and collect the crypto coins.',
		color: '#37b9b2',
		shadow: 'rgba(8, 145, 178, 0.2)',
		aosDelay: '300',
		icon: <HiUserGroup className="h-auto w-full max-w-[27px]" />
	}
]

const Modes = () => {
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
		<>
			<div data-aos="flip-up" className="max-w-xl mx-auto text-center mt-24">
				<h1 className="font-bold text-darken my-3 md:text-3xl text-2xl">All-In-One <span className="text-yellow-500">Learning Space.</span></h1>
				<p className="leading-relaxed text-gray-500 lg:text-base text-sm">The possibilities are beyond your imagination. Explore the library.</p>
			</div>
			<div className="grid md:grid-cols-3 gap-14 md:gap-5 mt-20">
				{modeData.map(({ id, headerText, mainText, color, icon, aosDelay, shadow }: modeDataType) => (
					<div key={id} data-aos="fade-up" data-aos-delay={aosDelay} className={`bg-white shadow-xl p-6 text-center rounded-xl border border-gray-200 duration-300 hover:shadow-lg hover:shadow-[${shadow}]`} onMouseEnter={() => handleMouseEnter(id)} onMouseLeave={handleMouseLeave} style={{ borderColor: hover && active == id ? color : '', boxShadow: hover && active == id ? shadow : ''}}>
						<div style={{ backgroundColor: `${color}` }} className="text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12">{icon}</div>
						<h1 className="font-medium md:text-xl text-lg mb-3 lg:px-14 text-darken">{headerText}</h1>
						<p className="px-4 text-gray-500 md:text-base text-sm">{mainText}</p>
					</div>
				))}
			</div>
		</>
	)
}

export default Modes
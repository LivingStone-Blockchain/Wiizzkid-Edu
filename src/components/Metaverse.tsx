import CountDown from './Countdown'
import { vrBoy, vrBoyPlaceholder } from '../assets/metaverse';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const Metaverse = () => {
  return (
    <div id="metaverse" className="md:flex mt-24 py-16 px-4 md:px-8 md:space-x-10 items-start bg-[#252641]">
    <div data-aos="fade-down" className="md:w-7/12 relative lg:self-start self-center">
        <div className="bg-[#37b9b2] w-32 h-32 rounded-full absolute z-0 left-4 -top-12 animate-pulse"></div>
        <div className="bg-[#e0b00d] w-5 h-5 rounded-full absolute z-0 left-36 -top-12 animate-ping"></div>
        <LazyLoadImage 
						src={vrBoy} 
						placeholderSrc={vrBoyPlaceholder}
						effect="blur"
						alt="boy on VR"
						className="relative z-50 floating w-full h-auto max-w-[450px]"
					/>
        <div className="bg-[#5B61EB] w-36 h-36 rounded-full absolute z-0 right-16 -bottom-1 animate-pulse hidden md:block"></div>
        <div className="bg-[#ff5d5d] w-5 h-5 rounded-full absolute z-0 right-52 bottom-1 animate-ping"></div>
    </div>
    <div data-aos="fade-down" className="flex flex-col items-start md:w-1/2 mt-20 md:mt-0 text-gray-500 relative">
        <h1 className="md:text-2xl text-xl font-semibold text-white lg:pr-30">Wiizzkid Metaverse <span className="text-yellow-500">coming soon</span></h1>
        <div className="bg-[#37b9b2] w-6 h-6 rounded-full absolute z-0 lg:right-36 right-4 -top-8 lg:-top-8 animate-pulse"></div>
        <div className="bg-[#5B61EB] w-16 h-16 rounded-full absolute z-0 lg:right-36 right-4 -top-8 lg:-top-8 opacity-30"></div>
        <p  className="space-x-5 my-5 text-white md:text-base text-sm">We are preparing something exciting and amazing for you.</p>
        <CountDown 
            day={8}
            month={6}
            year={2025}
        />
         <div className="pt-8 w-full">
            <p className="space-x-5 my-5 text-white md:text-base text-sm z-1">Want to be the first to know when we launch ?</p>
            <div className="flex flex-row space-x-3 justify-start mt-3 w-full">
                <input type="email" placeholder="Your Email" className="flex-initial md:w-72 w-64 first-letter:rounded-full py-3 placeholder:text-sm text-sm pl-5 bg-transparent border-2 border-gray-400 rounded-full" />
                <button type="submit" className="flex-initial md:w-36 w-28 text-white mx-auto sm:mx-0 font-semibold px-5 py-3 rounded-full bg-[#252641] shadow-btn-darken transform transition hover:scale-110 duration-300 ease-in-out"  style={{background: "linear-gradient(105.5deg, #545AE7 19.57%, #393FCF 78.85%)"}}>Subscribe</button>
            </div>
        </div>
    </div>
</div>
  )
}

export default Metaverse
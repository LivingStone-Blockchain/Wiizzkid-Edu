import { FaTimes } from "react-icons/fa";
import soon from './../assets/general/soon.png'
import CountDown from './Countdown';




const ComingSoon = ({openPresale ,setOpenPresale}:{openPresale:boolean, setOpenPresale:React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <>
     {openPresale && (
        <>
            <div className="bg-black opacity-50 fixed inset-0 z-50 w-full h-full"></div>
            <div className='flex md:flex-row flex-col items-stretch justify-start xl:gap-5 lg:gap-4 gap-3 rounded-xl xl:p-6 lg:p-5 p-4 font-lato fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 transform transition-all ease-in-out duration-500 z-[150] bg-white lg:w-3/5 md:w-4/5 w-[90%]'>
                <div className="md:order-1 order-2 relative flex flex-col items-center justify-center basis-1/2 w-full h-full">
                    <p className='absolute left-0 top-0 bg-[#26a8a1] bg-opacity-20 rounded-full lg:w-6 lg:h-6 w-5 h-5 flex justify-center items-center cursor-pointer'><FaTimes onClick={() => setOpenPresale(prev => !prev)} className='xl:w-4 xl:h-4 w-3 h-3'/></p>
                    <div className=' flex flex-col items-center justify-center mt-16 w-full'>
                        <h2 className="lg:text-4xl text-2xl font-medium text-center text-[#252641] animate-slide-in">Wiizzkid Presale!</h2>
                        <CountDown 
                            day={16}
                            month={10}
                            year={2023}
                            colors={['#37b9b2']}
                        />
                         <a href="https://wiizzkid-ico.com" target="blank" rel="noreferrer" className="flex-initial w-36 text-white sm:mx-0 font-semibold px-5 py-3  bg-[#252641] hover:bg-opacity-80 rounded-full transform transition hover:scale-110 duration-300 ease-in-out z-60 text-center">
                            Visit now
                         </a>
                    </div>
                </div>
                <div className="md:order-2 order-1 flex flex-col basis-1/2 bg-gradient-to-br from-[#26a8a1] to-transparent text-white w-full p-2 rounded-tr-lg rounded-br-lg">
                    <p className="text-center mt-14 text-base italic">“The next big (Learn to Earn) L2E edu-verse!”</p>
                    <img src={soon} height={100} alt="nft" className="mt-[56px]" />
                </div>
            </div>
        </>
     )}
    </>
  );
};

export default ComingSoon;
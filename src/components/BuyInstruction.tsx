import React, {useState} from "react";
import { card, usdt, coin } from './../assets/buyInstruction/index';

type PanelPropsType = {
    id: number,
    img: string,
    colorDeep:string,
    colorLight: string,
    title: string,
    subtitle: string,
    className?: string
}


const PanelData: PanelPropsType[] = [
    {
        id: 1,
        img: coin,
        colorDeep: '#FF3939',
        colorLight: '#ffedef',
        title:"Buy STN with ETH ",
        subtitle:"Click the 'Buy with ETH' button when you have ETH in your wallet to convert it to STN. To find out how many STN tokens you will receive, enter the amount of ETH that you would want to deposit.",
    },
    { 
        id: 2,
        img: card,
        colorDeep: '#e0b00d',
        colorLight: '#fff2e1',
        title: 'Buy STN with credit card',
        subtitle: 'If you want to buy STN using your credit card, click the "Buy ETH with Card" button, and then exchange the ETH into STN. To offset gas costs, make sure you have enough extra ETH.',
    },
    {   
        id:3,
        img: usdt,
        colorDeep: '#26a8a1',
        colorLight: '#e5fbfa',
        title: 'Buy STN with USDT',
        subtitle: 'If you have USDT in your wallet, you may exchange it for STN by clicking "Buy STN with USDT." To find out how many STN tokens you will receive, enter the amount of USDT you would want to deposit.'
    }
]



const BuyInstruction = () => {
    const [activeCardDesktop, setActiveCardDesktop] = useState<number>(0);
    const [activeCardMobile, setActiveCardMobile] = useState<number>(0);

   const handleDesktopClick = (index: number) => {
        setActiveCardDesktop(index)
   };

   const handleMobileClick = (id: number) => {
    setActiveCardMobile(id)
};




  return (
    <div className="m-auto text-gray-500 mt-24">
        <div data-aos="flip-up" className="text-center max-w-screen-lg mx-auto">
			<h1 className="font-bold text-navy my-3 md:text-3xl text-2xl">How to buy the <span className="text-tomato">STN Token.</span></h1>
			<p className="leading-relaxed text-gray-500 lg:text-base text-sm">To link your wallet to the platform, first make sure a MetaMask wallet is loaded on your browser. When making a purchase on a mobile device, we advise utilizing Trust Wallet and connecting via the built-in browser.</p>
	    </div>

        {/*render accordion based on device size*/}
        {window.innerWidth > 768 ? (
            <div className="m-auto text-gray-500 mt-16">
            <div data-aos="fade-up" data-aos-delay="100" className="flex items-center justify-center my-12">
            <div className="flex gap-3 w-full">
                {PanelData.map(({title, subtitle, img, id, colorDeep, colorLight}, index) => (
                    <div key={id}  onClick={() => handleDesktopClick(index)} className={`${activeCardDesktop === index && 'lg:grow-[5] md:grow-[1] max-w-full'} duration-700 ease-in-out relative flex-grow overflow-hidden rounded-2xl transition-all border border-gray-200`}>
                   
                 
                   {activeCardDesktop === index ? (
                     <div className="h-full max-w-full flex justify-center items-center">
        
                        <div className="h-full flex-grow relative cursor-pointer" style={{backgroundColor: `${colorLight}`}}>
                        <div className={`absolute bottom-4 duration-700 ease-in-out flex mx-auto left-1/2 transform -translate-x-1/2 mb-3 transition-all z-30`}>
                            <div aria-hidden="true" className="flex md:h-10 md:w-10 h-8 w-8 items-center justify-center rounded-full" style={{backgroundColor: `${colorDeep}`, color: `${colorDeep}`}}>
                                <span className="font-medium text-white md:text-base text-sm">{id}</span>
                            </div>             
                        </div>
                        <div className="absolute rotate-90 top-32 duration-700 ease-in-out flex mx-auto left-1/2 transform -translate-x-1/2 transition-all z-30 text-navy font-medium uppercase w-56">{title}</div>
                     </div>
        
        
        
                        <div  className={`flex flex-col items-start justify-center gap-5 bg-white h-full m-6 ${activeCardDesktop === index && 'lg:grow-[4] max-w-full'}`}>
                            <h1 className="font-bold uppercase -mt-2 text-lg" style={{color: `${colorDeep}`}}>{title}</h1>
                            <p className="lg:w-[38rem] md:w-[28rem] text-gray-500 md:text-base text-sm leading-relaxed ">{subtitle}</p>
                            <img className="w-80" src={img} alt={title} />
                        </div>
                     </div>
                   ) : (
                     <div className="h-full cursor-pointer relative" style={{backgroundColor: `${colorLight}`}}>
                        <div className={`absolute bottom-4 duration-700 ease-in-out flex mx-auto left-1/2 transform -translate-x-1/2 mb-3 transition-all z-30`}>
                        <div aria-hidden="true" className="flex md:h-10 md:w-10 h-8 w-8 items-center justify-center rounded-full" style={{backgroundColor: `${colorDeep}`, color: `${colorDeep}`}}>
                            <span className="font-medium text-white md:text-base text-sm">{id}</span>
                        </div>              
                        </div>
        
                        <div className="absolute rotate-90 top-32 flex mx-auto left-1/2 transform -translate-x-1/2 z-30 text-navy font-medium uppercase w-56">{title}</div>
                     </div>
                   )}
        
                   
                    </div>
                ))}
            </div>
          </div>
          </div>
        ) : (
            <div data-aos="fade-up" data-aos-delay="100" className="flex items-center justify-center my-16">
            <div className="flex flex-col gap-3 w-full h-full">
                {PanelData.map(({title, subtitle, img, id, colorDeep, colorLight}) => (
                    <div key={id}  onClick={() => handleMobileClick(id)} className={`${activeCardMobile === id && 'lg:grow-[5] md:grow-[1] max-w-full'} duration-700 ease-in-out relative flex-grow overflow-hidden rounded-2xl transition-all border border-gray-200`}>
                   
                 
                   {activeCardMobile === id ? (
                     <div className="h-full max-w-full flex flex-col">
        
                        <div className="w-full relative cursor-pointer flex items-center justify-between p-5" style={{backgroundColor: `${colorLight}`}}>
                        <div className={`duration-700 ease-in-out flex transition-all z-30`}>
                            <div aria-hidden="true" className="flex md:h-10 md:w-10 h-8 w-8 items-center justify-center rounded-full" style={{backgroundColor: `${colorDeep}`, color: `${colorDeep}`}}>
                                <span className="font-medium text-white md:text-base text-sm">{id}</span>
                            </div>             
                        </div>
                        <div className="duration-700 ease-in-out flex transition-all z-30 text-navy font-medium uppercase">{title}</div>
                     </div>
        
        
        
                        <div  className={`flex flex-col items-start justify-center gap-5 bg-white h-full m-6 ${activeCardMobile === id && 'lg:grow-[4] max-w-full'}`}>
                            <h1 className="font-bold uppercase -mt-2 text-lg" style={{color: `${colorDeep}`}}>{title}</h1>
                            <p className="lg:w-[38rem] md:w-[28rem] text-gray-500 md:text-base text-sm leading-relaxed ">{subtitle}</p>
                            <img className="w-72 hidden" src={img} alt={title} />
                        </div>
                     </div>
                   ) : (
                    <div className="w-full relative cursor-pointer flex items-center justify-between p-5" style={{backgroundColor: `${colorLight}`}}>
                    <div className={`duration-700 ease-in-out flex transition-all z-30`}>
                        <div aria-hidden="true" className="flex md:h-10 md:w-10 h-8 w-8 items-center justify-center rounded-full" style={{backgroundColor: `${colorDeep}`, color: `${colorDeep}`}}>
                            <span className="font-medium text-white md:text-base text-sm">{id}</span>
                        </div>             
                    </div>
                    <div className="duration-700 ease-in-out flex transition-all z-30 text-navy font-medium uppercase">{title}</div>
                 </div>
                   )}
        
                   
                    </div>
                ))}
            </div>
          </div>
        )}
  </div>
   
  );
};

export default BuyInstruction;


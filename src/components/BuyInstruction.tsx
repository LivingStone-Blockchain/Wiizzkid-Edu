import React, {useState} from "react";

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
        img: "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=460&h=340&q=90",
        title: 'Buy ETH with credit card',
        subtitle: 'If you want to buy ETH using your credit card, click the "Buy ETH with Card" button, and then exchange the ETH into STN. To offset gas costs, make sure you have enough extra ETH.',
        colorDeep: '#FF3939',
        colorLight: '#ffedef',
    },
    { 
        id: 2,
        img: "https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=460&h=340&q=90",
        colorDeep: '#e0b00d',
        colorLight: '#fff2e1',
        title:"Buy STN with ETH ",
        subtitle:"Click the 'Buy with ETH' button when you have ETH in your wallet to convert it to STN. To find out how many STN tokens you will receive, enter the amount of ETH that you would want to deposit.",
    },
    {   
        id:3,
        img:"https://images.unsplash.com/photo-1488330890490-c291ecf62571?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=460&h=340&q=90",
        colorDeep: '#26a8a1',
        colorLight: '#e5fbfa',
        title: 'Buy STN with USDT',
        subtitle: 'If you have USDT in your wallet, you may exchange it for STN by clicking "Buy STN with USDT." To find out how many STN tokens you will receive, enter the amount of USDT you would want to deposit.'
    }
]


const BuyInstruction = () => {
    const [activeCard, setActiveCard] = useState<number>(0);

   const handleClick = (index: number) => {
        setActiveCard(index)
   };

  return (
    <div className="m-auto text-gray-500 mt-24">
    <div data-aos="flip-up" className="text-center max-w-screen-lg mx-auto">
			<h1 className="font-bold text-navy my-3 md:text-3xl text-2xl">How to buy the <span className="text-tomato">STN Token.</span></h1>
			<p className="leading-relaxed text-gray-500 lg:text-base text-sm">To link your wallet to the platform, first make sure a MetaMask wallet is loaded on your browser. When making a purchase on a mobile device, we advise utilizing Trust Wallet and connecting via the built-in browser.</p>
		</div>
    <div data-aos="fade-up" data-aos-delay="100" className="flex items-center justify-center my-12">
    <div className="flex lg:h-[70vh] md:[40vh] items-stretch overflow-hidden w-full">
        {PanelData.map(({title, subtitle, img, id, colorDeep, colorLight}, index) => (
            <div key={id}  onClick={() => handleClick(index)} className={`${activeCard === index && 'grow-[5] max-w-full'} duration-700 ease-in-out relative flex-grow m-2 min-w-14 overflow-hidden rounded-2xl transition-all border border-gray-200`}>
           
         
           {activeCard === index ? (
             <div className="h-full max-w-full flex justify-center items-center">

                <div className="h-full flex-grow relative cursor-pointer" style={{backgroundColor: `${colorLight}`}}>
                <div className={`absolute bottom-0 duration-700 ease-in-out flex mx-auto left-1/2 transform -translate-x-1/2 mb-3 transition-all z-30`}>
                    <div aria-hidden="true" className="flex md:h-10 md:w-10 h-8 w-8 items-center justify-center rounded-full" style={{backgroundColor: `${colorDeep}`, color: `${colorDeep}`}}>
                        <span className="font-medium text-white md:text-base text-sm">{id}</span>
                    </div>             
                </div>
                <div className="absolute rotate-90 top-28 transform translate-y-1/4  -translate-x-[32%] text-navy font-medium uppercase w-56">{title}</div>
             </div>



                <div  className={`flex flex-col items-start justify-center gap-9 bg-white h-full ml-5 ${activeCard === index && 'grow-[4] max-w-full'}`}>
                    <h1 className="font-bold uppercase -mt-2 text-lg" style={{color: `${colorDeep}`}}>{title}</h1>
                    <p className="w-[35rem] text-gray-500 md:text-base text-sm leading-relaxed">{subtitle}</p>
                    <img className="w-80" src={img} alt={title} />
                </div>
             </div>
           ) : (
             <div className="h-full flex-grow cursor-pointer relative" style={{backgroundColor: `${colorLight}`}}>
                <div className={`absolute bottom-0 duration-700 ease-in-out flex mx-auto left-1/2 transform -translate-x-1/2 mb-3 transition-all z-30`}>
                <div aria-hidden="true" className="flex md:h-10 md:w-10 h-8 w-8 items-center justify-center rounded-full" style={{backgroundColor: `${colorDeep}`, color: `${colorDeep}`}}>
                    <span className="font-medium text-white md:text-base text-sm">{id}</span>
                </div>              
                </div>

                <div className="absolute rotate-90 top-28 transform translate-y-1/4 -translate-x-[32%]  text-navy font-medium uppercase w-56">{title}</div>
             </div>
           )}

           
            </div>
        ))}
    </div>
  </div>
  </div>
   
  );
};

export default BuyInstruction;




{/*

   <div className={`hidden absolute ${activeCard === index && 'transform scale-125'} bg-center bg-cover bg-no-repeat duration-700 ease-in-out inset-0 scale-105 transition-all z-10 `}></div>
            <div className={`hidden absolute bottom-0 duration-700 ease-in-out h-1/2 inset-x-0 opacity-0 shadow ${activeCard === index && 'opacity-75 transform translate-y-0'}  transform transition-all translate-y-1/2 z-20`}></div>


               <div className={`${activeCard === index && 'opacity-100 transform translate-x-0'} hidden flex flex-col justify-center leading-tight text-white whitespace-pre`}>
                <div className="ease-in-out font-bold duration-700 opacity-0 relative transform transition-all translate-x-8">{title}</div>
                <div className="delay-100 duration-700 ease-in-out opacity-0 relative transform transition-all translate-x-8">{subtitle}</div>
                </div>


              

                
        */}
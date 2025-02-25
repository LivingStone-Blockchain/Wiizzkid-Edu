import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';
import { ExchangeLayout } from '../components/index';;
import { exchange } from '../../../assets/dashboard/index';
import { CardBody, Card } from '../components/Cards';
import { TokenContext, TokenContextType } from './../../../context/token.context';



type BuyStoneDataType = {
  id: number,
  title: string,
  text: string,
  img: string,
  className: string,
  children: React.ReactNode,
}



const Exchange = () => {
  const { isConnected } = useContext(TokenContext) as TokenContextType;
  const [open, setOpen] = useState<number | null>(null);



  const buyStoneData: BuyStoneDataType[] = [
    {
      id: 1,
      title: "Exchange",
      text: "Swap STN for Eth",
      img: exchange,
      className: 'bg-tomatoLighter',
      children: <ExchangeLayout setOpen={setOpen} />
    },
  ]

  
  const handleClick = (id:number) => {

    if (id === 1 && !isConnected) {
      return toast.error("Connect your wallet", { duration: 3000, id: "connect" })
    }

    setOpen(id);
  }
 




  return (
    <div className="flex flex-col gap-8 items-start justify-start">
      <p className='font-medium text-navy'>Exchange</p>
      <div data-aos="fade-up" data-aos-delay="100" className="grid gap-6 w-full mb-8 md:grid-cols-3 relative">
        {buyStoneData.map(({ id, img, title, text, className, children }) => (
          <div key={id}>
            <Card className={`${open ? "hidden" : "block"}`}>
              <CardBody className={`flex gap-4 py-4 items-center border border-gray-300 rounded-xl relative cursor-pointer ${className} hover:bg-white`}  onClick={() => handleClick(id)}>
                <img className={`w-full h-auto max-w-[40px]`} src={img} alt="avatar" />
                <div>
                  <p className="text-base font-medium text-navy">{title}</p>
                  <p className="mb-2 text-sm font-normal text-gray-600">{text}</p>
                </div>
              </CardBody>
            </Card>
            {open === id && <div data-aos="fade-up" data-aos-delay="100" className='absolute z-[40] left-0 right-0 mx-0'>{children}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Exchange;



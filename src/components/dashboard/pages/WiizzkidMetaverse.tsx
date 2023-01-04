import React from 'react'
import  {CardBody, Card}  from '../components/Cards';
import { coming } from '../../../assets/dashboard';

const WiizzkidMetaverse = () => {
  return (
    <div className="flex flex-col gap-8 items-start justify-start">
    <p className='font-medium text-navy'>Wiizzkid Metaverse</p>
    <div  data-aos="fade-up" data-aos-delay="100" className="grid gap-6 w-full mb-8 grid-cols-1">
            <Card>
                <CardBody className="flex flex-col gap-10 py-5 items-center border border-gray-300 rounded-xl relative">
                    <img className={`w-full h-auto max-w-[100px]`} src={coming} alt="coming soon" />

                    <div className='flex  flex-col justify-center items-center gap-2 w-full'>
                        <p className="text-lg font-medium text-navy text-center">We are creating something.</p>
                        <p className="mb-2 text-sm font-normal text-gray-600">Stay tuned!</p>
                    </div>
                </CardBody>
            </Card>
    </div>
</div>
  )
}

export default WiizzkidMetaverse;
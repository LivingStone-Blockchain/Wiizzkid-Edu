import React, {FC} from 'react'
import { Card, CardBody } from './Cards'

type CardProps = {
    title: string,
    value: React.ReactNode,
    img: string,
    children?: React.ReactNode,
    className?: string
}


const InfoCard: FC<CardProps> = ({ title, value, img, children, className }) => {
  return (
    <Card>
      <CardBody className={`flex gap-4 py-4 items-center border border-gray-300 rounded-xl relative ${className}`}>
        <img className={`w-full h-auto max-w-[40px]`} src={img} alt="avatar"/>
        {children}
        <div>
          <p className="mb-2 text-sm font-normal text-gray-600">{title}</p>
          <p className="text-lg font-medium text-navy">{value}</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default InfoCard

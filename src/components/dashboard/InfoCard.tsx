import React, {FC} from 'react'
import { Card, CardBody } from '@windmill/react-ui'

type CardProps = {
    title: string,
    value: string | number,
    img: string,
    children?: React.ReactNode,
}


const InfoCard: FC<CardProps> = ({ title, value, img, children }) => {
  return (
    <Card>
      <CardBody className="flex gap-4 py-4 items-center border border-gray-300 rounded-xl relative">
        <img className={`w-full h-auto max-w-[40px]`} src={img} alt="avatar"/>
        {children}
        <div>
          <p className="mb-2 text-sm font-normal text-gray-600">{title}</p>
          <p className="text-lg font-medium text-[#252641]">{value}</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default InfoCard

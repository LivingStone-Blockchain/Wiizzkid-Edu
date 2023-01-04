import React, { FC } from 'react'


type ChildrenProp = {
    children?: React.ReactNode,
    className?: string,
    title?: string,
    legends?: {
        title: string,
        color: string,
    }[],
    onClick?: () => void,
}

export const Card: FC<ChildrenProp> = ({ children, className }) => <div className={`${className} min-w-0 rounded-lg ring-1 ring-black ring-opacity-5 overflow-hidden bg-white`}>{children}</div>
export const CardBody: FC<ChildrenProp> = ({ children, className, onClick }) => <div onClick={onClick} className={`${className} p-4`}>{children}</div>


export const ChartCard: FC<ChildrenProp> = ({ children, title }) => (
      <div className="min-w-0 p-4 bg-white border border-gray-300 rounded-xl shadow-xs ring-1 ring-black ring-opacity-5">
        <p className="mb-4 font-medium text-gray-800">{title}</p>
        {children}
      </div>
    )
  

export const ChartLegend: FC<ChildrenProp> = ({ legends })  => (
    <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600">
  {legends?.map((legend) => (
    <div className="flex items-center" key={legend.title}>
      <span className={`inline-block w-3 h-3 mr-1 ${legend.color} rounded-full`}></span>
      <span>{legend.title}</span>
    </div>
  ))}
</div>
)

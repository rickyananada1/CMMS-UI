import React from 'react'

const Card = (props) => {
  const { title, subtitle, children, cardClass = '' } = props

  return (
    <div
      className={`bg-white rounded-lg flex flex-col items-center text-gray-700 p-3 ${cardClass}`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <h5 className="dashboard-title">{title}</h5>
        </div>
        <div className="flex items-center text-sm text-cmms-grey">{subtitle}</div>
      </div>
      <div className="flex w-full overflow-hidden h-full">{children}</div>
    </div>
  )
}

export default Card

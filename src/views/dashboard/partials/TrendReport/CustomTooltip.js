import React from 'react'
import clsx from 'clsx'

const CustomTooltip = ({ active, payload, label }) => {
  const currentYear = new Date().getFullYear().toString().slice(-2)

  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col bg-neutral-white shadow rounded-xl text-sm">
        <div className="flex justify-between gap-10 px-3 py-2 rounded-tr-xl rounded-tl-xl">
          <div className="font-bold text-cmms-blue-1 text-base">Wellness Report</div>
          <div className="text-cmms-grey">{`${label} '${currentYear}`}</div>
        </div>
        {payload.map((item) => (
          <div
            key={item.dataKey}
            className={clsx(
              'flex justify-between text-cmms-grey px-3 py-2',
              item.dataKey === 'down'
                ? 'bg-cmms-red/10 rounded-br-xl rounded-bl-xl'
                : 'bg-transparent',
            )}
          >
            <div className="flex items-center">
              <span
                className="block w-2 h-2 mr-2 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <div>{item.name}</div>
            </div>
            <div>
              <span
                className={clsx(
                  'font-bold',
                  item.dataKey === 'down' ? `text-cmms-red` : 'text-neutral-primary-text',
                )}
              >
                {item.value}
              </span>
              {' Equipment'}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return null
}

export default CustomTooltip

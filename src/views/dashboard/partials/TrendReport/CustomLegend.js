import React from 'react'

const CustomLegend = (props) => {
  const { payload } = props

  return (
    <div className="flex justify-center items-center gap-6">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center">
          <span
            className="block w-6 h-2.5 mr-2 rounded" // Bentuk oval/persegi membulat
            style={{ backgroundColor: entry.color }}
          ></span>
          <span className="text-sm text-neutral-label">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

export default CustomLegend

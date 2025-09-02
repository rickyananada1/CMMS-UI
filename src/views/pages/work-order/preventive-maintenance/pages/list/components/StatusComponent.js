import React from 'react'

const StatusComponent = (props) => {
  const { status } = props
  let className
  switch (status) {
    case 'Active':
      className =
        'bg-[#E2FCF3] text-[#0ea976] text-md font-medium pb-1 px-2.5 py-0.5 rounded-full border-[#8ADFC3]'
      break
    case 'Inactive':
      className =
        'bg-[#FFE5E6] text-[#ff5656] text-md font-medium pb-1 px-2.5 py-0.5 rounded-full border-[#FD8A8A]'
      break
    default:
      className =
        'bg-[#f3f4f6] text-[#1f2937] text-md font-medium pb-1 px-2.5 py-0.5 rounded-full border-[#6b7280]'
      break
  }
  return (
    <span className={className} style={{ border: '1px solid' }}>
      {status}
    </span>
  )
}

export default StatusComponent

import React from 'react'

const StatusJobPlanComponent = (props) => {
  const { status } = props
  let className
  switch (status) {
    case 'Active':
      className =
        'bg-[#E2FCF3] text-[#0ea976] text-md font-medium pb-1 px-2.5 py-0.5 rounded-full border-[#8ADFC3]'
      break
    case 'InActive':
      className =
        'bg-[#FFE5E6] text-[#ff5656] text-md font-medium pb-1 px-2.5 py-0.5 rounded-full border-[#FD8A8A]'
      break
    case 'Cancel':
      className =
        'bg-[#FFF3E6] text-[#ff8000] text-md font-medium pb-1 px-2.5 py-0.5 rounded-full border-[#FFD6AD]'
      break
    case 'Revised':
      className =
        'bg-[#E9F1FB] text-[#2671d9] text-md font-medium pb-1 px-2.5 py-0.5 rounded-full border-[#BAD1F3]'
      break
    case 'PndRev':
      className =
        'bg-[#E7F1FD] text-[#4791f2] text-md font-medium pb-1 px-2.5 py-0.5 rounded-full border-[#91BEF7]'
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

export default StatusJobPlanComponent

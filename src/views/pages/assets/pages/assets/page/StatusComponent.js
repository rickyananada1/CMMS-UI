import React from 'react'

const StatusComponent = (props) => {
  const status = props.status ?? ''
  let className
  switch (status?.toLowerCase()) {
    case 'active':
      className =
        'bg-[#dcfce7] text-[#166534] text-xs font-medium px-2.5 py-0.5 rounded-full border-[#4ade80] capitalize'
      break
    case 'inactive':
      className =
        'bg-[#ffedd5] text-[#9a3412] text-xs font-medium px-2.5 py-0.5 rounded-full border-[#fb923c] capitalize'
      break
    case 'not ready':
      className =
        'bg-[#ecfccb] text-[#3f6212] text-xs font-medium px-2.5 py-0.5 rounded-full border-[#65a30d] capitalize'
      break
    case 'limited use':
      className =
        'bg-[#e0f2fe] text-[#075985] text-xs font-medium px-2.5 py-0.5 rounded-full border-[#38bdf8] capitalize'
      break
    case 'broken':
      className =
        'bg-[#fee2e2] text-[#991b1b] text-xs font-medium px-2.5 py-0.5 rounded-full border-[#f87171] capitalize'
      break
    case 'missing':
      className =
        'bg-[#fee2e2] text-[#991b1b] text-xs font-medium px-2.5 py-0.5 rounded-full border-[#f87171] capitalize'
      break
    case 'sealed':
      className =
        'bg-[#e0f2fe] text-[#075985] text-xs font-medium px-2.5 py-0.5 rounded-full border-[#38bdf8] capitalize'
      break
    default:
      className =
        'bg-[#f3f4f6] text-[#1f2937] text-xs font-medium px-2.5 py-0.5 rounded-full border-[#6b7280] capitalize'
      break
  }
  return (
    <span className={className} style={{ border: '1px solid' }}>
      {status}
    </span>
  )
}

export default StatusComponent

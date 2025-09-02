import React from 'react'
import WellnessReport from 'src/assets/images/bg-1.svg'

const WellnessCard = ({ title, description, value }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-sm p-3 border border-gray-100 d-flex flex-column gap-1 justify-content-center"
      style={{
        backgroundImage: `url(${WellnessReport})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="fw-semibold text-base">{title}</div>
      <div className="flex justify-between gap-2 items-center">
        <div className="text-muted text-sm flex items-center">{description}</div>
        <div className="d-flex align-items-center justify-content-end text-secondary small">
          <div className="fs-3 fw-bold text-end text-dark">{value}</div>
        </div>
      </div>
    </div>
  )
}

export default WellnessCard

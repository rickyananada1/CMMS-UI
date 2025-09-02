import React from 'react'

const Header = (props) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="w-full font-semibold">{props?.description ?? '-'}</h4>
        <p className="text-neutral">
          <span className="text-neutral-text-disabled">Work Order : </span>
          <span className="text-body-bold">{props?.work_order ? props?.work_order : '-'}</span>
          <span className="text-neutral-text-disabled"> / </span>
          <span className="text-neutral-text-disabled">Site : </span>
          <span className="text-body-bold">{props?.site ? props?.site : '-'}</span>
          <span className="text-neutral-text-disabled"> / </span>
          <span className="text-neutral-text-disabled">Status : </span>
          <span className="text-body-bold">{props?.status ? props?.status : '-'}</span>
        </p>
      </div>
    </div>
  )
}

export default Header

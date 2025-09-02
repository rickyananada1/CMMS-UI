import React from 'react'

const AssetsRelationListTableChild = ({ mode }) => {
  return (
    <div className="px-5 pt-4 bg-cmms-grey-1 text-sm">
      <p className="font-semibold">Details</p>
      <div className="grid grid-cols-4">
        <div>
          <p className="text-cmms-grey">Relation To Assets</p>
          <p className="-mt-3 font-semibold">PLGG-TA-00-CYP01GK001</p>
        </div>
        <div>
          <p className="text-cmms-grey">Description</p>
          <p className="-mt-3 font-semibold">PLTA CCTV CAMERA MONITORING COMMON</p>
        </div>
        <div>
          <p className="text-cmms-grey">Location</p>
          <p className="-mt-3 font-semibold">30040232</p>
        </div>
        <div>
          <p className="text-cmms-grey">Location Description</p>
          <p className="-mt-3 font-semibold">PLTA IR PM NOOR CONTROL ROOM AREA</p>
        </div>
      </div>
      <div className="grid grid-cols-4 mt-2">
        <div>
          <p className="text-cmms-grey">Relation Name</p>
          <p className="-mt-3 font-semibold">R-Name</p>
        </div>
        <div>
          <p className="text-cmms-grey">Relation Type</p>
          <p className="-mt-3 font-semibold">R-Type</p>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default AssetsRelationListTableChild

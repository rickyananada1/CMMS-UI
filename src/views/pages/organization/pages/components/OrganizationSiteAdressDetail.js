import React from 'react'
import XTag from '../../../../../assets/icons/x-tag.svg'
import CheckTag from '../../../../../assets/icons/check-tag.svg'

const OrganizationSiteAddressDetail = ({ row }) => {
  const data = row?.original
  return (
    <div className="w-full p-4 bg-cmms-grey-1">
      <h5 className="font-bold">Details</h5>
      <div className="grid grid-cols-4 gap-1">
        <div className="w-full ">
          <div className="mb-4">
            <p className="text-cmms-grey">Address</p>
            <p className="font-medium -mt-2">{data?.address ?? '-'}</p>
          </div>
          <div className="mb-4">
            <p className="text-cmms-grey">Bill to Contact</p>
            <p className="font-medium -mt-2">{data?.bill_to_contact ?? '-'}</p>
          </div>
          <div className="mb-4">
            <p className="text-cmms-grey">Ship to Contact</p>
            <p className="font-medium -mt-2">{data?.ship_to_contact ?? '-'}</p>
          </div>
        </div>
        <div className="w-full ">
          <div className="mb-4">
            <p className="text-cmms-grey">Address Description</p>
            <p className="font-medium -mt-2">{data?.address_code_description ?? '-'}</p>
          </div>
          <div className="mb-4">
            <p className="text-cmms-grey">Bill to Contact Description</p>
            <p className="font-medium -mt-2">{data?.bill_to_contact_description ?? '-'}</p>
          </div>
          <div className="mb-4">
            <p className="text-cmms-grey">Ship to Contact Description</p>
            <p className="font-medium -mt-2">{data?.ship_to_contact_description ?? '-'}</p>
          </div>
        </div>
        <div className="w-full ">
          <div className="mb-4">
            <p className="text-cmms-grey">Address Code</p>
            <p className="font-medium -mt-2">{data?.address_code ?? '-'}</p>
          </div>
          <div className="mb-4">
            <p className="text-cmms-grey">Bill To?</p>
            <p className="font-medium -mt-2">
              <img src={data?.bill_to ? CheckTag : XTag} width={15} height={15} alt={''} />
            </p>
          </div>
          <div className="mb-4">
            <p className="text-cmms-grey">Ship To?</p>
            <p className="font-medium -mt-2">
              <img src={data?.ship_to ? CheckTag : XTag} width={15} height={15} alt={''} />
            </p>
          </div>
        </div>
        <div className="w-full ">
          <div className="mb-4">
            <p className="text-cmms-grey text-transparent">-</p>
            <p className="font-medium -mt-2 text-transparent">-</p>
          </div>
          <div className="mb-4">
            <p className="text-cmms-grey">Def.Bill To?</p>
            <p className="font-medium -mt-2">
              <img src={data?.default_bill_to ? CheckTag : XTag} width={15} height={15} alt={''} />
            </p>
          </div>
          <div className="mb-4">
            <p className="text-cmms-grey">Def.Ship To?</p>
            <p className="font-medium -mt-2">
              <img src={data?.default_ship_to ? CheckTag : XTag} width={15} height={15} alt={''} />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganizationSiteAddressDetail

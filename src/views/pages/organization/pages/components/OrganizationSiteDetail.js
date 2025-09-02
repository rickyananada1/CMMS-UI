import React from 'react'
import CheckTag from '../../../../../assets/icons/check-1-tag.svg'
import XTag from '../../../../../assets/icons/x-tag.svg'

const OrganizationSiteDetail = ({ row }) => {
  const data = row?.original
  return (
    <div className="w-full p-4 bg-cmms-grey-1">
      <h5 className="font-bold">Details</h5>
      <div className="grid grid-cols-4 gap-1">
        <div className="w-full">
          <div className="mb-2">
            <p className="text-cmms-grey">Site</p>
            <p className="font-bold -mt-4">{data?.site || '-'}</p>
          </div>
          <div className="mb-2">
            <p className="text-cmms-grey">Site Contact</p>
            <p className="font-bold -mt-4">
              {data?.site_contact & (data?.site_contact === '') || '-'}
            </p>
          </div>
          <div className="mb-2">
            <p className="text-cmms-grey">Site Type</p>
            <p className="font-bold -mt-4">{data?.site_type || '-'}</p>
          </div>
          <div className="mb-2">
            <p className="text-cmms-grey">Kantor Induk</p>
            <p className="font-bold -mt-4">{data?.kantor_induk || '-'}</p>
          </div>
          <div className="mb-2">
            <p className="text-cmms-grey">SAP Business Area</p>
            <p className="font-bold -mt-4">{data?.sap_business_area || '-'}</p>
          </div>
        </div>
        <div className="w-full">
          <div className="mb-2">
            <p className="text-cmms-grey">Site Description</p>
            <p className="font-bold -mt-4">{data?.site_description || '-'}</p>
          </div>
          <div className="mb-2">
            <p className="text-cmms-grey">Site Contact Description</p>
            <p className="font-bold -mt-4">{data?.site_contact_description || '-'}</p>
          </div>
          <div className="mb-2">
            <p className="text-cmms-grey">Sektor</p>
            <p className="font-bold -mt-4">{data?.sektor || '-'}</p>
          </div>
          <div className="mb-2">
            <p className="text-cmms-grey">Kantor Induk Description</p>
            <p className="font-bold -mt-4">{data?.kantor_induk_description || '-'}</p>
          </div>
          <div className="mb-2">
            <p className="text-cmms-grey">SAP Business Area Description</p>
            <p className="font-bold -mt-4">{data?.sap_business_area_description || '-'}</p>
          </div>
        </div>
        <div className="w-full">
          <div className="mb-2">
            <p className="text-cmms-grey">Unit ID</p>
            <p className="font-bold -mt-4">{data?.unit_id || '-'}</p>
          </div>
          <div className="mb-2">
            <p className="text-cmms-grey text-transparent">-</p>
            <p className="font-bold -mt-4 text-transparent">-</p>
          </div>
          <div className="mb-2">
            <p className="text-cmms-grey">Sector Description</p>
            <p className="font-bold -mt-4">{data?.sektor_description || '-'}</p>
          </div>
          <div className="mb-2">
            <p className="text-cmms-grey">SAP Company Code</p>
            <p className="font-bold -mt-4">{data?.sap_company_code || '-'}</p>
          </div>
          <div className="mb-2">
            <p className="text-cmms-grey">SAP Plant</p>
            <p className="font-bold -mt-4">{data?.sap_plant || '-'}</p>
          </div>
        </div>
        <div className="w-full">
          <div className="mb-2">
            <p className="text-cmms-grey">Active?</p>
            <p className="font-bold -mt-2">
              <img src={data?.is_active ? CheckTag : XTag} width={15} height={15} alt={''} />
            </p>
          </div>
          <div className="mb-2">
            <p className="text-cmms-grey text-transparent">-</p>
            <p className="font-bold -mt-4 text-transparent">-</p>
          </div>
          <div className="mb-2">
            <p className="text-cmms-grey">Purchasing Organization</p>
            <p className="font-bold -mt-4">{data?.purchasing_organization || '-'}</p>
          </div>
          <div className="mb-2">
            <p className="text-cmms-grey">SAP Company Code Description</p>
            <p className="font-bold -mt-4">{data?.sap_company_code_description || '-'}</p>
          </div>
          <div className="mb-2">
            <p className="text-cmms-grey">SAP Plant Description</p>
            <p className="font-bold -mt-4">{data?.sap_plant_description || '-'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganizationSiteDetail

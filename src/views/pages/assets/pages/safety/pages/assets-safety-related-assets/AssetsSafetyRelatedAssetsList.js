import React, { Fragment } from 'react'
import { Table } from 'src/components/elements/table'
import { DetailCard } from 'src/components/elements/cards'
import { MdOutlineCloudDownload } from 'react-icons/md'
import useAssetsSafetyRelatedAssetsList from './hooks/useAssetsSafetyRelatedAssetsList'
import { useGetAssetsSafetyRelatedAssetsTableList } from './services'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import CardHeader from 'src/components/elements/cards/CardHeader'

const ExpandedComponent = (row) => {
  const data = row?.row?.original
  return (
    <div className="bg-[#E9F1FB80] px-5 py-3">
      <h5 className="font-bold">Details</h5>
      <div className="flex items-center mt-3 mb-1 justify-between">
        <p className="text-base text-neutral-text-field text-nowrap font-normal">Asset</p>
        <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
      </div>
      <div className="grid grid-cols-4 mb-3">
        <div>
          <label className="text-body-small font-light">Asset</label>
          <p className="text-body-bold">{data?.related_asset?.asset_num ?? '-'}</p>
        </div>
        <div>
          <label className="text-body-small font-light">Description</label>
          <p className="text-body-bold">{data?.related_asset?.asset_description ?? '-'}</p>
        </div>
      </div>
      <div className="flex items-center mt-3 mb-1 justify-between">
        <p className="text-base text-neutral-text-field text-nowrap font-normal">Location</p>
        <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
      </div>
      <div className="grid grid-cols-4 mb-3">
        <div>
          <label className="text-body-small font-light">Location</label>
          <p className="text-body-bold">{data?.location?.location ?? '-'}</p>
        </div>
        <div>
          <label className="text-body-small font-light">Description</label>
          <p className="text-body-bold">{data?.location?.location_description ?? '-'}</p>
        </div>
      </div>
    </div>
  )
}

const columns = [
  {
    header: '',
    size: 10,
    id: 'toggle-safety-related-assets',
    cell: ({ row }) => {
      return (
        <Fragment>
          {row.getCanExpand() && (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: 'pointer', padding: '10px' },
              }}
            >
              {row.getIsExpanded() ? (
                <IoIosArrowUp className="w-5 h-5" />
              ) : (
                <IoIosArrowDown className="w-5 h-5" />
              )}
            </button>
          )}
        </Fragment>
      )
    },
  },
  {
    header: 'Asset',
    accessorKey: 'related_asset.asset_num',
  },
  {
    header: 'Location',
    accessorKey: 'location.location',
  },
  {
    header: 'Description',
    accessorKey: 'location.location_description',
  },
]

const AssetsSafetyRelatedAssetsList = ({
  mode,
  setAction,
  setTabIndex,
  isRefetchList,
  setIsRefetchList,
}) => {
  const { tableRef, selectedRow } = useAssetsSafetyRelatedAssetsList({
    mode,
    setAction,
    setTabIndex,
    isRefetchList,
    setIsRefetchList,
  })

  return (
    <div>
      <DetailCard>
        <div className="flex justify-between items-center">
          <CardHeader
            description={selectedRow?.asset_description}
            infoFields={[
              { label: 'Assets ID', value: selectedRow?.asset_num },
              { label: 'Site', value: selectedRow?.site },
            ]}
          />
          <span className="flex items-center cursor-pointer text-body-bold text-primary-main">
            <MdOutlineCloudDownload className="mr-2 text-primary-main" />
            Download
          </span>
        </div>
        <hr className="py-1" />
        <Table
          tableRef={tableRef}
          columns={columns}
          parentId={selectedRow?.asset_id}
          apiController={useGetAssetsSafetyRelatedAssetsTableList}
          query={{
            site: selectedRow?.site_id,
          }}
          tableSubComponent={ExpandedComponent}
          canExpand
          hasAutoNumber
        />
      </DetailCard>
    </div>
  )
}

export default AssetsSafetyRelatedAssetsList

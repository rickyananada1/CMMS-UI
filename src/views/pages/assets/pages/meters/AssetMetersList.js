/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import { GoSearch } from 'react-icons/go'
import { Table } from 'src/components/elements/table'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useGetAssetMeters } from './services'
import AssetMetersDetails from './AssetMetersDetails'
import useLists from './hooks/useLists'
import XTag from 'src/assets/icons/x-tag.svg'
import CheckTag from 'src/assets/icons/check-tag.svg'
import { DetailCard } from 'src/components/elements/cards'
import { MdOutlineCloudDownload } from 'react-icons/md'
import AssetMetersReading from './AssetMetersReading'
import CardHeader from 'src/components/elements/cards/CardHeader'

const AssetMetersList = ({ mode, setAction, setTabIndex }) => {
  const {
    selectedRow,
    tableRef,
    handleSearch,
    searchDebounce,
    getDetails,
    downloadAssetMeter,
    selectedAssetMeter,
    setSelectedAssetMeter,
  } = useLists({ mode, setAction, setTabIndex })

  const columns = [
    {
      header: '',
      size: 10,
      id: 'toggle-asset-meters',
      cell: ({ row }) => {
        return (
          <Fragment>
            {row.getCanExpand() && (
              <span
                onClick={async () => {
                  if (!row?.original?.finished_loading) {
                    var detailsData = await getDetails(row?.original?.asset_meter_id)
                    Object.assign(row?.original, detailsData)
                  }
                }}
              >
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
              </span>
            )}
          </Fragment>
        )
      },
    },
    {
      header: 'Sequence',
      accessorKey: 'sequence',
      qName: 'qSequence',
      enableSorting: false,
    },
    {
      header: 'Meter Group',
      accessorKey: 'meter_group',
      qName: 'qMeterGroup',
      enableSorting: false,
      cell: (row) => <div>{row.getValue() || '-'}</div>,
    },
    {
      header: 'Meter',
      accessorKey: 'meter',
      qName: 'qMeterName',
      enableSorting: false,
    },
    {
      header: 'Description',
      accessorKey: 'meter_description',
      qName: 'qMeterDesc',
      enableSorting: false,
    },
    {
      header: 'Meter Type',
      accessorKey: 'meter_type',
      qName: 'qMeterType',
      qType: 'select',
      qOptions: [
        { label: 'Gauge', value: 'gauge' },
        { label: 'Continuous', value: 'continuous' },
        { label: 'Characteristic', value: 'characteristic' },
      ],
      enableSorting: false,
      cell: (row) => <div className="capitalize">{row.getValue()}</div>,
    },
    {
      header: 'Unit of Measure',
      accessorKey: 'uom',
      qName: 'qUom',
      enableSorting: false,
    },
    {
      header: 'Active?',
      accessorKey: 'is_active',
      qName: 'qIsActive',
      qType: 'select',
      qOptions: [
        { label: 'Active', value: true },
        { label: 'Inactive', value: false },
      ],
      enableSorting: false,
      cell: (row) => (
        <div className="flex justify-center items-center">
          <img
            src={row.getValue() ? CheckTag : XTag}
            width={20}
            height={20}
            alt={'meters-active'}
          />
        </div>
      ),
    },
  ]

  return (
    <>
      <DetailCard>
        <CardHeader
          description={selectedRow?.asset_description}
          infoFields={[
            { label: 'Assets ID', value: selectedRow?.asset_num },
            { label: 'Site', value: selectedRow?.site },
          ]}
        />
        <hr />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center border rounded border-solid px-4 py-2 mr-2">
              <input
                placeholder="Search"
                className="border-none text-sm"
                type="text"
                onChange={(e) => {
                  handleSearch(e)
                }}
              />
              <GoSearch color="blue" />
            </div>
          </div>
          <button
            className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
            onClick={downloadAssetMeter}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <Table
          tableRef={tableRef}
          columns={columns}
          apiController={useGetAssetMeters}
          query={{
            q: searchDebounce || undefined,
            assetId: selectedRow?.asset_id,
          }}
          selectableRowSelected={(row) => {
            return row.original?.asset_meter_id === selectedAssetMeter?.asset_meter_id
          }}
          onRowClicked={(row) => {
            const payload = { ...row?.original }
            setSelectedAssetMeter(payload)
          }}
          tableSubComponent={({ row }) => AssetMetersDetails({ row, CheckTag, XTag })}
          isWithSearchField
          canExpand
          hasAutoNumber
        />
      </DetailCard>
      <AssetMetersReading />
    </>
  )
}
export default AssetMetersList
